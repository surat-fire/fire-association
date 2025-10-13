import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WhyJoinSection from "./WhyJoinSection";
import LogoSlider from "../common/LogoSlider";

const LandingPage = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <AboutSection />  
      <WhyJoinSection />
      <LogoSlider />
    </React.Fragment>
  )
}

export default LandingPage