import { Link } from '@tanstack/react-router';
import { PageHead } from '../Shared';
import { EmptyState } from './Primitives';
import { ComponentButton } from '@/ds';
import { PublicationScreen } from './Publication';
import { PartnerLanding } from '@/screens/prototype/Partner';
import { MembershipScreen } from '@/screens/prototype/Membership';
export function EditorialScreen({ go, title, kind }: { go: (id: string) => void; title: string; kind: string }) {
  if (kind === 'partners') return <PartnerLanding/>;
  if (kind === 'membership' || kind === 'checkout' || kind === 'payment') return <MembershipScreen section={kind === 'checkout' ? 'checkout' : kind === 'payment' ? 'result' : 'landing'}/>;
  if(['learn','glossary','news','article','topic','term','blog'].includes(kind))return <PublicationScreen go={go} title={title} kind={kind}/>;
  const sections: Record<string,{ title: string; body: string }[]> = {
    revenue:[{title:'منابع درآمد و استقلال',body:'همکاری IB، لینک‌های همکاری و عضویت در دامنهٔ محصول قرار دارند؛ نرخ، قرارداد و قیمت تأییدشده‌ای برای این نسخه ارائه نشده است.'},{title:'افشای لینک همکاری',body:'هر لینک همکاری باید کنار اقدام خروجی برچسب «لینک همکاری» داشته باشد. رابطهٔ تجاری وارد امتیاز یا ترتیب فهرست نمی‌شود.'},{title:'اطلاعات اعتماد عمومی',body:'مجوز، امتیاز منتشرشده، هشدار و وضعیت دسترسی ایران پشت قفل عضویت قرار نمی‌گیرند.'}],
    editorial:[{title:'استقلال تحریریه',body:'معیارهای بررسی از روابط تجاری مستقل‌اند. ادعای پلتفرم، تجربهٔ کاربر و تأیید مستقل جدا نمایش داده می‌شوند.'},{title:'منبع، تاریخ و عدم قطعیت',body:'دادهٔ ناموجود «اعلام نشده» و دادهٔ قدیمی «نیازمند بازبینی» نمایش داده می‌شود. امتیاز بدون روش منتشرشده نشان داده نمی‌شود.'}],
    corrections:[{title:'اصلاح داده و تاریخچه',body:'اصلاح خطا باید همراه دلیل، منبع و تاریخ بازبینی ثبت شود. تغییرات عمومی با ارزیابی اولیه اشتباه گرفته نمی‌شوند.'},{title:'گزارش خطا',body:'مسیر دریافت واقعی گزارش هنوز متصل نیست؛ فرم بررسی اولیه، ارسال انجام نمی‌دهد.'}],
    partners:[{title:'همکاری با نیک‌تراست',body:'این برنامهٔ همکاری از تحریریه جداست. شرایط پذیرش، نحوهٔ تأمین کمیسیون، نرخ‌ها و تسویه هنوز به تصمیم مالک و قرارداد معتبر نیاز دارند.'},{title:'مرز همکاری',body:'همکار حق ادعای سود تضمینی، تضمین امنیت یا اثرگذاری تجاری بر ارزیابی را ندارد.'}],
    membership:[{title:'ابزارها و سهمیه‌ها',body:'عضویت می‌تواند امکانات ابزار و سهمیه‌ها را پوشش دهد. دادهٔ اعتماد همیشه عمومی است. قیمت و مزایای نهایی تأیید نشده‌اند.'}],
  };
  return <main><PageHead go={go} title={title} desc="اطلاعات شفاف، با مرز روشن میان دادهٔ منتشرشده و موارد در انتظار تأیید."/><div className="nt-container nt-section nt-stack">
  {(sections[kind] ?? []).map(s => <section className="nt-measure" key={s.title}><h2 className="nt-h3">{s.title}</h2><p className="nt-body">{s.body}</p></section>)}
  {kind === 'team' && <EmptyState title="پروفایل تأییدشدهٔ تیم ارائه نشده است" text="نام، تخصص و سابقهٔ نویسنده یا بررسی‌کننده اختراع نمی‌شود."/>}
  {['learn','glossary','news','article','topic','term'].includes(kind) && <EmptyState title="محتوای تأییدشده هنوز منتشر نشده است" text="مقاله، نویسنده، تاریخ انتشار و منبع ساختگی به‌عنوان محتوای واقعی نمایش داده نمی‌شود."/>}
  {['rules','legal','checkout','payment'].includes(kind) && <EmptyState title={kind === 'payment' ? 'پرداختی برای بررسی وجود ندارد' : kind === 'checkout' ? 'سرویس پرداخت متصل نیست' : 'متن نهایی در انتظار تأیید است'} text="قیمت، قرارداد، تراکنش یا نتیجهٔ موفق فرض نمی‌شود."/>}
  {kind === 'corrections' && <ComponentButton type="secondary" onClick={() => go('report')}>بررسی فرم گزارش</ComponentButton>}
  {kind === 'partners' && <div className="nt-cluster"><Link to="/partners/apply">درخواست همکاری</Link><Link to="/partners/rules">قواعد برنامه</Link><Link to="/partners/dashboard">داشبورد همکار</Link></div>}
  {kind === 'membership' && <div className="nt-cluster"><Link to="/membership/terms">شرایط عضویت</Link><Link to="/account/membership">وضعیت عضویت من</Link></div>}
  <div className="nt-cluster"><Link to="/methodology">روش ارزیابی</Link><Link to="/how-we-make-money">مدل درآمد</Link><Link to="/contact">تماس</Link></div></div></main>;
}