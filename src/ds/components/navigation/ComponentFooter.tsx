// @ts-nocheck
import React from 'react';
import { PATHS } from '../../paths';
import { Link } from '@tanstack/react-router';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Site footer — brand, link columns, affiliate disclosure + risk warning on every page. */
export function ComponentFooter(p: any = {}){
  const {device='desktop',logoSrc,onNavigate,className,style}=p;
  const cols=[
    {t:pick(p.text1,'پلتفرم‌ها و بازارها'),l:[['بروکرهای فارکس','brokers'],['صرافی‌های رمزارز','exchanges'],['پراپ‌فرم‌ها','prop'],['بازارهای مالی','markets'],['مقایسهٔ پلتفرم‌ها','compare']]},
    {t:'پژوهش و آموزش',l:[['مرکز آموزش','learn'],['واژه‌نامهٔ مالی','glossary'],['اخبار و تحلیل','news'],['مجلهٔ نیک‌تراست','blog'],['ابزارها و ماشین‌حساب‌ها','tools']]},
    {t:'شفافیت',l:[['روش ارزیابی','method'],['مدل درآمد','revenue'],['سیاست تحریریه','editorial'],['هشدارها','alerts'],['استعلام پلتفرم','check']]},
    {t:'نیک‌تراست',l:[['دربارهٔ ما','about'],['تیم و بررسی‌کنندگان','team'],['تماس با ما','contact'],['سوالات متداول','faq'],['برنامهٔ همکاری','partners'],['عضویت','membership']]}];
  const go=(e,id)=>{if(onNavigate&&id){e.preventDefault();onNavigate(id)}};
  return <footer className={cx('nt-footer nt-research-footer',device==='mobile'&&'nt-footer--mobile',className)} style={style}>
    <div className="nt-container">
      <div className="nt-footer__top">
        <div className="nt-footer__brand">{logoSrc?<img src={logoSrc} alt="NikTrust"/>:<span className="nt-wordmark">نیک‌تراست</span>}<p className="nt-body-sm" style={{margin:0}}>پلتفرم مستقل بررسی و مقایسهٔ سرویس‌های مالی</p></div>
        {cols.map(c=><div key={c.t} className="nt-footer__col"><h3>{c.t}</h3><ul>{c.l.map(([x,id])=><li key={x}><Link to={PATHS[id]}>{x}</Link></li>)}</ul></div>)}
      </div>
      <div className="nt-footer__disc">
        <p><b>افشای همکاری تجاری</b>نیک‌تراست ممکن است از طریق لینک‌های همکاری درآمد داشته باشد. این همکاری بر معیارهای ارزیابی، امتیاز و ترتیب نتایج اثر ندارد و پلتفرم‌های بدون همکاری نیز بررسی می‌شوند.</p>
        <p><b>هشدار ریسک</b>معامله در بازارهای مالی با ریسک از دست دادن سرمایه همراه است و برای همهٔ افراد مناسب نیست. نیک‌تراست بروکر، صرافی یا مؤسسهٔ مالی نیست و توصیهٔ سرمایه‌گذاری ارائه نمی‌دهد.</p>
      </div>
      <div className="nt-footer__bottom"><span>© ۱۴۰۵ نیک‌تراست</span><nav className="nt-cluster" aria-label="قوانین و سیاست‌ها"><Link to="/terms">شرایط استفاده</Link><Link to="/privacy">حریم خصوصی</Link><Link to="/disclaimer">سلب مسئولیت</Link><Link to="/corrections">اصلاح اطلاعات</Link></nav><span>پژوهش مستقل؛ نه خدمات معامله‌گری</span></div>
    </div>
  </footer>;
}
export default ComponentFooter;
