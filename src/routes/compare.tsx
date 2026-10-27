import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { CompareScreen } from "@/screens/Compare";

export const Route = createFileRoute("/compare")({
  head: () => seo("مقایسهٔ پلتفرم‌ها", "مقایسهٔ ۲ تا ۴ پلتفرم مالی در هزینه‌ها، شرایط معاملاتی، رگولاتوری و واریز و برداشت — با نمایش صریح دادهٔ اعلام‌نشده."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <CompareScreen {...p} />;
}
