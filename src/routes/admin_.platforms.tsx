import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/platforms')({head:()=>seo('مدیریت پلتفرم‌ها','فهرست مدیریت نمونهٔ نیک‌تراست.'),component:()=> <AdminScreen section="platforms"/>});