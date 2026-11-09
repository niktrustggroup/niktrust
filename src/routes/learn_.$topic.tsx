import { createFileRoute,notFound } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { PublicationScreen } from '@/screens/product/Publication';
import { topicTitle } from '@/api/public-content';
import { contentQuery } from '@/api/content-client';
import { validatePublicSearch } from '@/lib/public-search';
import { PublicError,PublicMissing } from '@/screens/product/PublicStates';
export const Route=createFileRoute('/learn_/$topic')({
 validateSearch:validatePublicSearch,
 loader:async({context,params})=>{if(!topicTitle(params.topic))throw notFound();await context.queryClient.ensureQueryData(contentQuery);},
 head:({params})=>seo(topicTitle(params.topic)??'موضوع موجود نیست',`مطالب آموزشی منتشرشده دربارهٔ ${topicTitle(params.topic)??'این موضوع'} در نیک‌تراست.`),
 errorComponent:PublicError,notFoundComponent:PublicMissing,component:Page,
});
function Page(){const {go}=useScreenProps();const {topic}=Route.useParams();return <PublicationScreen go={go} title={topicTitle(topic)??'موضوع موجود نیست'} kind="topic" topic={topic}/>;}
