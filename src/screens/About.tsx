// @ts-nocheck
import React from 'react';
import * as NT from '@/ds';
import { KIcon, SectionHead, PageHead, IconTile, findPlatform } from './Shared';
import NT_DATA from './data';
export function AboutScreen({ go }: any){
  const { ComponentButton, ComponentBadgeStatus } = NT;
  const List = ({ items, tone }) => <ul className="nt-stack" style={{ '--gap': 'var(--sp-12)', margin: 0, padding: 0, listStyle: 'none' }}>{items.map(t => <li key={t} className="nt-pc" style={{ fontSize: 'var(--fs-body)' }}><span className="nt-pc__mark" style={{ background: tone === 'pro' ? 'var(--status-success-subtle)' : 'var(--neutral-100)', color: tone === 'pro' ? 'var(--status-success)' : 'var(--text-secondary)' }}><KIcon name={tone === 'pro' ? 'Check' : 'Close'} size={14}/></span><span>{t}</span></li>)}</ul>;
  return <main>
    <PageHead go={go} crumbs={[{ label: 'نیک‌تراست', id: 'home' }, 'درباره ما']} title="درباره نیک‌تراست"
      desc="نه فروشنده، نه بروکر؛ بلکه ناظر و تحلیل‌گر داده‌محور. یک مرجع تخصصی و بی‌طرف که با داده و تحلیل، مسیر تصمیم‌گیری کاربر را ساده‌تر می‌کند."/>
    <section className="nt-section"><div className="nt-container">
      <SectionHead title="چه می‌کنیم و چه نمی‌کنیم" desc="مرزها همان‌قدر محتوا هستند که توانایی‌ها."/>
      <div className="nt-grid">
        <div className="nt-md-col-6"><div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-20)', height: '100%' }}><h3 className="nt-h4">چه می‌کنیم</h3><List tone="pro" items={['بررسی و مقایسهٔ بروکرها، صرافی‌ها و پراپ‌فرم‌ها', 'نمایش منبع و تاریخ راستی‌آزمایی هر داده', 'انتشار عمومی روش ارزیابی']}/></div></div>
        <div className="nt-md-col-6"><div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-20)', height: '100%' }}><h3 className="nt-h4">چه نمی‌کنیم</h3><List items={['افتتاح حساب یا دریافت سپرده', 'ارائهٔ توصیهٔ سرمایه‌گذاری', 'فروش جایگاه ویرایشی']}/></div></div>
      </div>
    </div></section>
    <section className="nt-section nt-section--alt"><div className="nt-container">
      <SectionHead title="چرا نیک‌تراست؟" desc="سه اصل: بی‌طرف، مستقل، داده‌محور."/>
      <div className="nt-cards" style={{ '--card-min': '280px' }}>
        {[['Diff', 'بی‌طرف', 'هیچ پلتفرمی نمی‌تواند جایگاه ویرایشی بخرد. رتبهٔ ویرایشی، جایگاه تجاری و تبلیغ پرداختی جدا برچسب می‌خورند.'], ['Building', 'مستقل', 'نیک‌تراست بروکر، صرافی و نهاد مالی نیست و هیچ ارتباط تجاری‌ای نتیجهٔ ارزیابی را تغییر نمی‌دهد.'], ['ChartLine', 'داده‌محور', 'هر گزارهٔ قابل راستی‌آزمایی به یک فیلد داده با منبع و تاریخ ثبت وصل است. دادهٔ غایب «اعلام نشده» می‌گیرد، نه صفر.']].map(([ic, t, d]) => <div key={t} className="nt-card nt-stack" style={{ '--gap': 'var(--sp-12)' }}><IconTile name={ic}/><h3 className="nt-h4">{t}</h3><p className="nt-body-sm">{d}</p></div>)}
      </div>
    </div></section>
    <section className="nt-section"><div className="nt-container">
      <div className="nt-grid" style={{ rowGap: 'var(--sp-40)' }}>
        <div className="nt-lg-col-6 nt-stack" style={{ '--gap': 'var(--sp-12)' }}>
          <h2 className="nt-h3">استقلال ویرایشی و درآمد</h2>
          <p className="nt-body">نیک‌تراست ممکن است از همکاری تجاری با برخی پلتفرم‌ها درآمد داشته باشد. این همکاری هیچ‌گاه رتبهٔ ویرایشی را تعیین نمی‌کند. معیارها، وزن‌ها، منابع داده و سیاست همکاری در صفحهٔ روش ارزیابی منتشر می‌شوند.</p>
          <div><ComponentButton type="secondary" onClick={() => go('method')}>مشاهدهٔ روش ارزیابی</ComponentButton></div>
        </div>
        <div className="nt-lg-col-6">
          <div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-12)', borderStyle: 'dashed', borderColor: 'var(--neutral-300)', background: 'var(--surface-subtle-alt)', height: '100%' }}>
            <div className="nt-split" style={{ alignItems: 'center' }}><h2 className="nt-h4">تیم، سابقه و اطلاعات تماس</h2><ComponentBadgeStatus tone="unknown" label="در انتظار تأیید محتوا"/></div>
            <p className="nt-body-sm">این بخش تا تأیید مالک محتوا خالی می‌ماند. نوشتن سابقه یا شمارش ساختگی در صفحه‌ای که ادعای بی‌طرفی دارد، نقض همان بی‌طرفی است.</p>
          </div>
        </div>
      </div>
    </div></section>
  </main>;
}
