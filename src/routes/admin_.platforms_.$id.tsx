import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/platforms_/$id')({head:({params})=>seo(`ویرایش پلتفرم ${params.id}`,'ویرایش موقت نمونهٔ پلتفرم نیک‌تراست.'),component:Page});
function Page(){return <AdminScreen section="platform-detail" id={Route.useParams().id}/>;}