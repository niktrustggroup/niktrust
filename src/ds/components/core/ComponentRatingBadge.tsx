// @ts-nocheck
import React from 'react';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const toNum=(s)=>{const n=parseFloat(String(s??'').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٫,]/g,'.'));return isNaN(n)?null:n};
/** Rating — methodology-based score. kind=overall (headline) | dimension (breakdown row). Empty = not yet scored, never 0. */
export function ComponentRatingBadge(p: any = {}){
  const {kind='overall',size='lg',state='default',className,style}=p;
  const score=pick(p.score,p.text3,'۷٫۱'), scale=pick(p.scale,p.text2,'از ۱۰'), label=pick(p.label,p.text1,kind==='overall'?'امتیاز کلی':'اعتماد');
  const max=toNum(scale)||10, n=toNum(score), pct=n==null?0:Math.max(0,Math.min(100,n/max*100));
  const empty=state==='empty'||n==null;
  const aria=empty?label+': امتیازدهی در دست بررسی':label+': '+score+' '+scale;
  if(kind==='dimension') return <div className={cx('nt-score','nt-score--dim',empty&&'nt-score--empty',className)} style={style} aria-label={aria}>
    <div className="nt-score__row"><span>{label}</span>{empty?<span className="nt-score__of">در دست بررسی</span>:<b>{score} <small>/ {String(scale).replace('از ','')}</small></b>}</div>
    <div className="nt-score__bar"><span className="nt-score__fill" style={{width:pct+'%'}}></span></div>
  </div>;
  if(size==='compact') return <div className={cx('nt-score','nt-score--compact',empty&&'nt-score--empty',className)} style={style} aria-label={aria}>
    <span className="nt-score__pill">{empty?'نامشخص':score}</span>
    <span className="nt-score__meta"><b>{label}</b><span>{empty?'در دست بررسی':scale}</span></span>
  </div>;
  return <div className={cx('nt-score','nt-score--lg',empty&&'nt-score--empty',className)} style={style} aria-label={aria}>
    <span className="nt-score__label">{label}</span>
    <span className="nt-score__value">{empty?<span className="nt-score__num">امتیازدهی در دست بررسی</span>:<><span className="nt-score__num">{score}</span><span className="nt-score__of">{scale}</span></>}</span>
    {!empty&&<div className="nt-score__bar"><span className="nt-score__fill" style={{width:pct+'%'}}></span></div>}
  </div>;
}
export default ComponentRatingBadge;
