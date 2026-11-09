import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ComponentButton } from '@/ds';
import { authValidation, usePrototype, type PreviewArea } from '@/lib/prototype';
import { Field, PrototypeNotice, Scenario } from './Shared';
import logo from '@/assets/logotype-blue.svg.asset.json';
export function AuthScreen({ mode = 'login' }: { mode?: 'login' | 'register' | 'recover' | 'reset' | 'admin' }) {
  const [values, setValues] = useState<Record<string,string>>({}), [accepted, setAccepted] = useState(false), [message, setMessage] = useState(''), [valid, setValid] = useState(false), [scenario, setScenario] = useState('فرم');
  const prototype = usePrototype(), navigate = useNavigate();
  const title = {login:'ورود به نیک‌تراست',register:'ایجاد حساب',recover:'بازیابی رمز عبور',reset:'تعیین رمز جدید',admin:'ورود مدیریت'}[mode];
  const change = (key: string, value: string) => { setValues(v => ({...v,[key]:value})); setValid(false); setMessage(''); };
  function validate() { const error = authValidation(mode,values,accepted); setValid(!error); setMessage(error ?? (mode === 'recover' ? 'نمای نمونه: درخواست قابل پذیرش است؛ هیچ ایمیلی ارسال نشده است.' : mode === 'reset' ? 'نمای نمونه: رمزها معتبرند؛ رمز حسابی تغییر نکرده است.' : 'فرم معتبر است؛ حسابی ایجاد نشده و ورود واقعی انجام نشده است.')); }
  const open = (area: PreviewArea) => { prototype.enter(area); void navigate({to:area === 'admin'?'/admin':area === 'partner'?'/partner/dashboard':'/account'}); };
  return <main className="nt-auth-page"><div className="nt-auth-content"><Link to="/"><img className="nt-auth-brand" src={logo.url} alt="نیک‌تراست"/></Link><h1>{title}</h1><PrototypeNotice/><Scenario value={scenario} values={['فرم','خطای سرویس','موفقیت نمونه',...(mode === 'admin'?['دسترسی رد شد']:[])]} onChange={setScenario}/>
  {scenario !== 'فرم' && <p role={scenario === 'موفقیت نمونه'?'status':'alert'} className="nt-dash-status">نمای نمونه: {scenario} · هیچ درخواست یا احراز هویتی انجام نشده است.</p>}
  <form noValidate onSubmit={e=>{e.preventDefault();validate();}}>
    {mode !== 'reset' && <Field label="ایمیل"><input className="nt-input" type="email" dir="ltr" autoComplete="email" value={values['email']??''} onChange={e=>change('email',e.target.value)}/></Field>}
    {mode !== 'recover' && <Field label="رمز عبور"><input className="nt-input" type="password" dir="ltr" autoComplete={['register','reset'].includes(mode)?'new-password':'current-password'} value={values['password']??''} onChange={e=>change('password',e.target.value)}/></Field>}
    {['register','reset'].includes(mode) && <Field label="تکرار رمز عبور"><input className="nt-input" type="password" dir="ltr" autoComplete="new-password" value={values['confirm']??''} onChange={e=>change('confirm',e.target.value)}/></Field>}
    {mode === 'admin' && <Field label="کد تأیید دومرحله‌ای"><input className="nt-input" inputMode="numeric" dir="ltr" maxLength={6} autoComplete="one-time-code" value={values['mfa']??''} onChange={e=>change('mfa',e.target.value)}/></Field>}
    {mode === 'register' && <label className="nt-auth-check"><input type="checkbox" checked={accepted} onChange={e=>{setAccepted(e.target.checked);setValid(false);}}/><span><Link to="/terms">شرایط استفاده</Link> و <Link to="/privacy">حریم خصوصی</Link> را می‌پذیرم.</span></label>}
    {mode === 'login' && <label className="nt-auth-check"><input type="checkbox"/>مرا به خاطر بسپار · در نمونه ذخیره نمی‌شود</label>}
    <ComponentButton onClick={validate}>{mode === 'register'?'بررسی ثبت‌نام':mode === 'recover'?'بررسی درخواست بازیابی':mode === 'reset'?'بررسی رمز جدید':'بررسی ورود'}</ComponentButton>
    {message && <p className="nt-dash-status" role={valid?'status':'alert'}>{message}</p>}
  </form>
  {valid && <div className="nt-dash-actions">{mode === 'register'?<Link to="/login">ادامه به ورود</Link>:mode === 'recover'?<Link to="/reset-password">نمای فرم رمز جدید</Link>:mode === 'reset'?<Link to="/login">بازگشت به ورود</Link>:<ComponentButton onClick={()=>open(mode === 'admin'?'admin':'user')}>ورود به پیش‌نمایش، نه حساب واقعی</ComponentButton>}</div>}
  <div className="nt-auth-links"><Link to="/login">ورود</Link><Link to="/register">ثبت‌نام</Link><Link to="/forgot-password">فراموشی رمز</Link>{mode === 'admin'&&<Link to="/">وب‌سایت عمومی</Link>}</div>
  <p className="nt-caption">نیک‌تراست توصیهٔ سرمایه‌گذاری ارائه نمی‌دهد.</p></div></main>;
}