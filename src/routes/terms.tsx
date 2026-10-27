import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage } from "@/screens/TextPage";

const SECTIONS = [{"t": "وضعیت این صفحه", "p": "متن حقوقی شرایط استفاده پس از تأیید نهایی در این صفحه منتشر می‌شود."}];

export const Route = createFileRoute("/terms")({
  head: () => seo("شرایط استفاده", "شرایط استفاده از وب‌سایت نیک‌تراست."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <TextPage go={go} title="شرایط استفاده" desc="شرایط استفاده از وب‌سایت نیک‌تراست." sections={SECTIONS} status="متن نهایی در حال تدوین" />;
}
