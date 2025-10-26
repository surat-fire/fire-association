"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { GoArrowUp, GoArrowUpRight } from "react-icons/go";

interface InfoItem {
  label: string;
  value: string;
  span?: string;
  valueClass: string;
  Tag: React.ElementType;
}

const Footer = () => {
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const menuItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#" },
    { name: "Event", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Member", link: "#" },
    { name: "FAQ", link: "#" },
    { name: "Privacy Policy", link: "#" },
  ];

  const infoItems: InfoItem[] = [
    {
      label: "Contact us",
      value: "+91 87654 87654",
      span: "sm:col-span-2",
      Tag: "div",
      valueClass: "text-2xl text-white font-medium",
    },
    {
      label: "Location",
      value: "Address: 123 Industrial Blvd, Tech City",
      Tag: "h3",
      valueClass: "text-base font-medium text-white",
    },
    {
      label: "Email",
      value: "info@thesuratafire.com",
      Tag: "h3",
      valueClass: "text-base font-medium text-white",
    },
  ];
  return (
    <footer className="relative sm:mt-14 mt-10 bg-[var(--primary)] sm:py-14 py-10">
      <div className="relative ct-container">
        <div className="flex items-start justify-between lg:flex-row flex-col gap-10">
          <div className="w-full flex-1">
            <Image
              src="/img/catalog.webp"
              width={200}
              height={56}
              alt="hero-image"
              className="object-contain sm:w-[197px] h-auto w-[150px] sm:mb-[30px] mb-5"
            />
            <ul className="flex flex-wrap list-none sm:gap-5 gap-3 w-full lg:max-w-[290px] ">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="sm:text-base text-sm font-medium hover:opacity-60 text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                  {index < menuItems.length - 1 && (
                    <li
                      key={`sep-${index}`}
                      className="text-base font-medium text-white"
                    >
                      /
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-x-[25px] sm:gap-y-[30px] md:w-fit w-full">
            {infoItems.map((item, index) => {
              const ValueTag = item.Tag;
              return (
                <div key={index} className={item.span ? item.span : ""}>
                  <span className="text-[13px] leading-4 font-medium text-white mb-2.5 block">
                    {item.label}
                  </span>
                  <ValueTag className={item.valueClass}>{item.value}</ValueTag>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:mt-[154px] sm:mt-20 mt-12 flex items-center gap-3 justify-between flex-wrap max-[400px]:flex-col max-[400px]:items-start">
          <Link href="/">
            <Image
              src="/img/footer-logo.webp"
              width={154}
              height={50}
              alt="logo"
              className="object-contain sm:w-[150px] w-[130px] h-auto"
            />
          </Link>
          <span className="text-sm font-medium text-white block w-fit">
            © 2025 Surat Fire Associate. Design by Godhani Technology
          </span>
        </div>

        <div className="mt-5 w-full sm:rounded-[20px] rounded-2xl overflow-hidden bg-[url('/img/footer-bg.webp')] bg-cover bg-bottom bg-no-repeat">
          <div className="w-full flex items-center justify-between gap-5 sm:h-[200px] h-[150px] sm:p-10 p-6">
            <Link
              href="#"
              className="text-base font-medium hover:text-opacity-50 text-white"
            >
              Terms & Condition
            </Link>
            <Link
              href="#"
              className="w-12 h-12 flex items-center justify-center bg-transparent hover:bg-[rgba(255,255,255,0.1)] rounded-full md:mr-10"
            >
              <GoArrowUpRight className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className=" fixed sm:bottom-[30px] bottom-4 sm:right-[30px] right-4 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-[var(--primary)] border border-white text-white transition-all duration-300 hover:bg-white hover:text-[var(--primary)]"
        aria-label="Back to top"
      >
        <GoArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;
