// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const TAG={lowest:['ComponentIconCheck','کمترین'],highest:['ComponentIconCaretUp','بیشترین'],different:['ComponentIconDiff','متفاوت']};
/** Comparison cell — value + optional difference tag. Highlights are subtle and always labelled. */
export function ComponentComparisonTableCell(p: any = {}){
  const {state='value',className,style}=p;
  if(state==='blank') return null;
  const v=pick(p.value,p.text1,'$111');
  if(state==='notdeclared') return <span className={cx('nt-cell','nt-cell--empty',className)} style={style}><Icon name="ComponentIconDash" size={14} aria-hidden="true"/>اعلام نشده</span>;
  if(state==='inreview') return <span className={cx('nt-cell','nt-cell--empty',className)} style={style}><Icon name="ComponentIconClock" size={14} aria-hidden="true"/>در حال بررسی</span>;
  const t=TAG[state];
  return <span className={cx('nt-cell','nt-cell--'+state,className)} style={style}><span className="nt-ltr">{v}</span>{t&&<span className="nt-cell__tag"><Icon name={t[0]} size={10} aria-hidden="true"/>{state==='lowest'?pick(p.text2,t[1]):t[1]}</span>}</span>;
}
export default ComponentComparisonTableCell;
