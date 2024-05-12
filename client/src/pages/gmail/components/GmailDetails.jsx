import React from "react";
import { useLocation, useParams } from "react-router-dom";

const GmailDetails = () => {
  const { gmailId } = useParams();
  const location = useLocation();
  const mail = location.state;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-primary-foreground rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-primary font-bold mb-4">{mail.subjectMessage}</h1>
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/48"
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{mail.name}</h2>
            <p className="text-gray-600">{mail.email}</p>
          </div>
        </div>
        <p className="text-gray-500">{mail.text}</p>
      </div>
    </div>
  );
};

export default GmailDetails;