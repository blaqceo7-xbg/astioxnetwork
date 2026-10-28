import { HomepageAward } from "./components/HomepageAward";
import { HomepageHero } from "./components/HomepageHero";
import { Carousel } from "flowbite-react";
import { HomepageSlideBanner } from "./components/HomepageSlideBanner";
import { WhyChooseUs } from "./components/WhyChooseUs";
import CryptoChart from "./components/CryptoChart";
import CryptoList from "./components/CryptoChart2";
import { HomepageInvestmentPlans } from "./components/HomepageInvestmentPlans";
import { HomepageTestimonies } from "./components/HomepageTestimonies";
import { HomepageCompanyVideoCert } from "./components/HomepageCompanyVideoCert";
import { FooterCon } from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-white dark:bg-isoDark w-full h-full text-black dark:text-white min-h-screen space-y-20 relative font-[family-name:var(--font-geist-sans)]">
      <HomepageHero page={"home"} />
      <HomepageAward />
      <HomepageCompanyVideoCert />
      <WhyChooseUs />
      <CryptoList  />
      <HomepageSlideBanner />
      <HomepageInvestmentPlans />
      <HomepageTestimonies />
      <FooterCon />
    </div>
  );
}
