import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ComponentBadgeStatus, ComponentButton } from '@/ds';
import { usePublicPlatforms } from '@/api/client';
import { REPORT_TYPES } from '@/api/discovery';
import { changes } from '@/api/public-content';
import { usePublicSearch } from '@/lib/public-search';
import { ChangeTimeline } from './ReviewParts';
import { persianDate } from '@/api/format';
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
  const {search,update} = usePublicSearch(); const q = search.q??initialQuery; const setQ=(q:string)=>update({q}); const { platforms } = usePublicPlatforms(); const found = filterPlatforms(platforms,q);
  return <main><PageHead go={go} title={check ? 'استعلام پلتفرم' : 'جستجو در نیک‌تراست'} desc={check ? 'این جستجو فقط اطلاعات منتشرشدهٔ نیک‌تراست را پیدا می‌کند؛ هویت، مجوز یا امنیت یک پلتفرم را تضمین نمی‌کند. وجود نام یا نبودن هشدار، به معنی تأیید اعتبار نیست.' : 'پروفایل‌ها، دسته‌ها و صفحات اعتماد'}/><div className="nt-container nt-section nt-stack"><label className="nt-label" htmlFor="global-q">نام یا عبارت جستجو</label><input id="global-q" className="nt-input" value={q} onChange={e => setQ(e.target.value)} placeholder="حداقل دو نویسه…" autoFocus/>
  {q.trim().length < 2 ? <EmptyState title="حداقل دو نویسه وارد کنید"/> : <>{found.length ? found.map(p => <PlatformCard key={p.id} platform={p} go={go} compare={compare} toggleCompare={toggleCompare}/>) : <EmptyState title="نامی با این عبارت پیدا نشد" text="نام ناشناخته به معنی ایمن یا متقلب بودن نیست." action={<ComponentButton type="secondary" onClick={() => go('report')}>گزارش پلتفرم ناشناخته</ComponentButton>}/>}</>}
  {!check && <section><h2 className="nt-h3">صفحات مرتبط</h2><div className="nt-cluster">{[{to:'/forex-brokers',title:'بروکرهای فارکس'},{to:'/crypto-exchanges',title:'صرافی‌های رمزارز'},{to:'/prop-firms',title:'پراپ‌فرم‌ها'},{to:'/methodology',title:'روش ارزیابی'},{to:'/learn',title:'آموزش'}].filter(x => !q || x.title.includes(q)).map(x => <Link key={x.to} to={x.to}>{x.title}</Link>)}</div></section>}</div></main>;
}
export function FinderScreen(p: Props) {
  return <main><PageHead go={p.go} title="انتخاب هدایت‌شده" desc="تطبیق شفاف با قواعد ثبت‌شده؛ بدون توصیهٔ سرمایه‌گذاری یا رتبه‌بندی تجاری."/><PlatformFinderWizard compare={p.compare} toggleCompare={p.toggleCompare}/></main>;
}
export function ReportScreen({ go }: Pick<Props,'go'>) {
  const [name,setName]=useState(''),[body,setBody]=useState(''),[email,setEmail]=useState(''),[kind,setKind]=useState<string>(REPORT_TYPES[0]),[source,setSource]=useState(''),[message,setMessage]=useState('');
  function validate() {
    if(!name.trim()){setMessage('نام پلتفرم را وارد کنید.');return;}
    if(!validateReport(body)){setMessage('شرح گزارش باید بین ۴۰ تا ۳۰۰۰ نویسه باشد.');return;}
    if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setMessage('ایمیل معتبر نیست.');return;}
    if(source){try{const u=new URL(source);if(!['http:','https:'].includes(u.protocol))throw new Error();}catch{setMessage('نشانی منبع باید یک پیوند معتبر وب باشد.');return;}}
    setMessage('فرم معتبر است؛ ارسال نشده است. سرویس دریافت گزارش هنوز متصل نیست.');
  }
  return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},{label:'تغییرات و هشدارها',id:'alerts'},'گزارش پلتفرم']} title="گزارش یک پلتفرم" desc="گزارش کاربر، ادعاست و پس از بررسی شواهد می‌تواند منتشر شود."/><div className="nt-container nt-section nt-stack"><div className="nt-note nt-note--caution">هیچ گزارشی ارسال یا ذخیره نمی‌شود؛ سرویس دریافت گزارش متصل نیست.</div><form className="nt-form" onSubmit={e=>{e.preventDefault();validate();}}><label>نام پلتفرم<input className="nt-input" value={name} onChange={e=>setName(e.target.value)} maxLength={200}/></label><label>نوع گزارش<select className="nt-input" value={kind} onChange={e=>setKind(e.target.value)}>{REPORT_TYPES.map(t=><option key={t}>{t}</option>)}</select></label><label>شرح گزارش<textarea className="nt-input" value={body} onChange={e=>setBody(e.target.value)} maxLength={3000}/></label><label>نشانی منبع (اختیاری)<input className="nt-input" dir="ltr" value={source} onChange={e=>setSource(e.target.value)} placeholder="https://"/></label><label>ایمیل (اختیاری)<input className="nt-input" dir="ltr" value={email} onChange={e=>setEmail(e.target.value)}/></label><p className="nt-caption">اطلاعات حساب مالی، رمز یا مدارک هویتی وارد نکنید.</p><ComponentButton onClick={validate}>بررسی اعتبار فرم</ComponentButton><ComponentButton disabled>ارسال گزارش در دسترس نیست</ComponentButton>{message&&<p className="nt-report-status" role="status">{message}</p>}</form></div></main>;
}
export function AlertsScreen({go,detail=false,slug}:{go:Props['go'];detail?:boolean;slug?:string}) {
  const {search,update}=usePublicSearch();const type=search.type??'';const {platforms}=usePublicPlatforms();
  const valid=changes.filter(c=>platforms.some(p=>p.id===c.platform_id));
  const found=valid.filter(c=>!type||c.type===type).sort((a,b)=>b.changed_at.localeCompare(a.changed_at));
  const record=detail?valid.find(c=>c.slug===slug):undefined;
  const types=['تغییر واریز','تغییر برداشت','تغییر کارمزد','شرایط معامله','مشخصات حساب','محدودیت دسترسی','اطلاعات رگولاتوری','اصلاح مهم'];
  return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},...(detail?[{label:'تغییرات و هشدارها',id:'alerts'}]:[]),detail?'جزئیات تغییر':'تغییرات و هشدارها']} title={record?.title??(detail?'تغییر عمومی موجود نیست':'تغییرات پلتفرم‌ها و هشدارها')} desc="تغییرات منبع‌دار، با تاریخ رویداد و بررسی؛ نه ادعاهای تأییدنشده."/><div className="nt-container nt-section nt-stack">
  {!detail&&<label className="nt-label">نوع تغییر<select className="nt-input" value={type} onChange={e=>update({type:e.target.value})}><option value="">همه</option>{types.map(t=><option key={t}>{t}</option>)}</select></label>}
  {detail&&record?<><p>{record.explanation}</p><ChangeTimeline records={[record]}/><ComponentButton type="secondary" onClick={()=>go('review',record.platform_id)}>بررسی پلتفرم مرتبط</ComponentButton></>:!detail&&found.length?found.map(c=><article className="nt-source-record" key={c.slug}><p className="nt-caption">{platforms.find(p=>p.id===c.platform_id)?.name_fa} · {c.type} · رویداد: {persianDate(c.changed_at)} · بررسی: {persianDate(c.verified_at)}</p><Link to="/alerts/$slug" params={{slug:c.slug}}><h2 className="nt-h3">{c.title}</h2></Link><p>{c.explanation}</p><p>{c.evidence.source_name}</p><ComponentButton type="tertiary" onClick={()=>go('review',c.platform_id)}>پروفایل مرتبط</ComponentButton></article>):<EmptyState title={detail?'رکورد عمومی این تغییر موجود نیست':'تغییر تأییدشده‌ای منتشر نشده است'} text="نبودن هشدار به معنی امنیت پلتفرم نیست."/>}
  <nav className="nt-page-category-links"><Link to="/check">جستجو و استعلام پلتفرم</Link><Link to="/alerts/report">گزارش اطلاعات نادرست</Link><Link to="/alerts">همهٔ تغییرات</Link></nav></div></main>;
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
  const title = calculator ? (known ? `ماشین‌حساب ${CALC_LIST.find(c => c.k === known)?.title}` : 'ماشین‌حساب پیدا نشد') : 'ابزارها و ماشین‌حساب‌ها';
  return <main><PageHead go={go} title={title} desc="ماشین‌حساب‌های آموزشی با فرمول و فرض‌های اعلام‌شده؛ همهٔ ورودی‌ها را خودت وارد می‌کنی و دادهٔ بازار فرض نمی‌شود."/><div className="nt-container nt-section nt-stack">
    {calculator && !known ? <EmptyState title="این ماشین‌حساب وجود ندارد" text="از فهرست زیر یکی از ماشین‌حساب‌های موجود را انتخاب کن."/> : null}
    {!calculator && <nav aria-label="ماشین‌حساب‌ها" className="nt-cluster">{CALC_LIST.map(c => <Link key={c.slug} to="/tools/$calculator" params={{ calculator: c.slug }}>{c.title}</Link>)}</nav>}
    {(!calculator || known) && <><Tabs label="ماشین‌حساب" value={id} onChange={setId} items={CALC_LIST.map(c => [c.k, c.title] as const)}/><CalculatorCard key={id} id={id}/></>}
    {calculator && <Link to="/tools">همهٔ ماشین‌حساب‌ها</Link>}
  </div></main>;
}