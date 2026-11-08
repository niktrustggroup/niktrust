import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { MarketScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/terminal')({
  head: () => seo("ترمینال تحلیلی", "ترمینال تحلیلی — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <MarketScreen {...p} terminal/>; }
