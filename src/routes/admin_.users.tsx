import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/users')({head:()=>seo('مدیریت کاربران','کاربران نمونهٔ نیک‌تراست؛ حساب ساختگی تولید نمی‌شود.'),component:()=> <AdminScreen section="users"/>});