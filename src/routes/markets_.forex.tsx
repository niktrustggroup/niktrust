import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { MarketHub } from '@/screens/prototype/Markets';
export const Route=createFileRoute('/markets_/forex')({head:()=>seo('بازار فارکس','ابزارهای فارکس نیک‌تراست با نمودار عمومی TradingView.'),component:()=> <MarketHub category="forex"/>});