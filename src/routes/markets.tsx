import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage, StagedGrid } from "@/screens/TextPage";
import { MarketsHub } from "@/screens/Extra";

export const Route = createFileRoute("/markets")({
  head: () => seo("بازارها", "شش بازار نیک‌تراست: فارکس، کریپتو، پراپ‌فرم، بورس، صندوق‌های قابل معامله و طلا و نقره."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return (
    <>
      <TextPage go={go} title="بازارها" desc="شش بازار نیک‌تراست: فارکس، کریپتو، پراپ‌فرم، بورس، صندوق‌های قابل معامله و طلا و نقره." />
      <div className="nt-container" style={{ paddingBottom: "var(--section-y)" }}><MarketsHub go={go} /></div>
    </>
  );
}
