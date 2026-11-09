import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PartnerScreen } from '@/screens/prototype/Partner';
export const Route=createFileRoute('/partner/payouts')({head:()=>seo('تسویه‌ها','تسویهٔ نمونهٔ نیک‌تراست؛ پرداخت متصل نیست.'),component:()=> <PartnerScreen section="payouts" title="تسویه‌ها"/>});