import React, { useState, useEffect } from "react";

export const Campaign = () => {
  const [templateHandled, setTemplateHandled] = useState([{}]);

  const getAllTemplates = async () => {
    const request = await fetch("http://localhost:3900/api/templates/getTemplates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    })
    const response = await request.json();
    if(response.status === "success"){
      setTemplateHandled(response.templates);
      console.log(response.templates);
    } else {
      console.error("Error al obtener los objetos")
    }    
  }

  useEffect(() => {
    getAllTemplates();
  },[])

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
    </div>
  );
};
