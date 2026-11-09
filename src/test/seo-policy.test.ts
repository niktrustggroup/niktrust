import { describe, expect, it } from 'vitest';
import { buildSitemap, canonicalUrl, isPrivatePath } from '@/lib/seo-policy';

describe('SEO policy', () => {
  it('drops query strings and trailing slashes from canonicals', () => {
    expect(canonicalUrl('/forex-brokers/?utm_source=x#top')).toBe('https://niktrust.lovable.app/forex-brokers');
  });
  it('marks account, auth, partner finance and checkout pages private', () => {
    for (const p of ['/account', '/account/login', '/partners/dashboard', '/partners/ledger', '/partners/payouts', '/membership/checkout']) expect(isPrivatePath(p), p).toBe(true);
    for (const p of ['/', '/partners', '/partners/apply', '/membership', '/forex-brokers/a']) expect(isPrivatePath(p), p).toBe(false);
  });
  it('lists only existing platforms with their own update date and no private pages', () => {
    const xml = buildSitemap([{ slug: 'a', category: 'brokers', updated_at: '2026-11-08T00:00:00Z' }]);
    expect(xml).toContain('<loc>https://niktrust.lovable.app/forex-brokers/a</loc><lastmod>2026-11-08T00:00:00.000Z</lastmod>');
    expect(xml).not.toContain('/account');
    expect(xml).not.toContain('/partners/dashboard');
  });
});
