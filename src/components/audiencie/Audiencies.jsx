import React, { useEffect, useState } from "react";
import useFormArray from "../hooks/useFormArray";
import { useNavigate } from "react-router-dom";
import { fetchContacts } from "../contact/getContacts";

export const Audiencies = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [createdAudience, setCreatedAudience] = useState(false);
  const [createdErrorAudience, setCreatedErrorAudience] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [ audienceTable, setAudienceTable] = useState(false);

  const [form, changed] = useFormArray({
    name: "",
  });

  const getAudiences = async () => {
    setCreateForm(false);
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
      setAudienceTable(true);
    } else {
      console.log("Error al obtener las audiencias");
    }
  };

  const createAudience = async (e) => {
    setAudienceTable(false);
    e.preventDefault();

    const payload = {
      name: form.name,
      contacts: selectedContacts,
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
      setCreatedErrorAudience(false);
    } else {
      setCreatedErrorAudience(true);
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

  useEffect(() => {
    if (createForm) {
      fetchContacts().then((data) => {
        setContacts(data);
      });
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
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={changed}
            className="w-full border p-2 rounded"
          />
          <form onSubmit={createAudience} className="space-y-4">
            <div>
              <label className="block font-semibold">Filtrar por tags</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.from(new Set(contacts.flatMap((c) => c.tags || []))).map(
                  (tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (e.target.checked) {
                            setSelectedTags([...selectedTags, value]);
                          } else {
                            setSelectedTags(
                              selectedTags.filter((t) => t !== value)
                            );
                          }
                        }}
                      />
                      <span>{tag}</span>
                    </label>
                  )
                )}
              </div>

              <label className="block font-semibold">
                Filtrar por ubicación
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.from(
                  new Set(contacts.map((c) => c.location).filter(Boolean))
                ).map((loc) => (
                  <label key={loc} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={loc}
                      checked={selectedLocations.includes(loc)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (e.target.checked) {
                          setSelectedLocations([...selectedLocations, value]);
                        } else {
                          setSelectedLocations(
                            selectedLocations.filter((l) => l !== value)
                          );
                        }
                      }}
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">Seleccionar contactos</label>
              <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-2">
                {contacts
                  .filter((c) => {
                    const byTag =
                      selectedTags.length === 0 ||
                      c.tags?.some((t) => selectedTags.includes(t));
                    const byLocation =
                      selectedLocations.length === 0 ||
                      selectedLocations.includes(c.location);
                    return byTag && byLocation;
                  })
                  .map((c) => (
                    <label key={c._id} className="block">
                      <input
                        type="checkbox"
                        value={c._id}
                        checked={selectedContacts.includes(c._id)}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (e.target.checked) {
                            setSelectedContacts([...selectedContacts, value]);
                          } else {
                            setSelectedContacts(
                              selectedContacts.filter((id) => id !== value)
                            );
                          }
                        }}
                        className="mr-2"
                      />
                      {c.name} ({c.email}) - {c.location}
                    </label>
                  ))}
              </div>
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

      {audienceTable && (
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
                      onClick={() =>
                        navigate("/home/updateaudience/" + audiencia._id)
                      }
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
