import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/memberships')({head:()=>seo('مدیریت عضویت','طرح و اشتراک نمونهٔ نیک‌تراست؛ قیمت تصویب نشده.'),component:()=> <AdminScreen section="memberships"/>});