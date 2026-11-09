import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AuthScreen } from '@/screens/prototype/Auth';
export const Route=createFileRoute('/admin_/login')({head:()=>seo('ورود مدیریت','ورود و MFA نمونهٔ نیک‌تراست؛ احراز هویت فعال نیست.'),component:()=> <AuthScreen mode="admin"/>});