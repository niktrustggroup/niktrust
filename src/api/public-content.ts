/** Frontend publication view models, NOT a replacement Day04 API contract.
 * No approved editorial/update/history companion exists in the supplied sources.
 * Keep these collections empty until genuine published records are supplied.
 */
import type { EvidenceSummary } from './types';
export const LEARN_TOPICS = [
  ['forex','فارکس'], ['cryptocurrency','رمزارز'], ['prop-trading','پراپ‌تریدینگ'], ['trading-platforms','پلتفرم‌های معاملاتی'], ['financial-risk','ریسک مالی'], ['trading-costs','هزینه‌های معامله'], ['financial-tools','ابزارهای مالی'], ['market-fundamentals','مبانی بازار'],
] as const;
export type ArticleRecord = { slug: string; topic: string; kind: 'blog'|'news'|'learn'; title: string; summary: string; author: string | null; published_at: string; updated_at: string | null; reading_minutes: number | null; image: string | null; image_alt: string; sections: { id: string; title: string; paragraphs: string[] }[]; sources: EvidenceSummary[]; platform_ids: string[] };
export type TermRecord = { slug: string; title: string; definition: string; related_terms: string[]; article_slugs: string[] };
export type ChangeRecord = { slug: string; platform_id: string; type: string; title: string; explanation: string; changed_at: string; verified_at: string | null; attribute: string; previous: string | null; current: string | null; evidence: EvidenceSummary };
export const articles: ArticleRecord[] = [];
export const terms: TermRecord[] = [];
export const changes: ChangeRecord[] = [];
export const topicTitle = (id: string) => LEARN_TOPICS.find(([slug]) => slug === id)?.[1];
export const articlePath = (a: ArticleRecord) => a.kind === 'news' ? `/news/${a.slug}` : a.kind === 'blog' ? `/blog/${a.slug}` : `/learn/${a.topic}/${a.slug}`;