import { profile } from '@/data/profile';

export default function robots() {
  const siteUrl = profile.siteUrl;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
