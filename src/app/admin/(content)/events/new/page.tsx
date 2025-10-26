"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useCreateEvent from "@/hooks/events/useCreateEvent";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  const router = useRouter();
  const { mutateAsync } = useCreateEvent()

  const handleSubmit = async (formData: FormData) => {
    const data = await mutateAsync(formData);
    if (data) {
      router.push("/admin/events")
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#490c0c] mb-4">Create Event</h1>
      <EventForm onSubmit={handleSubmit} submitLabel="Create Event" />
    </div>
  );
}
