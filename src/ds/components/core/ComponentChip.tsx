// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Chip — filter/category toggle. Selected uses brand-subtle fill, never solid brand. */
export function ComponentChip(p: any = {}){
  const {state='default',remove,size='default',onClick,onRemove,className,style,selected}=p;
  const sel=selected??state==='selected';
  return <button type="button" aria-pressed={sel} onClick={onClick} className={cx('nt-chip',size==='touch'&&'nt-chip--touch',state==='hover'&&'is-hover',sel&&'is-selected',className)} style={style}>
    <span>{pick(p.children,p.label,p.text1,'بروکر')}</span>
    {remove&&<span className="nt-chip__x" role="button" aria-label="حذف" onClick={e=>{e.stopPropagation();onRemove&&onRemove()}}><Icon name="ComponentIconClose" size={12} aria-hidden="true"/></span>}
  </button>;
}
export default ComponentChip;
