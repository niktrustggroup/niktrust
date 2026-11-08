import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/about_/team')({
  head: () => seo("تیم و بررسی‌کنندگان", "تیم و بررسی‌کنندگان — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="تیم و بررسی‌کنندگان" kind="team"/>; }
