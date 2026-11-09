import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';
import { AdminScreen } from '@/screens/prototype/Admin';
export const Route=createFileRoute('/admin_/platforms_/create')({head:()=>seo('ایجاد پلتفرم','فرم نمونهٔ پلتفرم نیک‌تراست؛ ذخیره نمی‌شود.'),component:()=> <AdminScreen section="create"/>});