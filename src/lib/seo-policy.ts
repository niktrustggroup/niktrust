/** Single source of truth for crawl policy: production origin, canonical URLs and private (noindex) paths. */
export const SITE_URL = (import.meta.env['VITE_SITE_URL'] as string | undefined)?.replace(/\/+$/, '') || 'https://niktrust.lovable.app';

/** Personal, authentication, partner-finance and payment pages: never indexed. */
const PRIVATE = [/^\/account(\/|$)/, /^\/partners\/(dashboard|leads|ledger|payouts|links)(\/|$)/, /^\/membership\/(checkout|result)(\/|$)/, /^\/search(\/|$)/];

export function normalizePath(pathname: string) {
  const p = pathname.split(/[?#]/)[0] || '/';
  return p.length > 1 ? p.replace(/\/+$/, '') : '/';
}
export const isPrivatePath = (pathname: string) => PRIVATE.some(r => r.test(normalizePath(pathname)));
/** Canonical never carries query strings or fragments, so tracking parameters are dropped. */
export const canonicalUrl = (pathname: string) => SITE_URL + normalizePath(pathname);

/** Public, parameter-free pages that exist as routes and contain published page content. */
export const STATIC_PUBLIC_PATHS = ['/', '/forex-brokers', '/crypto-exchanges', '/crypto-exchanges/iranian', '/crypto-exchanges/international', '/prop-firms', '/compare', '/finder', '/check', '/alerts', '/alerts/report', '/methodology', '/about', '/about/team', '/how-we-make-money', '/disclosure', '/editorial-policy', '/corrections', '/contact', '/faq', '/privacy', '/terms', '/disclaimer', '/risk-warning', '/learn', '/glossary', '/blog', '/news', '/markets', '/tools', '/terminal', '/partners', '/partners/apply', '/partners/guide', '/partners/rules', '/membership', '/membership/terms'];

export const CATEGORY_BASE = { brokers: '/forex-brokers', exchanges: '/crypto-exchanges', prop: '/prop-firms' } as const;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
export function buildSitemap(platforms: { slug: string; category: keyof typeof CATEGORY_BASE; updated_at?: string | null }[]) {
  const entries: { loc: string; lastmod?: string | undefined }[] = STATIC_PUBLIC_PATHS.filter(p => !isPrivatePath(p)).map((p): { loc: string; lastmod?: string | undefined } => ({ loc: canonicalUrl(p) }));
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
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(e => `<url><loc>${esc(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`;
}
