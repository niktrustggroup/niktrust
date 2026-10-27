import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useScreenProps } from "@/lib/site";
import { TextPage, StagedGrid } from "@/screens/TextPage";
const POSTS = [
  { title: "راهنمای انتخاب بروکر فارکس", desc: "معیارهایی که پیش از افتتاح حساب باید بررسی کنید." },
  { title: "رگولاتوری چیست و چرا مهم است؟", desc: "تفاوت مجوز سطح ۱، سطح ۲ و فراساحلی." },
  { title: "پراپ‌فرم چگونه کار می‌کند؟", desc: "چالش، قوانین ریسک و تقسیم سود به زبان ساده." },
];

export const Route = createFileRoute("/blog")({
  head: () => seo("مجلهٔ نیک‌تراست", "راهنماها و مقاله‌های آموزشی دربارهٔ انتخاب بروکر، صرافی و پراپ‌فرم."),
  component: Page,
});

function Page() {
  const { go } = useScreenProps();
  return (
    <>
      <TextPage go={go} title="مجلهٔ نیک‌تراست" desc="راهنماها و مقاله‌های آموزشی دربارهٔ انتخاب بروکر، صرافی و پراپ‌فرم." />
      <div className="nt-container" style={{ paddingBottom: "var(--section-y)" }}><StagedGrid items={POSTS} /></div>
    </>
  );
}
