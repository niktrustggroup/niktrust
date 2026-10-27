// @ts-nocheck
import React from 'react';
import * as NT from '@/ds';
import { KIcon, SectionHead, PageHead, IconTile, findPlatform } from './Shared';
import NT_DATA from './data';
export function MethodologyScreen({ go }){
  const { ComponentWeightRow, ComponentBadgeStatus, ComponentBadgeRisk } = NT;
  const toc = [['criteria', 'معیارهای ارزیابی'], ['weights', 'وزن‌دهی معیارها'], ['sources', 'منابع داده'], ['freq', 'دورهٔ به‌روزرسانی'], ['affiliate', 'سیاست همکاری تجاری'], ['states', 'وضعیت‌های داده'], ['publish', 'شرط انتشار امتیاز']];
  const [active, setActive] = React.useState('criteria');
  const jump = (id) => { setActive(id); const el = document.getElementById('m-' + id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' }); };
  const Sec = ({ id, n, title, lead, children }) => <section id={'m-' + id} className="nt-stack" style={{ '--gap': 'var(--sp-16)', scrollMarginTop: 88 }}>
    <div className="nt-stack" style={{ '--gap': 'var(--sp-8)' }}><span className="nt-overline">{'بخش ' + n}</span><h2 className="nt-h2">{title}</h2>{lead && <p className="nt-body nt-measure">{lead}</p>}</div>
    {children}
  </section>;
  return <main>
    <PageHead go={go} crumbs={[{ label: 'نیک‌تراست', id: 'home' }, 'روش ارزیابی']} title="روش ارزیابی نیک‌تراست"
      desc="چه چیزی را، با چه معیاری، از چه منبعی و در چه فاصلهٔ زمانی ارزیابی می‌کنیم — و کجا هنوز تصمیمی نگرفته‌ایم."
      meta={<div className="nt-cluster" style={{ marginTop: 'var(--sp-8)' }}><ComponentBadgeStatus tone="unknown" label="نسخهٔ روش‌شناسی: نیازمند تصمیم"/></div>}/>
    <div className="nt-container nt-section" style={{ paddingTop: 'var(--sp-40)' }}>
      <div className="nt-grid" style={{ alignItems: 'start' }}>
        <nav className="nt-lg-col-3 k-desk-only nt-sticky" aria-label="فهرست مطالب">
          <ol className="nt-stack" style={{ '--gap': '2px', margin: 0, padding: 0, listStyle: 'none', borderInlineStart: '1px solid var(--border-subtle)' }}>
            {toc.map(([id, l], i) => <li key={id}><a href={'#m-' + id} onClick={e => { e.preventDefault(); jump(id); }} style={{ display: 'flex', gap: 'var(--sp-8)', padding: 'var(--sp-8) var(--sp-16)', marginInlineStart: -1, borderInlineStart: '2px solid ' + (active === id ? 'var(--brand-primary)' : 'transparent'), fontSize: 'var(--fs-body-sm)', fontWeight: active === id ? 600 : 400, color: active === id ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none' }}><span style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{(i + 1).toLocaleString('fa-IR')}</span>{l}</a></li>)}
          </ol>
        </nav>
        <div className="nt-lg-col-9 nt-stack" style={{ '--gap': 'var(--sp-64)' }}>
          <Sec id="criteria" n="۱" title="معیارهای ارزیابی" lead="معیارها به‌ازای هر دستهٔ پلتفرم جدا تعریف می‌شوند. یک بروکر فارکس، یک صرافی کریپتو و یک پراپ‌فرم ریسک و معیار یکسان ندارند.">
            <div className="nt-cards" style={{ '--card-min': '240px' }}>
              {[['بروکر فارکس', 'شش معیار تعریف‌شده', true], ['صرافی کریپتو', 'معیار تعریف‌شده ندارد', false], ['پراپ‌فرم', 'معیار تعریف‌شده ندارد', false]].map(([t, d, ok]) => <div key={t} className="nt-card nt-stack" style={{ '--gap': 'var(--sp-12)' }}>
                <h3 className="nt-h4">{t}</h3><p className="nt-body-sm">{d}</p>
                <div>{ok ? <ComponentBadgeStatus tone="positive" label="تعریف‌شده"/> : <ComponentBadgeStatus tone="unknown" label="اطلاعات کافی وجود ندارد"/>}</div>
              </div>)}
            </div>
          </Sec>
          <Sec id="weights" n="۲" title="وزن‌دهی معیارها" lead="چهار بُعد امتیاز نیک‌تراست در مدل داده وجود دارند، ولی وزن هیچ‌کدام تأیید نشده است. تا تأیید نهایی، هیچ وزنی اعلام و هیچ امتیاز کلی‌ای منتشر نمی‌شود.">
            <div className="nt-card" style={{ paddingBlock: 0 }}>{[['Trust', 'score_trust'], ['Risk', 'score_risk'], ['Transparency', 'score_transparency'], ['Suitability', 'score_suitability']].map(([c, f]) => <ComponentWeightRow key={c} criterion={c} field={f}/>)}</div>
            <div className="nt-note nt-note--caution"><KIcon name="Warning" size={18}/><div><b>جهت بُعد Risk تعیین نشده است.</b> مشخص نیست عدد بالاتر یعنی ریسک بیشتر یا کمتر؛ تا تعیین جهت، هیچ سلول Risk در مقایسه هایلایت نمی‌شود.</div></div>
          </Sec>
          <Sec id="sources" n="۳" title="منابع داده" lead="هر بخش از دادهٔ هر پلتفرم یک منبع و یک تاریخ راستی‌آزمایی جدا دارد. ترتیب زیر ترتیب اولویت است.">
            <ol className="nt-card" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {[['سایت رسمی نهاد ناظر', 'regulation_entries · regulator_url'], ['اسناد و صفحات رسمی پلتفرم', '*_source_url · *_source_note'], ['شواهد پرداخت', 'payout_evidence_status'], ['تاریخ راستی‌آزمایی', '*_verified_at · last_verified_date']].map(([t, f], i) => <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-16)', padding: 'var(--sp-16) var(--card-pad)', borderTop: i ? '1px solid var(--border-subtle)' : 0 }}>
                <span className="nt-data" style={{ width: 28, height: 28, borderRadius: 'var(--r-pill)', background: 'var(--bg-subtle)', display: 'grid', placeItems: 'center', fontSize: 13 }}>{(i + 1).toLocaleString('fa-IR')}</span>
                <span style={{ flex: 1, fontWeight: 600 }}>{t}</span><span className="nt-code">{f}</span></li>)}
            </ol>
            <p className="nt-body-sm nt-measure"><b className="nt-text-primary">چه چیزی منبع ما نیست:</b> آزمون مستقلِ اجرا، حساب آزمایشی و نظرسنجی کاربران جزو منابع ما نیستند.</p>
          </Sec>
          <Sec id="freq" n="۴" title="دورهٔ به‌روزرسانی" lead="دورهٔ بازبینی به‌ازای نوع محتوا تعریف شده است. هر بخش داده که بیش از ۳۰ روز از راستی‌آزمایی‌اش گذشته باشد، برچسب «نیازمند به‌روزرسانی» می‌گیرد.">
            <div className="nt-ctable-wrap"><table className="nt-ctable" style={{ '--ct-min': '520px', tableLayout: 'auto' }}>
              <thead><tr>{['محتوا', 'دورهٔ بازبینی'].map(h => <th key={h} scope="col" className="nt-caption" style={{ fontWeight: 600, color: 'var(--text-table-header)', paddingBlock: 'var(--sp-12)', background: 'var(--bg-subtle)' }}>{h}</th>)}</tr></thead>
              <tbody>{[['بررسی بروکر، صرافی و پراپ‌فرم', 'هر ۱ ماه، یا با هر تغییر اعلام‌شده'], ['صفحهٔ مقایسه', 'هر ۳ ماه'], ['هاب دسته و بازار', 'هر ۶ ماه'], ['همین صفحهٔ روش ارزیابی', 'با هر تغییر رویکرد'], ['فاصلهٔ بازمحاسبهٔ امتیاز', null]].map(([a, b]) => <tr key={a}><td style={{ fontWeight: 500 }}>{a}</td><td>{b || <ComponentBadgeStatus tone="unknown" label="نیازمند تصمیم"/>}</td></tr>)}</tbody>
            </table></div>
          </Sec>
          <Sec id="affiliate" n="۵" title="سیاست همکاری تجاری" lead="نیک‌تراست ممکن است از همکاری تجاری درآمد داشته باشد. این همکاری در هیچ نقطه‌ای وارد ارزیابی نمی‌شود.">
            <dl className="nt-card" style={{ margin: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', padding: 0 }}>
              {[['رتبهٔ ویرایشی', 'بر پایهٔ معیارها و وزن‌های اعلام‌شدهٔ همین صفحه تعیین می‌شود و از همکاری تجاری اثر نمی‌گیرد.'], ['جایگاه تجاری', 'هر جایگاهی که پرداختی پشتش باشد، برچسب صریح می‌گیرد و از فهرست ویرایشی جدا می‌شود.'], ['لینک همکاری', 'فقط در قاب مجزای همکاری تجاری در صفحهٔ بررسی قرار می‌گیرد.'], ['شرط نمایش لینک', 'پلتفرم دارای هشدار هیچ لینک تجاری‌ای نمی‌گیرد.'], ['افشا', 'وجود رابطهٔ تجاری در فوتر همهٔ صفحات و در خودِ قاب همکاری اعلام می‌شود.']].map(([t, d], i) => <div key={t} className="k-dl-row" style={{ borderTop: i ? '1px solid var(--border-subtle)' : 0 }}><dt>{t}</dt><dd className="nt-body-sm">{d}</dd></div>)}
            </dl>
          </Sec>
          <Sec id="states" n="۶" title="وضعیت‌های داده" lead="هر مقدار در تمام صفحات یکی از این چهار وضعیت را دارد. دادهٔ خالی هرگز صفر نمایش داده نمی‌شود.">
            <div className="nt-cards" style={{ '--card-min': '220px' }}>
              {[['positive', 'تأییدشده', 'منبع و تاریخ راستی‌آزمایی ثبت شده و تازه است.'], ['neutral', 'اعلام نشده', 'پلتفرم مقدار را اعلام نکرده یا منبعی برای آن نیست.'], ['unknown', 'در حال بررسی', 'مقدار در دست راستی‌آزمایی است و تا تأیید منتشر نمی‌شود.'], ['caution', 'نیازمند به‌روزرسانی', 'بیش از ۳۰ روز از تاریخ راستی‌آزمایی گذشته است.']].map(([t, l, d]) => <div key={l} className="nt-card nt-stack" style={{ '--gap': 'var(--sp-12)' }}><div><ComponentBadgeStatus tone={t} label={l}/></div><p className="nt-body-sm">{d}</p></div>)}
            </div>
          </Sec>
          <Sec id="publish" n="۷" title="شرط انتشار امتیاز" lead="امتیاز یک پلتفرم تنها وقتی منتشر می‌شود که هر دو شرط زیر برقرار باشند؛ در غیر این صورت «امتیازدهی در دست بررسی» نمایش داده می‌شود.">
            <div className="nt-grid">{[['نسخهٔ روش‌شناسی منتشرشده', 'methodology_version'], ['تاریخ تأیید امتیاز', 'score_verified_at']].map(([t, f]) => <div key={f} className="nt-md-col-6"><div className="nt-card nt-stack" style={{ '--gap': 'var(--sp-8)' }}><span className="nt-h4">{t}</span><span className="nt-code">{f}</span><div style={{ marginTop: 'var(--sp-8)' }}><ComponentBadgeStatus tone="unknown" label="برقرار نیست"/></div></div></div>)}</div>
          </Sec>
        </div>
      </div>
    </div>
  </main>;
}
