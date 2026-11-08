import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { SearchScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/search')({
  head: () => seo("جستجو", "جستجو — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  validateSearch: (search: Record<string,unknown>): { q?: string } => ({ q: typeof search['q'] === 'string' ? search['q'] : undefined }),
  component: Page,
});
function Page() { const p = useScreenProps(); const { q } = Route.useSearch(); return <SearchScreen {...p} initialQuery={q}/>; }
