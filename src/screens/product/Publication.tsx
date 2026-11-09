import { Link } from '@tanstack/react-router';
import { ComponentButton, ComponentPaginationItem } from '@/ds';
import { PageHead, KIcon } from '../Shared';
import { EmptyState } from './Primitives';
import { ResearchAside } from './Discovery';
import { articles, terms, LEARN_TOPICS, topicTitle } from '@/api/public-content';
import { usePublicSearch } from '@/lib/public-search';
import { ArticleLink } from './ContentParts';
export function PublicationScreen({go,title,kind,topic}:{go:(id:string)=>void;title:string;kind:string;topic?:string}) {
  const {search,update}=usePublicSearch(); const q=search.q??'', filter=topic??search.topic??'';
  const glossary=kind==='glossary';
  const found=articles.filter(a=>(kind==='topic'||kind==='learn'?a.kind==='learn':a.kind===kind)&&(!filter||a.topic===filter)&&(!q||`${a.title} ${a.summary}`.includes(q))).sort((a,b)=>b.published_at.localeCompare(a.published_at));
  const glossaryResults=terms.filter(t=>(!q||`${t.title} ${t.definition}`.includes(q))&&(!search.letter||t.title.startsWith(search.letter))).sort((a,b)=>a.title.localeCompare(b.title,'fa'));
  const count=glossary?glossaryResults.length:found.length,pages=Math.max(1,Math.ceil(count/6)),page=Math.max(1,Math.min(pages,Math.floor(search.page??1)));
  const feature=found[0];
  return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},...(topic?[{label:'مرکز آموزش',id:'learn'}]:[]),title]} title={title} desc={kind==='news'?'رویدادهای مرتبط با پلتفرم‌ها؛ با منبع اصلی، تاریخ انتشار و وضعیت به‌روزرسانی.':glossary?'تعریف‌های مالی منتشرشده، موضوعات مرتبط و منابع آموزشی.':'آموزش و پژوهش مالی، مستقل از روابط تجاری و با منابع روشن.'}/><div className="nt-container nt-section nt-publication-layout"><div className="nt-stack">
    {!glossary&&<nav className="nt-publication-topics" aria-label="موضوعات آموزش">{LEARN_TOPICS.map(([slug,label])=><Link to="/learn/$topic" params={{topic:slug}} key={slug} aria-current={topic===slug?'page':undefined}>{label}</Link>)}</nav>}
    <div className="nt-listing-toolbar"><label className="nt-listing-search"><KIcon name="Search" size={20}/><span className="nt-visually-hidden">جستجو در {title}</span><input value={q} onChange={e=>update({q:e.target.value,page:1})} placeholder={glossary?'جستجوی واژه یا تعریف…':'عنوان یا موضوع مطلب…'}/></label>{!glossary&&!topic&&<label className="nt-label">موضوع<select className="nt-input" value={filter} onChange={e=>update({topic:e.target.value,page:1})}><option value="">همه</option>{LEARN_TOPICS.map(([id,label])=><option value={id} key={id}>{label}</option>)}</select></label>}</div>
    {glossary&&<div className="nt-alphabet" role="group" aria-label="حروف واژه‌نامه"><ComponentButton type="tertiary" onClick={()=>update({letter:'',page:1})} aria-pressed={!search.letter}>همه</ComponentButton>{'آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی'.split('').map(letter=><ComponentButton key={letter} type="tertiary" onClick={()=>update({letter,page:1})} aria-pressed={search.letter===letter}>{letter}</ComponentButton>)}</div>}
    {feature&&!q&&!filter&&page===1&&<section><h2 className="nt-h3">مطلب منتخب</h2><ArticleLink article={feature}/></section>}
    <div className="nt-split"><h2 className="nt-h3">{glossary?'واژه‌ها':topic?topicTitle(topic):kind==='news'?'آخرین خبرها':'آخرین مطالب'}</h2><p role="status" className="nt-caption">{count.toLocaleString('fa-IR')} {glossary?'واژه':'مطلب'} منتشرشده</p></div>
    {count?glossary?glossaryResults.slice((page-1)*6,page*6).map(t=><article className="nt-content-item" key={t.slug}><Link to="/glossary/$term" params={{term:t.slug}}><h3>{t.title}</h3><p>{t.definition}</p></Link></article>):found.slice((page-1)*6,page*6).map(a=><ArticleLink article={a} key={a.slug}/>):<EmptyState title={q||filter||search.letter?'نتیجه‌ای با این شرایط پیدا نشد':glossary?'تعریف تأییدشده منتشر نشده است':kind==='news'?'خبر تأییدشده منتشر نشده است':'مطلب تأییدشده منتشر نشده است'} text="نویسنده، منبع و تاریخ انتشار ساختگی نمایش داده نمی‌شود."/>}
    {pages>1&&<nav className="nt-pager" aria-label="صفحه‌بندی مطالب"><ComponentPaginationItem label="قبلی" disabled={page===1} onClick={()=>update({page:page-1})}/><span>{page.toLocaleString('fa-IR')} از {pages.toLocaleString('fa-IR')}</span><ComponentPaginationItem label="بعدی" disabled={page===pages} onClick={()=>update({page:page+1})}/></nav>}
    <nav className="nt-page-category-links" aria-label="مطالعهٔ بیشتر"><Link to="/learn">مرکز آموزش</Link><Link to="/glossary">واژه‌نامه</Link><Link to="/blog">مجله</Link><Link to="/news">اخبار</Link><Link to="/editorial-policy">سیاست تحریریه</Link></nav></div><ResearchAside/></div></main>;
}
