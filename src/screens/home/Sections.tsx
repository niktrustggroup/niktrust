import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Landmark, Receipt, Globe2, FileSearch, Check, X, HelpCircle, Bookmark, GitCompare, Bell, LayoutDashboard } from 'lucide-react';
import type { Category } from '@/api/types';
import { usePublicPlatforms } from '@/api/client';
import { canCompare, matchPlatforms, type FinderAnswers } from '@/api/rules';
import { persianDate, persianValue } from '@/api/format';
import { CATEGORY_LABEL, CATEGORY_URL, HomeEmpty, HomePlatformCard, HomeSection, Tabs } from './HomeParts';

type Props = { compare: string[]; toggleCompare: (id: string) => void };
const CATS = [['brokers', 'بروکرهای فارکس'], ['exchanges', 'صرافی‌های رمزارز'], ['prop', 'پراپ‌فرم‌ها']] as const;
const NO_PUBLIC = 'هنوز هیچ پلتفرمی با منبع و تاریخ کنترل تأییدشده منتشر نشده است. پروفایل‌های نمایشی (ساختگی) عمداً در پیشنهادها، مقایسه و بررسی‌های منتخب نمایش داده نمی‌شوند.';

/* 02 */
export function ExplorePlatforms({ compare, toggleCompare }: Props) {
  const { platforms } = usePublicPlatforms(); const [cat, setCat] = useState<Category>('brokers');
  const list = platforms.filter(p => p.category === cat).slice(0, 4);
  return <HomeSection id="explore" title="پلتفرم‌های مالی را بشناس" desc="پروفایل‌ها بر اساس دسته؛ ترتیب نمایش رتبه‌بندی تجاری یا توصیهٔ سرمایه‌گذاری نیست." action={<Link className="nt-home-more" to={CATEGORY_URL[cat]}>فهرست کامل {CATEGORY_LABEL[cat]} ←</Link>}>
    <Tabs label="دستهٔ پلتفرم" value={cat} onChange={setCat} items={CATS}/>
    {list.length ? <div className="nt-hp-grid">{list.map(p => <HomePlatformCard key={p.id} p={p} compared={compare.includes(p.id)} onCompare={() => toggleCompare(p.id)}/>)}</div>
      : <HomeEmpty title={`پروفایل تأییدشده‌ای در «${CATEGORY_LABEL[cat]}» منتشر نشده است`} text={NO_PUBLIC}><Link to={CATEGORY_URL[cat]}>مشاهدهٔ فهرست دسته</Link><Link to="/methodology">معیار انتشار پروفایل</Link></HomeEmpty>}
  </HomeSection>;
}

