import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { CompareScreen } from '@/screens/Compare';
export const Route = createFileRoute('/compare_/$pair')({
  head: () => seo("مقایسهٔ یک‌به‌یک", "مقایسهٔ یک‌به‌یک — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); const pair = Route.useParams().pair.split("-vs-"); return <CompareScreen {...p} compare={pair.length === 2 ? pair : []}/>; }
