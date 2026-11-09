import type { Category } from './types';
import type { PlatformDetail } from './types';
/** Official scoring methodology and weights are not approved yet. */
export function visibleScore(_score: PlatformDetail['score']) { return null; }
export function sanitizeSelection(ids: unknown, platforms: PlatformDetail[]): string[] {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter((id): id is string => typeof id === 'string' && platforms.some(p => p.id === id)))].slice(0, 4);
}
export function canCompare(platforms: PlatformDetail[]): boolean {
  return platforms.length >= 2 && platforms.length <= 4 && new Set(platforms.map(p => p.category)).size === 1;
}
export function filterPlatforms(platforms: PlatformDetail[], query = '', coverage = '', sort = 'name') {
  const q = query.trim().replace(/ي/g, 'ی').replace(/ك/g, 'ک');
  return platforms.filter(p => (!q || [p.name_fa, ...p.key_attributes.flatMap(a => [a.label, a.value ?? ''])].some(v => v.replace(/ي/g, 'ی').replace(/ك/g, 'ک').includes(q))) && (!coverage || p.coverage_level === coverage))
    .sort((a, b) => sort === 'date' ? b.updated_at.localeCompare(a.updated_at) : a.name_fa.localeCompare(b.name_fa, 'fa'));
}
export function validateReport(description: string) { return description.trim().length >= 40 && description.trim().length <= 3000; }
/** Public surfaces (recommendations, finder, comparison, featured reviews) only use non-demonstration records. */
export function isPublicRecord(p: PlatformDetail): boolean {
  const ev = [p.iran_access.evidence, ...p.key_attributes.map(a => a.evidence)];
  return !ev.some(e => e.claim_origin === 'demonstration') && !p.name_fa.includes('ساختگی');
}
export function publicPlatforms(platforms: PlatformDetail[], mode: string): PlatformDetail[] {
  return mode === 'production' ? platforms.filter(isPublicRecord) : [];
}

export type FinderAnswers = { category: Category | ''; experience: string; capitalUsd: number | null; methods: string[]; priorities: string[] };
export type CriterionResult = { label: string; state: 'match' | 'mismatch' | 'unknown'; note: string };
export type FinderMatch = { platform: PlatformDetail; criteria: CriterionResult[] };
const num = (v: string | null) => { const m = v?.replace(/[,٬]/g, '').match(/[\d.]+/); return m ? Number(m[0]) : null; };
const attr = (p: PlatformDetail, re: RegExp) => p.key_attributes.find(a => re.test(a.label));
/** Transparent rule-based matching. Commercial relationships are never an input; unknown data stays unknown. */
export function matchPlatforms(platforms: PlatformDetail[], a: FinderAnswers): FinderMatch[] {
  return platforms.filter(p => p.category === a.category).map(p => {
    const c: CriterionResult[] = [];
    const dep = attr(p, /حداقل واریز|هزینهٔ چالش|حداقل/);
    const depVal = dep?.value_status === 'known' ? num(dep.value) : null;
    if (a.capitalUsd === null) c.push({ label: 'سرمایهٔ اولیه', state: 'unknown', note: 'سرمایه وارد نشد.' });
    else if (depVal === null) c.push({ label: 'سرمایهٔ اولیه', state: 'unknown', note: 'حداقل ورود برای این پلتفرم ثبت نشده است.' });
    else c.push({ label: 'سرمایهٔ اولیه', state: depVal <= a.capitalUsd ? 'match' : 'mismatch', note: `حداقل ثبت‌شده: ${dep!.value}` });
    for (const m of a.methods) c.push({ label: `روش واریز/برداشت: ${m}`, state: 'unknown', note: 'روش‌های واریز و برداشت در دادهٔ این پلتفرم ثبت نشده است.' });
    for (const pr of a.priorities) {
      const fee = pr === 'کارمزد پایین' ? attr(p, /کارمزد|اسپرد/) : undefined;
      c.push(fee?.value_status === 'known' ? { label: pr, state: 'unknown', note: `دادهٔ قابل مقایسه: ${fee.label} ${fee.value}؛ ارزیابی «پایین بودن» منتشر نشده است.` } : { label: pr, state: 'unknown', note: 'دادهٔ تأییدشده برای این اولویت ثبت نشده است.' });
    }
    c.push({ label: 'دسترسی از ایران', state: p.iran_access.status === 'unknown' ? 'unknown' : 'match', note: p.iran_access.status === 'unknown' ? 'وضعیت دسترسی تأیید نشده است.' : 'وضعیت ثبت‌شده با منبع.' });
    return { platform: p, criteria: c };
  }).filter(r => !r.criteria.some(x => x.state === 'mismatch'))
    .sort((x, y) => y.criteria.filter(c => c.state === 'match').length - x.criteria.filter(c => c.state === 'match').length || x.platform.name_fa.localeCompare(y.platform.name_fa, 'fa'));
}
