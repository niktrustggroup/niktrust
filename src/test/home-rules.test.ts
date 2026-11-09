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

import { profitLoss, effectiveLeverage, swapCost } from '@/lib/calculators';
describe('day06 calculators', () => {
  it('profit/loss: buy 1 lot EURUSD 1.1000→1.1050 = 500', () => { const r = profitLoss(1, 1.1, 1.105, 1, 100000, 1); expect(r.ok && Math.round(r.value)).toBe(500); });
  it('profit/loss: sell loses when price rises', () => { const r = profitLoss(-1, 1.1, 1.105, 1, 100000, 1); expect(r.ok && Math.round(r.value)).toBe(-500); });
  it('leverage: 1 lot at 1.1 on 11,000 equity = 10x', () => { const r = effectiveLeverage(1, 100000, 1.1, 1, 11000); expect(r.ok && Math.round(r.value)).toBe(10); });
  it('swap: negative rate allowed, 2 lots × -3 × 3 nights = -18', () => { const r = swapCost(2, -3, 3); expect(r.ok && r.value).toBe(-18); });
  it('swap: fractional nights rejected', () => { expect(swapCost(1, 1, 1.5).ok).toBe(false); });
});
