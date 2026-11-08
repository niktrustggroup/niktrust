import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/partners_/rules')({
  head: () => seo("قواعد برنامهٔ همکاری", "قواعد برنامهٔ همکاری — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="قواعد برنامهٔ همکاری" kind="rules"/>; }
