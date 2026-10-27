// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const TONE_ICON={positive:'ComponentIconCheck',caution:'ComponentIconWarning',negative:'ComponentIconClose',neutral:'ComponentIconDash',unknown:'ComponentIconUnknown',info:'ComponentIconInfo'};
/** Status badge — verification / data state. Always icon + text (never color alone). */
export function ComponentBadgeStatus(p={}){
  const {tone='positive',icon=true,className,style}=p;
  return <span className={cx('nt-badge','nt-badge--'+tone,className)} style={style}>
    {icon&&<Icon name={TONE_ICON[tone]||'ComponentIconInfo'} size={12} className="nt-icon" aria-hidden="true"/>}
    <span>{pick(p.children,p.label,p.text1,'رگولاتوری تأییدشده')}</span>
  </span>;
}
export default ComponentBadgeStatus;
