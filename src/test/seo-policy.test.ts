import { describe, expect, it } from 'vitest';
import { buildSitemap, canonicalUrl, isPrivatePath } from '@/lib/seo-policy';
import { mockCatalog } from '@/api/mockClient';
import type { PlatformDetail } from '@/api/types';

describe('SEO policy', () => {
  it('drops query strings and trailing slashes from canonicals', () => {
    expect(canonicalUrl('/forex-brokers/?utm_source=x#top')).toBe('https://niktrust.lovable.app/forex-brokers');
  });
  it('marks account, auth, partner finance and checkout pages private', () => {
    for (const p of ['/account', '/account/login', '/partners/dashboard', '/partners/ledger', '/partners/payouts', '/membership/checkout']) expect(isPrivatePath(p), p).toBe(true);
    for (const p of ['/', '/partners', '/partners/apply', '/membership', '/forex-brokers/a']) expect(isPrivatePath(p), p).toBe(false);
  });
  it('lists only existing platforms with their own update date and no private pages', () => {
    const base=mockCatalog.platforms[0];if(!base)throw new Error('Fixture missing');
    const p:PlatformDetail={...base,name_fa:'Test-only record',iran_access:{...base.iran_access,evidence:{...base.iran_access.evidence,claim_origin:'independent'}},key_attributes:base.key_attributes.map(a=>({...a,evidence:{...a.evidence,claim_origin:'independent'}}))};
    const xml = buildSitemap([p]);
    expect(xml).toContain('<loc>https://niktrust.lovable.app/forex-brokers/a</loc><lastmod>2026-11-08T00:00:00.000Z</lastmod>');
    expect(xml).not.toContain('/account');
    expect(xml).not.toContain('/partners/dashboard');
  });
  it('never includes demonstration profiles or incomplete article URLs',()=>{const xml=buildSitemap(mockCatalog.platforms,'demonstration');expect(xml).not.toContain('/forex-brokers/a');expect(xml).not.toContain('/blog');expect(xml).not.toContain('/news');expect(xml).not.toContain('/about/team');});
});
