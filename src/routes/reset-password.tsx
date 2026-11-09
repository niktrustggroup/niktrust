import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AuthScreen } from '@/screens/prototype/Auth';
export const Route=createFileRoute('/reset-password')({head:()=>seo('رمز جدید','فرم نمونهٔ رمز جدید نیک‌تراست؛ حساب تغییر نمی‌کند.'),component:()=> <AuthScreen mode="reset"/>});