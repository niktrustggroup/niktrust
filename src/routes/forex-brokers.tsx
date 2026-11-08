import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ListingScreen } from "@/screens/Listing";

export const Route = createFileRoute("/forex-brokers")({
  head: () => seo("بروکرهای فارکس", "فهرست بروکرهای فارکس بررسی‌شده بر اساس معیارهای نیک‌تراست. ترتیب فهرست از لینک‌های همکاری اثر نمی‌گیرد."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <ListingScreen {...p} category="brokers" title="بروکرهای فارکس" desc="فهرست پروفایل‌ها بر اساس سطح پوشش اطلاعات؛ مستقل از روابط تجاری." />;
}
