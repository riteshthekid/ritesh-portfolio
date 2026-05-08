import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import './globals.css';

// ─── Site Config ──────────────────────────────────────────────────────────────
const BASE_URL = 'https://ritesh-portfolio-lemon-two.vercel.app';
const FULL_NAME = 'Ritesh Patel';
const TITLE = 'Ritesh Patel — Developer & Designer';
const DESCRIPTION =
  'I\'m Ritesh Patel, a full-stack developer and designer with a hacker mindset. I build modern web applications using React, Next.js, TypeScript, and Node.js, with a deep focus on software architecture and cybersecurity.';

// ─── Font ─────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

// ─── JSON-LD Structured Data (Person + WebSite schemas) ───────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: FULL_NAME,
      url: BASE_URL,
      description: DESCRIPTION,
      jobTitle: 'Full-Stack Developer & UI Designer',
      knowsAbout: [
        'Web Development',
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Cybersecurity',
        'UI Design',
        'Python',
        'System Architecture',
      ],
      sameAs: [
        'https://github.com/riteshthekid',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: `${FULL_NAME} — Portfolio`,
      description: DESCRIPTION,
      author: { '@id': `${BASE_URL}/#person` },
      inLanguage: 'en-US',
    },
  ],
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },

  // ── Description ────────────────────────────────────────────────────────────
  description: DESCRIPTION,

  // ── Keywords ───────────────────────────────────────────────────────────────
  keywords: [
    'Ritesh Patel',
    'Portfolio',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Node.js',
    'UI Designer',
    'Frontend Developer',
    'Cybersecurity',
    'Web Applications',
    'JavaScript Developer',
    'Python',
    'Freelance Developer India',
  ],

  // ── Authors & Creator ──────────────────────────────────────────────────────
  authors: [{ name: FULL_NAME, url: BASE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  // ── Canonical ──────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: `${FULL_NAME} Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — Developer & Designer Portfolio`,
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@riteshthekid',
  },

  // ── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },

  // ── Google Search Console Verification ────────────────────────────────────
  verification: {
    google: 'AUiJbP1XfZ81UfX_tFf5n0L_v9x5n6qf6k0W_p7k_4',
  },

  // ── Category ───────────────────────────────────────────────────────────────
  category: 'technology',
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
