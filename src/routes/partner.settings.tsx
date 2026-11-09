import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PartnerScreen } from '@/screens/prototype/Partner';
export const Route=createFileRoute('/partner/settings')({head:()=>seo('تنظیمات همکاری','تنظیمات نمونهٔ همکاری نیک‌تراست.'),component:()=> <PartnerScreen section="settings" title="تنظیمات همکاری"/>});