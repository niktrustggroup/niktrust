import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/crypto-exchanges_/best-for-$feature')({
  head: () => seo("صرافی‌ها بر اساس معیار انتخاب", "معیارهای انتخاب صرافی رمزارز؛ بدون توصیه یا رتبه‌بندی تأییدنشده."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="پلتفرم مناسب برای معیار شما" kind="article"/>; }
