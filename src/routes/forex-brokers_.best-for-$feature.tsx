import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/forex-brokers_/best-for-$feature')({
  head: () => seo("پلتفرم مناسب برای معیار شما", "پلتفرم مناسب برای معیار شما — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="پلتفرم مناسب برای معیار شما" kind="article"/>; }
