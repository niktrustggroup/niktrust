import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/partners')({head:()=>seo('مدیریت همکاران','مدیریت درخواست همکاری نمونهٔ نیک‌تراست.'),component:()=> <AdminScreen section="partners"/>});