import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { PublicationScreen } from '@/screens/product/Publication';

export const Route = createFileRoute("/blog")({
  head: () => seo("مجلهٔ نیک‌تراست", "راهنماها و مقاله‌های آموزشی دربارهٔ انتخاب بروکر، صرافی و پراپ‌فرم."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return <PublicationScreen go={go} title="مجلهٔ نیک‌تراست" kind="blog"/>;
}
