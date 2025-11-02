import { EventFormData } from "@/lib/validation/eventRegisterSchema";
import { IEventRegistration } from "@/models/EventRegistration";

export interface AgendaItem {
  time: string;
  title: string;
  _id: string;
}

export interface IEventResponse {
  data: IEvent[];
  success: boolean;
  message: string;
}

export interface IEventSpecificResponse {
  data: {
    event: IEvent;
    registration: IEventRegistration[];
  };
  success: boolean;
  message: string;
}

export interface IEvent {
  _id?: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  eventType: string;
  agenda: AgendaItem[];
  trainers: string[];
  safetyChecklistUrl?: string;
  image?: string;
  createdAt?: string;
}
