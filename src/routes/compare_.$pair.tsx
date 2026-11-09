import { loadPair } from '@/lib/public-loaders';
import { PublicError,PublicMissing } from '@/screens/product/PublicStates';
import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { CompareScreen } from '@/screens/Compare';
export const Route = createFileRoute('/compare_/$pair')({
  loader: ({context,params})=>loadPair(context.queryClient,params.pair),
  errorComponent:PublicError,notFoundComponent:PublicMissing,
  head: ({loaderData})=>seo(loaderData?`مقایسهٔ ${loaderData.map(p=>p.name_fa).join(' و ')}`:'مقایسه موجود نیست','مقایسهٔ مشخصات رکوردهای عمومی همدسته؛ بدون امتیاز عددی.'),
  
  component: Page,
});
function Page() { const p = useScreenProps(); const pair = Route.useLoaderData().map(p=>p.id); const navigate = Route.useNavigate(); const setCompare = (ids: string[]) => { p.setCompare(ids); void navigate({ to:'/compare',search:{ items:ids.join(',') } }); }; return <CompareScreen {...p} compare={pair.length === 2 ? pair : []} setCompare={setCompare}/>; }
