// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
import { ComponentRatingBadge } from '../core/ComponentRatingBadge';
import { ComponentBadgeStatus } from '../core/ComponentBadgeStatus';
import { ComponentBadgeRisk } from '../core/ComponentBadgeRisk';
import { ComponentTrustIndicator } from '../core/ComponentTrustIndicator';
import { ComponentButton } from '../core/ComponentButton';
import { ComponentDataCardMetric } from './ComponentDataCardMetric';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const DEF_METRICS=[{label:'حداقل واریز',value:'$111'},{label:'اسپرد از',value:'0.8 pip'},{label:'حداکثر اهرم',value:'1:500'}];
const DEF_BADGES=[{tone:'positive',label:'رگولاتوری تأییدشده'}];
/** Platform data card — Title → key data → metadata → action. Used on listing, home and search. */
export function ComponentDataCard(p={}){
  const {device='desktop',commercialCTA=false,state='default',category='بروکر',score='۷٫۱',scoreState,metrics=DEF_METRICS,badges=DEF_BADGES,date='۱۴۰۵/۰۶/۲۹',trustState='verified',href='#',onReview,onCompare,compared=false,logoSrc,className,style}=p;
  const name=pick(p.name,p.text2,'بروکر نمونهٔ الف (ساختگی)');
  if(state==='loading') return <div className={cx('nt-pcard',className)} style={style} aria-busy="true">
    <div className="nt-pcard__body">
      <div className="nt-pcard__head"><span className="nt-skel" style={{width:48,height:48,borderRadius:8}}></span><div className="nt-pcard__title" style={{gap:8}}><span className="nt-skel" style={{width:'60%',height:16}}></span><span className="nt-skel" style={{width:'30%',height:12}}></span></div></div>
      <span className="nt-skel" style={{width:120,height:24}}></span>
      <div className="nt-pcard__metrics">{[0,1,2].map(i=><div key={i} className="nt-metric"><span className="nt-skel" style={{width:'70%',height:10}}></span><span className="nt-skel" style={{width:'50%',height:16}}></span></div>)}</div>
      <div className="nt-pcard__foot"><span className="nt-skel" style={{width:140,height:12}}></span><span className="nt-skel" style={{width:120,height:32}}></span></div>
    </div>
  </div>;
  const warn=state==='warning';
  return <article className={cx('nt-pcard',state==='hover'&&'is-hover',warn&&'is-warning',className)} style={{...(device==='mobile'?{maxWidth:390}:null),...style}}>
    <div className="nt-pcard__body">
      <div className="nt-pcard__head">
        <span className="nt-logo" aria-hidden="true">{logoSrc?<img src={logoSrc} alt=""/>:pick(p.icon1,p.text1,'LOGO')}</span>
        <div className="nt-pcard__title"><h3 className="nt-pcard__name"><a href={href} onClick={onReview?(e=>{e.preventDefault();onReview()}):undefined}>{name}</a></h3><span className="nt-pcard__meta">{category}</span></div>
        <ComponentRatingBadge size="compact" score={score} state={scoreState||(warn?'empty':'default')} label="امتیاز کلی"/>
      </div>
      <div className="nt-cluster">{warn&&<ComponentBadgeRisk signal="platformwarning"/>}{badges.map((b,i)=><ComponentBadgeStatus key={i} tone={b.tone} label={b.label}/>)}</div>
      <div className="nt-pcard__metrics">{metrics.slice(0,3).map((m,i)=><ComponentDataCardMetric key={i} {...m}/>)}</div>
      <div className="nt-pcard__foot">
        <ComponentTrustIndicator state={trustState} date={date} source={false}/>
        <div className="nt-pcard__actions">
          <ComponentButton type="tertiary" size="sm" iconLeading={compared?'ComponentIconCheck':'ComponentIconDiff'} onClick={onCompare}>{compared?'در مقایسه':'مقایسه'}</ComponentButton>
          <ComponentButton type="secondary" size="sm" href={onReview?undefined:href} onClick={onReview}>مشاهده بررسی</ComponentButton>
        </div>
      </div>
    </div>
    {warn?<div className="nt-pcard__aff is-blocked"><Icon name="ComponentIconWarning" size={14} aria-hidden="true"/><span style={{flex:1}}>پلتفرم دارای هشدار — لینک تجاری غیرفعال است</span></div>
     :commercialCTA&&<div className="nt-pcard__aff"><span>{pick(p.text3,'لینک همکاری — بر امتیاز و ترتیب اثر ندارد')}</span><a href="#" style={{fontWeight:600}}>وب‌سایت پلتفرم</a></div>}
  </article>;
}
export default ComponentDataCard;
