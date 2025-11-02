import z from "zod";

export const EventFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  organization: z.string().min(1, "Organization name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  event: z.string().optional(),
});

export type EventFormData = z.infer<typeof EventFormSchema>;
