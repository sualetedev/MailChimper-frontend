import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const api = import.meta.env.VITE_API_URL;
export const Campaign = () => {
  const [templateHandled, setTemplateHandled] = useState([]);
  const [templateOwn, setTemplateOwn] = useState([]);
  const [campaignDate, setCampaignDate] = useState([]);

  const navigate = useNavigate();

  const getPublicTemplates = async () => {
       const request = await fetch(
      `${api}/api/templates/getPublicTemplates`,
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
      `${api}/api/templates/getTemplates`,
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
      setTemplateOwn(response.templates);
    }
  };

  const getCampaign = async () => {
    const request = await fetch(
      `${api}/api/campaign/getCampaigns`,
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
      console.log(response.campaign);
      setCampaignDate(response.campaign);
    }

    return response;
  };

  const deleteTemplate = async (id) => {
    const request = await fetch(
      "http://localhost:3900/api/templates/deleteTemplate/" + id,
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
      console.log("borrado correcto");
      setTemplateOwn(templateOwn.filter((template) => template._id !== id));
    }
  };

  useEffect(() => {
    getPublicTemplates();
    getOwnTemplates();
    getCampaign();
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

      <div className="flex justify-center align-center mt-10 mb-10">
        <div>
        <button
              className="mt-2 ml-5 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
              onClick={() => navigate(`/home/editor/`)}
            >
              {" "}
              Crear template{" "}
            </button>
        </div>
        <div>
        {campaignDate.length > 0 && (<button className="mt-2 ml-25 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600" onClick={() => navigate('/home/campaignstats')}>Tus campañas</button>)}
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-4">Plantillas públicas</h1>

        <div className="grid grid-cols-3 gap-6 mt-10">
          {templateHandled.map((template) => (
            <div key={template._id} className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-bold text-xl mb-2">{template.name}</h2>
              <button
                className="mt-2 ml-25 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                onClick={() => navigate(`/home/editor/${template._id}`)}
              >
                Editar
              </button>
            </div>
          ))}
          <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-4 mt-10">Tus templates</h1>{" "}
            
          </div>
          {templateOwn.length > 0 && (
            <>
              {templateOwn.map((template) => (
                <div
                  key={template._id}
                  className="bg-white rounded-2xl shadow p-6"
                >
                  <h2 className="font-bold text-xl mb-2">{template.name}</h2>

                  <div className="flex flex-wrap gap-4 mt-2"></div>
                  <button
                    className="mt-2 ml-5 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                    onClick={() => navigate(`/home/editor/${template._id}`)}
                  >
                    Editar y enviar
                  </button>
                  <button
                    className="mt-2 ml-10 px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-800"
                    onClick={() => deleteTemplate(template._id)}
                  >
                    Borrar
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
