// @ts-nocheck
import React from 'react';
const cx=(...a)=>a.filter(Boolean).join(' ');
const pick=(...v)=>v.find(x=>x!==undefined&&x!==null&&x!=='');

/** Site footer — brand, link columns, affiliate disclosure + risk warning on every page. */
export function ComponentFooter(p={}){
  const {device='desktop',logoSrc,onNavigate,className,style}=p;
  const cols=[
    {t:pick(p.text1,'بازارها'),l:[[pick(p.text2,'فارکس'),'brokers'],[pick(p.text3,'کریپتو'),'exchanges'],[pick(p.text4,'پراپ‌فرم'),'prop'],['سایر بازارها','markets']]},
    {t:'درباره نیک‌تراست',l:[['درباره ما','about'],['روش ارزیابی','method'],['تماس با ما'],['سوالات متداول']]},
    {t:'شفافیت',l:[['افشای همکاری تجاری','method'],['بیانیه بی‌طرفی','about'],['سلب مسئولیت']]},
    {t:'قانونی',l:[['شرایط استفاده'],['سیاست حریم خصوصی']]}];
  const go=(e,id)=>{if(onNavigate&&id){e.preventDefault();onNavigate(id)}};
  return <footer className={cx('nt-footer',device==='mobile'&&'nt-footer--mobile',className)} style={style}>
    <div className="nt-container">
      <div className="nt-footer__top">
        <div className="nt-footer__brand">{logoSrc?<img src={logoSrc} alt="NikTrust"/>:<span className="nt-wordmark">نیک‌تراست</span>}<p className="nt-body-sm" style={{margin:0}}>پلتفرم مستقل بررسی و مقایسهٔ سرویس‌های مالی</p></div>
        {cols.map(c=><div key={c.t} className="nt-footer__col"><h3>{c.t}</h3><ul>{c.l.map(([x,id])=><li key={x}><a href={'#'+(id||'')} onClick={e=>go(e,id)}>{x}</a></li>)}</ul></div>)}
      </div>
      <div className="nt-footer__disc">
        <p><b>افشای همکاری تجاری</b>نیک‌تراست ممکن است از طریق لینک‌های همکاری درآمد داشته باشد. این همکاری بر معیارهای ارزیابی، امتیاز و ترتیب نتایج اثر ندارد و پلتفرم‌های بدون همکاری نیز بررسی می‌شوند.</p>
        <p><b>هشدار ریسک</b>معامله در بازارهای مالی با ریسک از دست دادن سرمایه همراه است و برای همهٔ افراد مناسب نیست. نیک‌تراست بروکر، صرافی یا مؤسسهٔ مالی نیست و توصیهٔ سرمایه‌گذاری ارائه نمی‌دهد.</p>
      </div>
      <div className="nt-footer__bottom"><span>© ۱۴۰۵ نیک‌تراست</span><span>نسخهٔ متدولوژی: در صفحهٔ روش ارزیابی</span></div>
    </div>
  </footer>;
}
export default ComponentFooter;
