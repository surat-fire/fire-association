export interface Event {
  id: string;
  image: string;
  subject: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  venue: string;
  details: string; // Rich text HTML content
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  image: string;
  subject: string;
  date: string;
  time: string;
  venue: string;
  details: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

export interface EventFormData {
  image: string;
  subject: string;
  date: string;
  time: string;
  venue: string;
  details: string;
}

export interface EventResponse {
  success: boolean;
  data?: Event;
  error?: string;
  message?: string;
}

export interface EventsListResponse {
  success: boolean;
  data?: Event[];
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
