// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Accordion section — progressive disclosure for long review sections. */
export function ComponentAccordionSection(p={}){
  const {device='desktop',state='collapsed',children,className,style,id}=p;
  const [open,setOpen]=React.useState(state==='expanded');
  React.useEffect(()=>setOpen(state==='expanded'),[state]);
  const post=state==='postmvp';
  const title=pick(p.title,p.text1,'۴. حساب‌ها و شرایط'), summary=pick(p.summary,p.text2,'انواع حساب، اسپرد، کمیسیون و اهرم.');
  const bid=(id||'acc')+'-body';
  return <section id={id} className={cx('nt-acc',open&&!post&&'is-open',post&&'is-postmvp',device==='mobile'&&'nt-acc--mobile',className)} style={style}>
    <button type="button" className={cx('nt-acc__head',state==='focus'&&'is-focus')} aria-expanded={open&&!post} aria-controls={bid} disabled={post} onClick={()=>!post&&setOpen(o=>!o)}>
      {p.icon1}
      <span className="nt-acc__titles"><span className="nt-acc__title">{title}</span>{summary&&<span className="nt-acc__summary">{summary}</span>}</span>
      {post?<span className="nt-badge nt-badge--unknown">به‌زودی</span>:<span className="nt-acc__caret" aria-hidden="true"><Icon name="ComponentIconCaretDown" size={16}/></span>}
    </button>
    {open&&!post&&<div id={bid} className="nt-acc__body">{children}</div>}
  </section>;
}
export default ComponentAccordionSection;
