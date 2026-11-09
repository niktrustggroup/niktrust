import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PartnerScreen } from '@/screens/prototype/Partner';
export const Route=createFileRoute('/partner/referrals')({head:()=>seo('ارجاع‌ها','لینک و ارجاع نمونهٔ نیک‌تراست؛ بدون انتساب واقعی.'),component:()=> <PartnerScreen section="referrals" title="ارجاع‌ها"/>});