'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import QuillEditor from '@/components/QuillEditor';
import ImageUploader from '@/components/ImageUploader';
import { EventFormData, Event } from '@/types/event';

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventFormData) => Promise<void>;
  isLoading?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  isLoading = false
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<EventFormData>({
    defaultValues: {
      image: event?.image || '',
      subject: event?.subject || '',
      date: event?.date || '',
      time: event?.time || '',
      venue: event?.venue || '',
      details: event?.details || ''
    }
  });

  const watchedImage = watch('image');
  const watchedDetails = watch('details');

  // Update form values when event prop changes
  useEffect(() => {
    if (event) {
      setValue('image', event.image);
      setValue('subject', event.subject);
      setValue('date', event.date);
      setValue('time', event.time);
      setValue('venue', event.venue);
      setValue('details', event.details);
    }
  }, [event, setValue]);

  const handleFormSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(data);
      router.push('/admin/events');
      router.refresh();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/events');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {event ? 'Edit Event' : 'Create New Event'}
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <ImageUploader
                value={watchedImage}
                onChange={(value) => setValue('image', value)}
                error={errors.image?.message}
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Event Subject"
                placeholder="Enter event title/subject"
                {...register('subject', {
                  required: 'Event subject is required',
                  minLength: {
                    value: 3,
                    message: 'Subject must be at least 3 characters'
                  },
                  maxLength: {
                    value: 200,
                    message: 'Subject must be less than 200 characters'
                  }
                })}
                error={errors.subject?.message}
              />
            </div>

            <div>
              <Input
                label="Date"
                type="date"
                {...register('date', {
                  required: 'Date is required'
                })}
                error={errors.date?.message}
              />
            </div>

            <div>
              <Input
                label="Time"
                type="time"
                {...register('time', {
                  required: 'Time is required'
                })}
                error={errors.time?.message}
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Venue"
                placeholder="Enter event location/venue"
                {...register('venue', {
                  required: 'Venue is required',
                  minLength: {
                    value: 3,
                    message: 'Venue must be at least 3 characters'
                  },
                  maxLength: {
                    value: 300,
                    message: 'Venue must be less than 300 characters'
                  }
                })}
                error={errors.venue?.message}
              />
            </div>

            <div className="md:col-span-2">
              <QuillEditor
                value={watchedDetails}
                onChange={(value) => setValue('details', value)}
                label="Event Details"
                placeholder="Enter detailed event information..."
                error={errors.details?.message}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isSubmitting || isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
