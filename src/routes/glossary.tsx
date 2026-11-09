import { validatePublicSearch } from '@/lib/public-search';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/glossary')({
  validateSearch: validatePublicSearch,
  head: () => seo("واژه‌نامهٔ مالی", "واژه‌نامهٔ مفاهیم مالی با جستجو، مرور الفبایی و پیوند به آموزش مرتبط؛ تعریف‌های تأییدشده."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="واژه‌نامهٔ مالی" kind="glossary"/>; }
