import { useEffect, useRef, useState } from 'react';
import { ComponentButton, ComponentFilterPanel, ComponentFilterPanelGroup, ComponentFilterPanelOption, ComponentPaginationItem } from '@/ds';
import { PageHead, KIcon } from './Shared';
import { Link } from '@tanstack/react-router';
import { DueDiligenceSteps } from './product/Discovery';
import { usePublicPlatforms } from '@/api/client';
import { CATEGORY_INFO, directoryResults, filterOptions, parseFilters, verifiedDate } from '@/api/discovery';
import { usePublicSearch } from '@/lib/public-search';
import type { Category } from '@/api/types';
import { EmptyState, PlatformCard } from './product/Primitives';
import { RelatedArticles } from './product/ContentParts';
export function ListingScreen({ go, compare, toggleCompare, title = 'بروکرهای فارکس', desc, category = 'brokers', region }: { go: (id: string, arg?: string) => void; compare: string[]; toggleCompare: (id: string) => void; title?: string; desc?: string; category?: Category; region?: string }) {
  const { platforms } = usePublicPlatforms();
  const { search, update } = usePublicSearch();
  const [sheet, setSheet] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLSpanElement>(null);
  const source = platforms.filter(p => p.category === category && (!region || p.exchange_region === region));
  const query = search.q ?? '', coverage = search.coverage ?? '', sort = search.sort ?? 'name', selected = parseFilters(search.filters), selectedRegion = search.region ?? '';
  const options = filterOptions(source);
  const results = directoryResults(source, query, coverage, sort, selected, selectedRegion);
  const pages = Math.max(1, Math.ceil(results.length / 6));
  const page = Math.max(1, Math.min(pages, Math.floor(search.page ?? 1)));
  const active = [query ? `جستجو: ${query}` : '', coverage ? 'سطح پوشش انتخاب‌شده' : '', selectedRegion ? (selectedRegion === 'iranian' ? 'صرافی ایرانی' : 'صرافی بین‌المللی') : '', ...selected.map(f => `${f.label}: ${f.value}`)].filter(Boolean);
  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>('button,input,select')?.focus();
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheet(false);
      if (e.key === 'Tab') { const items = dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input, select'); if (!items?.length) return; const first=items[0], last=items[items.length-1]; if (e.shiftKey && document.activeElement === first) {e.preventDefault();last?.focus();} else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first?.focus();} }
    };
    document.addEventListener('keydown', close);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', close); trigger.current?.querySelector<HTMLElement>('button')?.focus(); };
  }, [sheet]);
  const clear = () => update({q:'',coverage:'',filters:'',region:'',page:1});
  const choose = (label:string,value:string) => update({filters:JSON.stringify(value ? [...selected.filter(f=>f.label!==label),{label,value}] : selected.filter(f=>f.label!==label)),page:1});
  const groups = <>
    <ComponentFilterPanelGroup title="سطح پوشش اطلاعات">{[['','همه'],['full_review','بررسی کامل'],['basic_profile','پروفایل پایه'],['identified','اطلاعات محدود']].map(([value,label])=><ComponentFilterPanelOption key={label} name={sheet?'mobile-coverage':'coverage'} control="radio" label={label} count={false} checked={coverage===value} onChange={()=>update({coverage:value,page:1})}/>)}</ComponentFilterPanelGroup>
    {category==='exchanges' && source.some(p=>p.exchange_region) && <ComponentFilterPanelGroup title="حوزهٔ صرافی">{[['','همه'],['iranian','ایرانی'],['international','بین‌المللی']].map(([value,label])=><ComponentFilterPanelOption key={label} name="region" control="radio" label={label} count={false} checked={selectedRegion===value} onChange={()=>update({region:value,page:1})}/>)}</ComponentFilterPanelGroup>}
    {options.map(o=><ComponentFilterPanelGroup title={o.label} key={o.label}><label className="nt-label">{o.label}<select className="nt-input" value={selected.find(f=>f.label===o.label)?.value??''} onChange={e=>choose(o.label,e.target.value)}><option value="">همه</option>{o.values.map(v=><option key={v}>{v}</option>)}</select></label></ComponentFilterPanelGroup>)}
    {!options.length && <p className="nt-caption">برای فیلتر مشخصات، هنوز دادهٔ تأییدشده‌ای منتشر نشده است.</p>}
  </>;
  const info = CATEGORY_INFO[category];
  const featured = source.filter(p=>p.coverage_level==='full_review').sort((a,b)=>a.name_fa.localeCompare(b.name_fa,'fa')).slice(0,3);
  return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},title]} title={title} desc={desc}/>
    <section className="nt-container nt-section nt-stack"><p className="nt-body-lg nt-measure">{info.intro}</p><nav className="nt-page-category-links" aria-label="مسیرهای این دسته"><a href="#directory">فهرست کامل</a><Link to="/compare">مقایسهٔ پلتفرم‌ها</Link><Link to="/methodology/$category" params={{category}}>روش ارزیابی این دسته</Link><Link to="/learn/$topic" params={{topic:info.topic}}>آموزش مرتبط</Link><a href="#category-faq">پرسش‌های متداول</a></nav>
    <section><h2 className="nt-h3">معیارهای بررسی {title}</h2><ul className="nt-criteria-grid">{info.criteria.map(c=><li key={c}><KIcon name="Info" size={16}/>{c}</li>)}</ul><p className="nt-caption">این‌ها محورهای بررسی‌اند؛ فقط مشخصات موجود همراه منبع در پروفایل نمایش داده می‌شوند. مجوز به معنی تضمین امنیت نیست.</p></section>
    <section><h2 className="nt-h3">پروفایل‌های با بررسی کامل</h2>{featured.length?<div className="nt-listing-results">{featured.map(p=><PlatformCard key={p.id} platform={p} go={go} compare={compare} toggleCompare={toggleCompare}/>)}</div>:<EmptyState title="پروفایل عمومی با بررسی کامل منتشر نشده است"/>}<p className="nt-caption">انتخاب بر اساس سطح پوشش و ترتیب الفبایی است؛ رتبه‌بندی یا پیشنهاد تجاری نیست.</p></section></section>
    <section className="nt-container nt-section" id="directory"><h2 className="nt-h2">فهرست {title}</h2><div className="nt-listing-layout"><aside className="nt-listing-sidebar"><ComponentFilterPanel state={active.length?'filtered':'default'} active={active} onClear={clear}>{groups}</ComponentFilterPanel><div className="nt-listing-info"><h3>فهرست، به معنی تأیید نیست</h3><p>سطح پوشش با اعتبار پلتفرم یکسان نیست. ادعای اعلامی و تأیید مستقل جدا هستند.</p><Link to="/methodology">روش ارزیابی</Link></div></aside>
    <div className="nt-stack"><div className="nt-listing-toolbar"><label className="nt-listing-search" htmlFor="listing-search"><KIcon name="Search" size={20}/><span className="nt-visually-hidden">جستجو در {title}</span><input id="listing-search" value={query} onChange={e=>update({q:e.target.value,page:1})} placeholder="نام یا مشخصات پلتفرم…"/></label><label className="nt-label">مرتب‌سازی<select className="nt-input" value={sort} onChange={e=>update({sort:e.target.value,page:1})}><option value="name">الفبایی</option>{source.length>0&&<option value="updated">آخرین به‌روزرسانی</option>}{source.some(p=>verifiedDate(p))&&<option value="verified">آخرین تأیید مستقل</option>}{options.filter(o=>/حداقل واریز|هزینهٔ چالش|کارمزد|هدف سود|افت سرمایه|تقسیم سود/.test(o.label)&&o.values.every(v=>/^\s*[$€]?\s*[\d.,٬]+\s*(%|USD|دلار)?\s*$/.test(v))).map(o=><option key={o.label} value={'numeric:'+o.label}>{o.label} (کم به زیاد، واحد یکسان)</option>)}</select></label></div>
    <div className="nt-split"><p className="nt-body-sm" role="status">{results.length.toLocaleString('fa-IR')} پلتفرم عمومی · {active.length.toLocaleString('fa-IR')} فیلتر فعال</p><span className="k-below-desk" ref={trigger}><ComponentButton type="secondary" iconLeading="ComponentIconLayers" onClick={()=>setSheet(true)}>فیلترها</ComponentButton></span></div>
    {!!active.length&&<div className="nt-cluster">{active.map(a=><span className="nt-caption" key={a}>{a}</span>)}<ComponentButton type="tertiary" size="sm" onClick={clear}>پاک کردن همهٔ فیلترها</ComponentButton></div>}
    <div className="nt-listing-results">{results.length?results.slice((page-1)*6,page*6).map(p=><PlatformCard key={p.id} platform={p} go={go} compare={compare} toggleCompare={toggleCompare}/>):<EmptyState title={source.length?'پلتفرمی با این شرایط پیدا نشد':'پلتفرم عمومی منتشر نشده است'} text={source.length?'شرایط جستجو را تغییر دهید.':'رکوردهای نمایشی در فهرست عمومی نمایش داده نمی‌شوند.'} action={active.length?<ComponentButton type="secondary" onClick={clear}>پاک کردن فیلترها</ComponentButton>:undefined}/>}</div>
    {pages>1&&<nav className="nt-pager" aria-label="صفحه‌بندی"><ComponentPaginationItem label="قبلی" disabled={page===1} onClick={()=>update({page:page-1})}/>{Array.from({length:pages},(_,i)=><ComponentPaginationItem key={i} label={(i+1).toLocaleString('fa-IR')} state={page===i+1?'current':'default'} onClick={()=>update({page:i+1})}/>)}<ComponentPaginationItem label="بعدی" disabled={page===pages} onClick={()=>update({page:page+1})}/></nav>}
    <nav className="nt-page-category-links"><Link to="/finder">انتخاب هدایت‌شده</Link><Link to="/compare">مقایسهٔ انتخاب‌ها</Link><Link to="/alerts">تغییرات و هشدارها</Link></nav></div></div></section>
    {sheet&&<div ref={dialog} className="nt-scrim" role="dialog" aria-modal="true" aria-label="فیلترهای فهرست" onClick={e=>{if(e.target===e.currentTarget)setSheet(false);}}><ComponentFilterPanel device="mobile" active={active} state={active.length?'filtered':'default'} resultCount={results.length.toLocaleString('fa-IR')} onClose={()=>setSheet(false)} onApply={()=>setSheet(false)} onClear={clear}>{groups}</ComponentFilterPanel></div>}
    <section className="nt-container nt-section"><h2 className="nt-h3">پیش از انتخاب</h2><DueDiligenceSteps/></section>
    <section className="nt-container nt-section" id="category-faq"><h2 className="nt-h3">پرسش‌های متداول</h2>{[{q:'آیا وجود نام در فهرست به معنی تأیید اعتبار است؟',a:'خیر. نیک‌تراست بروکر یا صرافی نیست و توصیهٔ سرمایه‌گذاری ارائه نمی‌دهد.'},{q:'دادهٔ «اعلام نشده» یعنی چه؟',a:'اطلاعات منتشر نشده یا قابل تأیید نبوده است؛ دادهٔ ناموجود با صفر نمایش داده نمی‌شود.'},{q:'آیا رابطهٔ تجاری بر ترتیب اثر دارد؟',a:'لینک‌های همکاری باید برچسب داشته باشند و از ارزیابی و ترتیب نتایج مستقل باشند.'}].map(f=><details className="nt-category-faq" key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}<Link to="/faq">همهٔ پرسش‌ها</Link></section>
    <section className="nt-container nt-section"><RelatedArticles topic={info.topic}/></section>
  </main>;
}
