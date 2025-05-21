import "./App.css";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Routing } from "./components/router/Routing";

function App() {

  return (
    <>
      <BrowserRouter>
        <section className="bg-sky-50 min-w-screen min-h-screen">
          <Routing />
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
