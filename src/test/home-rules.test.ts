import { describe, expect, it } from 'vitest';
import { pipValue, positionSize, requiredMargin } from '@/lib/calculators';
import { matchPlatforms, publicPlatforms } from '@/api/rules';
import { mockCatalog } from '@/api/mockClient';

describe('calculators', () => {
  it('pip value: 1 lot EURUSD, USD account = 10', () => { const r = pipValue(1, 100000, 0.0001, 1); expect(r.ok && r.value).toBeCloseTo(10); });
  it('position size: 10,000 balance, 1% risk, 50 pip stop, 10/pip = 0.2 lots', () => { const r = positionSize(10000, 1, 50, 10); expect(r.ok && r.value).toBeCloseTo(0.2); });
  it('margin: 1 lot at 1.1 with 1:100 = 1,100', () => { const r = requiredMargin(1, 100000, 1.1, 100, 1); expect(r.ok && r.value).toBeCloseTo(1100); });
  it('rejects zero or negative input', () => { expect(positionSize(0, 1, 50, 10).ok).toBe(false); expect(requiredMargin(1, 100000, -1, 100, 1).ok).toBe(false); });
});
describe('public data rules', () => {
  it('excludes every demonstration platform from public surfaces', () => { expect(publicPlatforms(mockCatalog.platforms, 'production')).toEqual([]); expect(publicPlatforms(mockCatalog.platforms, 'demonstration')).toEqual([]); });
  it('finder drops a platform whose recorded minimum exceeds capital and keeps unknowns unknown', () => {
    const p = mockCatalog.platforms.filter(x => x.category === 'brokers');
    const low = matchPlatforms(p, { category: 'brokers', experience: '', capitalUsd: 1, methods: [], priorities: [] });
    expect(low.every(r => r.criteria.every(c => c.state !== 'mismatch'))).toBe(true);
    expect(low.length).toBeLessThan(p.length);
    const none = matchPlatforms(p, { category: 'prop', experience: '', capitalUsd: 1000, methods: [], priorities: [] });
    expect(none).toEqual([]);
  });
});
