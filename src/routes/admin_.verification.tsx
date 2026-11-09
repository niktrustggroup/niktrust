import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/verification')({head:()=>seo('تأیید شواهد','تأیید شواهد نمونهٔ نیک‌تراست؛ تصمیم واقعی ثبت نمی‌شود.'),component:()=> <AdminScreen section="verification"/>});