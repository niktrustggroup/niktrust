// @ts-nocheck
import React from 'react';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Pagination item — one page button. Compose several inside <nav className="nt-pager">. */
export function ComponentPaginationItem(p: any = {}){
  const {state='default',onClick,disabled,ariaLabel,className,style}=p;
  const cur=state==='current';
  return <button type="button" className={cx('nt-page',state==='hover'&&'is-hover',state==='focus'&&'is-focus',className)} style={style} aria-current={cur?'page':undefined} aria-label={ariaLabel} disabled={disabled} onClick={onClick}>{pick(p.children,p.label,p.text1,'۱')}</button>;
}
export default ComponentPaginationItem;
