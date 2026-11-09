import { validatePublicSearch } from '@/lib/public-search';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/learn')({
  validateSearch: validatePublicSearch,
  head: () => seo("مرکز آموزش", "موضوعات آموزش مالی از فارکس و رمزارز تا ریسک، هزینه‌ها، ابزارها و مبانی بازار؛ فقط مطالب منتشرشده."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="مرکز آموزش" kind="learn"/>; }
