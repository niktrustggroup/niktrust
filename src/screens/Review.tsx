import { ComponentButton, ComponentRatingBadge, ComponentBadgeStatus, ComponentAccordionSection } from '@/ds';
import { useCatalog } from '@/api/client';
import { PageHead } from './Shared';
import { Attribute, EmptyState, SampleNotice } from './product/Primitives';
import { persianDate } from '@/api/format';
export function ReviewScreen({ go, compare, toggleCompare, id = 'a' }: { go: (id: string, arg?: string) => void; compare: string[]; toggleCompare: (id: string) => void; id?: string }) {
  const p = useCatalog().platforms.find(p => p.id === id || p.slug === id);
  if (!p) return <main className="nt-container nt-section"><EmptyState title="پلتفرم پیدا نشد" action={<ComponentButton onClick={() => go('home')}>بازگشت به صفحهٔ اصلی</ComponentButton>}/></main>;
  return <main><PageHead go={go} crumbs={[{ label:'نیک‌تراست',id:'home' }, { label:p.category_fa,id:p.category },p.name_fa]} title={p.name_fa + ' — بررسی'} desc={p.summary_fa}/>
    <div className="nt-container nt-section"><SampleNotice/><div className="nt-grid nt-product-grid"><aside className="nt-lg-col-4 nt-stack"><div className="nt-card nt-stack"><h2 className="nt-h4">خلاصهٔ ارزیابی</h2><ComponentRatingBadge state="empty"/><p className="nt-body-sm">امتیاز تا انتشار نسخهٔ روش و تأیید نهایی نمایش داده نمی‌شود.</p><ComponentButton onClick={() => compare.includes(p.id) ? go('compare') : toggleCompare(p.id)} iconLeading="ComponentIconDiff">{compare.includes(p.id) ? 'مشاهدهٔ مقایسه' : 'افزودن به مقایسه'}</ComponentButton><ComponentButton type="tertiary" onClick={() => go('method')}>روش ارزیابی</ComponentButton></div>
    <div className="nt-note nt-note--caution"><span>دسترسی از ایران: نامشخص<br/>سطح اطمینان: نامشخص<br/>منبع: دادهٔ نمایشی<br/>تاریخ: {persianDate(p.updated_at)}</span></div></aside>
    <div className="nt-lg-col-8 nt-stack"><section><h2 className="nt-h3">مشخصات کلیدی</h2>{p.key_attributes.map(a => <div className="nt-specification" key={a.label}><span className="nt-label">{a.label}</span><Attribute attribute={a}/></div>)}</section>
    <ComponentAccordionSection title="مزایا و محدودیت‌ها" state="expanded"><p className="nt-body">مزایا یا محدودیت‌های تأییدشده برای این پروفایل منتشر نشده است.</p></ComponentAccordionSection>
    <ComponentAccordionSection title="مجوز، شخص حقوقی و رگولاتوری" state="collapsed"><EmptyState title="اطلاعات تأییدشده در دسترس نیست" text="نام نهاد ناظر، شمارهٔ مجوز و شخص حقوقی اعلام نشده است."/></ComponentAccordionSection>
    <ComponentAccordionSection title={p.category === 'prop' ? 'قوانین چالش و پرداخت سود' : p.category === 'exchanges' ? 'کارمزدها و امنیت برداشت' : 'حساب‌ها، هزینه‌ها و شرایط معاملاتی'} state="collapsed"><p className="nt-body">جزئیات فراتر از مشخصات نمایشی بالا اعلام نشده است؛ از تعمیم اطلاعات پلتفرم دیگر خودداری می‌شود.</p></ComponentAccordionSection>
    <section><h2 className="nt-h3">تجربهٔ کاربران</h2><ComponentBadgeStatus tone="neutral" label="مجزا از ارزیابی نیک‌تراست"/><EmptyState title="تجربهٔ تأییدشده‌ای ثبت نشده است" action={<ComponentButton type="secondary" onClick={() => go('login')}>ورود برای ثبت تجربه</ComponentButton>}/></section>
    <ComponentAccordionSection title="تاریخچهٔ تغییرات" state="collapsed"><p className="nt-body">تغییر تأییدشده‌ای ثبت نشده است.</p></ComponentAccordionSection>
    <section><h2 className="nt-h3">منابع و آخرین بازبینی</h2><p className="nt-body">منبع مشخصات: کیت نمایشی نیک‌تراست، نه یک نهاد ناظر یا پژوهش مستقل. تاریخ آماده‌سازی این نسخه: {persianDate(p.updated_at)}.</p><p className="nt-body-sm">نویسنده و بررسی‌کنندهٔ واقعی: اعلام نشده.</p></section></div></div></div></main>;
}