import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { CalculatorsScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/tools_/$calculator')({
  head: () => seo("ماشین‌حساب", "ماشین‌حساب آموزشی نیک‌تراست با فرمول، فرض‌ها و مثال اعلام‌شده."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <CalculatorsScreen {...p} calculator={Route.useParams().calculator}/>; }
