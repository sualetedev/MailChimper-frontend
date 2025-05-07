import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailEditor from "react-email-editor";

export const UpdateTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const emailEditorRef = useRef(null);
  const [templateEdited, setTemplateEdited] = useState();
  const [templateHandled, setTemplateHandled] = useState(null);

  useEffect(() => {
    getTemplateById();
  }, [id]);

  useEffect(() => {
    onLoad()
  }, [templateHandled]);


  const getTemplateById = async () => {
    const request = await fetch(
      `http://localhost:3900/api/templates/getTemplateById/${id}`,
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
      setTemplateHandled(response.template);
    }
  };

  const onLoad = () => {
    if (templateHandled?.content) {
      emailEditorRef.current.editor.loadDesign(templateHandled.content);
    }
  };


  const createNewTemplate = async () => {
    emailEditorRef.current.editor.exportHtml(async ({ design, html }) => {
        try{
            const request = await fetch(
                `http://localhost:3900/api/templates/createTemplate`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                      name: `${templateHandled.name}(copia)`,
                      content: design,
                  })
                }
              );
              const response = await request.json();
              if (response.status === "success") {
                setTemplateHandled(response.template);
                navigate("/home/campaign");
              }
          
        } catch ( error ){
            console.log(error)
        }

   
  });



  const updateTemplateFetch = async () => {
    emailEditorRef.current.editor.exportHtml(async ({ design, html }) => {
        try {
          const request = await fetch(`http://localhost:3900/api/templates/updateTemplate/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              name: templateHandled.name,
              content: design, // guardamos el diseño editable
            }),
          });
  
          const response = await request.json();
          if (response.status === "success") {
            console.log("update ok")
          }
        } catch (error) {
          console.error("Error al guardar:", error);
        }
      });
    

    }
  };


  return  <div style={{ height: "100vh" }}>
  <div className="p-4 bg-gray-100 flex justify-between items-center">
    <h2 className="text-xl font-bold">Editando: {templateHandled?.name}</h2>
    <button
      onClick={createNewTemplate}
      className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
    >
      Guardar Cambios
    </button>
  </div>

  <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
</div>;
};
