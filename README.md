# Full-Stack Portfolio Platform

A modern, containerized web application built to serve as a high-performance professional portfolio. It features a React-driven frontend, a Node.js API backend, robust PostgreSQL data persistence, and a highly secure Nginx reverse proxy.

## 🚀 Key Features

- **Responsive Frontend UI**: A lightning-fast, fully responsive user interface built using React 19 and Vite. Styled with modern CSS and Tailwind CSS methodologies for premium aesthetics and fluid micro-animations.
- **RESTful Backend API**: A structured Express API handling form submissions, robust server-side validation, rate-limiting, and administrative tasks.
- **Admin Portal**: A secure, token-protected dashboard allowing administrators to view, manage, and delete incoming contact form messages.
- **Relational Data Modeling**: Highly structured database models utilizing Prisma ORM with PostgreSQL, ensuring data integrity and fast queries.
- **Containerized Architecture**: The entire stack is orchestrated seamlessly via Docker and Docker Compose, enabling environment parity and effortless deployment scaling.

## 🛠️ Technology Specifications

### Client-Side (Frontend)
- **Framework**: React 19 (TypeScript)
- **Build Tool / Bundler**: Vite
- **Styling**: TailwindCSS, Vanilla CSS, Framer Motion (`motion`)
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Error Handling**: Custom React Error Boundaries & 404 Pages

### Server-Side (Backend)
- **Runtime Environment**: Node.js (TypeScript)
- **Framework**: Express.js
- **Validation schema**: Zod
- **Authentication**: JSON Web Tokens (JWT), BCryptJS
- **ORM (Object Relational Mapper)**: Prisma
- **Logging**: Morgan

### Database Layer
- **Relational Database**: PostgreSQL 15
- **Tooling**: PgAdmin 4 (for administrative queries and management)

### Network & Infrastructure
- **Reverse Proxy / Web Server**: Nginx (Alpine)
- **Containerization**: Docker & Docker Compose
- **Routing Strategy**: Nginx handles proxying `/api/*` traffic to the backend container while efficiently serving static frontend distributables on `/`.

## 🔐 Security Standards

The platform implements rigorous, production-ready security methodologies to protect infrastructure and data:
- **Rate Limiting**: `express-rate-limit` prevents brute force and Denial of Service attacks on API endpoints (trust-proxy configured for Nginx parity).
- **Constant-Time Equalization**: Uses `crypto.timingSafeEqual` native modules against credential comparison to prevent advanced timing side-channel attacks during authentication.
- **HTTP Security Headers**: Enforced via Helmet.js on the backend and strict WebServer headers (`X-Frame-Options`, `X-XSS-Protection`, `X-Content-Type-Options`, `Strict-Content-Security-Policy`) via Nginx.
- **Network Isolation**: Backend and PostgreSQL instances restrict public-facing interfaces; services communicate strictly through internal Docker bridged networking. Public access is exclusively gated through Nginx.
- **Input Sanitization**: Total endpoint reliance on strict `Zod` validation rules against SQL/NoSQL injections. Output sanitization managed automatically via React.

## 📄 License
This project is licensed under the MIT License.
