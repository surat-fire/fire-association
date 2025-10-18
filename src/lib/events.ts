import { CreateEventData, EventResponse, EventsListResponse } from '@/types/event';

const API_BASE_URL = '/api/events';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

// Helper function to make authenticated API requests
const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

// GET /api/events - Fetch all events
export const fetchEvents = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<EventsListResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

    const url = `${API_BASE_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await apiRequest(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch events');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// GET /api/events/[id] - Fetch single event
export const fetchEvent = async (id: string): Promise<EventResponse> => {
  try {
    const response = await apiRequest(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// POST /api/events - Create new event
export const createEvent = async (eventData: CreateEventData): Promise<EventResponse> => {
  try {
    const response = await apiRequest(API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// PUT /api/events/[id] - Update event
export const updateEvent = async (id: string, eventData: Partial<CreateEventData>): Promise<EventResponse> => {
  try {
    const response = await apiRequest(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// DELETE /api/events/[id] - Delete event
export const deleteEvent = async (id: string): Promise<EventResponse> => {
  try {
    const response = await apiRequest(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete event');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Upload image for event
export const uploadEventImage = async (file: File): Promise<{ success: boolean; imagePath?: string; error?: string }> => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/events/upload', {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Utility functions
export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatEventTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatEventDateTime = (dateString: string, timeString: string): string => {
  return `${formatEventDate(dateString)} at ${formatEventTime(timeString)}`;
};

export const validateEventData = (data: CreateEventData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.image?.trim()) {
    errors.push('Event image is required');
  }

  if (!data.subject?.trim()) {
    errors.push('Event subject is required');
  } else if (data.subject.length < 3) {
    errors.push('Event subject must be at least 3 characters');
  } else if (data.subject.length > 200) {
    errors.push('Event subject must be less than 200 characters');
  }

  if (!data.date?.trim()) {
    errors.push('Event date is required');
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push('Date must be in YYYY-MM-DD format');
  }

  if (!data.time?.trim()) {
    errors.push('Event time is required');
  } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time)) {
    errors.push('Time must be in HH:mm format');
  }

  if (!data.venue?.trim()) {
    errors.push('Event venue is required');
  } else if (data.venue.length < 3) {
    errors.push('Event venue must be at least 3 characters');
  } else if (data.venue.length > 300) {
    errors.push('Event venue must be less than 300 characters');
  }

  if (!data.details?.trim()) {
    errors.push('Event details are required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
