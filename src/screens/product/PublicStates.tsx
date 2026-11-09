import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router';
import { ComponentButton, ComponentDataCard } from '@/ds';
import { EmptyState } from './Primitives';
export function PublicLoading() { return <div className="nt-container nt-section" aria-label="در حال دریافت اطلاعات"><ComponentDataCard state="loading"/></div>; }
export function PublicMissing() { return <main className="nt-container nt-section"><EmptyState title="اطلاعات عمومی این صفحه موجود نیست" text="این نشانی به رکورد منتشرشده‌ای متصل نیست." action={<Link to="/">بازگشت به نیک‌تراست</Link>}/></main>; }
export function PublicError({ reset }: ErrorComponentProps) { const router = useRouter(); return <main className="nt-container nt-section"><EmptyState title="دریافت اطلاعات ممکن نشد" action={<ComponentButton onClick={async () => { await router.invalidate(); reset(); }}>تلاش دوباره</ComponentButton>}/></main>; }