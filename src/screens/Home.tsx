import { Link } from '@tanstack/react-router';
import { ListChecks, CalendarCheck, Scale } from 'lucide-react';
import { HeroIllustration } from './product/HeroIllustration';
import { MarketOverview } from './product/MarketWidgets';
import { ExplorePlatforms, PlatformFinderWizard, QuickComparison, ReturnUserPanel, PlatformUpdates, FeaturedReviews, ResearchEducation, TrustMethodology } from './home/Sections';
import { CalculatorsSection } from './home/Calculators';
export function HomeScreen({ compare, toggleCompare }: { go: (id: string, arg?: string) => void; compare: string[]; toggleCompare: (id: string) => void }) {
  const p = { compare, toggleCompare };
  return <main>
    <section className="nt-hero" aria-labelledby="hero-title"><div className="nt-container nt-hero-inner"><div className="nt-hero-copy"><p className="nt-hero-eyebrow">بررسی مستقل پلتفرم‌های مالی</p><h1 id="hero-title">قبل از انتخاب، دقیق‌تر بررسی کن.</h1><p className="nt-hero-desc">بروکرها، صرافی‌ها و پراپ‌فرم‌ها را از نظر اعتبار، هزینه‌ها، خدمات و محدودیت‌ها بررسی و مقایسه کن.</p><div className="nt-hero-ctas"><Link to="/forex-brokers" className="nt-btn nt-btn--primary nt-btn--lg">بررسی پلتفرم‌ها</Link><Link to="/methodology" className="nt-btn nt-btn--secondary nt-btn--lg">روش ارزیابی ما</Link></div><ul className="nt-hero-trust"><li><ListChecks aria-hidden="true"/>معیارهای شفاف و قابل بررسی</li><li><CalendarCheck aria-hidden="true"/>منبع و تاریخ کنترل اطلاعات</li><li><Scale aria-hidden="true"/>استقلال ارزیابی از روابط تجاری</li></ul></div><div className="nt-hero-visual"><HeroIllustration/></div></div></section>
    <ExplorePlatforms {...p}/>
    <PlatformFinderWizard {...p}/>
    <QuickComparison {...p}/>
    <ReturnUserPanel/>
    <MarketOverview/>
    <PlatformUpdates/>
    <FeaturedReviews/>
    <CalculatorsSection/>
    <ResearchEducation/>
    <TrustMethodology/>
  </main>;
}
