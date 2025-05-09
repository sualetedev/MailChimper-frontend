import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto mt-5">
        <Outlet />
      </div>
    </>
  );
};
