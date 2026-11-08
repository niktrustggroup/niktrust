import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { MethodologyScreen } from '@/screens/Methodology';
export const Route = createFileRoute('/methodology_/$category')({
  head: () => seo("روش‌شناسی دسته", "روش‌شناسی دسته — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <MethodologyScreen {...p}/>; }
