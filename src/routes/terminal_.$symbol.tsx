import { createFileRoute,notFound } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { INSTRUMENTS } from '@/lib/prototype';
import { TerminalScreen } from '@/screens/prototype/Markets';
export const Route=createFileRoute('/terminal_/$symbol')({beforeLoad:({params})=>{if(!INSTRUMENTS.some(i=>i.slug===params.symbol))throw notFound();},head:({params})=>seo(`ترمینال ${INSTRUMENTS.find(i=>i.slug===params.symbol)?.name??'نماد ناموجود'}`,'ترمینال تحلیل نیک‌تراست بدون اجرای معامله.'),component:Page});
function Page(){return <TerminalScreen key={Route.useParams().symbol} symbol={Route.useParams().symbol}/>;}