import React, { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_URL;

export const CampaignStat = () => {
  const [campaignDate, setCampaignDate] = useState([]);

  const getCampaign = async () => {
    const request = await fetch(
      `${api}/api/campaign/getCampaigns`,
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
      setCampaignDate(response.campaign);
      console.log(response.campaign);
    }
  };

  useEffect(() => {
    getCampaign();
  }, []);

  return (
    <div>
      <table className="border min-w-330">
        <thead className="border-b text-xl">
          <th>Nombre de la campaña</th>
          <th>Fecha</th>
          <th>Audiencias</th>
          <th>Template</th>
          <th>Clicks</th>
        </thead>
        {campaignDate.map((date) => (
          <tr key={date._id} className="text-lg">
            <td className="border-r pl-5">{date.subject}</td>
            <td className="border-r pl-10">
              {<td>{new Date(date.sendDate).toLocaleDateString()}</td>}
            </td>

            <td className="border-r pl-20">
              <td className="">
                {date.audienceIds.map((a) => a.name).join(", ")}
              </td>
            </td>

            <td className="border-r pl-10">{date.templateId.name}</td>
            <td className="pl-10">{date.clickRate}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
