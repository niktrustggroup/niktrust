import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/settings')({head:()=>seo('تنظیمات مدیریت','تنظیمات نمونهٔ مدیریت نیک‌تراست.'),component:()=> <AdminScreen section="settings"/>});