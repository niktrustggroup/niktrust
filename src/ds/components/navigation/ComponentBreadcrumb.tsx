// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Breadcrumb — full trail on desktop; single "back to parent" link on mobile. */
export function ComponentBreadcrumb(p: any = {}){
  const {device='desktop',deepLevel=false,items,className,style}=p;
  const list=items||[pick(p.item1,p.text4,'نیک‌تراست'),pick(p.item2,p.text3,'بازارها'),pick(p.item3,p.text2,'فارکس'),...(deepLevel?[pick(p.item4,p.text1,'بروکر نمونه')]:[])];
  const L=list.map(x=>typeof x==='string'?{label:x,href:'#'}:x);
  if(device==='mobile'){const parent=L[L.length-2]||L[0];return <nav aria-label="مسیر صفحه" className={cx('nt-crumbs','nt-crumbs--mobile',className)} style={style}><ol><li><a href={parent.href||'#'} onClick={parent.onClick}><Icon name="ComponentIconCaretDown" size={14} className="nt-icon" aria-hidden="true"/>{parent.label}</a></li></ol></nav>;}
  return <nav aria-label="مسیر صفحه" className={cx('nt-crumbs',className)} style={style}><ol>{L.map((it,i)=><li key={i}>{i>0&&<Icon name="ComponentIconCaretDown" size={12} className="nt-icon" aria-hidden="true"/>}{i===L.length-1?<span aria-current="page">{it.label}</span>:<a href={it.href||'#'} onClick={it.onClick}>{it.label}</a>}</li>)}</ol></nav>;
}
export default ComponentBreadcrumb;
