import type { MetadataRoute } from 'next';

// Update this with your actual production domain
const BASE_URL = 'https://ritesh-portfolio-lemon-two.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
