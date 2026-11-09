import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { MarketHub } from '@/screens/prototype/Markets';
export const Route=createFileRoute('/markets_/stocks')({head:()=>seo('سهام و شاخص‌ها','ابزارهای شاخص نیک‌تراست؛ سهام منفرد اضافه نشده.'),component:()=> <MarketHub category="stocks"/>});