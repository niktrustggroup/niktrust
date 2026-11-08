import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ReviewScreen } from '@/screens/Review';
export const Route = createFileRoute('/prop-firms_/$slug')({
  head: () => seo("بررسی پلتفرم", "بررسی پلتفرم — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <ReviewScreen {...p} id={Route.useParams().slug}/>; }
