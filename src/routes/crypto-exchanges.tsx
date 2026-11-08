import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ListingScreen } from "@/screens/Listing";

export const Route = createFileRoute("/crypto-exchanges")({
  head: () => seo("صرافی‌های ارز دیجیتال", "فهرست صرافی‌های ارز دیجیتال بررسی‌شده با کارمزد، تعداد رمزارز و وضعیت ثبت نزد نهاد ناظر."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <ListingScreen {...p} category="exchanges" title="صرافی‌های ارز دیجیتال" desc="کارمزد، دسترسی از ایران و سطح پوشش اطلاعات." />;
}
