'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EventForm from '@/components/EventForm';
import { Event, EventFormData } from '@/types/event';
import { fetchEvent, updateEvent } from '@/lib/events';

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventId = params.id as string;

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchEvent(eventId);
        
        if (response.success && response.data) {
          setEvent(response.data);
        } else {
          setError(response.error || 'Failed to load event');
        }
      } catch (error) {
        console.error('Error loading event:', error);
        setError(error instanceof Error ? error.message : 'Failed to load event');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  const handleSubmit = async (data: EventFormData) => {
    try {
      const response = await updateEvent(eventId, data);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to update event');
      }
      
      // Success is handled by EventForm component (redirect)
    } catch (error) {
      console.error('Error updating event:', error);
      throw error; // Re-throw to let EventForm handle the error display
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Event</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/admin/events')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/admin/events')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EventForm event={event} onSubmit={handleSubmit} />
    </div>
  );
}
