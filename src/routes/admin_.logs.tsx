import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/logs')({head:()=>seo('رویدادهای مدیریت','رویدادهای نمونهٔ نیک‌تراست؛ گزارش عملیاتی دریافت نشده.'),component:()=> <AdminScreen section="logs"/>});