import { validatePublicSearch } from '@/lib/public-search';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/news')({
  validateSearch: validatePublicSearch,
  head: () => seo("اخبار پلتفرم و رگولاتوری", "خبرهای منتشرشده دربارهٔ تغییرات پلتفرم‌ها و رگولاتوری؛ همراه منبع اصلی، تاریخ و وضعیت به‌روزرسانی."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="اخبار پلتفرم و رگولاتوری" kind="news"/>; }
