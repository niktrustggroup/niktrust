import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { EditorialScreen } from '@/screens/product/Editorial';
export const Route = createFileRoute('/glossary_/$term')({
  head: () => seo("مدخل واژه‌نامه", "مدخل واژه‌نامه — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <EditorialScreen {...p} title="مدخل واژه‌نامه" kind="term"/>; }
