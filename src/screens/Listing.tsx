// @ts-nocheck
import React from 'react';
import * as NT from '@/ds';
import { KIcon, SectionHead, PageHead, IconTile, findPlatform } from './Shared';
import NT_DATA from './data';
export function ListingScreen({ go, compare, toggleCompare }){
  const { ComponentButton, ComponentDataCard, ComponentFilterPanel, ComponentFilterPanelGroup, ComponentFilterPanelOption, ComponentSortControl, ComponentPaginationItem, ComponentChip } = NT;
  const D = NT_DATA;
  const [sheet, setSheet] = React.useState(false);
  const [filtered, setFiltered] = React.useState(true);
  const groups = <>
    <ComponentFilterPanelGroup title="رگولاتوری">
      <ComponentFilterPanelOption label="رگوله‌شده (تأییدشده)" countText="۱۱" state="selected"/>
      <ComponentFilterPanelOption label="مجوز فراساحلی" countText="۷"/>
      <ComponentFilterPanelOption label="در حال بررسی" countText="۶"/>
    </ComponentFilterPanelGroup>
    <ComponentFilterPanelGroup title="حداقل واریز">
      {['همه', 'زیر $100', '$100 تا $500', 'بیش از $500'].map((l, i) => <ComponentFilterPanelOption key={l} control="radio" name="dep" label={l} count={false} state={i === 1 ? 'selected' : 'default'}/>)}
    </ComponentFilterPanelGroup>
    <ComponentFilterPanelGroup title="روش واریز و برداشت" state="collapsed"/>
    <ComponentFilterPanelGroup title="پلتفرم معاملاتی" state="collapsed"/>
  </>;
  return <main>
    <PageHead go={go} crumbs={[{ label: 'نیک‌تراست', id: 'home' }, { label: 'بازارها', id: 'home' }, 'بروکرهای فارکس']} title="بروکرهای فارکس" desc="فهرست بروکرهای بررسی‌شده بر اساس معیارهای نیک‌تراست. ترتیب فهرست از لینک‌های همکاری اثر نمی‌گیرد."/>
    <div className="nt-container nt-section" style={{ paddingTop: 'var(--sp-32)' }}>
      <div className="nt-grid" style={{ alignItems: 'start' }}>
        <div className="nt-lg-col-3 k-desk-only nt-sticky">
          <ComponentFilterPanel state={filtered ? 'filtered' : 'default'} active={['رگوله‌شده', 'زیر $100']} onClear={() => setFiltered(false)}>{groups}</ComponentFilterPanel>
        </div>
        <div className="nt-lg-col-9 nt-stack" style={{ '--gap': 'var(--sp-16)' }}>
          <div className="nt-split" style={{ alignItems: 'center' }}>
            <p className="nt-body-sm" style={{ color: 'var(--text-secondary)' }}><b className="nt-data">۲۴</b> نتیجه · دادهٔ تأییدشده</p>
            <div className="nt-cluster" style={{ '--gap': 'var(--sp-8)' }}>
              <span className="k-below-desk"><ComponentButton type="secondary" size="sm" iconLeading="ComponentIconLayers" onClick={() => setSheet(true)}>فیلترها (۲)</ComponentButton></span>
              <ComponentSortControl/>
            </div>
          </div>
          {D.brokers.map(b => <ComponentDataCard key={b.id} {...b} commercialCTA={b.partner} onReview={() => go('review')} compared={compare.includes(b.id)} onCompare={() => toggleCompare(b.id)}/>)}
          <ComponentDataCard state="loading"/>
          <nav className="nt-pager" aria-label="صفحه‌بندی" style={{ paddingTop: 'var(--sp-16)' }}>
            <ComponentPaginationItem label="قبلی" disabled/><ComponentPaginationItem state="current"/><ComponentPaginationItem label="۲"/><ComponentPaginationItem label="۳"/><ComponentPaginationItem label="بعدی"/>
          </nav>
        </div>
      </div>
    </div>
    {sheet && <div role="dialog" aria-modal="true" aria-label="فیلترها" style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(26,26,46,.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={e => e.target === e.currentTarget && setSheet(false)}>
      <div style={{ maxHeight: '85vh', display: 'flex' }}><ComponentFilterPanel device="mobile" style={{ width: '100%' }} state={filtered ? 'filtered' : 'default'} active={['رگوله‌شده', 'زیر $100']} onClear={() => setFiltered(false)} onClose={() => setSheet(false)} onApply={() => setSheet(false)}>{groups}</ComponentFilterPanel></div>
    </div>}
  </main>;
}
