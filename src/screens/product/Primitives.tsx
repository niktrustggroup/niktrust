import { ComponentBadgeStatus, ComponentButton, ComponentDataCard, Icon } from '@/ds';
import { useCatalog } from '@/api/client';
import { persianDate, persianValue } from '@/api/format';
import { visibleScore } from '@/api/rules';
import type { PlatformDetail, AttributeValueView } from '@/api/types';
import { Link } from '@tanstack/react-router';
export function SampleNotice() { return <div className="nt-sample-notice"><Icon name="ComponentIconInfo" size={16}/><span>پروفایل‌های این نسخه ساختگی‌اند؛ مشخصات صرفاً نمایشی است و هیچ امتیاز یا تأیید واقعی منتشر نشده است.</span></div>; }
export function EmptyState({ title = 'اطلاعاتی ثبت نشده است', text, action }: { title?: string; text?: string; action?: React.ReactNode }) {
  return <div className="nt-empty" role="status"><h2 className="nt-h4">{title}</h2>{text && <p className="nt-body-sm">{text}</p>}{action}</div>;
}
export function Evidence({ attribute }: { attribute: AttributeValueView }) {
  const e = attribute.evidence;
  return <details className="nt-evidence"><summary>منبع و تاریخ{e.is_stale ? ' · نیازمند بازبینی' : ''}</summary><p>{e.source_name} · {persianDate(e.verified_at)}</p><p>منشأ: {e.claim_origin === 'demonstration' ? 'نمونهٔ ساختگی' : e.claim_origin === 'platform' ? 'اعلامی پلتفرم' : 'تأیید مستقل'}</p></details>;
}
export function Attribute({ attribute }: { attribute: AttributeValueView }) {
  return <div className="nt-attribute"><b className="nt-data">{attribute.value_status === 'known' && attribute.value !== null ? <bdi>{persianValue(attribute.value)}</bdi> : attribute.value_status === 'not_applicable' ? 'موضوعیت ندارد' : attribute.value_status === 'in_review' ? 'در حال بررسی' : 'اعلام نشده'}</b><Evidence attribute={attribute}/></div>;
}
export function PlatformCard({ platform, compare, toggleCompare, go }: { platform: PlatformDetail; compare: string[]; toggleCompare: (id: string) => void; go: (id: string, arg?: string) => void }) {
  const p = platform;
  return <ComponentDataCard name={p.name_fa} category={p.category_fa} icon1={p.name_fa.slice(0,1)} score={visibleScore(p.score)} scoreState={visibleScore(p.score) === null ? 'empty' : 'default'} trustState={p.key_attributes.some(a => a.evidence.is_stale) ? 'stale' : 'inreview'} date={persianDate(p.updated_at)} commercialCTA={false}
    badges={[{ tone: 'neutral', label: 'نمونهٔ ساختگی' }, { tone: 'unknown', label: 'دسترسی ایران: نامشخص · اطمینان نامشخص' }]}
    metrics={p.key_attributes.map(a => ({ label: a.label, value: a.value ? persianValue(a.value) : undefined, state: a.value_status === 'known' ? 'default' : 'notdeclared' }))}
    href={`/${p.category === 'brokers' ? 'forex-brokers' : p.category === 'exchanges' ? 'crypto-exchanges' : 'prop-firms'}/${p.slug}`}
    onReview={() => go('review', p.id)} compared={compare.includes(p.id)} onCompare={() => toggleCompare(p.id)}/>;
}
export function PlatformSearch({ query, go }: { query: string; go: (id: string, arg?: string) => void }) {
  const { platforms } = useCatalog();
  const found = platforms.filter(p => p.name_fa.includes(query.trim()));
  return <div className="nt-search-results">{found.length ? found.map(p => <ComponentButton key={p.id} type="tertiary" block onClick={() => go('review', p.id)}>{p.name_fa}</ComponentButton>) : <p className="nt-body-sm" role="status">نتیجه‌ای پیدا نشد؛ نبودن نام در فهرست به معنی تأیید یا رد نیست.</p>}</div>;
}
export function ServiceUnavailable({ title = 'این سرویس متصل نیست' }: { title?: string }) {
  return <EmptyState title={title} text="در این نسخه، دادهٔ شخصی یا نتیجهٔ واقعی دریافت نمی‌شود." action={<Link to="/">بازگشت به نیک‌تراست</Link>}/>;
}