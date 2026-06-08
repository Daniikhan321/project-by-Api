"use client";

import { useEffect, useState } from "react";
import { getAllContacts } from "@/services/contactService";

export const useContacts = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getAllContacts();
        setContacts(data);
      } catch (err) {
        setError("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
  };
};