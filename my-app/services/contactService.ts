import api from '@/lib/axiosInstance';
import {
  Contact,
  ContactFormData,
  UpdateContactPayload,
  ContactStatus
} from '@/types/contact';
import { ApiResponse } from '@/types/api';

// ─── GET all contacts ────────────────────────────────────────────────────────
export const getAllContacts = async (): Promise<Contact[]> => {
  const response = await api.get<ApiResponse<Contact[]>>('/contacts');
  return response.data.data;
};

// ─── GET single contact ──────────────────────────────────────────────────────
export const getContactById = async (id: number): Promise<Contact> => {
  const response = await api.get<Contact>(`/users/${id}`);
  return response.data;
};

// ─── GET contacts by status ──────────────────────────────────────────────────
export const getContactsByStatus = async (
  status: ContactStatus
): Promise<Contact[]> => {
  const response = await api.get<Contact[]>('/users', {
    params: { status },
  });
  return response.data;
};

// ─── SEARCH contacts by name ─────────────────────────────────────────────────
export const searchContacts = async (
  query: string
): Promise<Contact[]> => {
  const response = await api.get<Contact[]>('/users', {
    params: { q: query },
  });
  return response.data;
};

// ─── CREATE contact ──────────────────────────────────────────────────────────
export const createContact = async (
  payload: ContactFormData
): Promise<Contact> => {
  const response = await api.post<Contact>('/users', payload);
  return response.data;
};

// ─── UPDATE contact ──────────────────────────────────────────────────────────
export const updateContact = async (
  id: number,
  payload: ContactFormData
): Promise<Contact> => {
  const response = await api.put<Contact>(`/users/${id}`, payload);
  return response.data;
};

// ─── PATCH contact ───────────────────────────────────────────────────────────
export const patchContact = async (
  id: number,
  payload: UpdateContactPayload
): Promise<Contact> => {
  const response = await api.patch<Contact>(`/users/${id}`, payload);
  return response.data;
};

// ─── DELETE contact ──────────────────────────────────────────────────────────
export const deleteContact = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

// ─── Named export object ─────────────────────────────────────────────────────
export const contactService = {
  getAll:       getAllContacts,
  getById:      getContactById,
  getByStatus:  getContactsByStatus,
  search:       searchContacts,
  create:       createContact,
  update:       updateContact,
  patch:        patchContact,
  delete:       deleteContact,
};