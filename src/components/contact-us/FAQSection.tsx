"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How can I attend an event?",
    answer: "Register via the Events page; spot confirmations emailed.",
    hasLink: true,
  },
  {
    id: 2,
    question: "How do I become a member?",
    answer:
      "To become a member, visit our membership page and complete the registration process. You can choose from various membership tiers based on your needs.",
  },
  {
    id: 3,
    question: "Can the association assist during corporate emergencies?",
    answer:
      "Yes, we provide 24/7 emergency assistance for corporate fire safety situations. Our trained professionals are available to help assess and manage emergency situations.",
  },
  {
    id: 4,
    question: "Which fire extinguisher types are recommended?",
    answer:
      "We recommend ABC dry chemical extinguishers for general use, CO2 extinguishers for electrical fires, and foam extinguishers for flammable liquid fires. The specific type depends on your facility needs.",
  },
  {
    id: 5,
    question: "Safety Certification",
    answer:
      "Our safety certification programs meet international standards. We offer various levels of certification for individuals and organizations in fire safety management.",
  },
  {
    id: 6,
    question: "Expert Q&A",
    answer:
      "Connect with our fire safety experts who can answer your specific questions about fire prevention, safety protocols, and compliance requirements.",
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full sm:pt-[60px] pt-10">
      <div className="w-full">
        <div className="w-full md:px-0 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full lg:h-[700px] md:h-[650px] h-auto md:rounded-e-[20px] md:rounded-s-[0] rounded-2xl overflow-hidden">
              <Image
                src="/img/event-img.webp"
                alt="Firefighter in action"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right side - FAQ Content */}
            <div className="flex items-center">
              <div className="w-full">
                <div className="mb-3">
                  <div
                    className={`flex items-center gap-2 w-fit justify-center mb-4`}
                  >
                    <span className="block w-1.5 h-1.5 rounded-md bg-[var(--primary)] font-normal"></span>
                    <p
                      className={`text-base text-[var(--primary)] mb-0 !font-bold`}
                    >
                      Frequently Asked Questions
                    </p>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-[#490c0c] mb-4 leading-tight">
                  Find quick answers
                  <br />
                  grouped by topic.
                </h1>

                <p className="text-[rgba(69,69,69,1)] mb-9 text-base font-medium">
                  Find quick and reliable answers to common questions about our
                  events, membership, training, and safety initiatives.
                </p>

                {/* FAQ Accordion */}
                <div className="relative h-full w-full rounded-sm before:bg-[rgba(246,246,246,1)] before:content-[''] before:absolute before:w-[2px] before:h-full before:left-0 before:top-0 before:rounded-sm ">
                  {faqs.map((faq) => (
                    <div key={faq.id} className={`w-full`}>
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className={`relative w-full text-left flex items-start justify-between group sm:px-5 px-3 sm:py-2.5 py-1.5 
    before:absolute before:content-[''] before:w-[2px] before:h-full before:left-0 before:top-0 before:rounded-sm 
    before:bg-[rgba(0,0,0,1)] focus:outline-none focus:shadow-none
    ${openId === faq.id ? "before:opacity-100" : "before:opacity-0"}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[var(--primary)] font-semibold text-base transition-opacity 
          ${openId === faq.id ? "opacity-100" : "opacity-60"} 
          group-hover:text-[#490c0c] group-hover:opacity-100`}
                            >
                              {faq.id}.
                            </span>
                            <span
                              className={`text-[var(--primary)] font-semibold text-base transition-opacity 
          ${openId === faq.id ? "opacity-100" : "opacity-60"} 
          group-hover:text-[#490c0c] group-hover:opacity-100`}
                            >
                              {faq.question}
                            </span>
                          </div>

                          {openId === faq.id && (
                            <div className="text-base font-medium text-[rgba(69,69,69,1)] ms-5 mt-2">
                              {faq.answer}
                              {faq.hasLink && (
                                <Link
                                  href="/events"
                                  className="text-base font-medium text-[rgba(69,69,69,1)] ml-1 underline inline-block"
                                >
                                  Go to Events
                                </Link>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Optional SVG Icon */}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
