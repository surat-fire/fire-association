"use client"

import Loader from '@/components/ui/Loader'
import useGetEvent from '@/hooks/events/useGetEventById'
import { useParams } from 'next/navigation'
import { Calendar, Clock, MapPin, Users, FileText, Download, Mail, Phone, Building2 } from 'lucide-react'
import React from 'react'
import { formatDate, formatTime } from '@/lib/utils'

const EventViewPage = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetEvent(id as string)
    const events = data?.data.event
    const registration = data?.data.registration

    if (isLoading) return <Loader />
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-brand-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium">
                            {events?.eventType}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {events?.title}
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl">
                        {events?.description}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Info Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-brand-800 mb-6">Event Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-brand-800/10 rounded-lg">
                                        <Calendar className="w-5 h-5 text-brand-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Date</p>
                                        <p className="text-gray-900 font-semibold">{formatDate(events!.date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-brand-800/10 rounded-lg">
                                        <Clock className="w-5 h-5 text-brand-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Time</p>
                                        <p className="text-gray-900 font-semibold">
                                            {formatTime(events!.startTime)} - {formatTime(events!.endTime)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 md:col-span-2">
                                    <div className="p-2 bg-brand-800/10 rounded-lg">
                                        <MapPin className="w-5 h-5 text-brand-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Location</p>
                                        <p className="text-gray-900 font-semibold">{events?.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 md:col-span-2">
                                    <div className="p-2 bg-brand-800/10 rounded-lg">
                                        <Users className="w-5 h-5 text-brand-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Trainers</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {(events?.trainers || []).map((trainer, index) => (
                                                <span key={index} className="px-3 py-1 bg-brand-800 text-white rounded-full text-sm">
                                                    {trainer}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Agenda Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-brand-800 mb-6">Event Agenda</h2>
                            <div className="space-y-4">
                                {(events?.agenda || []).map((item, index) => (
                                    <div key={item._id as string} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold">
                                                {formatTime(item.time).split(' ')[0]}
                                            </div>
                                            {index < events!.agenda.length - 1 && (
                                                <div className="w-0.5 h-full bg-brand-800/20 my-2"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <p className="text-sm text-brand-800 font-semibold mb-1">
                                                {formatTime(item.time)}
                                            </p>
                                            <p className="text-gray-700">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Safety Checklist Card */}
                        {events?.safetyChecklistUrl && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold text-brand-800 mb-4">Safety Resources</h2>
                                <a
                                    href={events.safetyChecklistUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 border-2 border-brand-800/20 rounded-lg hover:bg-brand-800/5 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-brand-800/10 rounded-lg">
                                            <FileText className="w-6 h-6 text-brand-800" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Safety Checklist</p>
                                            <p className="text-sm text-gray-600">Download PDF Document</p>
                                        </div>
                                    </div>
                                    <Download className="w-5 h-5 text-brand-800" />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Registrations */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <h2 className="text-2xl font-bold text-brand-800 mb-2">Registrations</h2>
                            <p className="text-gray-600 mb-6">
                                {registration?.length} {registration?.length === 1 ? 'person' : 'people'} registered
                            </p>

                            <div className="space-y-4">
                                {(registration || []).map((reg, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-brand-800/50 transition-colors">
                                        <h3 className="font-bold text-gray-900 mb-3">{reg.fullName}</h3>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Building2 className="w-4 h-4 text-brand-800" />
                                                <span className="text-gray-700">{reg.organization}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4 text-brand-800" />
                                                <span className="text-gray-700 break-all">{reg.email}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="w-4 h-4 text-brand-800" />
                                                <span className="text-gray-700">{reg.phone}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            <p className="text-xs text-gray-500">
                                                Registered: {new Date(reg.registeredAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventViewPage