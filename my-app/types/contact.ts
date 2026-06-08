export type ContactStatus = "active" | "inactive" | "pending";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: ContactStatus;
  company?: string;
  avatar?: string;
}

// Contact form fields
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  status: ContactStatus;
  company?: string;
}

// Updating a contact
export type UpdateContactPayload = Partial<ContactFormData>;