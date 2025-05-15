import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useForm from "..//hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const api = import.meta.env.VITE_API_URL;

export const Login = () => {
  const { form, changed } = useForm({});
  const { email, password } = form;
  const [saved, setSaved] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  const loginUser = async (e) => {
    e.preventDefault();
    let userToLogin = form;

    if (email === "" || password === "") {
      alert("Rellena todos los campos");
    } else {
      let request = await fetch(
      `${api}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToLogin),
      });

      const response = await request.json();

      if (response.status === "success") {
        setSaved("login");
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setAuth(response.user);
        navigate("/home");

        setTimeout(() => {}, 1000);
      } else {
        setSaved("error");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="justify-center">
          <header className="">
            <h1 className="text-2xl">Login</h1>
            <hr />
          </header>
          {saved === "login" && (
            <strong className=" text-green-600">
              Usuario identificado correctamente
            </strong>
          )}

          {saved === "error" && (
            <strong className="text-red-600">Error en el login</strong>
          )}

          <form className="mt-5" onSubmit={loginUser}>
            <div>
              <label className="" htmlFor="email">
                Email
              </label>
              <br />
              <input
                className="bg-white border-1 border-black"
                type="email"
                name="email"
                onChange={changed}
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <br />
              <input
                className="bg-white border-1 border-black"
                type="password"
                name="password"
                onChange={changed}
              />
            </div>
            <input
              type="submit"
              value="Iniciar sesión"
              className="bg-blue-500 ml-8 text-white px-4 py-2 rounded mt-4"
            />
          </form>
        </div>
      </div>
    </>
  );
};
