import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { MethodologyScreen } from "@/screens/Methodology";

export const Route = createFileRoute("/methodology")({
  head: () => seo("روش ارزیابی نیک‌تراست", "معیارها، وزن‌دهی، منابع داده، دورهٔ به‌روزرسانی و سیاست همکاری تجاری در ارزیابی‌های نیک‌تراست."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <MethodologyScreen {...p} />;
}
