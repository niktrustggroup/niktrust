// @ts-nocheck
import React from 'react';
import { Icon } from '../icons/Icon';
import { ComponentButton } from '../core/ComponentButton';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

const NAV=[{id:'brokers',label:'بروکرها'},{id:'exchanges',label:'صرافی‌ها'},{id:'prop',label:'پراپ‌فرم‌ها'},{id:'markets',label:'بازارها'},{id:'tools',label:'ابزارها'},{id:'method',label:'روش ارزیابی'}];
/** Site header — logo, primary nav, search, Compare. Collapses to menu under 900px (container query) or device="mobile". */
export function ComponentHeader(p={}){
  const {device='desktop',logoSrc,nav=NAV,current,onNavigate,onSearch,onCompare,compareCount=0,className,style}=p;
  const [open,setOpen]=React.useState(false);
  const go=(e,id)=>{if(onNavigate){e.preventDefault();onNavigate(id);setOpen(false)}};
  const links=nav.map(n=><a key={n.id} href={'#'+n.id} className="nt-nav__link" aria-current={current===n.id?'page':undefined} onClick={e=>go(e,n.id)}>{n.label}</a>);
  return <header className={cx('nt-header',device==='mobile'&&'nt-header--mobile',className)} style={style}>
    <div className="nt-container">
      <div className="nt-header__bar">
        <a href="#home" className="nt-header__brand" onClick={e=>go(e,'home')} aria-label="نیک‌تراست — صفحهٔ اصلی">{logoSrc?<img src={logoSrc} alt="NikTrust"/>:<span className="nt-wordmark">{pick(p.text2,'نیک‌تراست')}</span>}</a>
        <nav className="nt-nav" aria-label="ناوبری اصلی">{links}</nav>
        <div className="nt-header__actions">
          <button type="button" className="nt-iconbtn" aria-label="جستجو" onClick={onSearch}><Icon name="ComponentIconSearch" size={18}/></button>
          <span className="nt-header__cta"><ComponentButton type="secondary" size="sm" iconLeading="ComponentIconDiff" onClick={onCompare}>{compareCount>0?'مقایسه ('+compareCount.toLocaleString('fa-IR')+')':'مقایسه'}</ComponentButton></span>
          <button type="button" className="nt-iconbtn nt-header__menu" aria-label="منو" aria-expanded={open} onClick={()=>setOpen(o=>!o)}><Icon name={open?'ComponentIconClose':'ComponentIconMenu'} size={20}/></button>
        </div>
      </div>
      {open&&<nav className="nt-header__drawer" aria-label="ناوبری موبایل">{links}</nav>}
    </div>
  </header>;
}
export default ComponentHeader;
