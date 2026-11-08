import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AccountScreen } from '@/screens/product/Account';
export const Route = createFileRoute('/partners_/payouts')({
  head: () => seo("وضعیت تسویه", "وضعیت تسویه — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AccountScreen {...p} title="وضعیت تسویه" section="payouts" partner={true}/>; }
