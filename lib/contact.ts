import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
});

export type ContactSubmission = z.infer<typeof contactSchema>;

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export function firstName(name: string) {
  const candidate = name.trim().split(/\s+/)[0];
  return candidate && /^[\p{L}\p{M}'-]+$/u.test(candidate) ? candidate : "";
}
