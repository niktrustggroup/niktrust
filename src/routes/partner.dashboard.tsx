import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PartnerScreen } from '@/screens/prototype/Partner';
export const Route=createFileRoute('/partner/dashboard')({head:()=>seo('پنل همکاری','نمای کلی همکاری نمونهٔ نیک‌تراست؛ بدون انتساب واقعی.'),component:()=> <PartnerScreen/>});