import React, { useEffect, useState } from "react";
import useFormArray from "../hooks/useFormArray";
import { useParams } from "react-router-dom";

export const UpdateAudience = () => {
  let params = useParams();
  const [ getData, setGetData] = useState({});
  const [form, changed] = useFormArray({
    name: "",
    contactName: "",
    contactEmail: "",
    contactTags: "",
    contactLocation: "",
  });

  const actualizarAudience = async (e, audienceId) => {
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

    try {
      const request = await fetch(
        "http://localhost:3900/api/audience/updateAudience/" + audienceId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        }
      );

      const response = await request.json();
      if (response.status === "success") {
        console.log("Audiencia actualizada");
      } else {
        console.error("Error al actualizar audiencia:", response.message);
      }
    } catch (error) {
      console.error("Error de red al actualizar audiencia:", error);
    }
  };

  const getOneAudience = async (audienceId) => {
    const request = await fetch(
      "http://localhost:3900/api/audience/getAudiencebyId/" + audienceId,
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
      console.log("getOneAudience ok");
      console.log(response.audience)
      setGetData(response.audience)
    } else {
      console.log("Fail en getOneAudience");
    }
  };

  useEffect(() => {
    getOneAudience(params.id);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Actualizar audiencia</h2>
      <form onSubmit={actualizarAudience} className="space-y-4">
        <div>
          <label className="block" >Nombre de la audiencia</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={changed}
            className="w-full border p-2 rounded"
            placeholder={getData.name}
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
            placeholder={getData.map((data) => 
            <li key="_id">
                {data.contacts.name}
            </li>)}
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
  );
};
