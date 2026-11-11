export const CATEGORY_NAV = [
  { id:'brokers', label:'بروکرهای فارکس', icon:'ChartLine', intro:'هزینه، مجوز و شرایط حساب؛ پیش از افتتاح حساب بررسی کنید.', groups:[
    {title:'کشف و بررسی',links:[['فهرست بروکرها','brokers'],['انتخاب بر اساس معیار شما','finder'],['مقایسهٔ بروکرها','compare']]},
    {title:'اعتبار و شفافیت',links:[['استعلام پلتفرم','check'],['هشدارها و گزارش‌ها','alerts'],['روش ارزیابی','method']]}]},
  { id:'exchanges',label:'صرافی‌های رمزارز',icon:'Coin',intro:'کارمزدها، برداشت و محدودیت دسترسی کاربران ایرانی.',groups:[
    {title:'فهرست صرافی‌ها',links:[['همهٔ صرافی‌ها','exchanges'],['صرافی‌های ایرانی','iranian'],['صرافی‌های بین‌المللی','international']]},
    {title:'پیش از انتخاب',links:[['مقایسهٔ صرافی‌ها','compare'],['استعلام صرافی','check'],['هشدارهای برداشت','alerts']]}]},
  { id:'prop',label:'پراپ‌فرم‌ها',icon:'Target',intro:'قواعد چالش، محدودیت ریسک و شواهد پرداخت را کنار هم ببینید.',groups:[
    {title:'کشف پراپ‌فرم',links:[['فهرست پراپ‌فرم‌ها','prop'],['انتخاب هدایت‌شده','finder'],['مقایسهٔ پراپ‌فرم‌ها','compare']]},
    {title:'بررسی شواهد',links:[['استعلام پراپ‌فرم','check'],['گزارش یک مشکل','report'],['معیارهای ارزیابی','method']]}]},
  { id:'markets',label:'بازارهای مالی',icon:'ChartLine',intro:'نمای بازار و ابزار تحلیل؛ هر داده همراه منبع و زمان.',groups:[
    {title:'بازار و تحلیل',links:[['نمای کلی بازار','markets'],['ترمینال تحلیلی','terminal'],['اخبار و تحلیل','news']]},
    {title:'پژوهش مستقل',links:[['مرکز هشدارها','alerts'],['سیاست تحریریه','editorial'],['واچ‌لیست من','watchlist']]}]},
  { id:'tools',label:'ابزارهای معامله‌گری',icon:'Calculator',intro:'مقایسهٔ داده‌ها و ابزارهای بررسی هزینه و ریسک.',groups:[
    {title:'ابزارهای پژوهش',links:[['مقایسهٔ پلتفرم‌ها','compare'],['انتخاب هدایت‌شده','finder'],['استعلام اعتبار','check']]},
    {title:'ماشین‌حساب‌ها',links:[['همهٔ ابزارها','tools'],['سود و زیان','profitLoss'],['مارجین و اهرم','margin'],['هزینهٔ شب‌مانی','swap']]}]},
  { id:'learn',label:'آموزش مالی',icon:'Layers',intro:'مفاهیم، معیارهای انتخاب و چارچوب ارزیابی مستقل.',groups:[
    {title:'مسیر یادگیری',links:[['مرکز آموزش','learn'],['واژه‌نامهٔ مالی','glossary'],['مجلهٔ نیک‌تراست','blog']]},
    {title:'شناخت نیک‌تراست',links:[['روش ارزیابی','method'],['سیاست تحریریه','editorial'],['مدل درآمد','revenue'],['تیم و بررسی‌کنندگان','team']]}]},
  { id:'news',label:'اخبار و تحلیل',icon:'Info',intro:'خبر، تحلیل و هشدار با مرز روشن میان ادعا و شواهد.',groups:[
    {title:'اتاق خبر',links:[['اخبار و تحلیل بازار','news'],['مجلهٔ نیک‌تراست','blog'],['هشدارهای پلتفرم‌ها','alerts']]},
    {title:'اصول انتشار',links:[['سیاست تحریریه','editorial'],['اصلاح اطلاعات','corrections'],['تماس با ما','contact']]}]},
];
/** Five primary header groups defined by the UX brief (Platforms, Best, Compare & Tools, Learn & News, About). */
export const RESEARCH_NAV = [
  { id:'platforms', label:'پلتفرم‌ها', icon:'Layers', intro:'فهرست، بررسی و هشدارهای بروکرها، صرافی‌ها و پراپ‌فرم‌ها.', groups:[
    {title:'دسته‌های پلتفرم',links:[['بروکرهای فارکس','brokers'],['صرافی‌های رمزارز','exchanges'],['پراپ‌فرم‌ها','prop']]},
    {title:'صرافی‌ها بر اساس دسترسی',links:[['صرافی‌های ایرانی','iranian'],['صرافی‌های بین‌المللی','international']]},
    {title:'اعتبارسنجی',links:[['استعلام پلتفرم','check'],['هشدارها و گزارش‌ها','alerts'],['گزارش یک مشکل','report']]}]},
  { id:'best', label:'بهترین‌ها', icon:'Target', intro:'انتخاب بر اساس معیار شما؛ با معیارهای روشن و جدا از روابط تجاری.', groups:[
    {title:'بروکرهای فارکس',links:[['برای مبتدیان','bestBrokerBeginners'],['اسپرد پایین','bestBrokerLowSpread']]},
    {title:'صرافی‌ها و پراپ‌فرم‌ها',links:[['صرافی کم‌کارمزد','bestExchangeLowFee'],['پراپ‌فرم برای مبتدیان','bestPropBeginners']]},
    {title:'چگونه انتخاب می‌کنیم',links:[['روش ارزیابی','method'],['مدل درآمد','revenue']]}]},
  { id:'compareTools', label:'مقایسه و ابزارها', icon:'Calculator', intro:'پلتفرم‌ها را کنار هم بگذارید و هزینه و ریسک را محاسبه کنید.', groups:[
    {title:'مقایسه و انتخاب',links:[['پیدا کردن پلتفرم مناسب','finder'],['مقایسهٔ پلتفرم‌ها','compare'],['جستجو','search']]},
    {title:'ماشین‌حساب‌ها',links:[['همهٔ ابزارها','tools'],['سود و زیان','profitLoss'],['مارجین و اهرم','margin'],['هزینهٔ شب‌مانی','swap']]},
    {title:'بازار',links:[['نمای کلی بازار','markets'],['ترمینال تحلیلی','terminal']]}]},
  { id:'learnNews', label:'آموزش و اخبار', icon:'Info', intro:'مفاهیم، راهنمای انتخاب و خبرها با مرز روشن میان ادعا و شواهد.', groups:[
    {title:'آموزش',links:[['مرکز آموزش','learn'],['واژه‌نامهٔ مالی','glossary'],['پرسش‌های متداول','faq']]},
    {title:'اخبار و مقالات',links:[['اخبار و تحلیل','news'],['مجلهٔ نیک‌تراست','blog']]}]},
  { id:'aboutGroup', label:'دربارهٔ نیک‌تراست', icon:'ChartLine', intro:'چه کسی بررسی می‌کند، چگونه درآمد داریم و چطور با ما تماس بگیرید.', groups:[
    {title:'شناخت ما',links:[['دربارهٔ نیک‌تراست','about'],['تیم و بررسی‌کنندگان','team'],['تماس با ما','contact']]},
    {title:'شفافیت',links:[['روش ارزیابی','method'],['سیاست تحریریه','editorial'],['افشای همکاری','disclosure'],['اصلاح اطلاعات','corrections']]},
    {title:'حقوقی',links:[['هشدار ریسک','disclaimer'],['قوانین استفاده','terms'],['حریم خصوصی','privacy']]}]},
];
