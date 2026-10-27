import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ListingScreen } from "@/screens/Listing";
import NT_DATA from "@/screens/data";

export const Route = createFileRoute("/prop-firms")({
  head: () => seo("پراپ‌فرم‌ها", "فهرست پراپ‌فرم‌های بررسی‌شده با هزینهٔ چالش، تقسیم سود و شواهد پرداخت."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <ListingScreen {...p} title="پراپ‌فرم‌ها" desc="فهرست پراپ‌فرم‌های بررسی‌شده با هزینهٔ چالش، تقسیم سود و شواهد پرداخت." items={NT_DATA.topReviews.filter((r) => r.id === "f")} />;
}
