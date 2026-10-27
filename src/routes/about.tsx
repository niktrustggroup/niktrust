import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { AboutScreen } from "@/screens/About";

export const Route = createFileRoute("/about")({
  head: () => seo("دربارهٔ نیک‌تراست", "نیک‌تراست ارزیاب مستقل پلتفرم‌های مالی است؛ نه بروکر، نه صرافی و نه مشاور سرمایه‌گذاری."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <AboutScreen {...p} />;
}
