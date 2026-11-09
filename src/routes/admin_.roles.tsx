import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/roles')({head:()=>seo('نقش و دسترسی','نگاشت نقش نمونهٔ نیک‌تراست؛ قرارداد RBAC موجود نیست.'),component:()=> <AdminScreen section="roles"/>});