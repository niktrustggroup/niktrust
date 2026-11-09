import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { pipValue, positionSize, requiredMargin, type CalcResult } from '@/lib/calculators';
import { HomeSection, Tabs } from './HomeParts';

const fa = (n: number, d = 2) => n.toLocaleString('fa-IR', { maximumFractionDigits: d });
const toNum = (s: string) => Number(s.replace(/[,٬]/g, '').replace(/[۰-۹]/g, c => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))));
type F = { k: string; label: string; unit: string; def: string };
const CALCS = {
  position: { title: 'حجم پوزیشن', fields: [{ k: 'b', label: 'موجودی حساب', unit: 'ارز حساب', def: '1000' }, { k: 'r', label: 'ریسک هر معامله', unit: '٪', def: '1' }, { k: 's', label: 'فاصلهٔ حد ضرر', unit: 'پیپ', def: '25' }, { k: 'p', label: 'ارزش هر پیپ برای ۱ لات', unit: 'ارز حساب', def: '10' }] as F[],
    run: (v: Record<string, number>) => positionSize(v['b']!, v['r']!, v['s']!, v['p']!), unit: 'لات',
    formula: 'حجم = (موجودی × درصد ریسک) ÷ (حد ضرر به پیپ × ارزش پیپ هر لات)', assume: 'ارزش پیپ را خودت وارد می‌کنی؛ کارمزد، اسپرد و لغزش قیمت لحاظ نمی‌شود.', example: 'موجودی ۱۰٬۰۰۰، ریسک ۱٪، حد ضرر ۵۰ پیپ، ارزش پیپ ۱۰ ← ۰٫۲ لات' },
  pip: { title: 'ارزش پیپ', fields: [{ k: 'l', label: 'حجم', unit: 'لات', def: '1' }, { k: 'c', label: 'اندازهٔ قرارداد', unit: 'واحد ارز پایه', def: '100000' }, { k: 'z', label: 'اندازهٔ پیپ', unit: '۰٫۰۰۰۱ یا ۰٫۰۱ برای ین', def: '0.0001' }, { k: 'x', label: 'نرخ تبدیل ارز دوم به ارز حساب', unit: 'اگر یکی‌اند ۱', def: '1' }] as F[],
    run: (v: Record<string, number>) => pipValue(v['l']!, v['c']!, v['z']!, v['x']!), unit: 'ارز حساب',
    formula: 'ارزش پیپ = حجم × اندازهٔ قرارداد × اندازهٔ پیپ × نرخ تبدیل', assume: 'نرخ تبدیل را خودت وارد می‌کنی؛ قیمت لحظه‌ای دریافت نمی‌شود. اندازهٔ قرارداد ممکن است نزد هر بروکر متفاوت باشد.', example: '۱ لات یورو/دلار، حساب دلاری ← ۱۰ دلار برای هر پیپ' },
  margin: { title: 'مارجین موردنیاز', fields: [{ k: 'l', label: 'حجم', unit: 'لات', def: '1' }, { k: 'c', label: 'اندازهٔ قرارداد', unit: 'واحد ارز پایه', def: '100000' }, { k: 'q', label: 'قیمت', unit: 'ارز دوم', def: '1.1' }, { k: 'v', label: 'اهرم', unit: '۱:X', def: '100' }, { k: 'x', label: 'نرخ تبدیل ارز دوم به ارز حساب', unit: 'اگر یکی‌اند ۱', def: '1' }] as F[],
    run: (v: Record<string, number>) => requiredMargin(v['l']!, v['c']!, v['q']!, v['v']!, v['x']!), unit: 'ارز حساب',
    formula: 'مارجین = حجم × اندازهٔ قرارداد × قیمت × نرخ تبدیل ÷ اهرم', assume: 'قیمت و اهرم را خودت وارد می‌کنی؛ قواعد مارجین هر بروکر و نماد ممکن است متفاوت باشد.', example: '۱ لات در قیمت ۱٫۱ با اهرم ۱:۱۰۰ ← ۱٬۱۰۰ دلار' },
} as const;
type K = keyof typeof CALCS;

/** Educational, deterministic preview calculator; never a broker-specific or authoritative figure. */
export function CalculatorCard({ id }: { id: K }) {
  const c = CALCS[id];
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(c.fields.map(f => [f.k, f.def])));
  const res: CalcResult = c.run(Object.fromEntries(c.fields.map(f => [f.k, toNum(vals[f.k] ?? '')])));
  return <div className="nt-calc">
    <form className="nt-calc-form" onSubmit={e => e.preventDefault()}>{c.fields.map(f => <label key={f.k}><span>{f.label} <small>({f.unit})</small></span><input className="nt-input" dir="ltr" inputMode="decimal" value={vals[f.k]} onChange={e => setVals(s => ({ ...s, [f.k]: e.target.value }))} aria-invalid={!(toNum(vals[f.k] ?? '') > 0)}/></label>)}</form>
    <div className="nt-calc-out">
      <output aria-live="polite">{res.ok ? <><b>{fa(res.value, 4)}</b> <span>{c.unit}</span>{'risk' in res.details && <small>مبلغ ریسک: {fa(res.details['risk']!)} ارز حساب</small>}{'notional' in res.details && <small>ارزش اسمی: {fa(res.details['notional']!)} ارز حساب</small>}</> : <span className="nt-finder-err">{res.error}</span>}</output>
      <dl><dt>فرمول</dt><dd>{c.formula}</dd><dt>فرض‌ها</dt><dd>{c.assume}</dd><dt>مثال</dt><dd>{c.example}</dd></dl>
      <p className="nt-calc-note">پیش‌نمایش آموزشی و غیرمرجع؛ عدد نهایی را از شرایط حساب بروکر خودت کنترل کن.</p>
    </div>
  </div>;
}
export function CalculatorsSection() {
  const [id, setId] = useState<K>('position');
  return <HomeSection id="tools" title="ابزارها و ماشین‌حساب‌های مالی" desc="ابزارهای کاربردی برای محاسبه و مدیریت معاملات." action={<Link className="nt-home-more" to="/tools">همهٔ ابزارها ←</Link>}>
    <Tabs label="ماشین‌حساب" value={id} onChange={setId} items={[['position', 'حجم پوزیشن'], ['pip', 'ارزش پیپ'], ['margin', 'مارجین']] as const}/>
    <CalculatorCard key={id} id={id}/>
    <p className="nt-finder-hint">ماشین‌حساب‌های سود و زیان، اهرم و سواپ هنوز اضافه نشده‌اند.</p>
  </HomeSection>;
}
