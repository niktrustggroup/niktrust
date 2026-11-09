import { ComponentButton, ComponentBadgeStatus } from '@/ds';
import { usePublicPlatforms } from '@/api/client';
import { CATEGORY_INFO, verifiedDate } from '@/api/discovery';
import { PageHead } from './Shared';
import { EmptyState } from './product/Primitives';
import { persianDate } from '@/api/format';
import { Link } from '@tanstack/react-router';
import { PlatformRow } from './product/Discovery';
import { SpecificationTable, PlatformHistory, UserReviewPanel } from './product/ReviewParts';
import { RelatedArticles } from './product/ContentParts';
export function ReviewScreen({ go, compare, toggleCompare, id }: { go: (id:string,arg?:string)=>void;compare:string[];toggleCompare:(id:string)=>void;id?:string }) {
  const { platforms }=usePublicPlatforms(); const p=platforms.find(p=>p.id===id||p.slug===id);
  if(!p)return <main className="nt-container nt-section"><EmptyState title="پروفایل عمومی منتشرشده پیدا نشد" action={<Link to="/">بازگشت به نیک‌تراست</Link>}/></main>;
  const sections=[['overview','معرفی'],['specs','مشخصات کلیدی'],['iran','دسترسی ایران'],['costs','هزینه‌ها و شرایط'],['legal','مجوز و شخص حقوقی'],['analysis','مزایا و محدودیت‌ها'],['sources','منابع'],['history','تاریخچهٔ تغییرات'],['users','نظر کاربران']] as const;
  const select=(re:RegExp)=>p.key_attributes.filter(a=>re.test(a.label));
  const legal=select(/شخص حقوقی|حوزهٔ قضایی|مجوز|رگولات|نهاد ناظر|کشور/);
  const costs=select(/هزینه|کارمزد|اسپرد|کمیسیون|حداقل|حساب|چالش|سود|زیان|افت|پرداخت/);
  const iran=select(/ایران|ثبت‌نام|واریز|برداشت|احراز|محدودیت/);
  return <main><PageHead go={go} crumbs={[{label:'نیک‌تراست',id:'home'},{label:p.category_fa,id:p.category},p.name_fa]} title={p.name_fa+' — بررسی'} desc={p.summary_fa}/><div className="nt-container nt-section">
    <div className="nt-review-meta"><span className="nt-logo" aria-label="لوگوی پلتفرم ارائه نشده">{p.name_fa.slice(0,1)}</span><ComponentBadgeStatus tone="neutral" label={p.coverage_level==='full_review'?'بررسی کامل':p.coverage_level==='basic_profile'?'پروفایل پایه':'اطلاعات محدود'}/><span>به‌روزرسانی اطلاعات: {persianDate(p.updated_at)}</span><span>تأیید مستقل مشخصات: {persianDate(verifiedDate(p))}</span><span>نویسنده و بازبین: اعلام نشده</span></div>
    <div className="nt-review-layout nt-product-grid"><div className="nt-review-body">
      <section id="review-overview"><h2>معرفی پلتفرم</h2><p>{p.summary_fa}</p><p className="nt-caption">خدمات، مخاطبان هدف و محدودیت‌ها فقط در حد اطلاعات ثبت‌شده نمایش داده می‌شوند. نشانی رسمی و لوگوی تأییدشده در قرارداد فعلی ارائه نشده است.</p></section>
      <section id="review-specs"><h2>مشخصات کلیدی</h2><SpecificationTable attributes={p.key_attributes}/></section>
      <section id="review-iran"><h2>دسترسی از ایران</h2><div className="nt-review-risk"><p>وضعیت: نامشخص · اطمینان: نامشخص</p><p>منبع: {p.iran_access.evidence.source_name} · بررسی: {persianDate(p.iran_access.evidence.verified_at)}</p><p>منشأ: {p.iran_access.evidence.claim_origin==='independent'?'مستقل':'اعلامی پلتفرم'} · {p.iran_access.evidence.is_stale?'نیازمند بازبینی':'وضعیت دسترسی تأیید نشده'}</p>{p.iran_access.evidence.source_url&&<a href={p.iran_access.evidence.source_url} rel="noopener noreferrer" target="_blank">مشاهدهٔ شواهد دسترسی</a>}</div><SpecificationTable attributes={iran}/></section>
      <section id="review-costs"><h2>هزینه‌ها و شرایط</h2><SpecificationTable attributes={costs}/></section>
      <section id="review-legal"><h2>مجوز و اطلاعات حقوقی</h2><SpecificationTable attributes={legal}/><p className="nt-review-risk">وجود مجوز، تضمین امنیت یا حذف ریسک مالی نیست؛ شخص حقوقی و دامنهٔ مجوز باید جدا بررسی شوند.</p></section>
      <section id="review-analysis"><h2>مزایا و محدودیت‌ها</h2><EmptyState title="تحلیل متوازن تأییدشده منتشر نشده است" text="از مشخصات خام، مزیت یا نتیجه‌گیری دربارهٔ ایمنی پلتفرم ساخته نمی‌شود."/></section>
      <section id="review-sources"><h2>منابع و تأیید اطلاعات</h2>{p.key_attributes.map(a=><article className="nt-source-record" key={a.label}><h3>ادعای مرتبط: {a.label}</h3><p>{a.evidence.source_name}</p><p className="nt-caption">نوع: {a.evidence.claim_origin==='independent'?'مستقل':'اعلامی پلتفرم'} · آخرین بررسی: {persianDate(a.evidence.verified_at)} · {a.evidence.is_stale?'نیازمند بازبینی':a.value_status==='in_review'?'در حال بررسی':a.value_status==='unknown'?'تأیید نشده':'وضعیت مطابق منبع ثبت‌شده'}</p>{a.evidence.source_url?<a href={a.evidence.source_url} rel="noopener noreferrer" target="_blank">مشاهدهٔ منبع</a>:<p className="nt-caption">نشانی منبع اعلام نشده است.</p>}</article>)}<nav className="nt-page-category-links"><Link to="/methodology">روش ارزیابی</Link><Link to="/editorial-policy">سیاست تحریریه</Link><Link to="/disclosure">افشای تجاری</Link><Link to="/corrections">اصلاح اطلاعات</Link></nav></section>
      <section id="review-history"><h2>تاریخچهٔ تغییرات</h2><PlatformHistory platformId={p.id}/></section>
      <section id="review-users"><h2>تجربهٔ کاربران</h2><UserReviewPanel/></section>
      <section><h2>پلتفرم‌های همدسته</h2>{platforms.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,3).map(x=><PlatformRow platform={x} go={go} key={x.id}/>)}{!platforms.some(x=>x.category===p.category&&x.id!==p.id)&&<EmptyState title="پلتفرم عمومی همدسته موجود نیست"/>}</section>
      <RelatedArticles topic={CATEGORY_INFO[p.category].topic}/>
    </div><aside className="nt-review-sidebar"><div className="nt-review-summary"><h2>خلاصهٔ بررسی</h2><p>امتیاز عددی تا تأیید روش و وزن‌ها منتشر نمی‌شود.</p><ComponentButton iconLeading="ComponentIconDiff" onClick={()=>compare.includes(p.id)?go('compare'):toggleCompare(p.id)}>{compare.includes(p.id)?'مشاهدهٔ مقایسه':'افزودن به مقایسه'}</ComponentButton><Link to="/methodology">روش ارزیابی</Link></div><nav className="nt-review-toc" aria-label="فهرست بررسی">{sections.map(([id,title])=><a key={id} href={'#review-'+id}>{title}</a>)}</nav><div className="nt-review-risk">رابطهٔ تجاری: {p.disclosure.is_affiliate?'اعلام شده؛ جدا از ارزیابی':'در این رکورد اعلام نشده'}{p.disclosure.is_affiliate&&p.disclosure.url&&<p><a href={p.disclosure.url} rel="sponsored noopener noreferrer" target="_blank">لینک همکاری</a></p>}<Link to="/disclosure">شفافیت تجاری</Link></div></aside></div></div></main>;
}
