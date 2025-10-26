'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import EventCard from '@/components/EventCard';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import useGetEvents from '@/hooks/events/useGetEvents';
import useDeleteEvent from '@/hooks/events/useDeleteEvent';
import Loader from '@/components/ui/Loader';

export default function EventsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const { data: events, isLoading, error, refetch } = useGetEvents(searchTerm, sortBy, sortOrder)
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent()

  const handleCreateNew = () => {
    router.push('/admin/events/new');
  };

  if (isLoading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
            <p className="mt-2 text-gray-600">
              Manage your events, create new ones, and organize your schedule.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={handleCreateNew}>
              Create New Event
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search events by title, venue, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="subject">Sort by Title</option>
              <option value="createdAt">Sort by Created</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => refetch()}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {events?.data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No events found</div>
          <Button onClick={() => router.push('/admin/events/new')}>
            Create Your First Event
          </Button>
        </div>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events?.data.map((ev) => (
          <EventCard
            key={ev._id}
            event={ev}
            onEdit={(id) => router.push(`/admin/events/${id}/edit`)}
            onDelete={(id) => {
              setTargetId(id);
              setConfirmOpen(true);
            }}
          />
        ))}
      </div>

      {!isLoading && !error && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {events?.data.length} event{events?.data.length !== 1 ? 's' : ''}
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => targetId && deleteEvent(targetId)}
        cancelText='Cancel'
        confirmText='Delete'
        isLoading={isPending}
      />
    </div>
  );
}
