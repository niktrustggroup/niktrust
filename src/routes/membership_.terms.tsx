import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { MembershipScreen } from '@/screens/prototype/Membership';
export const Route = createFileRoute('/membership_/terms')({
  head: () => seo("شرایط عضویت", "شرایط عضویت — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { return <MembershipScreen section="terms"/>; }
