import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { MarketHub } from '@/screens/prototype/Markets';
export const Route=createFileRoute('/markets_/commodities')({head:()=>seo('بازار کالا','ابزار طلا در نیک‌تراست با نمودار عمومی TradingView.'),component:()=> <MarketHub category="commodities"/>});