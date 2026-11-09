import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ComponentBadgeStatus, ComponentButton } from '@/ds';
import { changes, type ChangeRecord } from '@/api/public-content';
import type { AttributeValueView } from '@/api/types';
import { persianDate } from '@/api/format';
import { Attribute, EmptyState } from './Primitives';
export function SpecificationTable({ attributes }: { attributes:AttributeValueView[] }) {
  return attributes.length?<dl className="nt-spec-table">{attributes.map(a=><div key={a.label}><dt>{a.label}</dt><dd><Attribute attribute={a}/></dd></div>)}</dl>:<EmptyState title="مشخصات این بخش منتشر نشده است"/>;
}
export function ChangeTimeline({ records }: { records:ChangeRecord[] }) {
  if (!records.length) return <EmptyState title="تغییر تأییدشده‌ای ثبت نشده است"/>;
  return <ol className="nt-change-timeline">{[...records].sort((a,b)=>b.changed_at.localeCompare(a.changed_at)).map(c=><li key={c.slug}><p className="nt-caption">{persianDate(c.changed_at)} · تأیید: {persianDate(c.verified_at)}</p><h3>{c.attribute}</h3><dl className="nt-change-values"><div><dt>مقدار پیشین</dt><dd>{c.previous??'اعلام نشده'}</dd></div><div><dt>مقدار جدید</dt><dd>{c.current??'اعلام نشده'}</dd></div></dl><p>{c.evidence.source_name} · {c.evidence.is_stale?'نیازمند بازبینی':c.evidence.claim_origin==='independent'?'تأیید مستقل':'اعلامی پلتفرم'}</p>{c.evidence.source_url&&<a href={c.evidence.source_url} rel="noopener noreferrer" target="_blank">منبع</a>}<Link to="/alerts/$slug" params={{slug:c.slug}}>جزئیات تغییر</Link></li>)}</ol>;
}
export function PlatformHistory({ platformId }: { platformId:string }) { return <ChangeTimeline records={changes.filter(c=>c.platform_id===platformId)}/>; }
export function UserReviewPanel() {
  const [feedback,setFeedback] = useState('');
  return <section className="nt-stack"><ComponentBadgeStatus tone="neutral" label="نظر کاربران، جدا از ارزیابی تحریریه"/><EmptyState title="تجربهٔ تأییدشده‌ای منتشر نشده است"/>
    <form className="nt-form" onSubmit={e=>e.preventDefault()}><label htmlFor="user-feedback">تجربهٔ مکتوب شما<textarea id="user-feedback" className="nt-input" value={feedback} onChange={e=>setFeedback(e.target.value)} maxLength={3000}/></label><p className="nt-caption">اطلاعات حساب، رمز یا مدارک هویتی ننویسید. نظرها پس از بررسی منتشر می‌شوند و خودکار بر امتیاز تحریریه اثر ندارند.</p><ComponentButton disabled iconLeading="ComponentIconInfo">ارسال نظر در دسترس نیست</ComponentButton><p role="status" className="nt-caption">ورود و سرویس ثبت و تعدیل نظرها متصل نیست؛ متن ارسال یا ذخیره نمی‌شود.</p></form>
    <details className="nt-category-faq"><summary>قواعد انتشار و گزارش نظر نامناسب</summary><p>نظر باید تجربهٔ مرتبط و قابل بررسی باشد؛ ادعای بدون شواهد، محتوای توهین‌آمیز و اطلاعات خصوصی نباید منتشر شود. فعلاً نظر منتشرشده یا سرویس گزارش نظر وجود ندارد.</p><Link to="/editorial-policy">سیاست تحریریه</Link><Link to="/alerts/report">بررسی فرم گزارش اطلاعات نادرست</Link></details></section>;
}