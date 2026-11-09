import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/market-data')({head:()=>seo('مدیریت دادهٔ بازار','سلامت دادهٔ نمونهٔ نیک‌تراست؛ API مستقل نداریم.'),component:()=> <AdminScreen section="market-data"/>});