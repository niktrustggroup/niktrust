import { describe, expect, it } from 'vitest';
import { mockCatalog } from '@/api/mockClient';
import { canCompare, filterPlatforms, sanitizeSelection, validateReport, visibleScore } from '@/api/rules';
import { rialToToman } from '@/api/format';
const platforms = mockCatalog.platforms;
describe('Day04 trust rules', () => {
  it('does not reveal an unpublished numeric score', () => { expect(visibleScore({ is_published:false,value:'7.1' })).toBeNull(); });
  it('permits two brokers but not a broker and prop challenge', () => { expect(canCompare(platforms.filter(p => ['a','b'].includes(p.id)))).toBe(true);expect(canCompare(platforms.filter(p => ['a','f'].includes(p.id)))).toBe(false); });
  it('rejects fewer than two or more than four compared platforms', () => { expect(canCompare(platforms.slice(0,1))).toBe(false);expect(canCompare([...platforms.slice(0,4),platforms[0]].filter(p => p !== undefined))).toBe(false); });
  it('restores at most four unique existing ids', () => { expect(sanitizeSelection(['a','a','missing','b','c','d','e'],platforms)).toEqual(['a','b','c','d']);expect(sanitizeSelection({},platforms)).toEqual([]); });
  it('filters basic broker profiles instead of changing only the decoration', () => { expect(filterPlatforms(platforms.filter(p => p.category === 'brokers'),'','basic_profile').map(p => p.id)).toEqual(['b','d']); });
  it('requires report description length of 40 to 3000 characters', () => { expect(validateReport('x'.repeat(39))).toBe(false);expect(validateReport('x'.repeat(40))).toBe(true);expect(validateReport('x'.repeat(3001))).toBe(false); });
  it('converts rial to toman by dividing by ten without dropping a remainder', () => { expect(rialToToman('105')).toBe('۱۰٫۵ تومان'); });
});