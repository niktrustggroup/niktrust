import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AuthScreen } from '@/screens/prototype/Auth';
export const Route=createFileRoute('/register')({head:()=>seo('ثبت‌نام','ثبت‌نام نمونهٔ نیک‌تراست؛ حسابی ایجاد نمی‌شود.'),component:()=> <AuthScreen mode="register"/>});