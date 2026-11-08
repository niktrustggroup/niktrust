import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ReportScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/alerts_/report')({
  head: () => seo("گزارش پلتفرم", "گزارش پلتفرم — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <ReportScreen {...p} />; }
