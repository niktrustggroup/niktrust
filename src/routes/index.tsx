import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { HomeScreen } from "@/screens/Home";

export const Route = createFileRoute("/")({
  head: () => seo("ارزیابی و مقایسهٔ مستقل پلتفرم‌های مالی", "پلتفرم مالی مناسب خود را پیدا کنید: مقایسه، بررسی و داده‌های تأییدشده دربارهٔ بروکرها، صرافی‌ها و پراپ‌فرم‌ها بر اساس معیارهای شفاف."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <HomeScreen {...p} />;
}
