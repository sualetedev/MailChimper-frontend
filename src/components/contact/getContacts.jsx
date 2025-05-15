const api = import.meta.env.VITE_API_URL;
export const fetchContacts = async () => {
  try {
    const request = await fetch(
      `${api}/api/contact/getContactsByUser`, {
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