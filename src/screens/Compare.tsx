// @ts-nocheck
import React from 'react';
import * as NT from '@/ds';
import { KIcon, SectionHead, PageHead, IconTile, findPlatform } from './Shared';
import NT_DATA from './data';
export function CompareScreen({ go, compare, setCompare }){
  const { ComponentButton, ComponentCompareColumnHeader, ComponentComparisonTableRow, ComponentBadgeStatus } = NT;
  const cols = compare.map(findPlatform).filter(Boolean);
  const slots = cols.length < 4 ? 1 : 0;
  const n = cols.length;
  const vals = {
    'حداقل واریز': { a: '$100', b: '$50', c: '$200', d: '$10', e: '—', f: '$99' },
    'اسپرد EUR/USD از': { a: '0.8 pip', b: '1.2 pip', c: null, d: 'review' },
    'حداکثر اهرم': { a: '1:500', b: '1:1000', c: '1:200', d: '1:2000' },
    'کمیسیون': { a: '$7 / لات', b: null, c: '$5 / لات', d: null },
    'نهاد ناظر': { a: 'FCA', b: 'FSA (Seychelles)', c: 'CySEC', d: 'review' },
    'واریز ریالی': { a: 'دارد', b: 'دارد', c: 'ندارد', d: 'دارد' },
    'زمان برداشت': { a: '۱–۳ روز', b: '۱ روز', c: '۲–۵ روز', d: null }
  };
  const lowestKey = { 'حداقل واریز': true };
  const cellsFor = (k) => {
    const raw = cols.map(c => vals[k][c.id]);
    const nums = raw.map(v => typeof v === 'string' && v.startsWith('$') ? parseFloat(v.slice(1)) : NaN);
    const min = Math.min(...nums.filter(x => !isNaN(x)));
    const distinct = new Set(raw.filter(Boolean)).size > 1;
    return raw.map((v, i) => v == null ? { state: 'notdeclared' } : v === 'review' ? { state: 'inreview' } : { value: v, state: lowestKey[k] && nums[i] === min && n > 1 ? 'lowest' : (k === 'نهاد ناظر' && distinct) ? 'different' : 'value' }).concat(Array(slots).fill({ state: 'blank' }));
  };
  const groups = [['هزینه‌ها', ['حداقل واریز', 'اسپرد EUR/USD از', 'کمیسیون']], ['شرایط معاملاتی', ['حداکثر اهرم']], ['رگولاتوری', ['نهاد ناظر']], ['واریز و برداشت', ['واریز ریالی', 'زمان برداشت']]];
  const totalCols = n + slots;
  return <main>
    <PageHead go={go} crumbs={[{ label: 'نیک‌تراست', id: 'home' }, 'مقایسه']} title="مقایسه پلتفرم‌ها" desc="مقایسهٔ ۲ تا ۴ پلتفرم. ترتیب ستون‌ها ترتیب انتخاب شماست، نه ترتیب امتیاز."
      aside={<ComponentButton type="secondary" onClick={() => go('brokers')}>افزودن از فهرست</ComponentButton>}/>
    <div className="nt-container nt-section" style={{ paddingTop: 'var(--sp-32)' }}>
      <div className="nt-stack" style={{ '--gap': 'var(--sp-24)' }}>
        <div className="nt-split" style={{ alignItems: 'center' }}>
          <div className="nt-cluster" style={{ '--gap': 'var(--sp-8)' }}><span className="nt-caption">راهنمای وضعیت داده:</span><ComponentBadgeStatus tone="positive" label="کمترین"/><ComponentBadgeStatus tone="info" label="متفاوت"/><ComponentBadgeStatus tone="neutral" label="اعلام نشده"/><ComponentBadgeStatus tone="unknown" label="در حال بررسی"/></div>
          <span className="nt-caption">{n.toLocaleString('fa-IR')} از ۴ پلتفرم</span>
        </div>
        {n < 2 ? <div className="nt-card" style={{ display: 'grid', placeItems: 'center', textAlign: 'center', padding: 'var(--sp-64) var(--sp-24)', borderStyle: 'dashed' }}>
          <div className="nt-stack" style={{ '--gap': 'var(--sp-12)', alignItems: 'center', maxWidth: '44ch' }}>
            <IconTile name="Diff" tone="muted"/>
            <h2 className="nt-h4">برای مقایسه حداقل دو پلتفرم لازم است</h2>
            <p className="nt-body-sm">یک پلتفرم دیگر از فهرست انتخاب کنید. تا آن زمان جدول غیرفعال می‌ماند.</p>
            <ComponentButton type="primary" onClick={() => go('brokers')}>انتخاب از فهرست بروکرها</ComponentButton>
          </div>
        </div> : <>
          <div className="nt-note nt-note--caution"><KIcon name="Info" size={18}/><div><b>وضعیت امروز: امتیاز منتشر نمی‌شود.</b> وزن‌های روش‌شناسی هنوز تأیید نشده‌اند؛ تا آن زمان ردیف امتیاز «در دست بررسی» است و هایلایت نمی‌شود.</div></div>
          <div className="nt-ctable-wrap" style={{ '--ct-min': (180 + totalCols * 200) + 'px', '--ct-crit': '180px' }}>
            <table className="nt-ctable">
              <caption className="nt-visually-hidden">مقایسهٔ پلتفرم‌های انتخاب‌شده</caption>
              <thead><tr><th scope="col"><span className="nt-caption">معیار</span></th>
                {cols.map(c => <th key={c.id} scope="col"><ComponentCompareColumnHeader name={c.name} category={c.category.split(' · ')[0]} onRemove={() => setCompare(compare.filter(x => x !== c.id))}/></th>)}
                {slots > 0 && <th scope="col"><ComponentCompareColumnHeader state="empty" onAdd={() => go('brokers')}/></th>}
              </tr></thead>
              <tbody>
                {groups.map(([g, rows]) => <React.Fragment key={g}>
                  <tr className="nt-ctable__group"><th colSpan={totalCols + 1} scope="colgroup">{g}</th></tr>
                  {rows.map((k, i) => <ComponentComparisonTableRow key={k} criterion={k} columns={String(totalCols)} cells={cellsFor(k)} stale={k === 'زمان برداشت'} row={i % 2 ? 'stripe' : 'default'}/>)}
                </React.Fragment>)}
              </tbody>
            </table>
          </div>
          <p className="nt-caption">روی موبایل جدول به‌صورت افقی پیمایش می‌شود و ستون معیار ثابت می‌ماند.</p>
        </>}
      </div>
    </div>
  </main>;
}
