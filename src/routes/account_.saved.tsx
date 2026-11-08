import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AccountScreen } from '@/screens/product/Account';
export const Route = createFileRoute('/account_/saved')({
  head: () => seo("ذخیره‌شده‌ها", "ذخیره‌شده‌ها — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AccountScreen {...p} title="ذخیره‌شده‌ها" section="saved" partner={false}/>; }
