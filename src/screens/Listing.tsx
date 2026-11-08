import { useEffect, useState } from 'react';
import { ComponentButton, ComponentFilterPanel, ComponentFilterPanelGroup, ComponentFilterPanelOption, ComponentSortControl, ComponentPaginationItem } from '@/ds';
import { PageHead } from './Shared';
import { useCatalog } from '@/api/client';
import { filterPlatforms } from '@/api/rules';
import type { Category } from '@/api/types';
import { EmptyState, PlatformCard, SampleNotice } from './product/Primitives';
export function ListingScreen({ go, compare, toggleCompare, title = 'بروکرهای فارکس', desc, category = 'brokers', region }: { go: (id: string, arg?: string) => void; compare: string[]; toggleCompare: (id: string) => void; title?: string; desc?: string; category?: Category; region?: string }) {
  const { platforms } = useCatalog();
  const [sheet, setSheet] = useState(false);
  const [query, setQuery] = useState(''); const [coverage, setCoverage] = useState(''); const [sort, setSort] = useState('نام'); const [page, setPage] = useState(1);
  const source = platforms.filter(p => p.category === category && (!region || p.exchange_region === region));
  const results = filterPlatforms(source, query, coverage, sort === 'جدیدترین بازبینی' ? 'date' : 'name');
  const pages = Math.max(1, Math.ceil(results.length / 3));
  useEffect(() => { setPage(1); }, [query, coverage, sort]);
  useEffect(() => { if (!sheet) return; const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setSheet(false); }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, [sheet]);
  const clear = () => { setQuery(''); setCoverage(''); setPage(1); };
  const groups = <ComponentFilterPanelGroup title="سطح پوشش اطلاعات">{[['', 'همه'], ['full_review', 'بررسی کامل'], ['basic_profile', 'پروفایل پایه'], ['identified', 'اطلاعات محدود']].map(([value, label]) => <ComponentFilterPanelOption key={label} name={sheet ? 'mobile-coverage' : 'coverage'} control="radio" label={label} count={false} checked={coverage === value} onChange={() => setCoverage(value)}/>)}</ComponentFilterPanelGroup>;
  return <main><PageHead go={go} crumbs={[{ label: 'نیک‌تراست', id: 'home' }, title]} title={title} desc={desc}/><div className="nt-container nt-section"><SampleNotice/>
    <div className="nt-grid nt-product-grid"><div className="nt-lg-col-3 k-desk-only"><ComponentFilterPanel state={coverage ? 'filtered' : 'default'} active={coverage ? ['سطح پوشش انتخاب‌شده'] : []} onClear={clear}>{groups}</ComponentFilterPanel><p className="nt-caption">فیلترها روی پروفایل‌های نمایشی اعمال می‌شوند.</p></div>
    <div className="nt-lg-col-9 nt-stack"><label className="nt-label" htmlFor="listing-search">جستجو در {title}</label><input id="listing-search" className="nt-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="نام پلتفرم…"/>
    <div className="nt-split"><p className="nt-body-sm" role="status">{results.length.toLocaleString('fa-IR')} نتیجهٔ نمایشی</p><div className="nt-cluster"><span className="k-below-desk"><ComponentButton type="secondary" onClick={() => setSheet(true)}>فیلترها</ComponentButton></span><ComponentSortControl options={['نام', 'جدیدترین بازبینی']} value={sort} onChange={setSort}/></div></div>
    {results.length ? results.slice((page - 1) * 3, page * 3).map(p => <PlatformCard key={p.id} platform={p} go={go} compare={compare} toggleCompare={toggleCompare}/>) : <EmptyState title="پلتفرمی با این شرایط پیدا نشد" action={<ComponentButton type="secondary" onClick={clear}>پاک کردن فیلترها</ComponentButton>}/>}
    {pages > 1 && <nav className="nt-pager" aria-label="صفحه‌بندی"><ComponentPaginationItem label="قبلی" disabled={page === 1} onClick={() => setPage(page - 1)}/>{Array.from({ length: pages }, (_, i) => <ComponentPaginationItem key={i} label={(i+1).toLocaleString('fa-IR')} state={page === i+1 ? 'current' : 'default'} onClick={() => setPage(i+1)}/>)}<ComponentPaginationItem label="بعدی" disabled={page === pages} onClick={() => setPage(page+1)}/></nav>}
    <div className="nt-note"><ComponentButton type="tertiary" onClick={() => go('method')}>معیارهای ارزیابی این دسته</ComponentButton><ComponentButton type="tertiary" onClick={() => go('compare')}>مقایسهٔ انتخاب‌ها</ComponentButton></div></div></div></div>
    {sheet && <div className="nt-scrim" role="dialog" aria-modal="true" aria-label="فیلترهای فهرست" onClick={e => { if (e.target === e.currentTarget) setSheet(false); }}><ComponentFilterPanel device="mobile" active={[]} state="default" resultCount={results.length.toLocaleString('fa-IR')} onClose={() => setSheet(false)} onApply={() => setSheet(false)} onClear={clear}>{groups}</ComponentFilterPanel></div>}
  </main>;
}