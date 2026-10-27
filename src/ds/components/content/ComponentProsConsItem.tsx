// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Pros / cons line — check or cross marker + factual statement. */
export function ComponentProsConsItem(p={}){
  const {tone='pro',className,style}=p;
  return <li className={cx('nt-pc','nt-pc--'+tone,className)} style={{listStyle:'none',...style}}>
    <span className="nt-pc__mark">{p.icon1||<Icon name={tone==='pro'?'ComponentIconCheck':'ComponentIconClose'} size={14} aria-hidden="true"/>}</span>
    <span className="nt-visually-hidden">{tone==='pro'?'مزیت: ':'محدودیت: '}</span>
    <span style={{flex:1,minWidth:0}}>{pick(p.children,p.label,p.text1,'مزیت نمونه برای آزمون طراحی')}</span>
  </li>;
}
export default ComponentProsConsItem;
