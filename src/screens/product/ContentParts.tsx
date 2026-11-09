import { Link } from '@tanstack/react-router';
import { articles, articlePath, type ArticleRecord } from '@/api/public-content';
import { persianDate } from '@/api/format';
import { EmptyState } from './Primitives';
import { usePublicContent } from '@/api/content-client';
export function ArticleLink({ article:a }: { article:ArticleRecord }) {
  const details = <><h3>{a.title}</h3><p>{a.summary}</p><p className="nt-caption">{persianDate(a.published_at)}{a.reading_minutes!==null ? ` · ${a.reading_minutes.toLocaleString('fa-IR')} دقیقه مطالعه` : ''} · {a.kind==='news'?'خبر':a.kind==='blog'?'مجله':'آموزش'}</p></>;
  return <article className="nt-content-item">{a.image&&<img src={a.image} alt={a.image_alt} loading="lazy"/>}{a.kind==='news'?<Link to="/news/$slug" params={{slug:a.slug}}>{details}</Link>:a.kind==='blog'?<Link to="/blog/$slug" params={{slug:a.slug}}>{details}</Link>:<Link to="/learn/$topic/$slug" params={{topic:a.topic,slug:a.slug}}>{details}</Link>}</article>;
}
export function RelatedArticles({ topic, platformId, exclude }: { topic?: string; platformId?: string; exclude?: string }) {
  const {articles} = usePublicContent();
  const related=articles.filter(a=>a.slug!==exclude&&(!topic||a.topic===topic)&&(!platformId||a.platform_ids.includes(platformId))).slice(0,3);
  return <section><h2 className="nt-h3">مطالعهٔ مرتبط</h2>{related.length?related.map(a=><ArticleLink article={a} key={articlePath(a)}/>):<EmptyState title="مطلب مرتبط منتشر نشده است"/>}<Link to="/learn">مرکز آموزش</Link></section>;
}