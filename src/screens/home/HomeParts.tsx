import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ShieldCheck, ShieldAlert, Clock } from 'lucide-react';
import type { PlatformDetail } from '@/api/types';
import { persianDate, persianValue } from '@/api/format';

export const CATEGORY_URL = { brokers: '/forex-brokers', exchanges: '/crypto-exchanges', prop: '/prop-firms' } as const;
export const CATEGORY_LABEL = { brokers: 'بروکرهای فارکس', exchanges: 'صرافی‌های رمزارز', prop: 'پراپ‌فرم‌ها' } as const;

export function HomeSection({ id, title, desc, action, alt, children }: { id: string; title: string; desc: string; action?: ReactNode; alt?: boolean; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-t`} className={`nt-home-sec${alt ? ' nt-home-sec--alt' : ''}`}><div className="nt-container">
    <header className="nt-home-head"><div><h2 id={`${id}-t`}>{title}</h2><p>{desc}</p></div>{action}</header>
    {children}
  </div></section>;
}
export function HomeEmpty({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return <div className="nt-home-empty" role="status"><ShieldAlert aria-hidden="true"/><div><strong>{title}</strong><p>{text}</p>{children && <div className="nt-home-empty-links">{children}</div>}</div></div>;
}
const attrv = (p: PlatformDetail, re: RegExp) => p.key_attributes.find(a => re.test(a.label));
/** Compact public platform card. Only renders recorded values; unknowns are labelled, never zero. */
export function HomePlatformCard({ p, compared, onCompare }: { p: PlatformDetail; compared: boolean; onCompare: () => void }) {
  const dep = attrv(p, /حداقل/); const fee = attrv(p, /کارمزد|اسپرد/);
  const verified = p.iran_access.evidence.verified_at;
  return <article className="nt-hp-card">
    <div className="nt-hp-card-top"><span className="nt-hp-logo" aria-hidden="true">{p.name_fa.slice(0, 1)}</span><div><h3>{p.name_fa}</h3><span>{p.category_fa}</span></div></div>
    <ul className="nt-hp-facts">
      <li><span>وضعیت تأیید</span><b className={p.coverage_level === 'full_review' ? 'is-ok' : 'is-warn'}>{p.coverage_level === 'full_review' ? <><ShieldCheck aria-hidden="true"/>بررسی کامل</> : 'در دست بررسی'}</b></li>
      <li><span>دسترسی از ایران</span><b className="is-warn">{p.iran_access.status === 'unknown' ? 'تأیید نشده' : p.iran_access.status}</b></li>
      <li><span>{dep?.label ?? 'حداقل ورود'}</span><b>{dep?.value_status === 'known' && dep.value ? persianValue(dep.value) : 'اعلام نشده'}</b></li>
      <li><span>{fee?.label ?? 'کارمزد'}</span><b>{fee?.value_status === 'known' && fee.value ? persianValue(fee.value) : 'اعلام نشده'}</b></li>
    </ul>
    <p className="nt-hp-date"><Clock aria-hidden="true"/>آخرین کنترل: {verified ? persianDate(verified) : 'ثبت نشده'}</p>
    <div className="nt-hp-actions"><Link to={`${CATEGORY_URL[p.category]}/$slug` as '/forex-brokers/$slug'} params={{ slug: p.slug }} className="nt-btn nt-btn--secondary nt-btn--sm">مطالعهٔ بررسی</Link><button type="button" className="nt-btn nt-btn--tertiary nt-btn--sm" aria-pressed={compared} onClick={onCompare}>{compared ? 'در فهرست مقایسه' : 'افزودن به مقایسه'}</button></div>
  </article>;
}
export function Tabs<T extends string>({ value, onChange, items, label }: { value: T; onChange: (v: T) => void; items: readonly (readonly [T, string])[]; label: string }) {
  return <div className="nt-home-tabs" role="tablist" aria-label={label}>{items.map(([id, t]) => <button key={id} type="button" role="tab" aria-selected={value === id} className={value === id ? 'is-on' : ''} onClick={() => onChange(id)}>{t}</button>)}</div>;
}
