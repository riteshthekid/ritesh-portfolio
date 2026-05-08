import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const BASE_URL = 'https://ritesh-portfolio-lemon-two.vercel.app';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  // Required for resolving relative URLs in OG images, sitemap, etc.
  metadataBase: new URL(BASE_URL),

  title: 'Ritesh Patel — Portfolio',
  description:
    'Ritesh Patel — Developer & Designer. Portfolio showcasing modern web applications, UI design, and full-stack development projects.',
  authors: [{ name: 'Ritesh Patel' }],
  keywords: ['Ritesh Patel', 'Portfolio', 'Web Developer', 'Full Stack', 'Next.js', 'React', 'UI Design', 'Cybersecurity'],

  openGraph: {
    title: 'Ritesh Patel — Portfolio',
    description: 'Developer & Designer. Modern web applications, UI design, and full-stack projects.',
    type: 'website',
    url: BASE_URL,
    siteName: 'Ritesh Patel Portfolio',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ritesh Patel — Portfolio',
    description: 'Developer & Designer. Modern web apps, UI design, and full-stack projects.',
  },

  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },

  // ─── Google Search Console Verification ──────────────────────────────────
  // STEP: Replace the value below with your actual verification code from
  // Google Search Console → Add Property → HTML tag → content="..."
  // verification: {
  //   google: 'PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE',
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
