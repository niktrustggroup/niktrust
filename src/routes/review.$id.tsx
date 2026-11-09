import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { ReviewScreen } from '@/screens/Review';
import { loadPublicPlatform } from '@/lib/public-loaders';
import { PublicError, PublicMissing } from '@/screens/product/PublicStates';
export const Route=createFileRoute('/review/$id')({
 loader:({context,params})=>loadPublicPlatform(context.queryClient,params.id),
 head:({loaderData})=>seo(loaderData?`${loaderData.name_fa} — بررسی`:'پروفایل عمومی موجود نیست',loaderData?.summary_fa??'پروفایل منتشرشده‌ای برای این نشانی موجود نیست.'),
 errorComponent:PublicError,notFoundComponent:PublicMissing,component:Page,
});
function Page(){const p=useScreenProps();return <ReviewScreen {...p} id={Route.useParams().id}/>;}
