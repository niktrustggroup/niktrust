import type { PlatformDetail } from './types';
export function visibleScore(score: PlatformDetail['score']) { return score.is_published ? score.value : null; }
export function sanitizeSelection(ids: unknown, platforms: PlatformDetail[]): string[] {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter((id): id is string => typeof id === 'string' && platforms.some(p => p.id === id)))].slice(0, 4);
}
export function canCompare(platforms: PlatformDetail[]): boolean {
  return platforms.length >= 2 && platforms.length <= 4 && new Set(platforms.map(p => p.category)).size === 1;
}
export function filterPlatforms(platforms: PlatformDetail[], query = '', coverage = '', sort = 'name') {
  const q = query.trim().replace(/ي/g, 'ی').replace(/ك/g, 'ک');
  return platforms.filter(p => (!q || p.name_fa.includes(q)) && (!coverage || p.coverage_level === coverage))
    .sort((a, b) => sort === 'date' ? b.updated_at.localeCompare(a.updated_at) : a.name_fa.localeCompare(b.name_fa, 'fa'));
}
export function validateReport(description: string) { return description.trim().length >= 40 && description.trim().length <= 3000; }