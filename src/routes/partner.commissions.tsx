import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { PartnerScreen } from '@/screens/prototype/Partner';
export const Route=createFileRoute('/partner/commissions')({head:()=>seo('دفتر کمیسیون','دفتر نمونهٔ نیک‌تراست؛ بدون نرخ یا تراکنش واقعی.'),component:()=> <PartnerScreen section="commissions" title="دفتر کمیسیون"/>});