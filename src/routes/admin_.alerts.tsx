import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/alerts')({head:()=>seo('مدیریت هشدار','ثبت تغییر و هشدار نمونهٔ نیک‌تراست.'),component:()=> <AdminScreen section="alerts"/>});