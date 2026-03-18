import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';

import { config } from './config';
import { connectDb, disconnectDb } from './lib/db';
import { contactRouter } from './routes/contact';
import { adminRouter } from './routes/admin';

const app = express();

app.set('trust proxy', 1);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.frontendUrl }));
app.use(helmet());
app.use(morgan('tiny'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Vercel Serverless Export
export default app;

// Local Development Server
if (process.env.NODE_ENV !== 'production') {
  async function main() {
    await connectDb();

    app.listen(config.port, () => {
      console.log(`🚀 Backend running on http://localhost:${config.port}`);
    });
  }

  main().catch((err) => {
    console.error('[startup] failed', err);
    process.exit(1);
  });

  process.on('SIGINT', async () => {
    console.log('[shutdown] disconnecting database...');
    await disconnectDb();
    process.exit(0);
  });
} else {
  // In Serverless production, lazily connect to the DB
  connectDb().catch(console.error);
}
