import React from "react";
import "../style/RealtorPartners.css";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const realtorData = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://via.placeholder.com/150",
    description: "Expert in residential properties.",
    whatsapp: "1234567890",
    phone: "1234567890",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://via.placeholder.com/150",
    description: "Specialist in commercial real estate.",
    whatsapp: "9876543210",
    phone: "9876543210",
  },
];

const RealtorPartners = () => {
  return (
    <div className="realtor-container">
      <h2 className="realtor-heading">Our Realtor Partners</h2>
      <div className="realtor-grid">
        {realtorData.map((realtor) => (
          <div key={realtor.id} className="realtor-card">
            <img
              src={realtor.photo}
              alt={realtor.name}
              className="realtor-photo"
            />
            <h3 className="realtor-name">{realtor.name}</h3>
            <p className="realtor-description">{realtor.description}</p>
            <div className="realtor-actions">
              <a
                href={`https://wa.me/91${realtor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="realtor-icon whatsapp-icon"
              >
                <FaWhatsapp />
              </a>
              <a href={`tel:${realtor.phone}`} className="realtor-icon phone-icon">
                <FaPhone />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealtorPartners;
