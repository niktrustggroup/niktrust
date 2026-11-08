import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/learn_/$topic/$slug')({
  head: () => seo("مقاله و راهنما", "مقاله و راهنما — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="مقاله و راهنما" kind="article"/>; }
