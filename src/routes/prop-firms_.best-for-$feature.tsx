import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/prop-firms_/best-for-$feature')({
  head: () => seo("پراپ‌فرم‌ها بر اساس معیار انتخاب", "معیارهای انتخاب پراپ‌فرم؛ بدون توصیه یا رتبه‌بندی تأییدنشده."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="پلتفرم مناسب برای معیار شما" kind="article"/>; }
