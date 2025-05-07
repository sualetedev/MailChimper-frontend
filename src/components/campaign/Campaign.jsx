import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Campaign = () => {
  const [templateHandled, setTemplateHandled] = useState([]);
  const [templateOwn, setTemplateOwn] = useState([]);
  const navigate = useNavigate();

  const getPublicTemplates = async () => {
    console.log("Entro en getpublictemplates");
    const request = await fetch(
      "http://localhost:3900/api/templates/getPublicTemplates",
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
      setTemplateHandled(response.templates);
      
    }
  };

  const getOwnTemplates = async () => {
    const request = await fetch(
      "http://localhost:3900/api/templates/getTemplates",
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
      console.log(response);
      setTemplateOwn(response.templates);
    }
  };
  useEffect(() => {
    getPublicTemplates();
    getOwnTemplates();
  }, []);

  return (
    <div className="inline-block mt-5 ml-5">
      <div>
        <h1 className="text-4xl">
          Convierte los correos electrónicos y SMS en ingresos
        </h1>
      </div>
      <div>
        <h2 className="text-xl">
          Consigue más aperturas, clics y ventas con la plataforma n.º 1 de
          email marketing y automatizaciones*, ahora con SMS.
        </h2>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-4">Plantillas públicas</h1>

        <div className="grid grid-cols-3 gap-6 mt-10">
          {templateHandled.map((template) => (
            <div key={template._id} className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-bold text-xl mb-2">{template.name}</h2>
              <button
                className="mt-2 ml-15 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => navigate(`/home/editor/${template._id}`)}
              >
                Ver y editar template
              </button>
            </div>
          ))}

          {templateOwn.length > 0 && (
            <>
              <div className="col-span-3">
                <h1 className="text-2xl font-bold mb-4 mt-10">Tus templates</h1>
              </div>

              {templateOwn.map((template) => (
                <div
                  key={template._id}
                  className="bg-white rounded-2xl shadow p-6"
                >
                  <h2 className="font-bold text-xl mb-2">{template.name}</h2>
                  <button
                    className="mt-2 ml-20 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                    onClick={() => navigate(`/home/editor/${template._id}`)}
                  >
                    Enviar
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
