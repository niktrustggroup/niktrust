import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { MarketScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/markets_/$symbol')({
  head: () => seo("جزئیات نماد", "جزئیات نماد — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <MarketScreen {...p} symbol={Route.useParams().symbol}/>; }
