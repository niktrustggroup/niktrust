import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ListingScreen } from "@/screens/Listing";
import NT_DATA from "@/screens/data";

export const Route = createFileRoute("/crypto-exchanges")({
  head: () => seo("صرافی‌های ارز دیجیتال", "فهرست صرافی‌های ارز دیجیتال بررسی‌شده با کارمزد، تعداد رمزارز و وضعیت ثبت نزد نهاد ناظر."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <ListingScreen {...p} title="صرافی‌های ارز دیجیتال" desc="فهرست صرافی‌های ارز دیجیتال بررسی‌شده با کارمزد، تعداد رمزارز و وضعیت ثبت نزد نهاد ناظر." items={NT_DATA.topReviews.filter((r) => r.id === "e")} />;
}
