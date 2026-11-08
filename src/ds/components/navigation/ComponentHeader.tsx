// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { PATHS } from '../../paths';
import { RESEARCH_NAV } from '../../navigation';
import { Link, useNavigate } from '@tanstack/react-router';
import { Icon } from '../icons/Icon';
import { ComponentButton } from '../core/ComponentButton';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Shared research navigation: utility masthead, category mega menus and mobile accordion. */
export function ComponentHeader(p: any = {}){
  const {device='desktop',logoSrc,current,onNavigate,onCompare,compareCount=0,className,style}=p;
  const [open,setOpen]=useState(false),[active,setActive]=useState(null),[q,setQ]=useState('');
  const ref=useRef(null), trigger=useRef(null);
  const navigate=useNavigate();
  const close=()=>{setActive(null);setOpen(false)};
  useEffect(()=>{
    const outside=e=>{if(ref.current&&!ref.current.contains(e.target))close()};
    const key=e=>{if(e.key==='Escape'){close();trigger.current?.focus()}};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',key);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',key)};
  },[]);
  const link=(label,id,cls='')=><Link key={id} to={PATHS[id]} className={cls} onClick={close}>{label}<Icon name="ComponentIconArrowStart" size={14}/></Link>;
  const selected=RESEARCH_NAV.find(n=>n.id===active);
  const search=<form className="nt-mast-search" onSubmit={e=>{e.preventDefault();close();void navigate({to:'/search',search:q.trim()?{q:q.trim()}:{}})}}><Icon name="ComponentIconSearch" size={20}/><label className="nt-visually-hidden" htmlFor="mast-search">جستجو در نیک‌تراست</label><input id="mast-search" value={q} onChange={e=>setQ(e.target.value)} placeholder="جستجوی پلتفرم، ابزار یا راهنما…"/><Link to="/search" search={q.trim()?{q:q.trim()}:{}} onClick={close} aria-label="جستجو" className="nt-mast-search-go"><Icon name="ComponentIconArrowStart" size={18}/></Link></form>;
  return <header ref={ref} className={cx('nt-header nt-research-header',device==='mobile'&&'nt-header--mobile',className)} style={style} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setActive(null)}}>
    <div className="nt-utility"><div className="nt-container"><span>پژوهش مستقل؛ انتخاب آگاهانه</span><nav aria-label="دسترسی سریع"><Link to="/methodology">روش ارزیابی</Link><Link to="/how-we-make-money">شفافیت مالی</Link><Link to="/alerts">مرکز هشدارها</Link></nav><span>فارسی <bdi>FA</bdi></span></div></div>
    <div className="nt-container nt-masthead"><Link to="/" onClick={close} className="nt-mast-brand" aria-label="نیک‌تراست — صفحهٔ اصلی">{logoSrc?<img src={logoSrc} width="150" height="34" alt="نیک‌تراست"/>:<span className="nt-wordmark">نیک‌تراست</span>}<span>ارزیابی و مقایسهٔ پلتفرم‌های مالی</span></Link>{search}
      <div className="nt-mast-actions"><ComponentButton type="secondary" iconLeading="ComponentIconDiff" onClick={()=>{close();onCompare?.()}} ariaLabel="مقایسهٔ انتخاب‌ها">مقایسه{compareCount>0?' ('+compareCount.toLocaleString('fa-IR')+')':''}</ComponentButton><Link to="/account" className="nt-account-link">حساب کاربری</Link><span className="nt-mobile-trigger"><ComponentButton type="tertiary" className="nt-menu-toggle" ariaLabel={open?'بستن منو':'منو'} aria-expanded={open} aria-controls="mobile-navigation" onClick={e=>{trigger.current=e.currentTarget;setOpen(!open);setActive(null)}} iconLeading={open?'ComponentIconClose':'ComponentIconMenu'}><span className="nt-visually-hidden">منو</span></ComponentButton></span></div>
    </div>
    <div className="nt-category-bar"><div className="nt-container"><nav aria-label="ناوبری اصلی">{RESEARCH_NAV.map(n=><ComponentButton key={n.id} type="tertiary" className="nt-category-trigger" aria-expanded={active===n.id} aria-controls={'mega-'+n.id} aria-current={current===n.id?'page':undefined} onMouseEnter={()=>setActive(n.id)} onClick={e=>{trigger.current=e.currentTarget;setActive(active===n.id?null:n.id)}} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setActive(n.id);requestAnimationFrame(()=>ref.current?.querySelector('#mega-'+n.id+' a')?.focus())}}} iconTrailing="ComponentIconCaretDown">{n.label}</ComponentButton>)}</nav><Link to="/finder" className="nt-finder-shortcut">انتخاب هدایت‌شده <Icon name="ComponentIconArrowStart" size={16}/></Link></div></div>
    {selected&&!open&&<div className="nt-mega" id={'mega-'+selected.id} onMouseLeave={()=>setActive(null)}><div className="nt-container nt-mega-grid"><div className="nt-mega-intro"><span className="nt-overline">کشف، بررسی، مقایسه</span><h2 className="nt-h3">{selected.label}</h2><p>{selected.intro}</p>{link('مشاهدهٔ همه',selected.id)}</div>{selected.groups.map(g=><div className="nt-mega-group" key={g.title}><h3>{g.title}</h3>{g.links.map(([label,id])=>link(label,id))}</div>)}<div className="nt-mega-feature"><Icon name="ComponentIconInfo" size={24}/><h3>انتخاب بر پایهٔ شواهد</h3><p>منبع، تاریخ و محدودیت داده را پیش از تصمیم بررسی کنید.</p>{link('چارچوب ارزیابی نیک‌تراست','method')}{link('گزارش خطای اطلاعات','corrections')}</div></div><div className="nt-mega-bottom"><div className="nt-container"><span>مسیرهای پرکاربرد</span>{link('مقایسهٔ پلتفرم‌ها','compare')}{link('استعلام اعتبار','check')}{link('واژه‌نامهٔ مالی','glossary')}</div></div></div>}
    {open&&<nav id="mobile-navigation" className="nt-mobile-nav" aria-label="ناوبری موبایل"><Link to="/search" onClick={close} className="nt-mobile-search"><Icon name="ComponentIconSearch" size={18}/>جستجو در نیک‌تراست</Link>{RESEARCH_NAV.map(n=><div className="nt-mobile-group" key={n.id}><ComponentButton type="tertiary" block aria-expanded={active===n.id} onClick={()=>setActive(active===n.id?null:n.id)} iconTrailing={active===n.id?'ComponentIconCaretUp':'ComponentIconCaretDown'}>{n.label}</ComponentButton>{active===n.id&&<div className="nt-mobile-sub">{n.groups.map(g=><div key={g.title}><h3>{g.title}</h3>{g.links.map(([label,id])=>link(label,id))}</div>)}</div>}</div>)}<div className="nt-mobile-utility">{link('انتخاب هدایت‌شده','finder')}{link('حساب کاربری','account')}{link('دربارهٔ نیک‌تراست','about')}</div></nav>}
  </header>;
}
export default ComponentHeader;
