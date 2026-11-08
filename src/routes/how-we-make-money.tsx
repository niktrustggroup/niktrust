import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/how-we-make-money')({
  head: () => seo("مدل درآمد و افشای همکاری", "مدل درآمد و افشای همکاری — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="مدل درآمد و افشای همکاری" kind="revenue"/>; }
