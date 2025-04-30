import React from "react";
import "./App.css";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Routing } from "./components/router/Routing";
//import useAuth from "./components/hooks/useAuth";

function App() {
  //const auth = useAuth();

  return (
    <>
      <BrowserRouter>
        <section>
          <Routing />
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
