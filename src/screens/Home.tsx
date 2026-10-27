// @ts-nocheck
import React from 'react';
import * as NT from '@/ds';
import { KIcon, SectionHead, PageHead, IconTile, findPlatform } from './Shared';
import NT_DATA from './data';
export function HomeScreen({ go, compare, toggleCompare }){
  const { ComponentButton, ComponentChip, ComponentDataCard, ComponentBadgeStatus } = NT;
  const D = NT_DATA;
  return <main>
    {/* Hero */}
    <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="nt-container nt-section">
        <div className="nt-grid" style={{ alignItems: 'center', rowGap: 'var(--sp-40)' }}>
          <div className="nt-lg-col-7 nt-stack" style={{ '--gap': 'var(--sp-24)' }}>
            <span className="nt-overline">پلتفرم مستقل بررسی و مقایسهٔ سرویس‌های مالی</span>
            <h1 className="nt-display">پلتفرم مالی مناسب خود را پیدا کنید</h1>
            <p className="nt-body-lg" style={{ maxWidth: '56ch' }}>مقایسه، بررسی و داده‌های تأییدشده برای تصمیم‌گیری آگاهانه — بر اساس معیارهای شفاف نیک‌تراست، با ذکر منبع و تاریخ بازبینی روی هر صفحه.</p>
            <div className="nt-cluster" style={{ '--gap': 'var(--sp-12)' }}>
              <ComponentButton type="primary" size="lg" onClick={() => go('compare')}>مقایسه پلتفرم‌ها</ComponentButton>
              <ComponentButton type="secondary" size="lg" onClick={() => go('method')}>روش ارزیابی</ComponentButton>
            </div>
            <ul className="nt-cluster" style={{ '--gap': 'var(--sp-8) var(--sp-24)', margin: 0, padding: 0, listStyle: 'none' }}>
              {['هر بررسی با تاریخ بازبینی و منبع', 'متدولوژی ارزیابی عمومی و قابل‌بازبینی', 'امتیازدهی مستقل از لینک‌های همکاری'].map(t =>
                <li key={t} className="nt-cluster nt-body-sm" style={{ '--gap': '6px', color: 'var(--text-secondary)' }}><span style={{ color: 'var(--status-success)' }}><KIcon name="Check" size={16}/></span>{t}</li>)}
            </ul>
          </div>
          <div className="nt-lg-col-5">
            <div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-16)', boxShadow: 'var(--shadow-1)' }}>
              <label htmlFor="hero-q" className="nt-h4">جستجوی سریع</label>
              <div style={{ position: 'relative' }}>
                <input id="hero-q" className="nt-input" placeholder="نام بروکر، صرافی یا پراپ‌فرم…" style={{ paddingInlineStart: 44 }}/>
                <span style={{ position: 'absolute', insetInlineStart: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><KIcon name="Search" size={18}/></span>
              </div>
              <hr className="nt-divider"/>
              <span className="nt-caption">یا یکی از دسته‌های زیر را انتخاب کنید</span>
              <div className="nt-cluster">{[['بروکرها', 'brokers'], ['صرافی‌ها', 'brokers'], ['پراپ‌فرم‌ها', 'brokers']].map(([l, id]) => <ComponentChip key={l} label={l} size="touch" onClick={() => go(id)}/>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Market hub */}
    <section className="nt-section"><div className="nt-container">
      <SectionHead title="بازارها" desc="شش بازار نیک‌تراست. بازارهایی که هنوز پلتفرم بررسی‌شده‌ای ندارند با وضعیت «در حال افزودن» نمایش داده می‌شوند، نه با شمارش صفر."/>
      <div className="nt-cards" style={{ '--card-min': '300px' }}>
        {D.markets.map(m => {
          const live = !!m.count;
          return <a key={m.title} href="#" onClick={e => { e.preventDefault(); live && go(m.id); }} className="nt-card" style={{ display: 'flex', gap: 'var(--sp-16)', alignItems: 'flex-start', color: 'inherit', textDecoration: 'none', cursor: live ? 'pointer' : 'default', background: live ? 'var(--surface-card)' : 'var(--surface-subtle-alt)' }}>
            <IconTile name={m.icon.replace('ComponentIcon', '')} tone={live ? 'brand' : 'muted'}/>
            <span className="nt-stack" style={{ '--gap': 'var(--sp-4)', flex: 1 }}>
              <span className="nt-h4" style={{ color: live ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{m.title}</span>
              <span className="nt-body-sm">{m.desc}</span>
              <span style={{ marginTop: 'var(--sp-8)' }}>{live ? <ComponentBadgeStatus tone="info" icon={false} label={m.count}/> : <ComponentBadgeStatus tone="unknown" label="در حال افزودن"/>}</span>
            </span>
          </a>;
        })}
      </div>
    </div></section>

    {/* Top reviews */}
    <section className="nt-section nt-section--alt"><div className="nt-container">
      <SectionHead title="بررسی‌های برتر" desc="مرتب‌شده بر اساس امتیاز کلی — امتیاز بالاتر به‌معنای مناسب‌بودن برای هر کاربر نیست. تناسب در هر بررسی توضیح داده شده است." action={<ComponentButton type="tertiary" iconTrailing onClick={() => go('brokers')}>همهٔ بررسی‌ها</ComponentButton>}/>
      <div className="nt-cards" style={{ '--card-min': '340px' }}>
        {D.topReviews.map(r => { const p = r.name ? r : findPlatform(r.id); return <ComponentDataCard key={p.id} {...p} onReview={() => go('review', p.id)} compared={compare.includes(p.id)} onCompare={() => toggleCompare(p.id)}/>; })}
      </div>
    </div></section>

    {/* Promotions */}
    <section className="nt-section"><div className="nt-container">
      <SectionHead title="پیشنهادها" desc="پیشنهادهای پلتفرم‌ها با برچسب تبلیغاتی و تاریخ اعتبار. وجود یک پیشنهاد، تأیید پلتفرم نیست و بر امتیاز آن اثر ندارد."/>
      <div className="nt-grid">
        {[1, 2].map(i => <div key={i} className="nt-md-col-6"><div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-12)', height: '100%', borderStyle: 'dashed', borderColor: 'var(--neutral-300)' }}>
          <div className="nt-split" style={{ alignItems: 'center' }}><ComponentBadgeStatus tone="neutral" icon={false} label="تبلیغ"/><span className="nt-caption">معتبر تا ۱۴۰۵/۰۷/۳۰</span></div>
          <h3 className="nt-h4">{'عنوان پیشنهاد پلتفرم نمونه ' + (i === 1 ? '۱' : '۲')}</h3>
          <p className="nt-body-sm">شرایط به‌صورت خلاصه اعلام می‌شود و متن کامل در صفحهٔ پیشنهاد آمده است.</p>
          <div><ComponentButton type="tertiary" size="sm" iconTrailing>شرایط کامل</ComponentButton></div>
        </div></div>)}
      </div>
    </div></section>

    {/* Tools */}
    <section className="nt-section nt-section--alt"><div className="nt-container">
      <SectionHead title="ابزارهای رایگان" desc="ابزارهای محاسباتی نیک‌تراست. هنوز فعال نشده‌اند و تاریخ انتشار در نقشهٔ راه مشخص می‌شود."/>
      <div className="nt-cards" style={{ '--card-min': '300px' }}>
        {D.tools.map(t => <div key={t.title} className="nt-card" style={{ display: 'flex', gap: 'var(--sp-16)', alignItems: 'flex-start' }}>
          <IconTile name="Calculator" tone="muted"/>
          <span className="nt-stack" style={{ '--gap': 'var(--sp-4)', flex: 1 }}><span className="nt-h4">{t.title}</span><span className="nt-body-sm">{t.desc}</span></span>
          <ComponentBadgeStatus tone="unknown" icon={false} label="به‌زودی"/>
        </div>)}
      </div>
    </div></section>

    {/* Referral */}
    <section className="nt-section"><div className="nt-container">
      <div className="nt-card nt-split" style={{ alignItems: 'center', padding: 'var(--sp-32)', background: 'var(--brand-primary-subtle)', borderColor: 'transparent' }}>
        <div className="nt-stack" style={{ '--gap': 'var(--sp-8)', maxWidth: '60ch' }}><h2 className="nt-h3">برنامه معرفی نیک‌تراست</h2><p className="nt-body">کاربران می‌توانند نیک‌تراست را به دیگران معرفی کنند. شرایط، سطوح و نحوهٔ محاسبهٔ پاداش پس از تصویب در صفحهٔ برنامه اعلام می‌شود.</p></div>
        <ComponentButton type="secondary" disabled>به‌زودی</ComponentButton>
      </div>
    </div></section>
  </main>;
}
