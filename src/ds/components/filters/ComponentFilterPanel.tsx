// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
import { ComponentFilterPanelGroup } from './ComponentFilterPanelGroup';
import { ComponentChip } from '../core/ComponentChip';
import { ComponentButton } from '../core/ComponentButton';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Filter panel — sidebar on desktop, bottom sheet on mobile (device="mobile"). */
export function ComponentFilterPanel(p={}){
  const {device='desktop',state='default',active=['رگوله‌شده','حداقل واریز زیر $100'],resultCount='۲۴',onClear,onClose,onApply,children,className,style}=p;
  const filtered=state==='filtered'&&active.length>0, mob=device==='mobile';
  return <aside className={cx('nt-filter',mob&&'nt-filter--mobile',className)} style={style} aria-label="فیلترها">
    <div className="nt-filter__head"><h2 className="nt-filter__title">{pick(p.title,p.text1,'فیلترها')}</h2>
      <div className="nt-cluster" style={{gap:4}}>{filtered&&<ComponentButton type="tertiary" size="sm" onClick={onClear}>{pick(p.text2,'پاک کردن')}</ComponentButton>}{mob&&<button type="button" className="nt-iconbtn" aria-label="بستن" onClick={onClose}><Icon name="ComponentIconClose" size={18}/></button>}</div></div>
    {filtered?<div className="nt-filter__active"><span className="nt-caption">فیلترهای فعال ({active.length.toLocaleString('fa-IR')})</span><div className="nt-cluster">{active.map(a=><ComponentChip key={a} label={a} state="selected" remove/>)}</div></div>
      :<p className="nt-filter__empty">{pick(p.text3,'هیچ فیلتری انتخاب نشده — همهٔ نتایج نمایش داده می‌شود')}</p>}
    <div className="nt-filter__groups">{children||<><ComponentFilterPanelGroup/><ComponentFilterPanelGroup title="حداقل واریز" state="collapsed"/><ComponentFilterPanelGroup title="روش واریز و برداشت" state="collapsed"/></>}</div>
    {mob?<div className="nt-filter__foot"><ComponentButton type="primary" block onClick={onApply}>{'نمایش '+resultCount+' نتیجه'}</ComponentButton></div>
      :<p className="nt-filter__note"><Icon name="ComponentIconInfo" size={14} className="nt-icon" aria-hidden="true" style={{marginTop:2}}/>فیلترها فقط روی دادهٔ تأییدشده اعمال می‌شوند.</p>}
  </aside>;
}
export default ComponentFilterPanel;
