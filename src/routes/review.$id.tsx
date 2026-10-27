import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { ReviewScreen } from "@/screens/Review";
import { findPlatform } from "@/screens/Shared";

export const Route = createFileRoute("/review/$id")({
  head: ({ params }) => {
    const p = findPlatform(params.id) as { name?: string } | undefined;
    const name = p?.name ?? "بررسی پلتفرم";
    return seo(`${name} — بررسی`, `بررسی ${name} بر اساس معیارهای نیک‌تراست: امتیاز، مزایا و محدودیت‌ها، مشخصات کلیدی و رگولاتوری با تاریخ و منبع.`);
  },
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const p = useScreenProps();
  return <ReviewScreen {...p} id={id} />;
}
