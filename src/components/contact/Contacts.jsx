import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { getContacts } from "./getContacts";

export const Contacts = () => {
      const [createForm, setCreateForm] = useState(false);
    
  const [form, changed] = useForm({
    name: "",
    email: "",
    location: "",
    tags: [],
  });

  useEffect(() => {
    getContacts
  })



  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <button
          className="bg-blue-500 ml-8 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          onClick={() => setCreateForm(true)}
        >
          Crear Audiencia
        </button>
        <button
          className="bg-blue-500 ml-8 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          onClick={getContacts}
        >
          Ver audiencias
        </button>
      </div>
      </>
      )
};
