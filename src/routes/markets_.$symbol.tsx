import { createFileRoute, notFound } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { useScreenProps } from '@/lib/site';
import { TerminalScreen } from '@/screens/prototype/Markets';
import { INSTRUMENTS } from '@/lib/prototype';
export const Route = createFileRoute('/markets_/$symbol')({
  beforeLoad: ({params}) => { if (!INSTRUMENTS.some(i=>i.slug===params.symbol)) throw notFound(); },
  head: ({params}) => seo(INSTRUMENTS.find(i=>i.slug===params.symbol)?.name??'نماد پیدا نشد', "جزئیات نماد با نمودار عمومی TradingView، تأخیر احتمالی و وضعیت دریافت مستقل داده."),
  
  component: Page,
});
function Page() { return <TerminalScreen key={Route.useParams().symbol} symbol={Route.useParams().symbol} detail/>; }
