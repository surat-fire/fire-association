import React from "react";
import SectionTitle from "../common/SectionTitle";

const CompanyHistory = () => {
  return (
    <>
      <section className="relative w-full sm:py-[60px] py-10">
        <div className="ct-container">
          <SectionTitle
            subtitle="Company History"
            title="Building Surat’s Safety Legacy Together"
            align="center"
            titleClass="max-w-[440px] w-full mx-auto"
          />
          <div className="sm:mt-10 mt-8 grid md:grid-cols-3 grid-cols-1 lg:gap-11 md:gap-8 gap-5 ">
            <div className="w-full md:text-start text-center">
              <span className="block font-medium text-xs text-[rgba(109,109,109,1)] sm:mb-6 mb-4">
                2019 — Founding and initial community workshops
              </span>
              <h4 className="block m-0 font-bold sm:text-2xl text-xl text-[var(--primary)]">
                Foundation (/01)
              </h4>
            </div>

            <div className="w-full relative md:justify-items-center md:px-5 md:text-start text-center">
              <div className="h-full border-l border-[var(--primary)] border-dashed w-1 absolute  top-0 left-0 md:block hidden"></div>
              <span className="block font-medium text-xs text-[rgba(109,109,109,1)] sm:mb-6 mb-4">
                2021 — City-wide industrial drills initiative
              </span>
              <h4 className="block m-0 font-bold sm:text-2xl text-xl text-[var(--primary)]">
                Safety Initiative (/02)
              </h4>
               <div className="h-full border-l border-[var(--primary)] border-dashed w-1 absolute  top-0 right-0  md:block hidden"></div>
            </div>
            <div className="w-full md:text-start text-center">
              <span className="block font-medium text-xs text-[rgba(109,109,109,1)] sm:mb-6 mb-4">
                2024 — Expanded training partnerships
              </span>
              <h4 className="block m-0 font-bold sm:text-2xl text-xl text-[var(--primary)]">
                Safety Partnership (/03)
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyHistory;
