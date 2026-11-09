import { loadChange } from '@/lib/public-loaders';
import { PublicError,PublicMissing } from '@/screens/product/PublicStates';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { AlertsScreen } from '@/screens/product/Services';
export const Route = createFileRoute('/alerts_/$slug')({
  loader:({context,params})=>loadChange(context.queryClient,params.slug),
  errorComponent:PublicError,notFoundComponent:PublicMissing,
  head:({loaderData})=>seo(loaderData?.title??'تغییر عمومی موجود نیست',loaderData?.explanation??'تغییر منتشرشده‌ای برای این نشانی موجود نیست.'),
  
  component: Page,
});
function Page() { const p = useScreenProps(); return <AlertsScreen {...p} detail slug={Route.useParams().slug}/>; }
