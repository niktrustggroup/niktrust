// @ts-nocheck
import React from 'react';
import { ComponentButton } from '../core/ComponentButton';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Affiliate zone — the ONLY place a commercial link may appear on a review. Dashed, labelled, separate from editorial. */
export function ComponentAffiliateZone(p: any = {}){
  const {device='desktop',href='#',className,style}=p;
  return <aside className={cx('nt-aff',className)} style={{...(device==='mobile'?{padding:'16px'}:null),...style}} aria-label="همکاری تجاری">
    <div className="nt-aff__inner">
      <div className="nt-aff__top"><span className="nt-badge nt-badge--neutral">لینک همکاری</span><span className="nt-aff__title">{pick(p.title,p.text1,'بخش همکاری تجاری — مجزا از محتوای ارزیابی')}</span></div>
      <p className="nt-aff__text">{pick(p.children,p.text2,'این یک لینک همکاری است. امتیاز و ترتیب نیک‌تراست مستقل از آن محاسبه می‌شود و وجود همکاری بر ارزیابی اثر ندارد.')}</p>
      <div className="nt-aff__cta"><ComponentButton type="secondary" size="sm" href={href} iconTrailing block={device==='mobile'}>{pick(p.cTALabel,'رفتن به وب‌سایت پلتفرم')}</ComponentButton></div>
    </div>
  </aside>;
}
export default ComponentAffiliateZone;
