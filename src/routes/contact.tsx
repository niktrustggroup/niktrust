import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage } from "@/screens/TextPage";

const SECTIONS = [{"t": "تحریریه و گزارش خطا", "p": "اگر در یک بررسی خطا یا دادهٔ قدیمی می‌بینید، گزارش آن به اصلاح بررسی کمک می‌کند. نشانی رسمی ارتباط پس از راه‌اندازی در همین صفحه اعلام می‌شود."}, {"t": "همکاری تجاری", "p": "درخواست‌های همکاری تجاری از مسیر تحریریه جدا بررسی می‌شوند و بر امتیاز یا ترتیب نتایج اثر ندارند."}];

export const Route = createFileRoute("/contact")({
  head: () => seo("تماس با نیک‌تراست", "راه‌های ارتباط با تیم تحریریه و همکاری‌های تجاری نیک‌تراست."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <TextPage go={go} title="تماس با نیک‌تراست" desc="راه‌های ارتباط با تیم تحریریه و همکاری‌های تجاری نیک‌تراست." sections={SECTIONS} status="در حال تکمیل" />;
}