/* 03 */
const STEPS = ['بازار', 'تجربه', 'سرمایه', 'واریز و برداشت', 'اولویت‌ها'];
const METHODS = ['کارت بانکی', 'تتر (USDT)', 'انتقال بانکی بین‌المللی', 'کیف پول الکترونیکی'];
const PRIORITIES = ['کارمزد پایین', 'واریز و برداشت آسان', 'اطلاعات مجوز و رگولاتوری', 'اعتبار پلتفرم', 'شرایط معاملاتی', 'پشتیبانی'];
export function PlatformFinderWizard({ compare, toggleCompare }: Props) {
  const { platforms } = usePublicPlatforms();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<FinderAnswers>({ category: '', experience: '', capitalUsd: null, methods: [], priorities: [] });
  const [capital, setCapital] = useState('');
  const done = step === STEPS.length;
  const results = useMemo(() => done ? matchPlatforms(platforms, a) : [], [done, platforms, a]);
  const toggle = (k: 'methods' | 'priorities', v: string) => setA(s => ({ ...s, [k]: s[k].includes(v) ? s[k].filter(x => x !== v) : [...s[k], v] }));
  const canNext = step === 0 ? !!a.category : step === 1 ? !!a.experience : true;
  const radio = (k: 'category' | 'experience', items: readonly (readonly [string, string])[]) => <div className="nt-finder-opts" role="radiogroup">{items.map(([v, t]) => <label key={v} className={a[k] === v ? 'is-on' : ''}><input type="radio" name={k} checked={a[k] === v} onChange={() => setA(s => ({ ...s, [k]: v }))}/>{t}</label>)}</div>;
  const checks = (k: 'methods' | 'priorities', items: string[]) => <div className="nt-finder-opts">{items.map(v => <label key={v} className={a[k].includes(v) ? 'is-on' : ''}><input type="checkbox" checked={a[k].includes(v)} onChange={() => toggle(k, v)}/>{v}</label>)}</div>;
  return <HomeSection id="finder" alt title="پلتفرم مناسب خودت را پیدا کن" desc="با پاسخ به چند سؤال، گزینه‌هایی را پیدا کن که با نیازها و اولویت‌های تو سازگارتر هستند.">
    <div className="nt-finder">
      <ol className="nt-finder-progress" aria-label="مراحل">{[...STEPS, 'نتیجه'].map((s, i) => <li key={s} className={i < step ? 'is-done' : i === step ? 'is-on' : ''} aria-current={i === step ? 'step' : undefined}><span>{(i + 1).toLocaleString('fa-IR')}</span>{s}</li>)}</ol>
      {!done ? <fieldset className="nt-finder-step"><legend>{['به کدام بازار علاقه داری؟', 'سطح تجربه‌ات چیست؟', 'سرمایهٔ اولیهٔ تقریبی‌ات چقدر است؟', 'کدام روش‌های واریز و برداشت برایت مهم است؟', 'کدام عوامل برایت مهم‌ترند؟'][step]}</legend>
        {step === 0 && radio('category', CATS)}
        {step === 1 && <>{radio('experience', [['beginner', 'مبتدی'], ['intermediate', 'متوسط'], ['advanced', 'حرفه‌ای']])}<p className="nt-finder-hint">سطح تجربه در تطبیق استفاده نمی‌شود، چون مناسب بودن پلتفرم برای سطح تجربه در داده‌ها ثبت نشده است.</p></>}
        {step === 2 && <label className="nt-finder-field">سرمایه به دلار آمریکا (اختیاری)<input className="nt-input" inputMode="decimal" dir="ltr" value={capital} onChange={e => { setCapital(e.target.value); const n = Number(e.target.value.replace(/[,٬]/g, '')); setA(s => ({ ...s, capitalUsd: e.target.value.trim() && Number.isFinite(n) && n > 0 ? n : null })); }} placeholder="500"/>{capital.trim() && a.capitalUsd === null && <span role="alert" className="nt-finder-err">عدد مثبت وارد کن.</span>}</label>}
        {step === 3 && checks('methods', METHODS)}
        {step === 4 && checks('priorities', PRIORITIES)}
      </fieldset> : <div className="nt-finder-results" aria-live="polite">
        <h3>نتیجهٔ تطبیق</h3>
        <p className="nt-finder-hint">قواعد تطبیق: هم‌دسته بودن، حداقل ورود ثبت‌شده در برابر سرمایهٔ تو، و دادهٔ ثبت‌شده برای اولویت‌ها. همکاری تجاری و کمیسیون ارجاع هرگز در تطبیق استفاده نمی‌شود.</p>
        {results.length ? results.map(r => <article key={r.platform.id} className="nt-finder-result"><div className="nt-finder-result-head"><h4>{r.platform.name_fa}</h4><button type="button" className="nt-btn nt-btn--tertiary nt-btn--sm" aria-pressed={compare.includes(r.platform.id)} onClick={() => toggleCompare(r.platform.id)}>{compare.includes(r.platform.id) ? 'در فهرست مقایسه' : 'افزودن به مقایسه'}</button></div>
          <ul>{r.criteria.map(c => <li key={c.label} className={`is-${c.state}`}>{c.state === 'match' ? <Check aria-hidden="true"/> : c.state === 'mismatch' ? <X aria-hidden="true"/> : <HelpCircle aria-hidden="true"/>}<b>{c.label}</b><span>{c.note}</span></li>)}</ul></article>)
          : <HomeEmpty title="پلتفرم سازگاری پیدا نشد" text={platforms.length ? 'هیچ پلتفرم منتشرشده‌ای با پاسخ‌های تو سازگار نیست؛ حداقل ورود ثبت‌شده بیشتر از سرمایهٔ تو بود یا در این دسته پلتفرمی منتشر نشده است.' : NO_PUBLIC}><Link to="/methodology">روش ارزیابی</Link></HomeEmpty>}
      </div>}
      <div className="nt-finder-nav">
        {step > 0 && <button type="button" className="nt-btn nt-btn--secondary" onClick={() => setStep(s => s - 1)}>مرحلهٔ قبل</button>}
        {!done ? <button type="button" className="nt-btn nt-btn--primary" disabled={!canNext} onClick={() => setStep(s => s + 1)}>{step === STEPS.length - 1 ? 'مشاهدهٔ نتیجه' : 'مرحلهٔ بعد'}</button>
          : <><button type="button" className="nt-btn nt-btn--tertiary" onClick={() => { setStep(0); setCapital(''); setA({ category: '', experience: '', capitalUsd: null, methods: [], priorities: [] }); }}>شروع دوباره</button>{compare.length >= 2 && <Link className="nt-btn nt-btn--primary" to="/compare">مقایسهٔ انتخاب‌ها</Link>}</>}
      </div>
    </div>
  </HomeSection>;
}

