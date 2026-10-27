// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
import { ComponentFilterPanelOption } from './ComponentFilterPanelOption';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Filter group — collapsible titled set of options. */
export function ComponentFilterPanelGroup(p: any = {}){
  const {state='expanded',children,className,style}=p;
  const [open,setOpen]=React.useState(state!=='collapsed');
  React.useEffect(()=>setOpen(state!=='collapsed'),[state]);
  return <div className={cx('nt-fgroup',!open&&'is-collapsed',className)} style={style}>
    <button type="button" className="nt-fgroup__head" aria-expanded={open} onClick={()=>setOpen(o=>!o)}><span>{pick(p.title,p.text1,'رگولاتوری')}</span><Icon name="ComponentIconCaretUp" size={14} className="nt-icon" aria-hidden="true"/></button>
    {open&&<div className="nt-fgroup__list">{children||<><ComponentFilterPanelOption state="selected"/><ComponentFilterPanelOption label="رگوله‌نشده" countText="۸"/><ComponentFilterPanelOption label="اعلام نشده" countText="۵"/></>}</div>}
  </div>;
}
export default ComponentFilterPanelGroup;
