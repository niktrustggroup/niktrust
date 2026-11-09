import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/reviews')({head:()=>seo('مدیریت بررسی','بررسی و ارزیابی نمونهٔ نیک‌تراست؛ امتیاز مسدود است.'),component:()=> <AdminScreen section="reviews"/>});