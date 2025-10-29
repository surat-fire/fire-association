import z from "zod";

export const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().min(1, "Company name is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof formSchema>;

export const MemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().min(1, "Type / Role is required").max(100),
  // We'll accept File | null for the uploaded image client-side, but store string (dataURL) in state
  imageFile: z.any().optional(),
});

export type MemberFormValues = z.infer<typeof MemberSchema>;
