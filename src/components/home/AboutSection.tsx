// components/AboutSection.js
import React from "react";
import Image from "next/image";
import SectionTitle from "../common/SectionTitle";

const AboutSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <SectionTitle text="About Us" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Empowering Global Trade Through
            <br />
            Trust and Innovation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-brand-300 rounded-2xl p-8 flex flex-col h-full">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide mb-3">
                OUR MISSION
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Building a Safer Surat
                <br />
                Together
              </h3>
            </div>

            <div className="flex-grow">
              <p className="mb-4">
                We&apos;re dedicated to strengthening Surat&apos;s fire safety culture
                through awareness, education, and collaboration.
              </p>
              <p className="mb-6">
                Our mission is to empower every citizen and organization to act
                with confidence during emergencies.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-[#DD282819] backdrop-blur-sm px-4 py-2 text-brand-900 rounded-full text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-brand-900 rounded-full inline-block mr-2"></span>
                FireSafety
              </span>
              <span className="bg-[#DD282819]  backdrop-blur-sm text-brand-900 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-brand-900 rounded-full inline-block mr-2"></span>
                CommunityAwareness
              </span>
            </div>
          </div>

          <div className="relative h-[400px] md:h-full rounded-2xl overflow-hidden">
            <Image
              src="/img/firefighter.webp"
              alt="Firefighter in action"
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-2xl p-8 flex flex-col h-full text-white">
            <div className="mb-4">
              <p className="text-xs font-semibold text-red-300 uppercase tracking-wide mb-3">
                OUR VISION
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Creating a Fire-Ready
                <br />
                Future
              </h3>
            </div>

            <div className="flex-grow">
              <p className="text-gray-200 mb-4">
                By uniting industries, authorities, and people, we aim to build a
                future where fire risks are minimized, and safety becomes a
                shared responsibility. Together,
              </p>
              <p className="text-gray-200 mb-6">
                we can make Surat a model city for fire prevention.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-white backdrop-blur-sm px-4 py-2 text-brand-900 rounded-full text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-brand-900 rounded-full inline-block mr-2"></span>
                SafetyFirst
              </span>
              <span className="bg-white  backdrop-blur-sm text-brand-900 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-brand-900 rounded-full inline-block mr-2"></span>
                SuratStrong
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;