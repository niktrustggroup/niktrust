import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AuthScreen } from '@/screens/prototype/Auth';
export const Route=createFileRoute('/login')({head:()=>seo('ورود','ورود نمونهٔ نیک‌تراست؛ احراز هویت فعال نیست.'),component:()=> <AuthScreen/>});