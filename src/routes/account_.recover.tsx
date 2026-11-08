import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AccountScreen } from '@/screens/product/Account';
export const Route = createFileRoute('/account_/recover')({
  head: () => seo("بازیابی دسترسی", "بازیابی دسترسی — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AccountScreen {...p} title="بازیابی دسترسی" section="recover" partner={false}/>; }
