import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { MethodologyScreen } from '@/screens/Methodology';
export const Route = createFileRoute('/methodology_/$category')({
  head: ({ params }) => seo(`روش‌شناسی ${params.category}`, `معیارهای ارزیابی دستهٔ ${params.category}، وضعیت انتشار روش و منابع نیک‌تراست.`),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <MethodologyScreen {...p}/>; }
