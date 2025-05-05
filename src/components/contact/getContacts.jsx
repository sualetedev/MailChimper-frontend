import React from "react";
import { useParams } from "react-router-dom";

export const getContacts = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    let params = useParams;
    const request = await fetch(
      "http://localhost:3900/api/contacts/getContactsById/"+params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const response = await request.json();

    
    if (response.status === "success") {
      setContacts(response.contacts || []);
    }
  };

  return <div>getContacts</div>;
};
