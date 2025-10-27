'use client';

import Link from 'next/link';
import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';

const faqs = [
    {
        id: 1,
        question: 'How can I attend an event?',
        answer: 'Register via the Events page; spot confirmations emailed.',
        hasLink: true,
    },
    {
        id: 2,
        question: 'How do I become a member?',
        answer: 'To become a member, visit our membership page and complete the registration process. You can choose from various membership tiers based on your needs.',
    },
    {
        id: 3,
        question: 'Can the association assist during corporate emergencies?',
        answer: 'Yes, we provide 24/7 emergency assistance for corporate fire safety situations. Our trained professionals are available to help assess and manage emergency situations.',
    },
    {
        id: 4,
        question: 'Which fire extinguisher types are recommended?',
        answer: 'We recommend ABC dry chemical extinguishers for general use, CO2 extinguishers for electrical fires, and foam extinguishers for flammable liquid fires. The specific type depends on your facility needs.',
    },
    {
        id: 5,
        question: 'Safety Certification',
        answer: 'Our safety certification programs meet international standards. We offer various levels of certification for individuals and organizations in fire safety management.',
    },
    {
        id: 6,
        question: 'Expert Q&A',
        answer: 'Connect with our fire safety experts who can answer your specific questions about fire prevention, safety protocols, and compliance requirements.',
    },
];

const FAQSection = () => {
    const [openId, setOpenId] = useState<number | null>(1);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className='relative w-full sm:pt-[60px] pt-10'>
            <div className='w-full'>
                <div className=" bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                        {/* Left side - Image */}
                        {/* <div className="relative h-full"> */}
                        <img
                            src="/img/event-img.webp"
                            alt="Firefighter in action"
                            className="w-[708px] h-[677px] object-cover"
                        />
                        {/* </div>/ */}

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

                                <p className="text-[#490c0c] mb-10 leading-relaxed opacity-80">
                                    Find quick and reliable answers to common questions about our events, membership, training, and safety initiatives.
                                </p>

                                {/* FAQ Accordion */}
                                <div className="space-y-1">
                                    {faqs.map((faq) => (
                                        <div key={faq.id} className="border-l-4 border-transparent hover:border-[#490c0c] transition-colors">
                                            <button
                                                onClick={() => toggleFAQ(faq.id)}
                                                className="w-full text-left py-2 px-2 flex items-start justify-between group"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[#490c0c] font-medium opacity-60">
                                                            {faq.id}.
                                                        </span>
                                                        <span className={`font-medium transition-colors ${openId === faq.id ? 'text-[#490c0c]' : 'text-[#490c0c] opacity-70'
                                                            } group-hover:text-[#490c0c] group-hover:opacity-100`}>
                                                            {faq.question}
                                                        </span>
                                                    </div>

                                                    {openId === faq.id && (
                                                        <div className="mt-3 ml-8 text-sm text-[#490c0c] leading-relaxed opacity-70">
                                                            {faq.answer}
                                                            {faq.hasLink && (
                                                                <Link href="/events" className="ml-1 text-[#490c0c] underline cursor-pointer hover:opacity-100 font-medium">
                                                                    Go to Events
                                                                </Link>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <svg
                                                    className={`w-5 h-5 text-[#490c0c] opacity-60 transition-transform flex-shrink-0 mt-1 ${openId === faq.id ? 'rotate-180' : ''
                                                        }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
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
}

export default FAQSection