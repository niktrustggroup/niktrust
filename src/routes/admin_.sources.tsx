import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/sources')({head:()=>seo('مدیریت منابع','ثبت منابع نمونهٔ نیک‌تراست.'),component:()=> <AdminScreen section="sources"/>});