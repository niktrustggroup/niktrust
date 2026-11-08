import { Link } from '@tanstack/react-router';
import { ComponentButton } from '@/ds';
import { KIcon } from '../Shared';
import { RESEARCH_NAV } from '@/ds/navigation';
import { PATHS } from '@/ds/paths';
import type { PlatformDetail } from '@/api/types';
export function CategoryDirectory() {
  return <nav className="nt-category-directory" aria-label="دسته‌های نیک‌تراست">{RESEARCH_NAV.map(n=><Link key={n.id} to={PATHS[n.id] ?? "/"}><KIcon name={n.icon} size={25}/><span>{n.label}</span></Link>)}</nav>;
}
export function ResearchAside() {
  return <aside className="nt-research-aside"><h3>پیش از تصمیم، بررسی کنید</h3>{[
    {to:'/finder',title:'معیارهای شما چیست؟',desc:'انتخاب هدایت‌شدهٔ پلتفرم'},
    {to:'/check',title:'یک نام ناآشنا دیده‌اید؟',desc:'استعلام و بررسی شواهد'},
    {to:'/compare',title:'گزینه‌ها را کنار هم ببینید',desc:'مقایسهٔ هزینه و محدودیت‌ها'},
    {to:'/alerts',title:'هشدارها و گزارش‌ها',desc:'ادعا، منبع و وضعیت بررسی'},
  ].map(x=><Link to={x.to} key={x.to}><span>{x.title}<small>{x.desc}</small></span><KIcon name="ArrowStart" size={16}/></Link>)}<p>نبودن هشدار یا وجود یک نام در فهرست، به معنی تأیید اعتبار نیست.</p></aside>;
}
export function PlatformRow({platform:p,go}:{platform:PlatformDetail;go:(id:string,arg?:string)=>void}) {
  return <article className="nt-platform-row"><span className="nt-logo">{p.name_fa.slice(0,1)}</span><div><h3>{p.name_fa}</h3><p>{p.category_fa} · دسترسی ایران: نامشخص</p></div><ComponentButton type="secondary" size="sm" onClick={()=>go('review',p.id)} iconTrailing>بررسی پروفایل</ComponentButton></article>;
}
export function DueDiligenceSteps() {
  return <div className="nt-steps">{[
    ['مجوز و شخص حقوقی','نام نهاد ناظر، دامنهٔ مجوز و شرکت طرف قرارداد را جدا بررسی کنید.'],
    ['هزینه‌های واقعی','کارمزد، اسپرد، برداشت و محدودیت‌های حساب را کنار هم ببینید.'],
    ['دسترسی از ایران','وضعیت دسترسی، اطمینان و تاریخ شواهد را بررسی کنید.'],
    ['منبع و بازبینی','ادعای پلتفرم را با دادهٔ مستقل یا تجربهٔ کاربر یکسان نگیرید.'],
  ].map(([title,text],i)=><article className="nt-step" key={title}><span>{(i+1).toLocaleString('fa-IR',{minimumIntegerDigits:2})}</span><h3>{title}</h3><p>{text}</p></article>)}</div>;
}
export function SelectionDock({compare,go,clear}:{compare:string[];go:(id:string)=>void;clear?:()=>void}) {
  if(!compare.length)return null;
  return <div className="nt-selection-dock"><div className="nt-container"><div><strong>{compare.length.toLocaleString('fa-IR')} پلتفرم در فهرست مقایسه</strong><small>مقایسهٔ دو تا چهار پلتفرم همدسته</small></div><div className="nt-cluster">{clear&&<ComponentButton type="tertiary" size="sm" onClick={clear}>پاک کردن</ComponentButton>}<ComponentButton size="sm" iconLeading="ComponentIconDiff" onClick={()=>go('compare')}>مشاهدهٔ مقایسه</ComponentButton></div></div></div>;
}