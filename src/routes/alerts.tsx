import { validatePublicSearch } from '@/lib/public-search';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AlertsScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/alerts')({
  validateSearch: validatePublicSearch,
  head: () => seo("هشدارها", "تغییرات و هشدارهای منبع‌دار پلتفرم‌ها با تاریخ رویداد، بررسی و شواهد."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AlertsScreen {...p} />; }
