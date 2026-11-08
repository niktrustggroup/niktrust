import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ListingScreen } from '@/screens/Listing';
export const Route = createFileRoute('/crypto-exchanges_/iranian')({
  head: () => seo("صرافی‌های داخلی", "صرافی‌های داخلی — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <ListingScreen {...p} title="صرافی‌های داخلی" category="exchanges" region="iranian"/>; }
