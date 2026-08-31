import type { MetadataRoute } from 'next';

import { profile } from '@/data/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = profile.siteUrl;
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
  ];
}
