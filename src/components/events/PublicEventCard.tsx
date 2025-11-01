"use client";

import React from "react";
import SectionTitle from "../common/SectionTitle";
import { formatDate } from "@/lib/utils";
import useGetEvents from "@/hooks/events/useGetEvents";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";

// const eventsData = [
//     {
//         _id: '1',
//         title: 'Fire Extinguisher Use & Certification',
//         description: 'Learn and practice correct use of Class A/B/C extinguishers.',
//         date: '2025-10-28T00:00:00.000Z',
//         startTime: '10:00',
//         endTime: '13:00',
//         location: 'Main Training Center, Surat',
//         eventType: 'Training',
//         image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&q=80',
//     },
//     {
//         _id: '2',
//         title: 'Fire Extinguisher Use & Certification',
//         description: 'Learn and practice correct use of Class A/B/C extinguishers.',
//         date: '2025-10-28T00:00:00.000Z',
//         startTime: '10:00',
//         endTime: '13:00',
//         location: 'Fire Safety Institute, Surat',
//         eventType: 'Workshop',
//         image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80',
//     },
//     {
//         _id: '3',
//         title: 'Fire Extinguisher Use & Certification',
//         description: 'Learn and practice correct use of Class A/B/C extinguishers.',
//         date: '2025-10-28T00:00:00.000Z',
//         startTime: '10:00',
//         endTime: '13:00',
//         location: 'Central Fire Station, Surat',
//         eventType: 'Training',
//         image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80',
//     },
//     {
//         _id: '4',
//         title: 'Fire Extinguisher Use & Certification',
//         description: 'Learn and practice correct use of Class A/B/C extinguishers.',
//         date: '2025-10-28T00:00:00.000Z',
//         startTime: '10:00',
//         endTime: '13:00',
//         location: 'Safety Training Facility, Surat',
//         eventType: 'Drill',
//         image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80',
//     },
//     {
//         _id: '5',
//         title: 'Fire Extinguisher Use & Certification',
//         description: 'Learn and practice correct use of Class A/B/C extinguishers.',
//         date: '2025-10-28T00:00:00.000Z',
//         startTime: '10:00',
//         endTime: '13:00',
//         location: 'Emergency Response Center, Surat',
//         eventType: 'Training',
//         image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&q=80',
//     },
//     {
//         _id: '6',
//         title: 'Fire Extinguisher Use & Certification',
//         description: 'Learn and practice correct use of Class A/B/C extinguishers.',
//         date: '2025-10-28T00:00:00.000Z',
//         startTime: '10:00',
//         endTime: '13:00',
//         location: 'Fire Department Headquarters, Surat',
//         eventType: 'Training',
//         image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&q=80',
//     },
// ];

const PublicEventCard = () => {
  const router = useRouter();
  const { data: eventsData, isLoading } = useGetEvents();
  return (
    <section className="relative w-full sm:pt-[60px] pt-10">
      <div className="ct-container">
        <SectionTitle
          subtitle="Events & Training"
          title="Our events strengthen fire preparedness across Surat. Want to host a training or drill?"
          align="center"
          titleClass="max-w-[610px] w-full mx-auto"
        />
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:mt-10 mt-8">
          {eventsData?.data.map((event, index) => (
            <div
              key={index}
              className={`p-2.5 rounded-[20px] bg-[rgba(253,238,238,1)] transition-all duration-300 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white [&:hover_.arrow-btn]:bg-white`}
            >
              <div className="relative overflow-hidden rounded-[20px] md:h-[436px] sm:h-[300px] h-[280px]">
                <Image
                  src={
                    event.image ||
                    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=300&q=80"
                  }
                  alt={event.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover "
                />
              </div>

              <div className="p-5">
                <p
                  className={`text-base font-medium transition-colors duration-300`}
                >
                  {formatDate(event.date)} • {event.startTime}–{event.endTime}
                </p>

                <p
                  className={`text-sm font-medium transition-colors duration-300 my-4`}
                >
                  {event.description}
                </p>

                <h3
                  className={`sm:text-2xl text-xl font-medium m-0 transition-colors duration-300`}
                >
                  {event.title}
                </h3>

                <button
                  onClick={() => router.push(`/events/${event._id}`)}
                  className={`w-10 h-10 sm:w-14 sm:h-14 border border-[var(--primary)] rounded-full flex items-center justify-center transition-all duration-300 arrow-btn text-[var(--primary)] mt-4`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicEventCard;