/* 04 */
const FIELDS = ['دسته', 'مجوز و رگولاتوری', 'دسترسی از ایران', 'حداقل واریز', 'روش‌های واریز', 'روش‌های برداشت', 'کارمزد معاملات', 'اسپرد', 'بازارهای قابل معامله', 'انواع حساب', 'پلتفرم معاملاتی', 'پشتیبانی', 'آخرین کنترل اطلاعات'];
export function QuickComparison({ compare, toggleCompare }: Props) {
  const { platforms } = usePublicPlatforms(); const [cat, setCat] = useState<Category>('brokers');
  const cols = compare.flatMap(id => platforms.find(p => p.id === id) ?? []);
  const options = platforms.filter(p => p.category === cat && !compare.includes(p.id));
  const cell = (p: (typeof cols)[number], f: string) => {
    if (f === 'دسته') return p.category_fa;
    if (f === 'دسترسی از ایران') return p.iran_access.status === 'unknown' ? null : p.iran_access.status;
    if (f === 'آخرین کنترل اطلاعات') return p.iran_access.evidence.verified_at ? persianDate(p.iran_access.evidence.verified_at) : null;
    const a = p.key_attributes.find(x => x.label.includes(f) || f.includes(x.label.replace(' از', '')));
    return a?.value_status === 'known' && a.value ? persianValue(a.value) : null;
  };
  const rows = FIELDS.map(f => ({ f, v: cols.map(p => cell(p, f)) }));
  return <HomeSection id="quick-compare" title="پلتفرم‌ها را کنار هم مقایسه کن" desc="تفاوت شرایط، هزینه‌ها و امکانات را پیش از انتخاب بررسی کن." action={<Link className="nt-home-more" to="/compare">صفحهٔ کامل مقایسه ←</Link>}>
    <div className="nt-qc-picker"><Tabs label="دستهٔ مقایسه" value={cat} onChange={setCat} items={CATS}/>
      <label className="nt-qc-select"><span className="nt-visually-hidden">افزودن پلتفرم</span><select className="nt-input" value="" disabled={!options.length || compare.length >= 4} onChange={e => e.target.value && toggleCompare(e.target.value)}><option value="">{options.length ? 'افزودن پلتفرم (۲ تا ۴)…' : 'پلتفرم منتشرشده‌ای در این دسته نیست'}</option>{options.map(p => <option key={p.id} value={p.id}>{p.name_fa}</option>)}</select></label></div>
    {canCompare(cols) ? <div className="nt-table-wrap"><table className="nt-data-table nt-qc-table"><thead><tr><th scope="col">ویژگی</th>{cols.map(p => <th key={p.id} scope="col">{p.name_fa}<button type="button" aria-label={`حذف ${p.name_fa}`} onClick={() => toggleCompare(p.id)}>×</button></th>)}</tr></thead>
      <tbody>{rows.map(r => <tr key={r.f} className={new Set(r.v).size > 1 ? 'is-diff' : ''}><th scope="row">{r.f}</th>{r.v.map((v, i) => <td key={i} className={v ? '' : 'is-missing'}>{v ?? 'ثبت نشده'}</td>)}</tr>)}</tbody></table><p className="nt-finder-hint">ردیف‌های پررنگ تفاوت دارند. «ثبت نشده» یعنی داده‌ای با منبع برای آن ویژگی وجود ندارد؛ نه صفر و نه مثبت.</p></div>
      : <HomeEmpty title={cols.length ? 'دو تا چهار پلتفرم هم‌دسته انتخاب کن' : 'پلتفرمی برای مقایسه انتخاب نشده است'} text={platforms.length ? 'از فهرست بالا دست‌کم دو پلتفرم از یک دسته را اضافه کن.' : NO_PUBLIC}><Link to="/compare">صفحهٔ مقایسه</Link></HomeEmpty>}
  </HomeSection>;
}

