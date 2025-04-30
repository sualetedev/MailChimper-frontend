import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto mt-5 box-border p-4 bg-sky-100 rounded-lg shadow-md h-screen">
        <Outlet />
      </div>
    </>
  );
};
