import type { AttributeValueView, Category, PlatformDetail } from './types';
import { filterPlatforms } from './rules';

export const CATEGORY_INFO: Record<Category, { topic: string; intro: string; criteria: string[] }> = {
  brokers: { topic: 'forex', intro: 'پیش از انتخاب بروکر، شرکت طرف قرارداد، دامنهٔ مجوز و هزینه‌های حساب را جداگانه بررسی کنید. اهرم بالا می‌تواند زیان را تشدید کند.', criteria: ['رگولاتوری', 'شخص حقوقی', 'نوع حساب', 'اسپرد', 'کمیسیون', 'اهرم', 'حداقل واریز', 'واریز', 'برداشت', 'پلتفرم معاملاتی', 'دسترسی ایران'] },
  exchanges: { topic: 'cryptocurrency', intro: 'شرکت و حوزهٔ قضایی، امنیت نگهداری دارایی، کارمزد و شرایط احراز هویت را بررسی کنید. امکان دسترسی با مجاز بودن ثبت‌نام یا برداشت یکسان نیست.', criteria: ['شخص حقوقی', 'حوزهٔ قضایی', 'رمزارز', 'کارمزد', 'واریز', 'برداشت', 'امنیت', 'احراز هویت', 'پشتیبانی فیات', 'دسترسی ایران'] },
  prop: { topic: 'prop-trading', intro: 'قوانین چالش، حدود زیان و شرایط پرداخت سود را پیش از پرداخت هزینه بخوانید. هزینهٔ چالش با سپردهٔ معاملاتی بروکر یکسان نیست.', criteria: ['نوع چالش', 'قوانین ارزیابی', 'هدف سود', 'افت سرمایه', 'زیان روزانه', 'تقسیم سود', 'شرایط پرداخت', 'کشورهای محدود', 'دسترسی ایران'] },
};
export const isVerifiedAttribute = (a: AttributeValueView) => a.value_status === 'known' && a.value !== null && a.evidence.claim_origin === 'independent' && !!a.evidence.source_url && !!a.evidence.verified_at && !a.evidence.is_stale;
export function verifiedDate(p: PlatformDetail): string | null {
  const dates = p.key_attributes.filter(isVerifiedAttribute).map(a => a.evidence.verified_at).filter((d): d is string => !!d && !Number.isNaN(Date.parse(d)));
  return dates.sort().at(-1) ?? null;
}
export function filterOptions(platforms: PlatformDetail[]) {
  const labels = [...new Set(platforms.flatMap(p => p.key_attributes.filter(isVerifiedAttribute).map(a => a.label)))];
  return labels.map(label => ({ label, values: [...new Set(platforms.flatMap(p => p.key_attributes.filter(a => a.label === label && isVerifiedAttribute(a)).map(a => a.value ?? '')))].sort((a,b) => a.localeCompare(b, 'fa')) }));
}
export type DirectoryFilter = { label: string; value: string };
export function parseFilters(raw = ''): DirectoryFilter[] {
  try { const v: unknown = JSON.parse(raw); return Array.isArray(v) ? v.filter((f): f is DirectoryFilter => !!f && typeof f.label === 'string' && typeof f.value === 'string') : []; } catch { return []; }
}
export function directoryResults(platforms: PlatformDetail[], q: string, coverage: string, sort: string, filters: DirectoryFilter[], region = '') {
  const filtered = filterPlatforms(platforms, q, coverage).filter(p => (!region || p.exchange_region === region) && filters.every(f => p.key_attributes.some(a => a.label === f.label && a.value === f.value && isVerifiedAttribute(a))));
  if (sort === 'verified') return filtered.sort((a,b) => (verifiedDate(b) ?? '').localeCompare(verifiedDate(a) ?? '') || a.name_fa.localeCompare(b.name_fa,'fa'));
  if (sort === 'updated') return filtered.sort((a,b) => b.updated_at.localeCompare(a.updated_at));
  if (sort.startsWith('numeric:')) {
    const label = sort.slice(8);
    const n = (p: PlatformDetail) => { const a = p.key_attributes.find(a => a.label === label && isVerifiedAttribute(a)); const value = a?.value?.replace(/[,٬]/g,'').match(/[\d.]+/); return value ? Number(value[0]) : Infinity; };
    return filtered.sort((a,b) => n(a)-n(b) || a.name_fa.localeCompare(b.name_fa,'fa'));
  }
  return filtered;
}
export const REPORT_TYPES = ['اطلاعات نادرست', 'اطلاعات پلتفرم جدید', 'مشکل دسترسی', 'مشکل واریز یا برداشت', 'سایر گزارش‌ها'] as const;