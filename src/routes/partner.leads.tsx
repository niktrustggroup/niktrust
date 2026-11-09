import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PartnerScreen } from '@/screens/prototype/Partner';
export const Route=createFileRoute('/partner/leads')({head:()=>seo('سرنخ‌ها','سرنخ‌های نمونهٔ همکاری نیک‌تراست؛ دادهٔ شخصی نداریم.'),component:()=> <PartnerScreen section="leads" title="سرنخ‌ها"/>});