// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
import { ComponentButton } from '../core/ComponentButton';
import { ComponentRatingBadge } from '../core/ComponentRatingBadge';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Compare column header — platform identity + remove; empty slot invites adding (max 4). */
export function ComponentCompareColumnHeader(p={}){
  const {state='filled',onRemove,onAdd,score,scoreState='empty',className,style}=p;
  if(state==='empty') return <div className={cx('nt-colhead','nt-colhead--empty',className)} style={style}><ComponentButton type="tertiary" size="sm" onClick={onAdd}>{pick(p.addLabel,'+ افزودن پلتفرم')}</ComponentButton></div>;
  return <div className={cx('nt-colhead',state==='focus'&&'is-focus',className)} style={{borderRadius:8,...style}}>
    <div className="nt-colhead__top"><span className="nt-logo nt-logo--sm" aria-hidden="true">{p.icon1||'LOGO'}</span>
      <div style={{minWidth:0,display:'flex',flexDirection:'column',paddingInlineEnd:24}}><span className="nt-colhead__name">{pick(p.name,p.text1,'بروکر نمونهٔ الف (ساختگی)')}</span><span className="nt-colhead__cat">{pick(p.category,p.text2,'بروکر')}</span></div></div>
    <ComponentRatingBadge size="compact" score={score} state={score?'default':scoreState}/>
    <button type="button" className="nt-iconbtn nt-iconbtn--sm nt-colhead__rm" aria-label="حذف از مقایسه" onClick={onRemove}><Icon name="ComponentIconClose" size={14}/></button>
  </div>;
}
export default ComponentCompareColumnHeader;
