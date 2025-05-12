import React, { useState } from "react";
import useFormArray from "../hooks/useFormArray";

export const Contacts = () => {
  const [createForm, setCreateForm] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [eliminatedContact, setEliminatedContact] = useState(false);
  const [created, setCreated] = useState(false);
  const [form, changed, reset] = useFormArray({
    name: "",
    email: "",
    tags: [""],
    location: "",
  });

  const handleGetContacts = async () => {
    const request = await fetch(
      "http://localhost:3900/api/contact/getContactsByUser",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }
      }
    );
    const response = await request.json();
    if (response.status === "success") {
      setContacts(response.contacts || []);
      console.log(contacts);
    }
  };

  const createContact = async (e) => {
    e.preventDefault();
    const request = await fetch(
      "http://localhost:3900/api/contact/createContact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      }
    );
    const response = await request.json();

    if (response.status === "success") {
      setCreated(true);
      setCreateForm(false);
      setEliminatedContact(false);
      reset();

      handleGetContacts();
    }
  };

  const eliminateContact = async (email) => {
    const request = await fetch(
      "http://localhost:3900/api/contact/eliminateContact",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ email }),
      }
    );
    const response = await request.json();
    if (response.status === "success") {
      setEliminatedContact(true);
      setCreated(false);
      handleGetContacts();
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
        <div></div>
      </div>
      <div>
        {created && (
          <div>
            <strong className="text-green-700 text-4xl">
              Contacto guardado con éxito!
            </strong>
          </div>
        )}
        {eliminatedContact && (
          <div>
            <strong className="text-red-700 text-4xl">
              Contacto eliminado con exito!
            </strong>
          </div>
        )}
        {createForm && (
          <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Crear contacto</h2>
            <form onSubmit={createContact} className="space-y-4">
              <div>
                <label className="block">Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={changed}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block">Email</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changed}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block">Tag</label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={changed}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={changed}
                  className="w-full border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
              >
                Guardar contacto
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="mt-6 px-8">
        {contacts.length === 0 ? (
          <p></p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li
                key={contact._id}
                className="p-4 border rounded shadow-sm bg-white"
              >
                <div className="flex flex-box justify-between">
                  <div>
                    <p>
                      <strong>Nombre:</strong> {contact.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {contact.email}
                    </p>
                    <p>
                      <strong>Ubicación:</strong> {contact.location}
                    </p>
                    <p>
                      <strong>Tags:</strong>{" "}
                      {contact.tags?.join(", ") || "Ninguno"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <button className="bg-blue-500 ml-5 text-white px-4 py-2 rounded cursor-pointer">
                        Actualizar
                      </button>
                    </p>
                    <p>
                      <button
                        className="bg-red-800 ml-8 text-white px-4 py-2 rounded mt-1 cursor-pointer"
                        onClick={() => eliminateContact(contact.email)}
                      >
                        Eliminar
                      </button>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
