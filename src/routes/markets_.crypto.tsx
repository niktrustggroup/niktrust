import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { MarketHub } from '@/screens/prototype/Markets';
export const Route=createFileRoute('/markets_/crypto')({head:()=>seo('بازار رمزارز','ابزارهای رمزارز نیک‌تراست با نمودار عمومی TradingView.'),component:()=> <MarketHub category="crypto"/>});