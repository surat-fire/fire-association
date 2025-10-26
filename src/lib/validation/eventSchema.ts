import { z } from "zod";

export const agendaItemSchema = z.object({
  time: z.string().min(1, "Agenda time is required"),
  title: z.string().min(1, "Agenda title is required"),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().optional(),
  eventType: z.string().optional(),
  image: z.string().optional(),
  safetyChecklist: z.string().optional(),

  // agenda is optional, but if present must contain valid objects
  agenda: z
    .array(agendaItemSchema)
    .optional()
    .refine(
      (arr) => !arr || arr.every((a) => a.time && a.title),
      "All agenda items must have both time and title"
    ),

  // trainers are optional but each must be a non-empty string if provided
  trainers: z
    .array(z.string().min(1, "Trainer name cannot be empty"))
    .optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
