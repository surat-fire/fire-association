'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import EventList from '@/components/EventList';
import { Event } from '@/types/event';
import { fetchEvents, deleteEvent } from '@/lib/events';

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchEvents({
        search: searchTerm || undefined,
        sortBy,
        sortOrder
      });

      if (response.success && response.data) {
        setEvents(response.data);
      } else {
        setError(response.error || 'Failed to load events');
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setError(error instanceof Error ? error.message : 'Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [searchTerm, sortBy, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEvent(id);
      
      if (response.success) {
        // Remove the event from the local state
        setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      } else {
        throw new Error(response.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error; // Re-throw to let EventList handle the error display
    }
  };

  const handleCreateNew = () => {
    router.push('/admin/events/new');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadEvents();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <form onSubmit={handleSearch} className="flex-1">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search events by title, venue, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Button type="submit" variant="outline" size="sm">
                  Search
                </Button>
              </div>
            </form>

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
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadEvents}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <EventList
              events={events}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Stats */}
        {!isLoading && !error && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {events.length} event{events.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}
