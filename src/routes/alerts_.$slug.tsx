import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AlertsScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/alerts_/$slug')({
  head: () => seo("جزئیات هشدار", "جزئیات هشدار — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AlertsScreen {...p} detail/>; }
