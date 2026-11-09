import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { UserScreen } from '@/screens/prototype/User';
export const Route=createFileRoute('/terminal_/watchlist')({head:()=>seo('واچ‌لیست بازار','واچ‌لیست مشترک نشست نمونهٔ نیک‌تراست.'),component:()=> <UserScreen section="watchlist" title="واچ‌لیست بازار"/>});