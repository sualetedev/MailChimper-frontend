// fetchContacts.js
export const fetchContacts = async () => {
  try {
    const request = await fetch("http://localhost:3900/api/contact/getContactsByUser", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    const response = await request.json();

    if (response.status === "success") {
      return response.contacts || [];
    }
  } catch (error) {
    console.error("Error fetching contacts", error);
    return [];
  }
};