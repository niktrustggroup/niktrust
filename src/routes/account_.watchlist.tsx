import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AccountScreen } from '@/screens/product/Account';
export const Route = createFileRoute('/account_/watchlist')({
  head: () => seo("واچ‌لیست", "واچ‌لیست — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AccountScreen {...p} title="واچ‌لیست" section="watchlist" partner={false}/>; }
