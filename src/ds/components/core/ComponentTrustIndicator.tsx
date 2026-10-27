// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const ST={verified:['ComponentIconCheck','آخرین بررسی'],stale:['ComponentIconWarning','نیازمند به‌روزرسانی'],inreview:['ComponentIconClock','در حال بررسی'],notdeclared:['ComponentIconDash','اعلام نشده']};
/** Trust indicator — verification date + source for a piece of data. */
export function ComponentTrustIndicator(p={}){
  const {state='verified',source=true,sourceHref='#',className,style}=p;
  const [ic,lbl]=ST[state]||ST.verified;
  const date=pick(p.date,p.text2,'۱۴۰۵/۰۶/۲۹');
  return <span className={cx('nt-trust','nt-trust--'+state,className)} style={style}>
    <span className="nt-trust__state"><Icon name={ic} size={14} className="nt-icon" aria-hidden="true"/>{state==='verified'?pick(p.text3,lbl):lbl}</span>
    {(state==='verified'||state==='stale')&&<span className="nt-trust__date">{date}</span>}
    {source&&<><span className="nt-trust__sep" aria-hidden="true">·</span><a href={sourceHref}>{pick(p.text1,'منبع')}</a></>}
  </span>;
}
export default ComponentTrustIndicator;
