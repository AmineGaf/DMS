import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const GmailDetails = () => {
  const location = useLocation();
  const mail = location.state;

  console.log(mail)

  return (
    <div className="container mx-auto p-8">
      <div className="bg-primary-foreground rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-primary font-bold mb-4">
          {mail.subjectMessage}
        </h1>
        <div className="flex items-center mb-4 gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
            {mail.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{mail.name}</h2>
            <p className="text-gray-600">{mail.email}</p>
          </div>
        </div>
        <div className="text-gray-500">{ReactHtmlParser(mail.text)}</div>

        {mail.attachments && mail.attachments.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Attachments:</h3>
            <ul>
              {mail.attachments.map((attachment, index) => (
                <li key={index}>
                  <a
                    download={attachment.filename}
                    href={`data:${attachment.mimeType};Base64,[${attachment.data.data}]`}
                  >
                    {attachment.filename}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GmailDetails;
