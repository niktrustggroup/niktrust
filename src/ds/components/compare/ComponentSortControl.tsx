// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const DEF=['امتیاز کلی (نزولی)','امتیاز کلی (صعودی)','حداقل واریز (کم به زیاد)','تاریخ بازبینی (جدیدترین)'];
/** Sort control — labelled native select. */
export function ComponentSortControl(p: any = {}){
  const {state='default',options=DEF,onChange,className,style,id='nt-sort'}=p;
  const value=pick(p.value,p.text1,options[0]);
  return <label className={cx('nt-sort',className)} style={style} htmlFor={id}>
    <span>{pick(p.label,p.text2,'مرتب‌سازی:')}</span>
    <span className="nt-selectwrap"><select id={id} className={cx('nt-select',state==='hover'&&'is-hover',state==='focus'&&'is-focus')} defaultValue={value} onChange={e=>onChange&&onChange(e.target.value)}>{(options.includes(value)?options:[value,...options]).map(o=><option key={o}>{o}</option>)}</select><Icon name="ComponentIconCaretDown" size={14} className="nt-icon" aria-hidden="true"/></span>
  </label>;
}
export default ComponentSortControl;
