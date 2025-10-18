import AboutBanner from "@/components/about/AboutBanner";
import CompanyHistory from "@/components/about/CompanyHistory";
import CoreValues from "@/components/about/CoreValues";
import FounderProfile from "@/components/about/FounderProfile";
import Licenses from "@/components/about/Licenses";
import OurMissionVision from "@/components/about/OurMissionVision";

const AboutPage = () => {
  return (
    <>
      <AboutBanner />
      <CompanyHistory />
      <OurMissionVision />
      <FounderProfile />
      <CoreValues />
      <Licenses/>
    </>
  );
};

export default AboutPage;
