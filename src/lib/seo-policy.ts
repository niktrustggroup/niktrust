import type { PlatformDetail } from '@/api/types';
import { publicPlatforms } from '@/api/rules';
import { articles, changes, terms, articlePath } from '@/api/public-content';
/** Single source of truth for crawl policy: production origin, canonical URLs and private (noindex) paths. */
export const SITE_URL = (import.meta.env['VITE_SITE_URL'] as string | undefined)?.replace(/\/+$/, '') || 'https://niktrust.lovable.app';

/** Personal, authentication, partner-finance and payment pages: never indexed. */
const PRIVATE = [/^\/account(\/|$)/, /^\/(admin|partner)(\/|$)/, /^\/(login|register|forgot-password|reset-password)(\/|$)/, /^\/partners\/(dashboard|leads|ledger|payouts|links)(\/|$)/, /^\/membership\/(checkout|result|payment-result)(\/|$)/, /^\/terminal(\/|$)/, /^\/search(\/|$)/];

export function normalizePath(pathname: string) {
  const p = pathname.split(/[?#]/)[0] || '/';
  return p.length > 1 ? p.replace(/\/+$/, '') : '/';
}
export const isPrivatePath = (pathname: string) => PRIVATE.some(r => r.test(normalizePath(pathname)));
/** Canonical never carries query strings or fragments, so tracking parameters are dropped. */
export const canonicalUrl = (pathname: string) => SITE_URL + normalizePath(pathname);

/** Public, parameter-free pages that exist as routes and contain published page content. */
export const STATIC_PUBLIC_PATHS = ['/', '/forex-brokers', '/crypto-exchanges', '/crypto-exchanges/iranian', '/crypto-exchanges/international', '/prop-firms', '/compare', '/finder', '/check', '/alerts', '/alerts/report', '/methodology', '/about', '/about/team', '/how-we-make-money', '/disclosure', '/editorial-policy', '/corrections', '/contact', '/faq', '/privacy', '/terms', '/disclaimer', '/risk-warning', '/learn', '/glossary', '/blog', '/news', '/markets', '/tools', '/tools/position-size', '/tools/pip-value', '/tools/margin', '/tools/profit-loss', '/tools/leverage', '/tools/swap', '/terminal', '/partners', '/partners/apply', '/partners/guide', '/partners/rules', '/membership', '/membership/terms'];

/** Empty/utility pages are crawlable so crawlers can see noindex, but not listed. */
export function isIncompletePath(pathname: string) {
  const path = normalizePath(pathname);
  if (['/about/team','/terminal','/partners/apply','/partners/guide','/partners/rules','/membership/terms','/membership/plans','/membership','/partners','/privacy','/terms','/alerts/report'].includes(path)) return true;
  if (['/blog','/news','/learn','/glossary','/alerts'].includes(path)) return path==='/glossary'?terms.length===0:path==='/alerts'?changes.length===0:!articles.some(a=>a.kind===path.slice(1));
  if (path.startsWith('/learn/')) return !articles.some(a=>articlePath(a)===path||`/learn/${a.topic}`===path);
  if (path.startsWith('/blog/')||path.startsWith('/news/')) return !articles.some(a=>articlePath(a)===path);
  if (path.startsWith('/glossary/')) return !terms.some(t=>`/glossary/${t.slug}`===path);
  if (path.startsWith('/alerts/')) return !changes.some(c=>`/alerts/${c.slug}`===path);
  if (/^\/(forex-brokers|crypto-exchanges|prop-firms)\/best-for-/.test(path)) return true;
  if (/^\/markets\//.test(path)) return true;
  if (path==='/crypto-exchanges/iranian'||path==='/crypto-exchanges/international') return true;
  return false;
}

export const CATEGORY_BASE = { brokers: '/forex-brokers', exchanges: '/crypto-exchanges', prop: '/prop-firms' } as const;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
export function buildSitemap(records: PlatformDetail[], mode: string = 'production') {
  const platforms = publicPlatforms(records, mode);
  const entries: { loc: string; lastmod?: string | undefined }[] = STATIC_PUBLIC_PATHS.filter(p => !isPrivatePath(p) && !isIncompletePath(p)).map((p): { loc: string; lastmod?: string | undefined } => ({ loc: canonicalUrl(p) }));
  const seen = new Set(entries.map(e => e.loc));
  for (const p of platforms) {
    const base = CATEGORY_BASE[p.category];
    if (!base || !p.slug) continue;
    const loc = canonicalUrl(`${base}/${encodeURIComponent(p.slug)}`);
    if (seen.has(loc)) continue;
    seen.add(loc);
    const t = p.updated_at ? new Date(p.updated_at) : null;
    entries.push({ loc, lastmod: t && !Number.isNaN(t.getTime()) ? t.toISOString() : undefined });
  }
  for(const a of articles) { const loc=canonicalUrl(articlePath(a));if(!seen.has(loc)){seen.add(loc);const d=a.updated_at??a.published_at;entries.push({loc,...(!Number.isNaN(Date.parse(d))?{lastmod:new Date(d).toISOString()}:{})});} }
  for(const c of changes.filter(c=>platforms.some(p=>p.id===c.platform_id))) { const loc=canonicalUrl(`/alerts/${encodeURIComponent(c.slug)}`);if(!seen.has(loc)){seen.add(loc);entries.push({loc,...(c.verified_at&&!Number.isNaN(Date.parse(c.verified_at))?{lastmod:new Date(c.verified_at).toISOString()}:{})});} }
  for(const t of terms) entries.push({loc:canonicalUrl(`/glossary/${encodeURIComponent(t.slug)}`)});
  for(const topic of new Set(articles.filter(a=>a.kind==='learn').map(a=>a.topic))) entries.push({loc:canonicalUrl(`/learn/${encodeURIComponent(topic)}`)});
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(e => `<url><loc>${esc(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`;
}
