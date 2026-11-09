import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ComponentBadgeStatus, ComponentButton } from '@/ds';
import { useCatalog } from '@/api/client';
import { filterPlatforms, validateReport } from '@/api/rules';
import { PageHead } from '../Shared';
import { PlatformFinderWizard } from '../home/Sections';
import { CalculatorCard, CALC_LIST, CALC_SLUGS, type K as CalcKey } from '../home/Calculators';
import { Tabs } from '../home/HomeParts';
import { MarketOverview } from './MarketWidgets';
import { EmptyState, PlatformCard, PlatformSearch, SampleNotice, ServiceUnavailable } from './Primitives';
import type { Category } from '@/api/types';
type Props = { go: (id: string, arg?: string) => void; compare: string[]; toggleCompare: (id: string) => void };
export function SearchScreen({ go, compare, toggleCompare, initialQuery = '', check = false }: Props & { initialQuery?: string; check?: boolean }) {
  const [q, setQ] = useState(initialQuery); const { platforms } = useCatalog(); const found = filterPlatforms(platforms,q);
  return <main><PageHead go={go} title={check ? 'استعلام پلتفرم' : 'جستجو در نیک‌تراست'} desc={check ? 'وجود نام در فهرست یا نبودن هشدار، به معنی تأیید اعتبار نیست.' : 'پروفایل‌ها، دسته‌ها و صفحات اعتماد'}/><div className="nt-container nt-section nt-stack"><label className="nt-label" htmlFor="global-q">نام یا عبارت جستجو</label><input id="global-q" className="nt-input" value={q} onChange={e => setQ(e.target.value)} placeholder="حداقل دو نویسه…" autoFocus/>
  {q.trim().length < 2 ? <EmptyState title="حداقل دو نویسه وارد کنید"/> : <><SampleNotice/>{found.length ? found.map(p => <PlatformCard key={p.id} platform={p} go={go} compare={compare} toggleCompare={toggleCompare}/>) : <EmptyState title="نامی با این عبارت پیدا نشد" text="نام ناشناخته به معنی ایمن یا متقلب بودن نیست." action={<ComponentButton type="secondary" onClick={() => go('report')}>گزارش پلتفرم ناشناخته</ComponentButton>}/>}</>}
  {!check && <section><h2 className="nt-h3">صفحات مرتبط</h2><div className="nt-cluster">{[{to:'/forex-brokers',title:'بروکرهای فارکس'},{to:'/crypto-exchanges',title:'صرافی‌های رمزارز'},{to:'/prop-firms',title:'پراپ‌فرم‌ها'},{to:'/methodology',title:'روش ارزیابی'},{to:'/learn',title:'آموزش'}].filter(x => !q || x.title.includes(q)).map(x => <Link key={x.to} to={x.to}>{x.title}</Link>)}</div></section>}</div></main>;
}
export function FinderScreen(p: Props) {
  return <main><PageHead go={p.go} title="انتخاب هدایت‌شده" desc="تطبیق شفاف با قواعد ثبت‌شده؛ بدون توصیهٔ سرمایه‌گذاری یا رتبه‌بندی تجاری."/><PlatformFinderWizard compare={p.compare} toggleCompare={p.toggleCompare}/></main>;
}
export function ReportScreen({ go }: Pick<Props,'go'>) {
  const [name,setName] = useState('');const [body,setBody] = useState('');const [email,setEmail] = useState('');const [message,setMessage] = useState('');
  function validate() { if (!name.trim()) { setMessage('نام پلتفرم را وارد کنید.');return; } if (!validateReport(body)) { setMessage('شرح گزارش باید بین ۴۰ تا ۳۰۰۰ نویسه باشد.');return; } if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMessage('ایمیل معتبر نیست.');return; } setMessage('فرم معتبر است؛ ارسال نشده است. سرویس دریافت گزارش هنوز متصل نیست.'); }
  return <main><PageHead go={go} title="گزارش یک پلتفرم" desc="گزارش کاربر، ادعاست و پس از بررسی شواهد می‌تواند منتشر شود."/><div className="nt-container nt-section"><div className="nt-note nt-note--caution">این فرم تنها اعتبارسنجی می‌شود؛ هیچ گزارشی ارسال یا ذخیره نمی‌شود.</div><form className="nt-form nt-product-grid" onSubmit={e => { e.preventDefault();validate(); }}><label>نام پلتفرم<input className="nt-input" value={name} onChange={e => setName(e.target.value)}/></label><label>شرح گزارش<textarea className="nt-input" value={body} onChange={e => setBody(e.target.value)} maxLength={3000}/></label><label>ایمیل اختیاری<input type="email" className="nt-input" dir="ltr" value={email} onChange={e => setEmail(e.target.value)}/></label><p className="nt-caption">اطلاعات حساب مالی، رمز یا مدارک هویتی وارد نکنید.</p><ComponentButton onClick={validate}>بررسی فرم</ComponentButton>{message && <p className="nt-body-sm" role="status">{message}</p>}</form></div></main>;
}
export function AlertsScreen({ go, detail = false }: { go: Props['go']; detail?: boolean }) {
  const [type,setType]=useState('all');
  return <main><PageHead go={go} title={detail ? 'جزئیات هشدار' : 'هشدارها و ریسک‌های بالا'} desc="هشدارهای منبع‌دار، با تاریخ و وضعیت بررسی؛ نه ادعاهای تأییدنشده."/><div className="nt-container nt-section nt-stack">{!detail && <label className="nt-label">نوع هشدار<select className="nt-input" value={type} onChange={e => setType(e.target.value)}><option value="all">همه</option><option value="regulation">مجوز و رگولاتوری</option><option value="withdrawal">مشکلات برداشت</option></select></label>}<EmptyState title="سرویس هشدارهای واقعی متصل نیست" text="هیچ نتیجه‌ای دربارهٔ امنیت یک پلتفرم از این وضعیت برداشت نکنید."/><div className="nt-cluster"><ComponentButton type="secondary" onClick={() => go('check')}>استعلام پلتفرم</ComponentButton><ComponentButton type="tertiary" onClick={() => go('report')}>گزارش یک مشکل</ComponentButton></div></div></main>;
}
export function MarketScreen({ go, terminal = false, symbol }: { go: Props['go']; terminal?: boolean; symbol?: string }) {
  if (!terminal && !symbol) return <main><PageHead go={go} title="نمای کلی بازار" desc="نمودار و قیمت‌ها را TradingView نمایش می‌دهد؛ نیک‌تراست قیمتی تولید یا ذخیره نمی‌کند."/>
    <div className="nt-container nt-section nt-stack"><div className="nt-note nt-note--caution">دادهٔ این صفحه از ابزارهای عمومی TradingView می‌آید و برای برخی بازارها با تأخیر است؛ لحظه‌ای بودن آن تضمین نمی‌شود. نرخ‌ها به دلار است، نه تومان، و توصیهٔ معاملاتی نیست.</div></div>
    <MarketOverview full/></main>;
  const [market,setMarket]=useState('forex');const [time,setTime]=useState('1D');
  return <main><PageHead go={go} title={terminal ? 'ترمینال تحلیلی' : symbol ? `نمای نماد ${symbol}` : 'نمای کلی بازار'} desc="دادهٔ بازار همراه نوع داده، زمان آخرین مقدار و تأمین‌کننده نمایش داده می‌شود."/><div className="nt-container nt-section nt-stack"><div className="nt-note nt-note--caution">وضعیت داده: در دسترس نیست · تأمین‌کننده: اعلام نشده · زمان آخرین قیمت: اعلام نشده</div><div className="nt-cluster"><label className="nt-label">بازار<select className="nt-input" value={market} onChange={e => setMarket(e.target.value)}><option value="forex">فارکس</option><option value="crypto">رمزارز</option><option value="gold">طلا</option></select></label>{terminal && <label className="nt-label">بازهٔ زمانی<select className="nt-input" value={time} onChange={e => setTime(e.target.value)}>{['1H','4H','1D','1W'].map(t => <option key={t}>{t}</option>)}</select></label>}<ComponentButton type="secondary" onClick={() => go(terminal ? 'markets' : 'terminal')}>{terminal ? 'نمای بازار' : 'ترمینال تحلیلی'}</ComponentButton></div>
  {terminal ? <div className="nt-terminal"><EmptyState title="نمودار در دسترس نیست" text="بدون دادهٔ دارای مجوز، قیمت یا کندل نمایش داده نمی‌شود."/></div> : <div className="nt-table-wrap"><table className="nt-data-table"><caption className="nt-visually-hidden">وضعیت دادهٔ بازار</caption><thead><tr><th>نماد</th><th>آخرین قیمت</th><th>تغییر</th><th>منبع و زمان</th></tr></thead><tbody><tr><td colSpan={4}>اطلاعات بازار {market === 'forex' ? 'فارکس' : market === 'crypto' ? 'رمزارز' : 'طلا'} متصل نیست.</td></tr></tbody></table></div>}
  <section><h2 className="nt-h3">واچ‌لیست</h2><EmptyState title="برای فهرست شخصی، ورود لازم است" action={<ComponentButton type="secondary" onClick={() => go('login')}>ورود به حساب</ComponentButton>}/></section></div></main>;
}
export function CalculatorsScreen({ go, calculator }: { go: Props['go']; calculator?: string }) {
  const known = calculator ? CALC_SLUGS[calculator] : undefined;
  const [id, setId] = useState<CalcKey>(known ?? 'position');
  const title = calculator ? (known ? `ماشین‌حساب ${CALC_LIST.find(c => c.k === known)!.title}` : 'ماشین‌حساب پیدا نشد') : 'ابزارها و ماشین‌حساب‌ها';
  return <main><PageHead go={go} title={title} desc="ماشین‌حساب‌های آموزشی با فرمول و فرض‌های اعلام‌شده؛ همهٔ ورودی‌ها را خودت وارد می‌کنی و دادهٔ بازار فرض نمی‌شود."/><div className="nt-container nt-section nt-stack">
    {calculator && !known ? <EmptyState title="این ماشین‌حساب وجود ندارد" text="از فهرست زیر یکی از ماشین‌حساب‌های موجود را انتخاب کن."/> : null}
    {!calculator && <nav aria-label="ماشین‌حساب‌ها" className="nt-cluster">{CALC_LIST.map(c => <Link key={c.slug} to="/tools/$calculator" params={{ calculator: c.slug }}>{c.title}</Link>)}</nav>}
    {(!calculator || known) && <><Tabs label="ماشین‌حساب" value={id} onChange={setId} items={CALC_LIST.map(c => [c.k, c.title] as const)}/><CalculatorCard key={id} id={id}/></>}
    {calculator && <Link to="/tools">همهٔ ماشین‌حساب‌ها</Link>}
  </div></main>;
}