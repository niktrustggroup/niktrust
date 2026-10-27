// @ts-nocheck
import React from 'react';
import * as NT from '@/ds';
import { KIcon, SectionHead, PageHead, IconTile, findPlatform } from './Shared';
import NT_DATA from './data';
export function ReviewScreen({ go, compare, toggleCompare, id = 'a' }){
  const { ComponentButton, ComponentRatingBadge, ComponentTrustIndicator, ComponentBadgeStatus, ComponentAffiliateZone, ComponentProsConsItem, ComponentSpecRow, ComponentAccordionSection } = NT;
  const inCompare = compare.includes(id);
  const sections = [
    { t: '۴. حساب‌ها و شرایط', s: 'انواع حساب، اسپرد، کمیسیون و اهرم.', open: true, body: <div className="nt-grid">
      {[['استاندارد', '$100', '1.2 pip', 'ندارد'], ['ECN', '$500', '0.1 pip', '$7 / لات']].map(([n, d, sp, c]) => <div key={n} className="nt-md-col-6"><div className="nt-card nt-card--alt" style={{ paddingBlock: 'var(--sp-8)' }}><h4 className="nt-label" style={{ paddingBlock: 'var(--sp-8)', margin: 0, fontSize: 'var(--fs-body)' }}>{'حساب ' + n}</h4><ComponentSpecRow label="حداقل واریز" value={d}/><ComponentSpecRow label="اسپرد از" value={sp}/><ComponentSpecRow label="کمیسیون" value={c}/></div></div>)}
    </div> },
    { t: '۵. رگولاتوری و امنیت', s: 'مجوزها، نهاد ناظر و تفکیک حساب مشتریان.', body: <div><ComponentSpecRow label="نهاد ناظر" value="FCA (UK)"/><ComponentSpecRow label="شمارهٔ مجوز" value="000000"/><ComponentSpecRow label="تفکیک حساب مشتری" state="inreview"/><ComponentSpecRow label="صندوق جبران خسارت" state="notdeclared"/></div> },
    { t: '۶. واریز و برداشت', s: 'روش‌ها، زمان پردازش و کارمزد.', body: <div><ComponentSpecRow label="واریز ریالی" value="دارد"/><ComponentSpecRow label="تتر (TRC20)" value="دارد"/><ComponentSpecRow label="زمان برداشت" value="۱ تا ۳ روز کاری" state="stale"/><ComponentSpecRow label="کارمزد برداشت" state="notdeclared"/></div> },
    { t: '۷. پلتفرم معاملاتی', s: 'MetaTrader، وب‌تریدر و اپلیکیشن موبایل.', body: <div><ComponentSpecRow label="MetaTrader 4" value="دارد"/><ComponentSpecRow label="MetaTrader 5" value="دارد"/><ComponentSpecRow label="اپلیکیشن اختصاصی" state="inreview"/></div> },
    { t: '۸. نظرات کاربران', s: 'پس از نسخهٔ اول فعال می‌شود.', post: true },
    { t: '۹. جمع‌بندی', s: 'برای چه کسانی مناسب است و برای چه کسانی نه.', body: <p className="nt-body nt-measure">این بروکر برای معامله‌گرانی که به رگولاتوری سطح ۱ و واریز ریالی اهمیت می‌دهند گزینهٔ قابل بررسی است. اطلاعات کارمزد برداشت اعلام نشده و پیش از تصمیم باید از خود پلتفرم استعلام شود.</p> }
  ];
  const faqs = ['آیا این بروکر برای کاربران ایرانی حساب باز می‌کند؟', 'حداقل واریز برای شروع چقدر است؟', 'امتیاز نیک‌تراست چگونه محاسبه می‌شود؟'];
  return <main>
    <PageHead go={go} crumbs={[{ label: 'نیک‌تراست', id: 'home' }, { label: 'بروکرهای فارکس', id: 'brokers' }, 'بروکر نمونهٔ الف']}
      title="بروکر نمونهٔ الف (ساختگی) — بررسی بروکر"
      desc="ارزیابی بر اساس معیارهای نیک‌تراست · امتیاز ۰ تا ۱۰"
      meta={<div className="nt-cluster" style={{ '--gap': 'var(--sp-8) var(--sp-16)', marginTop: 'var(--sp-8)' }}><ComponentBadgeStatus tone="positive" label="رگولاتوری تأییدشده"/><ComponentBadgeStatus tone="info" icon={false} label="واریز ریالی"/><ComponentTrustIndicator/></div>}/>
    <div className="nt-container nt-section" style={{ paddingTop: 'var(--sp-32)' }}>
      <div className="nt-grid" style={{ alignItems: 'start', rowGap: 'var(--sp-32)' }}>
        {/* Summary — first on mobile, sticky side column on desktop */}
        <aside className="nt-lg-col-4 nt-stack" style={{ '--gap': 'var(--sp-16)' }} data-sticky>
          <div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-20)' }}>
            <div className="nt-split" style={{ alignItems: 'center' }}><span className="nt-h4">خلاصهٔ ارزیابی</span><a href="#" className="nt-caption" onClick={e => { e.preventDefault(); go('method'); }}>روش ارزیابی</a></div>
            <div className="k-sum-grid"><ComponentRatingBadge score="۷٫۱" style={{ border: 0, padding: 0 }}/>
            <div className="nt-stack" style={{ '--gap': 'var(--sp-12)' }}>
              <ComponentRatingBadge kind="dimension" label="اعتماد" score="۷٫۸"/>
              <ComponentRatingBadge kind="dimension" label="شفافیت" score="۶٫۸"/>
              <ComponentRatingBadge kind="dimension" label="رگولاتوری" score="۸٫۲"/>
              <ComponentRatingBadge kind="dimension" label="ریسک" state="empty"/>
            </div></div>
            <p className="nt-caption">بر اساس ۴ معیار نیک‌تراست. امتیاز بالاتر به معنای مناسب‌بودن برای همه نیست.</p>
            <div className="nt-stack" style={{ '--gap': 'var(--sp-8)' }}>
              <ComponentButton type="primary" block iconLeading={inCompare ? 'ComponentIconCheck' : 'ComponentIconDiff'} onClick={() => inCompare ? go('compare') : toggleCompare(id)}>{inCompare ? 'مشاهدهٔ مقایسه' : 'افزودن به مقایسه'}</ComponentButton>
            </div>
          </div>
          <ComponentAffiliateZone/>
        </aside>

        <div className="nt-lg-col-8 nt-stack" style={{ '--gap': 'var(--sp-24)' }}>
          <section className="nt-stack" style={{ '--gap': 'var(--sp-12)' }}>
            <h2 className="nt-h3">۱. معرفی</h2>
            <p className="nt-body nt-measure">بروکر نمونهٔ الف یک بروکر فارکس با مجوز سطح ۱ است که حساب استاندارد و ECN ارائه می‌دهد. این بررسی بر پایهٔ داده‌های اعلامی پلتفرم و منابع نهاد ناظر تهیه شده و تاریخ راستی‌آزمایی هر بخش کنار همان داده آمده است.</p>
          </section>
          <section className="nt-stack" style={{ '--gap': 'var(--sp-16)' }}>
            <h2 className="nt-h3">۲. مزایا و محدودیت‌ها</h2>
            <div className="nt-grid">
              <div className="nt-md-col-6"><div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-16)', height: '100%' }}><h3 className="nt-label" style={{ margin: 0 }}>مزایا</h3><ul className="nt-stack" style={{ '--gap': 'var(--sp-12)', margin: 0, padding: 0 }}><ComponentProsConsItem label="رگولاتوری سطح ۱ با شمارهٔ مجوز قابل بررسی"/><ComponentProsConsItem label="واریز ریالی و تتر"/><ComponentProsConsItem label="حساب ECN با اسپرد پایین"/></ul></div></div>
              <div className="nt-md-col-6"><div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-16)', height: '100%' }}><h3 className="nt-label" style={{ margin: 0 }}>محدودیت‌ها</h3><ul className="nt-stack" style={{ '--gap': 'var(--sp-12)', margin: 0, padding: 0 }}><ComponentProsConsItem tone="con" label="کارمزد برداشت اعلام نشده است"/><ComponentProsConsItem tone="con" label="زمان برداشت نیازمند به‌روزرسانی است"/></ul></div></div>
            </div>
          </section>
          <section className="nt-stack" style={{ '--gap': 'var(--sp-16)' }}>
            <h2 className="nt-h3">۳. مشخصات کلیدی</h2>
            <div className="nt-card" style={{ paddingBlock: 'var(--sp-4)' }}>
              <div className="nt-grid" style={{ rowGap: 0 }}>
                <div className="nt-md-col-6"><ComponentSpecRow label="حداقل واریز" value="$100"/><ComponentSpecRow label="حداکثر اهرم" value="1:500"/><ComponentSpecRow label="اسپرد EUR/USD" value="0.8 pip"/></div>
                <div className="nt-md-col-6"><ComponentSpecRow label="سال تأسیس" value="۱۳۹۰"/><ComponentSpecRow label="ابزارهای معاملاتی" value="۲۵۰+"/><ComponentSpecRow label="حساب اسلامی" state="notdeclared"/></div>
              </div>
            </div>
          </section>
          <div className="nt-stack" style={{ '--gap': 'var(--sp-12)' }}>
            {sections.map(s => <ComponentAccordionSection key={s.t} title={s.t} summary={s.s} state={s.post ? 'postmvp' : s.open ? 'expanded' : 'collapsed'}>{s.body}</ComponentAccordionSection>)}
          </div>
          <section className="nt-stack" style={{ '--gap': 'var(--sp-16)' }}>
            <h2 className="nt-h3">۱۰. پرسش‌های متداول</h2>
            <div className="nt-stack" style={{ '--gap': 'var(--sp-8)' }}>{faqs.map(q => <ComponentAccordionSection key={q} title={q} summary="" state="collapsed"><p className="nt-body nt-measure">پاسخ بر اساس دادهٔ تأییدشده و با ذکر منبع در اینجا نمایش داده می‌شود.</p></ComponentAccordionSection>)}</div>
          </section>
        </div>
      </div>
    </div>
  </main>;
}
