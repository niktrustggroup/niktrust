import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AccountScreen } from '@/screens/product/Account';
export const Route = createFileRoute('/partners_/leads')({
  head: () => seo("لیدها و ارجاع‌ها", "لیدها و ارجاع‌ها — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AccountScreen {...p} title="لیدها و ارجاع‌ها" section="leads" partner={true}/>; }
