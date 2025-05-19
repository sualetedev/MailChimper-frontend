import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
const api = import.meta.env.VITE_API_URL;
const secPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};
export const Register = () => {
  const { form, changed, reset } = useForm({});
  const [saved, setSaved] = useState("not sended");
  const [secured, setSecured] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
    if (!secPassword(form.password)) {
      setSecured("weak");
      return;
    }
    let newUser = form;
    const request = await fetch(`${api}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await request.json();

    if (data.status === "success") {
      setSaved("saved");
      setSecured("");
      reset();
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
            <hr />
          </header>
          <div className="">
            {saved == "saved" ? (
              <strong className="text-green-800">
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
            {secured == "weak" ? (
              <strong className="text-red-600">
                La contraseña es demasiado débil. Debe tener al menos 8
                caracteres, una mayúscula, una minúscula, un número y un
                símbolo.
              </strong>
            ) : (
              ""
            )}
            <form className="" onSubmit={saveUser}>
              <div className="mt-2">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className="bg-white border-1 border-black"
                  type="email"
                  name="email"
                  onChange={changed}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <br />
                <input
                  className="bg-white border-1 border-black"
                  type="password"
                  name="password"
                  onChange={changed}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <br />
                <input
                  className="bg-white border-1 border-black"
                  type="text"
                  name="name"
                  onChange={changed}
                />
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
