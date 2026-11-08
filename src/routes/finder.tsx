import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { FinderScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/finder')({
  head: () => seo("انتخاب هدایت‌شده", "انتخاب هدایت‌شده — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <FinderScreen {...p}/>; }
