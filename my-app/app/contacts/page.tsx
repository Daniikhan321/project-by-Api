"use client";

import { useContacts } from "@/hooks/useContacts";

export default function ContactsPage() {
  const { contacts, loading } = useContacts();

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Contacts</h1>

      <div className="space-y-4">
        {contacts.map((contact: any) => (
          <div key={contact.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}