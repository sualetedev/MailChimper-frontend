import React from "react";
import mailchimp from "../../../assets/mailchimp.jpg";
export const Home = () => {
  return (
    <>
      <img
        src={mailchimp}
        alt="MailChimp image"
        className="ml-7 rounded-xl max-h-500 max-w-500"
      />
      <div className="flex flex-box justify-center align-center">
        <h1 className="text-4xl mt-4 ">Crea correos electrónicos másivos</h1>
      </div>
    </>
  );
};
