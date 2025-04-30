import React, { useState } from "react";
import { useForm } from "../hooks/useForm";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not sended");

  const saveUser = async (e) => {
    //Prevenir actualización de pantalla
    e.preventDefault();
    //Recoger los datos del formulario
    let newUser = form;
    //Guardar el usuario en el backend
    const request = await fetch("http://localhost:3900/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await request.json();

    if (data.status === "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="justify-center">
          <header>
            <h1 className="text-2xl">Registro</h1>
            <hr/>
          </header>
          <div className="">
            {saved == "saved" ? (
              <strong className="green-600">
                Usuario registrado correctamente
              </strong>
            ) : (
              ""
            )}

            {saved == "error" ? (
              <strong className="text-red-600">
                Error en el registro de usuario
              </strong>
            ) : (
              ""
            )}
            <form className="" onSubmit={saveUser}>
              <div className="mt-2">
                <label htmlFor="email">Email</label>
                <br/>
                <input className="bg-white " type="email" name="email" onChange={changed} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <br />
                <input className="bg-white"type="password" name="password" onChange={changed} />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <br />
                <input className="bg-white"type="text" name="name" onChange={changed} />
              </div>
              <input
                type="submit"
                value="Registrate"
                className=" ml-8 bg-blue-500 text-white px-4 py-2 rounded mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
