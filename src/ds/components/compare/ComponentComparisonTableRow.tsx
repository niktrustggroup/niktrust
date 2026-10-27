// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
import { ComponentComparisonTableCell } from './ComponentComparisonTableCell';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Comparison row — <tr> with sticky criterion header and 2–4 value cells. Render inside .nt-ctable. */
export function ComponentComparisonTableRow(p: any = {}){
  const {columns='4',stale=false,row='default',cells,className,style}=p;
  const n=parseInt(columns,10)||4;
  const list=cells||Array.from({length:n},(_,i)=>({value:['$111','$50','$200','$111'][i],state:i===1?'lowest':'value'}));
  return <tr className={cx(row==='stripe'&&'is-stripe',row==='hover'&&'is-hover',className)} style={style}>
    <th scope="row"><span className="nt-crit"><span>{pick(p.criterion,p.text1,'حداقل واریز')}</span>{stale&&<span className="nt-crit__stale"><Icon name="ComponentIconWarning" size={10} aria-hidden="true"/>نیازمند به‌روزرسانی</span>}</span></th>
    {list.slice(0,n).map((c,i)=><td key={i}><ComponentComparisonTableCell {...c} state={stale&&['lowest','highest','different'].includes(c.state)?'value':c.state}/></td>)}
  </tr>;
}
export default ComponentComparisonTableRow;
