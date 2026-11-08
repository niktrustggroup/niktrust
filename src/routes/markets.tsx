import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { MarketScreen } from '@/screens/product/Services';

export const Route = createFileRoute("/markets")({
  head: () => seo("نمای کلی بازار", "وضعیت دادهٔ بازار، آخرین قیمت، منبع و زمان دریافت اطلاعات در نیک‌تراست."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <MarketScreen go={go}/>;
}
