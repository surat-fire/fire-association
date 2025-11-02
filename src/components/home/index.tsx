"use client"

import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WhyJoinSection from "./WhyJoinSection";
import LogoSlider from "../common/LogoSlider";
import HomeFeaturedBlog from "./HomeFeaturedBlog";
import useGetHomeData from "@/hooks/useGetHomeData";
import Loader from "../ui/Loader";

const LandingPage = () => {

  const { data, isLoading } = useGetHomeData()

  if (isLoading) return <Loader />

  console.log("data =======>", data)

  return (
    <React.Fragment>
      <HeroSection />
      <AboutSection />
      <WhyJoinSection />
      <LogoSlider />
      <HomeFeaturedBlog title={data.blog.title} tag={data.blog.tags[0]} image={data.blog.featuredImage} id={data.blog._id} created_at={data.blog.createdAt} />
    </React.Fragment>
  )
}

export default LandingPage