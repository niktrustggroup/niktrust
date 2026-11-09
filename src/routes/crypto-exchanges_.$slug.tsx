import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ReviewScreen } from '@/screens/Review';
import { loadPublicPlatform } from '@/lib/public-loaders';
import { PublicError, PublicMissing, PublicLoading } from '@/screens/product/PublicStates';
export const Route = createFileRoute('/crypto-exchanges_/$slug')({
  loader: ({context,params}) => loadPublicPlatform(context.queryClient,params.slug,'exchanges'),
  head: ({loaderData}) => seo(loaderData?`${loaderData.name_fa} — بررسی صرافی`:'پروفایل عمومی موجود نیست',loaderData?.summary_fa??'رکورد منتشرشده‌ای برای این نشانی موجود نیست.'),
  pendingComponent: PublicLoading, errorComponent: PublicError, notFoundComponent: PublicMissing,
  component: Page,
});
function Page(){const p=useScreenProps();return <ReviewScreen {...p} id={Route.useParams().slug}/>;}
