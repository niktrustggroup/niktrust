import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { CalculatorsScreen } from '@/screens/product/Services';

export const Route = createFileRoute("/tools")({
  head: () => seo("ابزارهای رایگان", "ابزارهای محاسباتی نیک‌تراست. هنوز فعال نشده‌اند و تاریخ انتشار در نقشهٔ راه مشخص می‌شود."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <CalculatorsScreen go={go}/>;
}
