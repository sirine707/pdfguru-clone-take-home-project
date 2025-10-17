import { MetadataRoute } from 'next';
import { locales } from '../i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // Define all routes
  const routes = [
    '',
    '/edit-sign',
    '/edit-sign/editor',
    '/converter',
    '/summarizer',
    '/summarizer/editor',
  ];

  // Generate sitemap entries for each locale and route
  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemap;
}
