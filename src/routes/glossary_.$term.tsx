import { createFileRoute,notFound } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { contentQuery } from '@/api/content-client';
import { TermScreen } from '@/screens/product/Article';
import { PublicError,PublicMissing } from '@/screens/product/PublicStates';
export const Route=createFileRoute('/glossary_/$term')({
 loader:async({context,params})=>{const data=await context.queryClient.ensureQueryData(contentQuery);const t=data.terms.find(t=>t.slug===params.term);if(!t)throw notFound();return t;},
 head:({loaderData})=>seo(loaderData?.title??'واژه موجود نیست',loaderData?.definition??'مدخل منتشرشده‌ای برای این نشانی موجود نیست.'),
 errorComponent:PublicError,notFoundComponent:PublicMissing,component:Page,
});
function Page(){const {go}=useScreenProps();return <TermScreen term={Route.useLoaderData()} go={go}/>;}
