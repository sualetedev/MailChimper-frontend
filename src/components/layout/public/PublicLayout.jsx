import React from "react";
import { Login } from "../../user/Login";
import { Register } from "../../user/Register";

export const PublicLayout = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-2xl mb-8 text-center">
        Logueate o registrate en MailChimper.
      </h1>

      <div className="flex flex-row gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[350px]">
          <Login />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[350px]">
          <Register />
        </div>
      </div>
    </section>
  );
};
