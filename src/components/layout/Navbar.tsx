"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); 
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Event", link: "/event" },
    { name: "Blog", link: "/blog" },
    { name: "Member", link: "/member" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed  left-0 right-0 z-50 max-w-[1280px] mx-auto px-5 transition-all duration-300 ${
        scrolled ? "top-4" : "lg:top-10 top-8 "
      } `}
    >
      <div className="w-full sm:px-5 px-3">
        <div
          className={`w-full rounded-full bg-white lg:px-[30px] sm:px-5 px-3 flex items-center justify-between py-2 border ${
            scrolled ? "border-[var(--primary)] " : "border-transparent "
          }`}
        >
          <Link href="/">
            <Image
              src="/img/logo.webp"
              width={200}
              height={56}
              alt="hero-image"
              className="object-contain sm:w-[154px] h-auto w-[100px]"
            />
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              {menuItems.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    className={`text-[13px] font-medium leading-4 hover:text-[var(--primary)] ${
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-[rgba(176,176,176,1)]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="w-fit flex items-center sm:gap-4 gap-2">
            <div>
              <Link href="/contact">
                <Button>Contact Us</Button>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <HiOutlineMenuAlt1 className="w-7 h-7 text-[var(--primary)]" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden fixed right-0 top-0 h-dvh overflow-auto bg-white w-[300px] z-40 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            <div className="w-full p-5 flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-0"
              >
                <MdClose className="w-7 h-7 text-[var(--primary)]" />
              </button>
            </div>
            <div className="flex flex-col gap-5 p-5">
              {menuItems.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    className={`text-lg font-medium leading-4 hover:text-[var(--primary)] ${
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-[rgba(176,176,176,1)]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
