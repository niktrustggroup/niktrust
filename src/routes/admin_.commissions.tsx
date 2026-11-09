import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/commissions')({head:()=>seo('مدیریت کمیسیون','دفتر مالی نمونهٔ نیک‌تراست؛ محاسبه و پرداخت نداریم.'),component:()=> <AdminScreen section="commissions"/>});