"use client"

import React from "react";
import SectionTitle from "../common/SectionTitle";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";

interface IProps {
  title?: string
  tag?: string
  created_at?: string
  image?: string
  id?: string
  isLoading?: boolean
}

const HomeFeaturedBlog = ({
  title = "5 Workplace Fire Safety Practices Every Surat Office Should Follow",
  tag = "News",
  created_at = "FEB 5, 2050",
  image = "/img/about-hero-bg.webp",
  id = "12345456654",
  isLoading = false
}: IProps) => {
  const router = useRouter()
  if (isLoading) return <Loader />
  return (
    <>
      <section className="w-full relative sm:py-14 py-10">
        <div className="ct-container">
          <SectionTitle
            subtitle="Featured Blog"
            title="Latest Insights on Fire Safety"
            align="center"
          />
          <div className="w-full sm:h-[510px] h-[400px] bg-cover bg-center bg-no-repeat sm:rounded-[40px] rounded-3xl sm:mt-10 mt-8 sm:p-7 p-4 flex items-end" style={{ backgroundImage: `url(${image})` }}>
            <div className="w-full max-w-[555px] py-5 sm:px-7 px-5 sm:rounded-[40px] rounded-2xl bg-white gap-2">
              <div className="flex w-full items-center">
                <div className="w-full flex-1">
                  <h2 className="block font-bold sm:text-2xl text-xl text-[var(--primary)] mb-6">
                    {title}
                  </h2>
                  <div className="w-full flex items-center gap-5">
                    <span className="w-fit bg-[var(--primary)] text-white text-[13px] leading-4 py-2 px-4 rounded-full block">
                      {tag}
                    </span>
                    <h2 className="block font-semibold  text-base text-[var(--primary)] uppercase">
                      {formatDate(created_at)}
                    </h2>
                  </div>
                </div>
                <MdKeyboardArrowRight className="w-6 h-6 hover:cursor-pointer" onClick={() => router.push(`/blogs/${id}`)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeFeaturedBlog;
