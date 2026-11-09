import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AuthScreen } from '@/screens/prototype/Auth';
export const Route=createFileRoute('/forgot-password')({head:()=>seo('بازیابی رمز','فرم نمونهٔ بازیابی نیک‌تراست؛ ایمیلی ارسال نمی‌شود.'),component:()=> <AuthScreen mode="recover"/>});