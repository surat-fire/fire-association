"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import EventForm from "@/components/EventForm";
import useEditEvent from "@/hooks/events/useEditEvent";
import useGetEvent from "@/hooks/events/useGetEventById";
import Loader from "@/components/ui/Loader";

export default function EditEventPage() {
    const router = useRouter();
    const { id } = useParams()
    const { data: events, isLoading } = useGetEvent(id as string)
    const { mutateAsync } = useEditEvent(id as string)

    const handleSubmit = async (formData: FormData) => {
        const data = await mutateAsync(formData);
        if (data) {
            // router.push("/admin/events")
        }
    };

    if (isLoading) return <Loader />;
    if (!events) return <p className="p-6 text-red-600">Event not found.</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-[#490c0c] mb-4">Edit Event</h1>
            <EventForm initialValues={events.data.event} onSubmit={handleSubmit} submitLabel="Update Event" />
        </div>
    );
}
