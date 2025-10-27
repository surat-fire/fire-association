"use client"

import useGetEvent from '@/hooks/events/useGetEventById'
import { formatDate } from '@/lib/utils'
import { useParams } from 'next/navigation'
import React from 'react'
import Loader from '../ui/Loader'
import EventRegisterForm from './EventRegisterForm'

const EventDetails = () => {
    const { id } = useParams()
    const { data: events, isLoading } = useGetEvent(id as string)
    if (isLoading) return <Loader />
    const event = events?.data
    return (
        <section className='relative w-full sm:pt-[60px] pt-10'>
            <div className='ct-container'>
                <h1 className="text-2xl text-brand-800 font-bold mb-6">
                    {event?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-[#454545] text-base">
                    <span className="font-medium">
                        {formatDate(event?.date as string)} • {event?.startTime}–{event?.endTime}
                    </span>
                    <span>•</span>
                    <span className="font-medium">{event?.eventType}</span>
                    <span>•</span>
                    <span>{event?.location}</span>
                </div>
                <p className="text-[#454545] mb-8 leading-relaxed">
                    {event?.description}
                </p>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-brand-800 mb-6">Agenda</h2>
                    <div className="space-y-4">
                        {event?.agenda.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start border-b border-dotted border-black"
                            >
                                <span className="text-[#454545] text-base font-medium min-w-[60px]">
                                    {item.time}
                                </span>
                                <span className="flex-1 text-right text-[#454545] text-base">
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-brand-800 mb-4">Trainer</h2>
                    <p className="text-[#454545] text-base">
                        {event?.trainers && event?.trainers.length > 0
                            ? event?.trainers.join(', ')
                            : 'Led by experienced safety officers and industry practitioners.'}
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-brand-800 mb-4">
                        Safety Checklist
                    </h2>
                    <p className="text-[#454545] text-base">
                        Download the checklist:{' '}
                        <a
                            href={event?.safetyChecklistUrl}
                            className="text-[#454545] text-base underline hover:text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Checklist (PDF)
                        </a>
                    </p>
                </div>
                <EventRegisterForm />
            </div>
        </section>
    )
}

export default EventDetails