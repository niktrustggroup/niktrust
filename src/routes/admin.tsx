import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin')({head:()=>seo('مدیریت نیک‌تراست','پیش‌نمایش مستقل مدیریت؛ بدون دادهٔ خصوصی یا مجوز واقعی.'),component:()=> <AdminScreen/>});