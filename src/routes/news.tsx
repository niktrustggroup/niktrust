import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/news')({
  head: () => seo("اخبار پلتفرم و رگولاتوری", "اخبار پلتفرم و رگولاتوری — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="اخبار پلتفرم و رگولاتوری" kind="news"/>; }
