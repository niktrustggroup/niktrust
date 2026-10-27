// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const SIGNALS={
  platformwarning:{tone:'negative',label:'پلتفرم دارای هشدار'},
  nolicensefound:{tone:'negative',label:'مجوز معتبری یافت نشد'},
  regulationunverified:{tone:'caution',label:'رگولاتوری تأییدنشده'},
  payoutevidence:{tone:'caution',label:'شواهد پرداخت ناکافی'},
  iranlimited:{tone:'caution',label:'محدودیت برای کاربران ایران'},
  staledata:{tone:'neutral',label:'دادهٔ قدیمی'}
};
/** Risk badge — a named risk signal. Outlined so it reads as a warning, not a promotion. */
export function ComponentBadgeRisk(p={}){
  const {signal='platformwarning',className,style}=p;
  const s=SIGNALS[signal]||SIGNALS.platformwarning;
  const text=pick(p.children,p.label,signal==='platformwarning'?p.text1:undefined,s.label);
  return <span className={cx('nt-badge','nt-badge--'+s.tone,'nt-badge--outline',className)} style={style} title={text}>
    <Icon name="ComponentIconWarning" size={12} className="nt-icon" aria-hidden="true"/><span>{text}</span>
  </span>;
}
export default ComponentBadgeRisk;
