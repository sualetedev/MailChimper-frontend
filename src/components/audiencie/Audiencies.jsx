import React, { useEffect, useState } from "react";
import useFormArray from "../hooks/useFormArray";
import { useNavigate } from "react-router-dom";
import { fetchContacts } from "../contact/getContacts"

export const Audiencies = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filterTag, setFilterTag] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [audiences, setAudiences] = useState([]);
  const [createdAudience, setCreatedAudience] = useState(false);
  const [createdErrorAudience, setCreatedErrorAudience] = useState(false);
  const [createForm, setCreateForm] = useState(false);

  const [form, changed] = useFormArray({
    name: "",
  });

  const getAudiences = async () => {
    const request = await fetch("http://localhost:3900/api/audience/getAudience", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const response = await request.json();
    if (response.status === "success") {
      setAudiences(response.audiences);
    } else {
      console.log("Error al obtener las audiencias");
    }
  };

  const createAudience = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      contacts: selectedContacts,
    };

    const request = await fetch("http://localhost:3900/api/audience/createAudience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });

    const response = await request.json();
    if (response.status === "success") {
      setCreatedAudience(true);
      setCreateForm(false);
      getAudiences();
    } else {
      setCreatedErrorAudience(true);
    }
  };

  const deleteAudience = async (audienceId) => {
    const request = await fetch("http://localhost:3900/api/audience/deleteAudience/" + audienceId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const response = await request.json();
    if (response.status === "success") {
      setAudiences(audiences.filter((audience) => audience._id !== audienceId));
    } else {
      console.log("Error en el borrado");
    }
  };

 

  useEffect(() => {
    if (createForm) {
      fetchContacts().then((data) => setContacts(data));
    }
  }, [createForm]);

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
          <strong className="text-green-600">Audiencia creada correctamente</strong>
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
              <label className="block">Filtrar por tag</label>
              <input
                type="text"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Ej: cliente"
              />
            </div>

            <div>
              <label className="block">Filtrar por ubicación</label>
              <input
                type="text"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Ej: Madrid"
              />
            </div>

            <div>
              <label className="block">Seleccionar contactos</label>
              <select
                multiple
                value={selectedContacts}
                onChange={(e) =>
                  setSelectedContacts(Array.from(e.target.selectedOptions, (o) => o.value))
                }
                className="w-full border p-2 rounded h-40"
              >
                {contacts
                  .filter((c) => {
                    const byTag = filterTag
                      ? c.tags?.some((t) =>
                          t.toLowerCase().includes(filterTag.toLowerCase())
                        )
                      : true;
                    const byLocation = filterLocation
                      ? c.location?.toLowerCase().includes(filterLocation.toLowerCase())
                      : true;
                    return byTag && byLocation;
                  })
                  .map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name} ({c.email}) - {c.location}
                    </option>
                  ))}
              </select>
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
                    <button
                      className="bg-blue-500 text-white ml-15 px-5 py-3 rounded mt-1 cursor-pointer"
                      onClick={() => navigate("/home/updateaudience/" + audiencia._id)}
                    >
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
