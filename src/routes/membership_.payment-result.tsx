import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { MembershipScreen } from '@/screens/prototype/Membership';
export const Route=createFileRoute('/membership_/payment-result')({head:()=>seo('نتیجهٔ پرداخت','حالت‌های نمونهٔ پرداخت نیک‌تراست؛ تراکنشی انجام نشده.'),component:()=> <MembershipScreen section="result"/>});