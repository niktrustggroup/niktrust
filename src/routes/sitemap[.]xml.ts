import { createFileRoute } from '@tanstack/react-router';
const pages = ['/', '/forex-brokers', '/crypto-exchanges', '/prop-firms', '/compare', '/check', '/alerts', '/methodology', '/about', '/how-we-make-money', '/editorial-policy', '/corrections', '/contact', '/privacy', '/terms', '/risk-warning', '/learn', '/glossary', '/markets', '/tools', '/terminal', '/partners', '/membership'];
export const Route = createFileRoute('/sitemap.xml')({
  server: { handlers: { GET: () => new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(path => `<url><loc>https://niktrust.lovable.app${path}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type':'application/xml; charset=utf-8' } }) } },
});