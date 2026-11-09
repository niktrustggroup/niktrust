import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ComponentButton } from '@/ds';
import { PageHead } from '../Shared';
import { terms, articlePath, topicTitle, type ArticleRecord, type TermRecord } from '@/api/public-content';
import { canonicalUrl } from '@/lib/seo-policy';
import { persianDate } from '@/api/format';
import { RelatedArticles } from './ContentParts';
import { usePublicPlatforms } from '@/api/client';
import { PlatformRow } from './Discovery';
export function ArticleScreen({article:a,go}:{article:ArticleRecord;go:(id:string,arg?:string)=>void}) {
  const [share,setShare]=useState(''); const {platforms}=usePublicPlatforms();
  const url=canonicalUrl(articlePath(a));
  async function copy(){try {if(navigator.share)await navigator.share({title:a.title,url});else {await navigator.clipboard.writeText(url);setShare('پیوند کپی شد.');}}catch {setShare('اشتراک‌گذاری انجام نشد.');}}
  return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},{label:a.kind==='news'?'اخبار':a.kind==='blog'?'مجله':'مرکز آموزش',id:a.kind},a.title]} title={a.title} desc={a.summary}/><div className="nt-container nt-section nt-article-layout"><article>
    <div className="nt-article-meta">{topicTitle(a.topic)} · {a.kind==='news'?'خبر':a.kind==='blog'?'مقالهٔ مجله':'راهنمای آموزشی'} · {a.author??'نویسنده اعلام نشده'} · انتشار: {persianDate(a.published_at)}{a.updated_at&&` · به‌روزرسانی: ${persianDate(a.updated_at)}`}{a.reading_minutes!==null&&` · ${a.reading_minutes.toLocaleString('fa-IR')} دقیقه مطالعه`}</div>
    {a.image&&<img src={a.image} alt={a.image_alt}/>}
    <nav className="nt-article-toc" aria-label="فهرست مطلب">{a.sections.map(s=><a href={'#'+s.id} key={s.id}>{s.title}</a>)}</nav>
    {a.sections.map(s=><section id={s.id} key={s.id}><h2>{s.title}</h2>{s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</section>)}
    <section><h2>منابع و مراجع</h2>{a.sources.map((s,i)=><div className="nt-source-record" key={i}><p>{s.source_name} · {persianDate(s.verified_at)} · {s.is_stale?'نیازمند بازبینی':s.claim_origin==='independent'?'مستقل':'اعلامی'}</p>{s.source_url&&<a href={s.source_url} target="_blank" rel="noopener noreferrer">منبع اصلی</a>}</div>)}</section>
    <ComponentButton type="secondary" iconLeading="ComponentIconCopy" onClick={copy}>اشتراک‌گذاری</ComponentButton>{share&&<p role="status">{share}</p>}
    <RelatedArticles topic={a.topic} exclude={a.slug}/>{platforms.filter(p=>a.platform_ids.includes(p.id)).map(p=><PlatformRow platform={p} go={go} key={p.id}/>)}</article><aside className="nt-review-toc"><h2>در این مطلب</h2>{a.sections.map(s=><a key={s.id} href={'#'+s.id}>{s.title}</a>)}<Link to="/editorial-policy">سیاست تحریریه</Link></aside></div></main>;
}
export function TermScreen({term:t,go}:{term:TermRecord;go:(id:string)=>void}) {return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},{label:'واژه‌نامه',id:'glossary'},t.title]} title={t.title} desc={t.definition}/><div className="nt-container nt-section nt-stack"><p className="nt-body-lg">{t.definition}</p><h2 className="nt-h3">واژه‌های مرتبط</h2>{terms.filter(x=>t.related_terms.includes(x.slug)).map(x=><Link to="/glossary/$term" params={{term:x.slug}} key={x.slug}>{x.title}</Link>)}<RelatedArticles/><Link to="/glossary">همهٔ واژه‌ها</Link></div></main>;}
