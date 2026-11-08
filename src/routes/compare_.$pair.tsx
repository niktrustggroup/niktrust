import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { CompareScreen } from '@/screens/Compare';
export const Route = createFileRoute('/compare_/$pair')({
  head: ({ params }) => seo(`مقایسهٔ یک‌به‌یک ${params.pair}`, `مقایسهٔ ${params.pair} با معیارهای همدسته و منابع مشخص؛ ترتیب مستقل از روابط تجاری.`),
  
  component: Page,
});
function Page() { const p = useScreenProps(); const pair = Route.useParams().pair.split("-vs-"); return <CompareScreen {...p} compare={pair.length === 2 ? pair : []}/>; }
