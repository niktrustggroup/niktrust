import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/forex-brokers_/best-for-$feature')({
  head: () => seo("بروکرها بر اساس معیار انتخاب", "معیارهای انتخاب بروکر فارکس؛ بدون توصیه یا رتبه‌بندی تأییدنشده."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="پلتفرم مناسب برای معیار شما" kind="article"/>; }
