import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage } from "@/screens/TextPage";

const SECTIONS = [{"t": "وضعیت این صفحه", "p": "متن سیاست حریم خصوصی پس از تأیید نهایی در این صفحه منتشر می‌شود. فهرست مقایسهٔ شما فقط در مرورگر خودتان ذخیره می‌شود."}];

export const Route = createFileRoute("/privacy")({
  head: () => seo("سیاست حریم خصوصی", "سیاست نیک‌تراست دربارهٔ داده‌های کاربران."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <TextPage go={go} title="سیاست حریم خصوصی" desc="سیاست نیک‌تراست دربارهٔ داده‌های کاربران." sections={SECTIONS} status="متن نهایی در حال تدوین" />;
}
