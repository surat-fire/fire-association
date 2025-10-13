"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";

const Footer = () => {
  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <footer className="relative mt-24 bg-[#3b0d0d] text-white/90">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#4a0f0f] via-[#3b0d0d] to-[#2a0909]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Catalog</h3>
            <nav className="mt-6 grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-white/80">
              <Link href="#" className="hover:text-white">Home</Link>
              <Link href="#" className="hover:text-white">About</Link>
              <Link href="#" className="hover:text-white">Event</Link>
              <Link href="#" className="hover:text-white">Blog</Link>
              <Link href="#" className="hover:text-white">Member</Link>
              <Link href="#" className="hover:text-white">FAQ</Link>
              <Link href="#" className="hover:text-white col-span-2">Privacy Policy</Link>
            </nav>

            <div className="mt-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold tracking-wide">SURAT</div>
                <div className="text-xs text-white/70">FIRE ASSOCIATION</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-white/60 text-sm">Contact us</div>
              <div className="mt-2 text-lg font-semibold tracking-wide">+91 87654 87654</div>
            </div>
            <div>
              <div className="text-white/60 text-sm">Location</div>
              <div className="mt-2 text-sm">Address: 123 Industrial Blvd, Tech City</div>
            </div>
            <div>
              <div className="text-white/60 text-sm">Email</div>
              <div className="mt-2 text-sm">info@thesuratafire.com</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 text-xs text-white/60">
          <div>© 2025 Surat Fire Associate. Design by Godhani Technology</div>
          <button
            onClick={scrollToTop}
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[url('/public/img/network-access.webp')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative p-6 sm:p-8 flex items-center justify-between gap-6">
              <div className="text-sm">Terms &amp; Condition</div>
              <Link href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="sm:hidden fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;


