import { createFileRoute } from '@tanstack/react-router';
import { client } from '@/api/client';
import { buildSitemap } from '@/lib/seo-policy';
export const Route = createFileRoute('/sitemap.xml')({
  server: { handlers: { GET: async () => {
    try {
      const catalog = await client.getCatalog();
      return new Response(buildSitemap(catalog.data.platforms,catalog.meta.data_mode), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
    } catch {
      return new Response('Sitemap data unavailable', { status: 503 });
    }
  } } },
});
