import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ListingScreen } from "@/screens/Listing";
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute("/crypto-exchanges")({
  head: () => seo("صرافی‌های ارز دیجیتال", "فهرست صرافی‌های ارز دیجیتال بررسی‌شده با کارمزد، تعداد رمزارز و وضعیت ثبت نزد نهاد ناظر."),
  component: Page,
});

function Page() {
  const p = useScreenProps();
  return <><nav className="nt-container nt-app-nav" aria-label="نوع صرافی"><Link to="/crypto-exchanges/iranian">صرافی‌های داخلی</Link><Link to="/crypto-exchanges/international">صرافی‌های خارجی</Link></nav><ListingScreen {...p} category="exchanges" title="صرافی‌های ارز دیجیتال" desc="کارمزد، دسترسی از ایران و سطح پوشش اطلاعات." /></>;
}
