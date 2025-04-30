import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {

  return (
    <nav className="bg-white border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-blue-600">MailChimper</h1>
        </div>

        <div className="md:flex space-x-4">
          <Link to="home" className="text-gray-700 hover:text-blue-600">
            Inicio
          </Link>
          <Link to="audiences" className="text-gray-700 hover:text-blue-600">
            Audiencia
          </Link>
          <Link to="campaign" className="text-gray-700 hover:text-blue-600">
            Campaña
          </Link>
          <Link to="contacts" className="text-gray-700 hover:text-blue-600">
            Contactos
          </Link>
         
          <Link to="logout" className="text-gray-700 hover:text-blue-600">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
