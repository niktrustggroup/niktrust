import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage } from "@/screens/TextPage";

const SECTIONS = [{"t": "هشدار ریسک", "p": "معامله در بازارهای مالی با ریسک از دست دادن سرمایه همراه است و برای همهٔ افراد مناسب نیست."}, {"t": "ماهیت محتوا", "p": "نیک‌تراست بروکر، صرافی یا مؤسسهٔ مالی نیست و توصیهٔ سرمایه‌گذاری ارائه نمی‌دهد. اطلاعات پلتفرم‌ها ممکن است تغییر کند؛ پیش از تصمیم، تاریخ بازبینی و منبع هر داده را بررسی و از خود پلتفرم استعلام کنید."}];

export const Route = createFileRoute("/disclaimer")({
  head: () => seo("سلب مسئولیت و هشدار ریسک", "هشدار ریسک معامله در بازارهای مالی و حدود مسئولیت محتوای نیک‌تراست."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <TextPage go={go} title="سلب مسئولیت و هشدار ریسک" desc="هشدار ریسک معامله در بازارهای مالی و حدود مسئولیت محتوای نیک‌تراست." sections={SECTIONS} />;
}