/* Return user */
export function ReturnUserPanel() {
  const items = [[Bookmark, 'پلتفرم‌های ذخیره‌شده', '/account/watchlist'], [GitCompare, 'مقایسه‌های ذخیره‌شده', '/account/saved'], [Bell, 'اعلان تغییرات', '/account/notifications'], [LayoutDashboard, 'داشبورد شخصی', '/account']] as const;
  return <aside className="nt-container nt-return" aria-label="امکانات حساب کاربری"><div><strong>پیگیری شخصی</strong><p>ذخیره، اعلان و داشبورد به سرویس حساب کاربری نیاز دارند که هنوز متصل نیست؛ چیزی ذخیره یا ارسال نمی‌شود.</p></div><nav>{items.map(([I, t, to]) => <Link key={to} to={to}><I aria-hidden="true"/>{t}<span>به‌زودی</span></Link>)}</nav></aside>;
}

/* 06 */
export function PlatformUpdates() {
  return <HomeSection id="updates" alt title="آخرین تغییرات پلتفرم‌ها" desc="تغییرات مهم در شرایط، خدمات و اطلاعات پلتفرم‌ها را دنبال کن." action={<Link className="nt-home-more" to="/alerts">مرکز هشدارها و تغییرات ←</Link>}>
    <div className="nt-upd-legend" aria-label="راهنمای برچسب‌ها"><span className="is-ok">تأییدشده</span><span className="is-review">در دست بررسی</span><span className="is-warn">تأییدنشده</span><span className="is-fix">اصلاح‌شده</span></div>
    <HomeEmpty title="تغییر ثبت‌شده‌ای منتشر نشده است" text="هر تغییر تنها با منبع، مقدار قبلی و جدید و تاریخ کنترل منتشر می‌شود. پایش خودکار وجود ندارد و تغییری فرض نمی‌شود."><Link to="/corrections">سیاست اصلاحات</Link><Link to="/alerts/report">گزارش تغییر یا مشکل</Link></HomeEmpty>
  </HomeSection>;
}

/* 07 */
export function FeaturedReviews() {
  const { platforms } = usePublicPlatforms(); const reviews = platforms.filter(p => p.coverage_level === 'full_review').slice(0, 3);
  return <HomeSection id="reviews" title="بررسی‌های تخصصی نیک‌تراست" desc="بررسی دقیق شرایط، خدمات، هزینه‌ها و محدودیت‌های پلتفرم‌های مالی.">
    {reviews.length ? <div className="nt-hp-grid">{reviews.map(p => <article key={p.id} className="nt-review-card"><span className="nt-hp-logo" aria-hidden="true">{p.name_fa.slice(0, 1)}</span><h3>{p.name_fa}</h3><span className="nt-caption">{p.category_fa} · به‌روزرسانی {persianDate(p.updated_at)}</span><p>{p.summary_fa}</p><Link to={`${CATEGORY_URL[p.category]}/$slug` as '/forex-brokers/$slug'} params={{ slug: p.slug }}>مطالعهٔ بررسی کامل ←</Link></article>)}</div>
      : <HomeEmpty title="بررسی تخصصی منتشرشده‌ای وجود ندارد" text="بررسی‌ها پس از کنترل منابع و تأیید تحریریه منتشر می‌شوند. امتیاز عددی تا تصویب روش امتیازدهی نمایش داده نمی‌شود."><Link to="/methodology">روش ارزیابی</Link><Link to="/editorial-policy">سیاست تحریریه</Link></HomeEmpty>}
    <p className="nt-finder-hint">انتخاب بررسی‌ها تحریریه‌ای است؛ جایگاه‌های تجاری همیشه جدا و با برچسب «همکاری تجاری» نمایش داده می‌شوند.</p>
  </HomeSection>;
}

