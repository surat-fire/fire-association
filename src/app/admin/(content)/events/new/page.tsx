'use client';

import React from 'react';
import EventForm from '@/components/EventForm';
import { EventFormData } from '@/types/event';
import { createEvent } from '@/lib/events';

export default function NewEventPage() {
  const handleSubmit = async (data: EventFormData) => {
    try {
      const response = await createEvent(data);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create event');
      }
      
      // Success is handled by EventForm component (redirect)
    } catch (error) {
      console.error('Error creating event:', error);
      throw error; // Re-throw to let EventForm handle the error display
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
