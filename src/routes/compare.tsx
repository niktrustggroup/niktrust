import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { CompareScreen } from "@/screens/Compare";
import { sanitizeSelection } from '@/api/rules';
import { mockCatalog } from '@/api/mockClient';

export const Route = createFileRoute("/compare")({
  head: () => seo("مقایسهٔ پلتفرم‌ها", "مقایسهٔ ۲ تا ۴ پلتفرم مالی در هزینه‌ها، شرایط معاملاتی، رگولاتوری و واریز و برداشت — با نمایش صریح دادهٔ اعلام‌نشده."),
  validateSearch: (search: Record<string, unknown>): { items?: string } => typeof search['items'] === 'string' ? { items: search['items'] } : {},
  component: Page,
});

function Page() {
  const p = useScreenProps();
  const { items } = Route.useSearch();
  const selected = items ? sanitizeSelection(items.split(','), mockCatalog.platforms) : p.compare;
  return <CompareScreen {...p} compare={selected} />;
}
