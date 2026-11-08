// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Button — primary (one dominant action per view), secondary (supporting), tertiary (low-emphasis/inline). */
export function ComponentButton(p: any = {}){
  const {type='primary',state='default',size='md',block,iconLeading,iconTrailing,href,onClick,children,className,style,disabled,ariaLabel,...rest}=p;
  const a11y=Object.fromEntries(Object.entries(rest).filter(([key])=>key.startsWith('aria-')||key.startsWith('data-')||['onKeyDown','onFocus','onBlur','onMouseEnter','title','id'].includes(key)));
  const text=pick(children,p.label,p.text1,'مشاهده بررسی');
  const isDis=disabled||state==='disabled', isLoad=state==='loading';
  const cls=cx('nt-btn','nt-btn--'+type,size!=='md'&&'nt-btn--'+size,block&&'nt-btn--block',state==='hover'&&'is-hover',state==='active'&&'is-active',state==='focus'&&'is-focus',isDis&&'is-disabled',isLoad&&'is-loading',className);
  const isz=size==='lg'?18:16;
  const inner=<>{isLoad?<Icon name="ComponentIconSpinner" size={isz} className="nt-icon nt-spin" aria-hidden="true"/>:iconLeading&&<Icon name={typeof iconLeading==='string'?iconLeading:'ComponentIconCheck'} size={isz} className="nt-icon" aria-hidden="true"/>}<span>{text}</span>{iconTrailing&&!isLoad&&<Icon name={typeof iconTrailing==='string'?iconTrailing:'ComponentIconArrowStart'} size={isz} className="nt-icon" aria-hidden="true"/>}</>;
  if(href&&!isDis) return <a href={href} className={cls} style={style} onClick={onClick} aria-label={ariaLabel} {...a11y}>{inner}</a>;
  return <button type="button" className={cls} style={style} onClick={isDis||isLoad?undefined:onClick} disabled={isDis} aria-busy={isLoad||undefined} aria-label={ariaLabel} {...a11y}>{inner}</button>;
}
export default ComponentButton;
