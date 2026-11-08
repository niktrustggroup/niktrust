import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ListingScreen } from "@/screens/Listing";

export const Route = createFileRoute("/prop-firms")({
  head: () => seo("پراپ‌فرم‌ها", "فهرست پراپ‌فرم‌های بررسی‌شده با هزینهٔ چالش، تقسیم سود و شواهد پرداخت."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <ListingScreen {...p} category="prop" title="پراپ‌فرم‌ها" desc="هزینهٔ چالش، تقسیم سود و وضعیت شواهد پرداخت؛ دادهٔ ناموجود صریح نمایش داده می‌شود." />;
}
