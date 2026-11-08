import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ComponentButton } from '@/ds';
import { PageHead, KIcon } from '../Shared';
import { EmptyState } from './Primitives';
import { ResearchAside } from './Discovery';
import researchDesk from '@/assets/research-desk.jpg';
export function PublicationScreen({go,title,kind,topic}:{go:(id:string)=>void;title:string;kind:string;topic?:string}) {
  const [filter,setFilter]=useState('همه'),[q,setQ]=useState('');
  const news=kind==='news'; const article=kind==='article'||kind==='term';
  const topics=news?['همه','فارکس','رمزارز','پراپ‌فرم','رگولاتوری']:['همه','انتخاب پلتفرم','هزینه و ریسک','مجوز و امنیت','مفاهیم مالی'];
  return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},title]} title={title} desc={news?'خبر، تحلیل و هشدار؛ با منبع روشن و تاریخ انتشار.':'شناخت مفاهیم، هزینه‌ها و شواهد پیش از انتخاب پلتفرم.'}/><div className="nt-container nt-section">
    {article?<div className="nt-article-layout"><article><p className="nt-overline">{kind==='term'?'واژه‌نامهٔ مالی':'مرکز آموزش'}</p><div className="nt-article-meta">وضعیت: منتشر نشده · نویسنده، بازبین و تاریخ: اعلام نشده</div><EmptyState title="محتوای تأییدشدهٔ این صفحه در دسترس نیست" text="مقاله یا تعریف نهایی هنوز منتشر نشده است؛ داده، نقل‌قول یا نویسنده‌ای فرض نمی‌شود."/><p><Link to="/learn">بازگشت به مرکز آموزش</Link></p><h2>معیارهای انتشار</h2><p>منبع، تاریخ و مرز میان ادعا و تأیید مستقل باید در محتوای منتشرشده روشن باشد.</p><Link to="/editorial-policy">سیاست تحریریهٔ نیک‌تراست</Link></article><ResearchAside/></div>:
    <div className="nt-publication-layout"><div><div className="nt-publication-topics" role="group" aria-label={news?'دستهٔ اخبار':'موضوع آموزش'}>{topics.map(t=><ComponentButton key={t} type="tertiary" aria-pressed={filter===t} onClick={()=>setFilter(t)}>{t}</ComponentButton>)}</div>
      <div className="nt-publication-feature"><img src={researchDesk} width={1200} height={768} alt="میز پژوهش با دفتر یادداشت و گزارش‌های مقایسه"/><div><span className="nt-overline">چارچوب پژوهش مستقل</span><h2>از اطلاعات تا تصمیم آگاهانه</h2><p>منبع هر ادعا، تاریخ بازبینی و محدودیت‌های داده را بررسی کنید. شناخت روش، بخشی از شناخت نتیجه است.</p><Link to="/methodology" className="nt-btn nt-btn--secondary">مطالعهٔ روش ارزیابی <KIcon name="ArrowStart" size={16}/></Link></div></div>
      <div className="nt-publication-heading"><h2>{topic?'مطالب این موضوع':news?'آخرین اخبار و تحلیل‌ها':'مطالب و راهنماها'}</h2><span className="nt-caption">{filter}</span></div><label className="nt-listing-search"><KIcon name="Search" size={20}/><span className="nt-visually-hidden">جستجو در {title}</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder={news?'جستجو در اخبار…':'جستجوی موضوع یا مفهوم…'}/></label><div className="nt-section"><EmptyState title={q.trim()?`مطلبی برای «${q.trim()}» یافت نشد`:news?'خبر یا تحلیل تأییدشده‌ای منتشر نشده است':'محتوای آموزشی تأییدشده هنوز منتشر نشده است'} text="منبع، نویسنده و تاریخ ساختگی به‌عنوان محتوای واقعی نمایش داده نمی‌شود."/></div>
      <nav className="nt-page-category-links" aria-label="مطالعهٔ بیشتر"><Link to="/learn">مرکز آموزش</Link><Link to="/glossary">واژه‌نامه</Link><Link to="/news">اخبار و تحلیل</Link><Link to="/editorial-policy">سیاست تحریریه</Link></nav></div><ResearchAside/></div>}
  </div></main>;
}