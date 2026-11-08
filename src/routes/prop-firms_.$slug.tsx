import { createFileRoute, notFound } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ReviewScreen } from '@/screens/Review';
import { catalogQuery } from '@/api/client';
export const Route = createFileRoute('/prop-firms_/$slug')({
  loader: async ({ context, params }) => { const data = await context.queryClient.ensureQueryData(catalogQuery); const p = data.data.platforms.find(p => p.slug === params.slug && p.category === 'prop'); if (!p) throw notFound(); return p; },
  head: ({ loaderData }) => seo(loaderData ? `${loaderData.name_fa} — بررسی پراپ‌فرم` : 'پراپ‌فرم پیدا نشد', loaderData ? `هزینهٔ چالش و مشخصات ${loaderData.name_fa}؛ وضعیت شواهد پرداخت و دادهٔ نامشخص.` : 'پروفایل پراپ‌فرم موردنظر موجود نیست.'),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <ReviewScreen {...p} id={Route.useParams().slug}/>; }
