export const fetchContacts = async () => {
  const response = await fetch(
    'http://localhost:3900/api/contact/getContactsByUser',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return await response.json();
};