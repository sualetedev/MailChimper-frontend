import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailEditor from "react-email-editor";
import useFormArray from "../hooks/useFormArray";
const api = import.meta.env.VITE_API_URL;

export const UpdateTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const emailEditorRef = useRef(null);

  const [formInput, changedInput] = useFormArray({
    name: "",
    subject: "",
  });

  const [templateHandled, setTemplateHandled] = useState(null);
  const [audiences, setAudiences] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);

  useEffect(() => {
    getTemplateById();
    getAudiences();
  }, [id]);

  useEffect(() => {
    if (templateHandled?.content && emailEditorRef.current) {
      emailEditorRef.current.editor.loadDesign(templateHandled.content);
    }
  }, [templateHandled]);

  const getTemplateById = async () => {
    const request = await fetch(`${api}/api/templates/getTemplateById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const response = await request.json();
    if (response.status === "success") {
      setTemplateHandled(response.template);
    }
  };

  const getAudiences = async () => {
    const res = await fetch(`${api}/api/audience/getAudience`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (data.status === "success") {
      setAudiences(data.audiences);
    }
  };

  const updateTemplateFetch = async () => {
    emailEditorRef.current.editor.exportHtml(async ({ design }) => {
      try {
        const request = await fetch(
          `${api}/api/templates/updateTemplate/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              name: templateHandled.name,
              content: design,
            }),
          }
        );

        const response = await request.json();
        if (response.status === "success") {
          console.log("Template actualizada");
        }
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    });
  };

  const createNewTemplate = async () => {
    emailEditorRef.current.editor.exportHtml(async ({ design }) => {
      try {
        const request = await fetch(`${api}/api/templates/createTemplate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: `${
              templateHandled?.name?.trim() + "(copia)" || formInput.name
            }`,
            content: design,
          }),
        });

        const response = await request.json();
        if (response.status === "success") {
          setTemplateHandled(response.template);
          navigate("/home/campaign");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const sendMessage = async () => {
    if (selectedAudiences.length === 0) {
      alert("Selecciona al menos una audiencia.");
      return;
    }

    const subject = formInput.subject;
    if (!subject) {
      alert("El asunto no puede estar vacío.");
      return;
    }

    emailEditorRef.current.editor.exportHtml(async ({ html }) => {
      try {
        const createRequest = await fetch(
          `${api}/api/campaign/createCampaign`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              templateId: templateHandled._id,
              subject,
              audienceIds: selectedAudiences,
              sendDate: new Date(),
              html: "",
            }),
          }
        );

        const createResult = await createRequest.json();
        if (createResult.status !== "success") {
          alert("Error al crear la campaña.");
        }

        const campaignId = createResult.campaign._id;

        const htmlWithId = html.replace(/{{campaignId}}/g, campaignId);

        const sendRequest = await fetch(`${api}/api/send/sendtoAudience`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            audienceIds: selectedAudiences,
            subject,
            html: htmlWithId,
          }),
        });

        const sendResponse = await sendRequest.json();
        alert(sendResponse.message);

        await fetch(`${api}/api/campaign/updateHtml/` + campaignId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            html: htmlWithId,
          }),
        });
      } catch (error) {
        console.error("Error en sendMessage:", error);
      }
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="p-4 flex justify-center items-center gap-4">
        <h2 className="text-xl font-bold">
          Editando: {templateHandled?.name}
          {!templateHandled?.name && (
            <input
              type="text"
              name="name"
              value={formInput.name}
              onChange={changedInput}
              placeholder="Introduzca el nombre"
            />
          )}
        </h2>
        {templateHandled?.name && (
          <button
            onClick={createNewTemplate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Guardar como nueva
          </button>
        )}
        {!templateHandled?.name && (
          <button
            onClick={updateTemplateFetch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Actualizar plantilla
          </button>
        )}

        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Enviar
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2"> Introduce el asunto:</h3>
        <input
          className="block bg-white"
          type="text"
          name="subject"
          value={formInput.subject}
          onChange={changedInput}
          placeholder="Asunto"
        />
        <h3 className="text-lg font-semibold mb-2">
          Selecciona tus audiencias:
        </h3>
        <div className="flex flex-wrap gap-4">
          {audiences.map((aud) => (
            <label key={aud._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={aud._id}
                checked={selectedAudiences.includes(aud._id)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedAudiences((prev) =>
                    e.target.checked
                      ? [...prev, value]
                      : prev.filter((id) => id !== value)
                  );
                }}
              />
              {aud.name}
            </label>
          ))}
        </div>
      </div>

      <EmailEditor ref={emailEditorRef} />
    </div>
  );
};
