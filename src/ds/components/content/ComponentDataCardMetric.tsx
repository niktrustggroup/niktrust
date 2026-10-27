// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Metric — one key figure on a card. Missing data shows its state, never 0. */
export function ComponentDataCardMetric(p: any = {}){
  const {state='value',basis=true,className,style}=p;
  const label=pick(p.label,p.text1,'حداقل واریز'), value=pick(p.value,p.text2,'$111');
  const empty=state!=='value';
  return <div className={cx('nt-metric',empty&&'nt-metric--empty',className)} style={style}>
    <span className="nt-metric__label">{label}</span>
    <span className="nt-metric__value">{state==='notdeclared'?<><Icon name="ComponentIconDash" size={14} aria-hidden="true"/>اعلام نشده</>:state==='inreview'?<><Icon name="ComponentIconClock" size={14} aria-hidden="true"/>در حال بررسی</>:<><span className="nt-ltr">{value}</span>{basis&&<span className="nt-metric__basis">{pick(p.basisText,p.text3,'اعلامی')}</span>}</>}</span>
  </div>;
}
export default ComponentDataCardMetric;
