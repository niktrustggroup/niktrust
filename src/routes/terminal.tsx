import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { TerminalScreen } from '@/screens/prototype/Markets';
export const Route = createFileRoute('/terminal')({
  head: () => seo("ترمینال تحلیلی", "ترمینال تحلیلی — اطلاعات شفاف و وضعیت داده در نیک‌تراست."),
  
  component: Page,
});
function Page() { return <TerminalScreen/>; }
