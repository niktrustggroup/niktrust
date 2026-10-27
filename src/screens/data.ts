// @ts-nocheck
// Sample (fictional) data for the NikTrust website UI kit.
const NT_DATA = {
  brokers: [
    { id: 'a', name: 'بروکر نمونهٔ الف (ساختگی)', category: 'بروکر فارکس · رگولاتوری سطح ۱', score: '۷٫۱', badges: [{ tone: 'positive', label: 'رگولاتوری تأییدشده' }, { tone: 'info', label: 'واریز ریالی' }], metrics: [{ label: 'حداقل واریز', value: '$100' }, { label: 'اسپرد از', value: '0.8 pip' }, { label: 'حداکثر اهرم', value: '1:500' }], date: '۱۴۰۵/۰۶/۲۹', partner: true },
    { id: 'b', name: 'بروکر نمونهٔ ب (ساختگی)', category: 'بروکر فارکس · مجوز فراساحلی', score: '۶٫۴', badges: [{ tone: 'caution', label: 'مجوز فراساحلی' }], metrics: [{ label: 'حداقل واریز', value: '$50' }, { label: 'اسپرد از', value: '1.2 pip' }, { label: 'حداکثر اهرم', value: '1:1000' }], date: '۱۴۰۵/۰۶/۱۸' },
    { id: 'c', name: 'بروکر نمونهٔ ج (ساختگی)', category: 'بروکر فارکس · رگولاتوری سطح ۲', scoreState: 'empty', badges: [{ tone: 'positive', label: 'رگولاتوری تأییدشده' }], metrics: [{ label: 'حداقل واریز', value: '$200' }, { label: 'اسپرد از', state: 'notdeclared' }, { label: 'حداکثر اهرم', value: '1:200' }], date: '۱۴۰۵/۰۴/۰۲', trustState: 'stale' },
    { id: 'd', name: 'بروکر نمونهٔ د (ساختگی)', category: 'بروکر فارکس', state: 'warning', badges: [{ tone: 'unknown', label: 'رگولاتوری در حال بررسی' }], metrics: [{ label: 'حداقل واریز', value: '$10' }, { label: 'اسپرد از', state: 'inreview' }, { label: 'حداکثر اهرم', value: '1:2000' }], date: '۱۴۰۵/۰۶/۲۵' }
  ],
  topReviews: [
    { id: 'a' },
    { id: 'e', name: 'صرافی نمونهٔ ه (ساختگی)', category: 'صرافی ارز دیجیتال', score: '۶٫۹', badges: [{ tone: 'positive', label: 'ثبت‌شده نزد نهاد ناظر' }], metrics: [{ label: 'کارمزد معامله', value: '0.1%' }, { label: 'تعداد رمزارز', value: '350' }, { label: 'برداشت ریالی', value: 'دارد', basis: false }], date: '۱۴۰۵/۰۶/۲۰' },
    { id: 'f', name: 'پراپ‌فرم نمونهٔ و (ساختگی)', category: 'پراپ‌فرم', score: '۶٫۲', badges: [{ tone: 'caution', label: 'شواهد پرداخت محدود' }], metrics: [{ label: 'هزینهٔ چالش از', value: '$99' }, { label: 'تقسیم سود', value: '80%' }, { label: 'شواهد پرداخت', state: 'inreview' }], date: '۱۴۰۵/۰۶/۱۱' }
  ],
  markets: [
    { id: 'brokers', title: 'فارکس', desc: 'بروکرهای فارکس و شرایط معاملاتی آن‌ها', icon: 'ComponentIconChartLine', count: '۲۴ بررسی' },
    { id: 'exchanges', title: 'کریپتو', desc: 'صرافی‌های ارز دیجیتال و کارمزدها', icon: 'ComponentIconCoin', count: '۱۲ بررسی' },
    { id: 'prop', title: 'پراپ‌فرم', desc: 'شرایط چالش، تقسیم سود و شواهد پرداخت', icon: 'ComponentIconTarget', count: '۸ بررسی' },
    { title: 'بورس', desc: 'کارگزاری‌های بورس داخلی', icon: 'ComponentIconBuilding' },
    { title: 'صندوق‌های قابل معامله', desc: 'صندوق‌های سرمایه‌گذاری قابل معامله', icon: 'ComponentIconLayers' },
    { title: 'طلا و نقره', desc: 'پلتفرم‌های خرید فلزات گرانبها', icon: 'ComponentIconIngot' }
  ],
  tools: [
    { title: 'ماشین‌حساب سود و زیان', desc: 'محاسبهٔ سود و زیان یک موقعیت معاملاتی' },
    { title: 'ماشین‌حساب اهرم', desc: 'مارجین لازم بر اساس اهرم انتخابی' },
    { title: 'ماشین‌حساب سوآپ', desc: 'هزینهٔ شب‌مانی موقعیت باز' }
  ]
};
export default NT_DATA;
