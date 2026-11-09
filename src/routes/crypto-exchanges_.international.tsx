import { validatePublicSearch } from '@/lib/public-search';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ListingScreen } from '@/screens/Listing';
export const Route = createFileRoute('/crypto-exchanges_/international')({
  validateSearch: validatePublicSearch,
  head: () => seo("صرافی‌های خارجی", "صرافی‌های خارجی — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <ListingScreen {...p} title="صرافی‌های خارجی" category="exchanges" region="international"/>; }
