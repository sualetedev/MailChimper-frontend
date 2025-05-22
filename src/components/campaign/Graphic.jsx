import React, {useEffect, useState} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
const api = import.meta.env.VITE_API_URL;   

const MiGraficoDeBarras = () => {
    const [campaignDate, setCampaignDate] = useState([]);
   

const getCampaign = async () => {
    const request = await fetch(`${api}/api/campaign/getCampaignswithAudienceCounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const response = await request.json();

    if (response.status === "success") {
      setCampaignDate(response.campaigns);
      console.log(response.campaigns);
    }
  };

  useEffect(() => {
    getCampaign();
  },[])

 const data = campaignDate.map((dato) => ({
    name: dato.subject,
    sended: dato.audiences.reduce((acc, aud) => acc + aud.contactCount, 0), 
    click: dato.clickRate,
  }));



  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sended" fill="#8884d8" name="Enviados" />
        <Bar dataKey="click" fill="#82ca9d" name="Clicados" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MiGraficoDeBarras;