/* 09 */
export function ResearchEducation() {
  const links = [['/learn', 'مرکز آموزش مالی'], ['/glossary', 'واژه‌نامهٔ مالی'], ['/tools', 'ابزارها و ماشین‌حساب‌ها'], ['/blog', 'راهنماهای آموزشی'], ['/editorial-policy', 'سیاست تحریریه']] as const;
  return <HomeSection id="research" alt title="پژوهش، آموزش و تحلیل" desc="از شناخت مفاهیم مالی تا بررسی بازارها و تصمیم‌گیری آگاهانه.">
    <div className="nt-research-grid">
      <HomeEmpty title="مقالهٔ منتخبی منتشر نشده است" text="مقاله‌ها با تاریخ انتشار، زمان مطالعه و نویسنده پس از تأیید تحریریه نمایش داده می‌شوند؛ مقالهٔ نمونه یا تاریخ فرضی ساخته نمی‌شود."><Link to="/blog">مجلهٔ نیک‌تراست</Link></HomeEmpty>
      <section className="nt-research-col"><h3>اخبار و تحلیل اخیر</h3><p className="nt-finder-hint">خبر یا تحلیل تأییدشده‌ای هنوز منتشر نشده است.</p><Link to="/news">اتاق خبر ←</Link><Link to="/markets">نمای کلی بازار ←</Link></section>
      <section className="nt-research-col"><h3>آموزش</h3>{links.map(([to, t]) => <Link key={to} to={to}>{t} ←</Link>)}</section>
    </div>
  </HomeSection>;
}

/* 10 */
export function TrustMethodology() {
  const dims = [[Landmark, 'مجوز و شخص حقوقی', 'شخص حقوقی، اطلاعات مجوز و طرف قرارداد را بررسی می‌کنیم.'], [Receipt, 'هزینه‌های واقعی', 'کارمزد، اسپرد، هزینهٔ برداشت و سایر هزینه‌های مرتبط را می‌سنجیم.'], [Globe2, 'دسترسی از ایران', 'محدودیت‌های دسترسی، روش‌های پرداخت و ارائهٔ خدمات به کاربران ایرانی را مرور می‌کنیم.'], [FileSearch, 'منبع و بازبینی', 'منبع اطلاعات، وضعیت تأیید و سابقهٔ بازبینی را نمایش می‌دهیم.']] as const;
  const links = [['/methodology', 'روش ارزیابی'], ['/editorial-policy', 'سیاست تحریریه'], ['/disclosure', 'افشای روابط تجاری'], ['/corrections', 'سیاست اصلاحات'], ['/how-we-make-money', 'مدل درآمد'], ['/about', 'دربارهٔ نیک‌تراست']] as const;
  return <HomeSection id="trust" title="پیش از انتخاب پلتفرم، چه چیزهایی را بررسی می‌کنیم؟" desc="چهار محور ثابت ارزیابی؛ جزئیات هر محور در مستندات روش ارزیابی آمده است.">
    <div className="nt-trust-dims">{dims.map(([I, t, d]) => <article key={t}><I aria-hidden="true"/><h3>{t}</h3><p>{d}</p><Link to="/methodology">مستندات روش ←</Link></article>)}</div>
    <nav className="nt-trust-links" aria-label="شفافیت">{links.map(([to, t]) => <Link key={to} to={to}>{t}</Link>)}</nav>
  </HomeSection>;
}
