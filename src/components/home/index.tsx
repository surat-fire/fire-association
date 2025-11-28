"use client"

import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WhyJoinSection from "./WhyJoinSection";
import LogoSlider from "../common/LogoSlider";
import HomeFeaturedBlog from "./HomeFeaturedBlog";
import useGetHomeData from "@/hooks/useGetHomeData";
import Loader from "../ui/Loader";
import EventSection from "./EventSection";

const LandingPage = () => {

  const { data, isLoading } = useGetHomeData()

  return (
    <React.Fragment>
      <HeroSection />
      <AboutSection />
      <EventSection event={data?.event} isLoading={isLoading} />
      <WhyJoinSection />
      <LogoSlider />
      <HomeFeaturedBlog title={data?.blog?.title} tag={data?.blog?.tags[0]} image={data?.blog?.featuredImage} id={data?.blog?._id as string} created_at={data?.blog?.createdAt as any} isLoading={isLoading} />
    </React.Fragment>
  )
}

export default LandingPage