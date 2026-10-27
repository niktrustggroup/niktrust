import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage, StagedGrid } from "@/screens/TextPage";
import NT_DATA from "@/screens/data";
const TOOLS = NT_DATA.tools;

export const Route = createFileRoute("/tools")({
  head: () => seo("ابزارهای رایگان", "ابزارهای محاسباتی نیک‌تراست. هنوز فعال نشده‌اند و تاریخ انتشار در نقشهٔ راه مشخص می‌شود."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return (
    <>
      <TextPage go={go} title="ابزارهای رایگان" desc="ابزارهای محاسباتی نیک‌تراست. هنوز فعال نشده‌اند و تاریخ انتشار در نقشهٔ راه مشخص می‌شود." />
      <div className="nt-container" style={{ paddingBottom: "var(--section-y)" }}><StagedGrid items={TOOLS} /></div>
    </>
  );
}
