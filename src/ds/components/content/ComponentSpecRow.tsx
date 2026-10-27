// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Spec row — label / value pair with data-state. */
export function ComponentSpecRow(p={}){
  const {state='verified',className,style}=p;
  const label=pick(p.label,p.text2,'حداقل واریز'), value=pick(p.value,p.text1,'$111');
  const empty=state==='notdeclared'||state==='inreview';
  return <div className={cx('nt-spec',empty&&'nt-spec--empty',className)} style={style} role="row">
    <span className="nt-spec__label" role="rowheader">{label}</span>
    <span className="nt-spec__value" role="cell">{state==='notdeclared'?'اعلام نشده':state==='inreview'?<><Icon name="ComponentIconClock" size={14} aria-hidden="true"/>در حال بررسی</>:<><span className="nt-ltr">{value}</span>{state==='stale'&&<span className="nt-spec__note"><Icon name="ComponentIconWarning" size={12} aria-hidden="true"/>نیازمند به‌روزرسانی</span>}</>}</span>
  </div>;
}
export default ComponentSpecRow;
