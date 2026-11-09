import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { CalculatorsScreen } from '@/screens/product/Services';

export const Route = createFileRoute("/tools")({
  head: () => seo("ابزارهای رایگان", "ماشین‌حساب‌های حجم پوزیشن، ارزش پیپ، مارجین، سود و زیان، اهرم و سواپ با فرمول و فرض‌های اعلام‌شده."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <CalculatorsScreen go={go}/>;
}
