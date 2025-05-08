import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { LogOut } from "lucide-react";
export default function Navbar() {
  const auth = useAuth();

  return (
    <nav className="border-b shadow-md bg-yellow-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <Link to="home">
            <h1 className="text-2xl font-bold text-black">MailChimper</h1>
          </Link>
        </div>
        <div className="text-2xl">
          <p>Reto 1. Innovasur 2025</p>
        </div>

        <div className="md:flex space-x-4 text-lg">
          <Link to="home" className="text-gray-700 hover:text-blue-600">
            Inicio
          </Link>
          <Link to="campaign" className="text-gray-700 hover:text-blue-600">
            Campaña
          </Link>
          <Link to="audiences" className="text-gray-700 hover:text-blue-600">
            Audiencia
          </Link>

          <Link to="contacts" className="text-gray-700 hover:text-blue-600">
            Contactos
          </Link>
          <p>Hola, {auth.auth.name}</p>
          <Link to="logout" className="text-gray-700 hover:text-blue-600">
            <LogOut size={25} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
