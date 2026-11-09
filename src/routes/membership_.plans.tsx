import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { MembershipScreen } from '@/screens/prototype/Membership';
export const Route=createFileRoute('/membership_/plans')({head:()=>seo('طرح‌های عضویت','طرح‌های تصویب‌نشدهٔ نیک‌تراست؛ بدون قیمت فرضی.'),component:()=> <MembershipScreen section="plans"/>});