import React from "react";
import SectionTitle from "../common/SectionTitle";
import { MdKeyboardArrowRight } from "react-icons/md";

const HomeFeaturedBlog = () => {
  return (
    <>
      <section className="w-full relative sm:py-14 py-10">
        <div className="ct-container">
          <SectionTitle
            subtitle="Featured Blog"
            title="Latest Insights on Fire Safety"
            align="center"
          />
          <div className="w-full sm:h-[570px] h-[400px] bg-[url('/img/about-hero-bg.webp')] bg-cover bg-center bg-no-repeat sm:rounded-[40px] rounded-3xl sm:mt-10 mt-8 sm:p-7 p-4 flex items-end">
            <div className="w-full max-w-[555px] py-5 sm:px-7 px-5 sm:rounded-[40px] rounded-2xl bg-white gap-2">
              <div className="flex w-full items-center">
                <div className="w-full flex-1">
                  <h2 className="block font-bold sm:text-2xl text-xl text-[var(--primary)] mb-6">
                    5 Workplace Fire Safety Practices Every Surat Office Should
                    Follow
                  </h2>
                  <div className="w-full flex items-center gap-5">
                    <span className="w-fit bg-[var(--primary)] text-white text-[13px] leading-4 py-2 px-4 rounded-full block">
                      News
                    </span>
                    <h2 className="block font-semibold  text-base text-[var(--primary)] uppercase">
                      FEB 5, 2050
                    </h2>
                  </div>
                </div>
                <MdKeyboardArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeFeaturedBlog;
