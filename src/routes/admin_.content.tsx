import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/content')({head:()=>seo('مدیریت تحریریه','مقاله، خبر، آموزش و واژه‌نامهٔ نمونهٔ نیک‌تراست.'),component:()=> <AdminScreen section="content"/>});