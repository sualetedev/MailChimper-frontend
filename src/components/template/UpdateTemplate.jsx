import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailEditor from "react-email-editor";

export const UpdateTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const emailEditorRef = useRef(null);

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
    const request = await fetch(`http://localhost:3900/api/templates/getTemplateById/${id}`, {
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
    const res = await fetch("http://localhost:3900/api/audience/getAudience", {
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
        const request = await fetch(`http://localhost:3900/api/templates/updateTemplate/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: templateHandled.name,
            content: design,
          }),
        });

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
        const request = await fetch(`http://localhost:3900/api/templates/createTemplate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: `${templateHandled.name}(copia)`,
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

    const subject = prompt("Asunto del correo:");
    if (!subject) return;

    emailEditorRef.current.editor.exportHtml(async ({ html }) => {
      try {
        const sendRequest = await fetch(`http://localhost:3900/api/send/sendtoAudience`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            audienceIds: selectedAudiences,
            subject,
            html,
          }),
        });

        const sendResponse = await sendRequest.json();
        alert(sendResponse.message);
      } catch (err) {
        console.error("Error al enviar:", err);
      }
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="p-4 flex justify-center items-center gap-4">
        <h2 className="text-xl font-bold">Editando: {templateHandled?.name}</h2>
        <button
          onClick={createNewTemplate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar como nueva
        </button>
        <button
          onClick={updateTemplateFetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Actualizar plantilla
        </button>
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Selecciona tus audiencias:</h3>
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
