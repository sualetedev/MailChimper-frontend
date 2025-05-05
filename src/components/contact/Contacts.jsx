import React, { useState } from "react";
import { fetchContacts } from "./getContacts"; 
export const Contacts = () => {
  const [createForm, setCreateForm] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleGetContacts = async () => {
    const response = await fetchContacts("http://localhost:3900/contact/getContactsByUser");
    if (response.status === "success") {
      setContacts(response.contacts || []);
      console.log(contacts)
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <button
          className="bg-blue-500 ml-8 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          onClick={() => setCreateForm(true)}
        >
          Crear Contacto
        </button>
        <button
          className="bg-blue-500 ml-8 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          onClick={handleGetContacts}
        >
          Ver contactos
        </button>
      </div>

      <div className="mt-6 px-8">
        {contacts.length === 0 ? (
          <p className="text-gray-500">No hay contactos para mostrar.</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li
                key={contact._id}
                className="p-4 border rounded shadow-sm bg-white"
              >
                <p><strong>Nombre:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Ubicación:</strong> {contact.location}</p>
                <p><strong>Tags:</strong> {contact.tags?.join(", ") || "Ninguno"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
