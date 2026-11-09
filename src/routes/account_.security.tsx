import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { UserScreen } from '@/screens/prototype/User';
export const Route=createFileRoute('/account_/security')({head:()=>seo('امنیت حساب','تنظیمات امنیت نمونهٔ نیک‌تراست.'),component:()=> <UserScreen section="security" title="امنیت حساب"/>});