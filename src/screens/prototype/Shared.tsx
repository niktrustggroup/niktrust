import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ComponentButton, ComponentBadgeStatus } from '@/ds';
import { Menu, X, Bell, Moon, Sun, LogOut, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { usePrototype, type PreviewArea } from '@/lib/prototype';
import { DASHBOARD_NAV } from './navigation';
import { EmptyState } from '../product/Primitives';
import logo from '@/assets/logotype-blue.svg.asset.json';

export function PrototypeNotice() { return <p className="nt-prototype-notice">نمونهٔ تعاملی Day 07 · حساب، پرداخت، ارجاع و دادهٔ عملیاتی واقعی متصل نیست.</p>; }
export function Block({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) { return <section className="nt-dash-section"><header><h2>{title}</h2>{action}</header>{children}</section>; }
export function InfoRows({ rows }: { rows: [string, ReactNode][] }) { return <dl className="nt-dash-facts">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>; }
export function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="nt-dash-field"><span>{label}</span>{children}</label>; }
export function Unavailable({ title = 'دادهٔ واقعی در دسترس نیست' }: { title?: string }) { return <EmptyState title={title} text="این بخش به سرویس عملیاتی متصل نشده است."/>; }
export function Scenario({ values, value, onChange }: { values: string[]; value: string; onChange: (value: string) => void }) { return <Field label="حالت نمونه"><select className="nt-input" value={value} onChange={e => onChange(e.target.value)}>{values.map(v => <option key={v}>{v}</option>)}</select></Field>; }
export function Confirm({ title, children, onConfirm, onClose }: { title: string; children: ReactNode; onConfirm: () => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="nt-dash-dialog" onCancel={onClose}><h2>{title}</h2><div>{children}</div><div className="nt-cluster"><ComponentButton onClick={onConfirm}>تأیید نمونه</ComponentButton><ComponentButton type="secondary" onClick={onClose}>انصراف</ComponentButton></div></dialog>;
}
function NavigationDrawer({children,onClose}:{children:ReactNode;onClose:()=>void}) {
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{ref.current?.showModal();},[]);
 return <dialog ref={ref} className="nt-dash-dialog nt-navigation-drawer" aria-label="ناوبری داشبورد" onCancel={onClose}><ComponentButton type="tertiary" ariaLabel="بستن ناوبری" onClick={onClose}><X size={20}/></ComponentButton><div className="nt-dash-mobile-nav">{children}</div></dialog>;
}
export function AccessGate({ area, children }: { area: PreviewArea; children: ReactNode }) {
  const prototype = usePrototype();
  if (prototype.access.includes(area)) return <>{children}</>;
  return <div className="nt-preview-gate"><ComponentBadgeStatus tone="neutral" label="پیش‌نمایش بدون احراز هویت"/><h1>دسترسی به نمونهٔ {area === 'admin' ? 'مدیریت' : area === 'partner' ? 'همکار' : 'حساب'}</h1><p>اطلاعات شخصی و عملیات واقعی در این محیط وجود ندارد. بازکردن نمونه به معنی ورود یا دریافت مجوز نیست.</p><div className="nt-cluster"><ComponentButton onClick={() => prototype.enter(area)}>بازکردن نمونهٔ تعاملی</ComponentButton><Link to={area === 'admin' ? '/admin/login' : '/login'}>صفحهٔ ورود</Link></div></div>;
}
export function DashboardShell({ area, children }: { area: PreviewArea; children: ReactNode }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const [drawer, setDrawer] = useState(false), [collapsed, setCollapsed] = useState(false), [logout, setLogout] = useState(false), [menu, setMenu] = useState(false);
  const { theme, toggleTheme } = useTheme(); const prototype = usePrototype();
  const nav = DASHBOARD_NAV[area]; const title = nav.find(([url]) => url === path)?.[1] ?? (area === 'admin' ? 'ویرایش رکورد' : 'حساب');
  useEffect(() => { setDrawer(false); }, [path]);
  useEffect(() => { const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false); }; document.addEventListener('keydown', handler); return () => document.removeEventListener('keydown', handler); }, []);
  const navigation = <><Link to="/" className="nt-dash-brand"><img src={logo.url} alt="نیک‌تراست"/><span>{area === 'admin' ? 'مدیریت مستقل' : area === 'partner' ? 'پنل همکاری' : 'حساب کاربری'}</span></Link><nav aria-label="ناوبری داشبورد">{nav.map(([url, text], index) => <Link key={url} to={url} activeOptions={{ exact: true }} activeProps={{ className: 'is-current', 'aria-current': 'page' }} title={text}><span className="nt-dash-nav-index">{(index + 1).toLocaleString('fa-IR')}</span><span className="nt-dash-nav-label">{text}</span></Link>)}</nav><Link to="/">بازگشت به وب‌سایت</Link></>;
  return <div className={`nt-dashboard${collapsed ? ' is-collapsed' : ''}`}>
    <aside className="nt-dashboard-sidebar">{navigation}</aside>
    {drawer && <NavigationDrawer onClose={()=>setDrawer(false)}>{navigation}</NavigationDrawer>}
    <div className="nt-dashboard-body"><header className="nt-dashboard-top"><div className="nt-cluster"><ComponentButton type="tertiary" className="nt-dash-mobile-toggle" ariaLabel="بازکردن ناوبری" title="ناوبری" onClick={() => setDrawer(true)}><Menu size={20}/></ComponentButton><ComponentButton type="tertiary" className="nt-dash-desktop-toggle" ariaLabel="تغییر اندازهٔ ناوبری" title="تغییر اندازهٔ ناوبری" onClick={() => setCollapsed(v => !v)}>{collapsed ? <PanelRightOpen size={20}/> : <PanelRightClose size={20}/>}</ComponentButton><span>{title}</span></div><div className="nt-cluster"><ComponentButton type="tertiary" ariaLabel="تغییر حالت نمایش" title="حالت نمایش" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</ComponentButton><Link to={area === 'user' ? '/account/notifications' : area === 'admin' ? '/admin/logs' : '/partner/dashboard'} aria-label="اعلان‌ها"><Bell size={18}/></Link><ComponentButton type="tertiary" onClick={() => setMenu(v => !v)}>حساب نمونه</ComponentButton></div></header>
    {menu && <div className="nt-dash-account-menu"><Link to={area === 'user' ? '/account/settings' : area === 'admin' ? '/admin/settings' : '/partner/settings'}>تنظیمات</Link><ComponentButton type="tertiary" onClick={() => { setLogout(true); setMenu(false); }}><LogOut size={16}/>بستن پیش‌نمایش</ComponentButton></div>}
    <div className="nt-dashboard-main"><nav className="nt-dash-breadcrumb" aria-label="مسیر صفحه"><Link to="/">نیک‌تراست</Link><span> / </span><span>{title}</span></nav><PrototypeNotice/>{children}</div>
    <footer className="nt-dash-footer">نیک‌تراست توصیهٔ سرمایه‌گذاری ارائه نمی‌دهد؛ اطلاعات اعتماد عمومی باقی می‌ماند.</footer></div>
    {logout && <Confirm title="بستن پیش‌نمایش؟" onClose={() => setLogout(false)} onConfirm={() => { prototype.leave(area); setLogout(false); }}>اطلاعات مرور نمونه بسته می‌شود؛ هیچ خروج از حساب واقعی انجام نمی‌شود.</Confirm>}
  </div>;
}
export function DataTable({ columns, rows = [], empty = 'رکوردی دریافت نشده است' }: { columns: string[]; rows?: ReactNode[][]; empty?: string }) {
  const [query, setQuery] = useState(''), [reverse, setReverse] = useState(false), [page, setPage] = useState(1), [state, setState] = useState('خالی');
  const found = rows.filter(row => row.some(v => typeof v === 'string' && v.includes(query))); const sorted = reverse ? [...found].reverse() : found;
  return <div className="nt-dash-table-region"><div className="nt-dash-toolbar"><Field label="جستجو"><input className="nt-input" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="جستجو در رکوردها…"/></Field><Field label="ترتیب"><select className="nt-input" value={reverse ? 'old' : 'new'} onChange={e => setReverse(e.target.value === 'old')}><option value="new">جدیدترین</option><option value="old">قدیمی‌ترین</option></select></Field><Scenario values={['خالی','در حال دریافت','خطای دریافت']} value={state} onChange={setState}/></div>
  {state === 'در حال دریافت' ? <p role="status" aria-busy="true">نمای نمونه: در حال دریافت…</p> : state === 'خطای دریافت' ? <p role="alert">نمای نمونه: دریافت ممکن نشد. <ComponentButton type="tertiary" onClick={() => setState('خالی')}>تلاش دوباره</ComponentButton></p> : <div className="nt-table-wrap"><table className="nt-data-table"><thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{sorted.length ? sorted.slice((page - 1) * 6, page * 6).map((row, i) => <tr key={i}>{row.map((v, j) => <td key={j}>{v}</td>)}</tr>) : <tr><td colSpan={columns.length}>{empty}</td></tr>}</tbody></table></div>}
  {sorted.length > 6 && <div className="nt-cluster"><ComponentButton type="secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>قبلی</ComponentButton><span>{page.toLocaleString('fa-IR')}</span><ComponentButton type="secondary" disabled={page * 6 >= sorted.length} onClick={() => setPage(p => p + 1)}>بعدی</ComponentButton></div>}</div>;
}