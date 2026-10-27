import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage } from "@/screens/TextPage";

const SECTIONS = [{"t": "مدل درآمد", "p": "نیک‌تراست ممکن است از طریق لینک‌های همکاری درآمد داشته باشد."}, {"t": "جدایی از ارزیابی", "p": ["این همکاری بر معیارهای ارزیابی، امتیاز و ترتیب نتایج اثر ندارد و پلتفرم‌های بدون همکاری نیز بررسی می‌شوند.", "هر لینک همکاری با برچسب «لینک همکاری — بر امتیاز و ترتیب اثر ندارد» و جدا از متن ارزیابی نمایش داده می‌شود."]}];

export const Route = createFileRoute("/disclosure")({
  head: () => seo("افشای همکاری تجاری", "نحوهٔ کسب درآمد نیک‌تراست و جدایی همکاری تجاری از ارزیابی."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <TextPage go={go} title="افشای همکاری تجاری" desc="نحوهٔ کسب درآمد نیک‌تراست و جدایی همکاری تجاری از ارزیابی." sections={SECTIONS} />;
}
