import { createFileRoute, notFound } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ReviewScreen } from '@/screens/Review';
import { catalogQuery } from '@/api/client';
export const Route = createFileRoute('/crypto-exchanges_/$slug')({
  loader: async ({ context, params }) => { const data = await context.queryClient.ensureQueryData(catalogQuery); const p = data.data.platforms.find(p => p.slug === params.slug && p.category === 'exchanges'); if (!p) throw notFound(); return p; },
  head: ({ loaderData }) => seo(loaderData ? `${loaderData.name_fa} — بررسی صرافی` : 'صرافی پیدا نشد', loaderData ? `کارمزد و مشخصات ${loaderData.name_fa}؛ منابع و وضعیت دسترسی ایران در نیک‌تراست.` : 'پروفایل صرافی موردنظر موجود نیست.'),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <ReviewScreen {...p} id={Route.useParams().slug}/>; }
