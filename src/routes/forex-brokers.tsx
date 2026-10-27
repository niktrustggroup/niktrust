import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ListingScreen } from "@/screens/Listing";
import NT_DATA from "@/screens/data";

export const Route = createFileRoute("/forex-brokers")({
  head: () => seo("بروکرهای فارکس", "فهرست بروکرهای فارکس بررسی‌شده بر اساس معیارهای نیک‌تراست. ترتیب فهرست از لینک‌های همکاری اثر نمی‌گیرد."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <ListingScreen {...p} title="بروکرهای فارکس" desc="فهرست بروکرهای فارکس بررسی‌شده بر اساس معیارهای نیک‌تراست. ترتیب فهرست از لینک‌های همکاری اثر نمی‌گیرد." items={NT_DATA.brokers} />;
}
