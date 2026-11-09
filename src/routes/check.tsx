import { validatePublicSearch } from '@/lib/public-search';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { SearchScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/check')({
  validateSearch: validatePublicSearch,
  head: () => seo("استعلام پلتفرم", "جستجوی اطلاعات عمومی پلتفرم در نیک‌تراست؛ بدون تضمین هویت، مجوز یا امنیت."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <SearchScreen {...p} check/>; }
