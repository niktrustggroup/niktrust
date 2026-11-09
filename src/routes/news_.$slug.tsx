import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { loadArticle } from '@/lib/public-loaders';
import { ArticleScreen } from '@/screens/product/Article';
import { PublicError,PublicMissing } from '@/screens/product/PublicStates';
export const Route=createFileRoute('/news_/$slug')({
 loader:({context,params})=>loadArticle(context.queryClient,params.slug,'news'),
 head:({loaderData})=>{const h=seo(loaderData?.title??'مطلب موجود نیست',loaderData?.summary??'مطلب منتشرشده‌ای برای این نشانی موجود نیست.');return {...h,meta:[...h.meta,{property:'og:type',content:'article'},...(loaderData?.image?.startsWith('https://')?[{property:'og:image',content:loaderData.image},{name:'twitter:image',content:loaderData.image}]:[])]};},
 errorComponent:PublicError,notFoundComponent:PublicMissing,component:Page,
});
function Page(){const {go}=useScreenProps();const data=Route.useLoaderData();return <ArticleScreen article={data} go={go}/>;}
