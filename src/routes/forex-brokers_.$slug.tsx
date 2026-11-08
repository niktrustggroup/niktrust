import { createFileRoute, notFound } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ReviewScreen } from '@/screens/Review';
import { catalogQuery } from '@/api/client';
export const Route = createFileRoute('/forex-brokers_/$slug')({
  loader: async ({ context, params }) => { const data = await context.queryClient.ensureQueryData(catalogQuery); const p = data.data.platforms.find(p => p.slug === params.slug && p.category === 'brokers'); if (!p) throw notFound(); return p; },
  head: ({ loaderData }) => seo(loaderData ? `${loaderData.name_fa} — بررسی بروکر` : 'بروکر پیدا نشد', loaderData ? `مشخصات و منابع ${loaderData.name_fa}؛ هزینه‌ها و وضعیت دسترسی از ایران، با نمایش دادهٔ اعلام‌نشده.` : 'پروفایل بروکر موردنظر در نیک‌تراست موجود نیست.'),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <ReviewScreen {...p} id={Route.useParams().slug}/>; }
