import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/editorial-policy')({
  head: () => seo("سیاست تحریریه و تعارض منافع", "سیاست تحریریه و تعارض منافع — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="سیاست تحریریه و تعارض منافع" kind="editorial"/>; }
