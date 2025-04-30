import React, { useState } from "react";
import useFormArray from "../hooks/useFormArray";
import { Navigate, useNavigate } from "react-router-dom";

export const Audiencies = () => {
  const navigate = useNavigate();
  const [audiences, setAudiences] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [createdAudience, setCreatedAudience] = useState(false);
  const [createdErrorAudience, setCreatedErrorAudience] = useState(false);

  const [form, changed] = useFormArray({
    name: "",
    contactName: "",
    contactEmail: "",
    contactTags: "",
    contactLocation: "",
  });

  const getAudiences = async () => {
    const request = await fetch(
      "http://localhost:3900/api/audience/getAudience",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const response = await request.json();
    if (response.status === "success") {
      setAudiences(response.audiences);
    } else {
      console.log("Error al obtener las audiencias");}
  
  };

  const createAudience = async (e) => {
    e.preventDefault();
    const contact = {
      name: form.contactName,
      email: form.contactEmail,
      tags: form.contactTags.split(",").map((tag) => tag.trim()),
      location: form.contactLocation,
    };

    const payload = {
      name: form.name,
      contacts: [contact],
    };

    const request = await fetch(
      "http://localhost:3900/api/audience/createAudience",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      }
    );

    const response = await request.json();
    if (response.status === "success") {
      setCreatedAudience(true);
      setCreateForm(false);
      getAudiences();
    } else {
      setCreatedErrorAudience(false);
    }
  }; 

  const deleteAudience = async (audienceId) => {
    const request = await fetch(
      "http://localhost:3900/api/audience/deleteAudience/" + audienceId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const response = await request.json();
    if (response.status === "success") {
      setAudiences(audiences.filter((audience) => audience._id !== audienceId));
    } else {
      console.log("Error en el borrado");
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <button
          className="bg-blue-500 ml-8 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          onClick={() => setCreateForm(true)}
        >
          Crear Audiencia
        </button>
        <button
          className="bg-blue-500 ml-8 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          onClick={getAudiences}
        >
          Ver audiencias
        </button>
      </div>
      <div className="ml-110 mt-5 text-3xl">
        {createdAudience && (
          <strong className="text-green-600">
            Audiencia creada correctamente
          </strong>
        )}
        {createdErrorAudience && (
          <strong className="text-red-600">Error al crear audiencia</strong>
        )}
      </div>
      {createForm && (
        <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Crear nueva audiencia</h2>
          <form onSubmit={createAudience} className="space-y-4">
            <div>
              <label className="block">Nombre de la audiencia</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={changed}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block">Nombre del contacto</label>
              <input
                type="text"
                name="contactName"
                value={form.contactName}
                onChange={changed}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block">Email del contacto</label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={changed}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block">Tags (separados por coma)</label>
              <input
                type="text"
                name="contactTags"
                value={form.contactTags}
                onChange={changed}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block">Ubicación del contacto</label>
              <input
                type="text"
                name="contactLocation"
                value={form.contactLocation}
                onChange={changed}
                className="w-full border p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
      {audiences.length > 0 && (
        <>
          <h1 className="text-xl font-bold"> Tus audiencias guardadas: </h1>
          <table className="w-full mt-4 border black ">
            <thead className="border black">
              <tr>
                <th>Nombre</th>
                <th>Contactos</th>
                <th>Fecha de creación</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {audiences.map((audiencia) => (
                <tr key={audiencia._id}>
                  <td className="pl-10 border-l black">{audiencia.name}</td>
                  <td className="pl-10 border-l black">
                    <ul>
                      {audiencia.contacts.map((contacto) => (
                        <li key={contacto._id}>
                          <strong>{contacto.name}</strong> - {contacto.email}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="pl-14 border-l black">
                    {new Date(audiencia.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-l black">
                    <button className="bg-blue-500 text-white ml-15 px-5 py-3 rounded mt-1 cursor-pointer" onClick={() => navigate("/home/updateaudience/"+audiencia._id)}>
                      Actualizar
                    </button>
                  </td>
                  <td className="border-l black">
                    <button
                      className="bg-red-500 ml-8 text-white px-7 py-3 rounded mt-1 cursor-pointer"
                      onClick={() => deleteAudience(audiencia._id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
