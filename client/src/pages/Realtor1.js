import React, { useState, useEffect } from "react";
import "../style/Realtor.css";

const Realtor = () => {
  const [category, setCategory] = useState("rent"); // Default category
  const [properties, setProperties] = useState([]);
  const [partners, setPartners] = useState([]); // State for realtor partners

  // Fetch properties from MongoDB based on the selected category
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`http://192.168.0.102:5000/api/realtor?category=${category}`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [category]);

  // Fetch realtor partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://192.168.0.102:5000/api/realtor-partners");
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching realtor partners:", error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="realtor-container">
      {/* Partners Block */}
      <div className="partners-section">
        <h2>Our Realtor Partners</h2>
        <div className="partners-horizontal">
          {partners.length > 0 ? (
            partners.map((partner) => (
              <div className="partner-profile" key={partner.id}>
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="partner-image"
                />
                <h4>{partner.name}</h4>
                <p>{partner.contact}</p>
              </div>
            ))
          ) : (
            <p>No realtor partners available.</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="divider" />

      {/* Property Block */}
      <div className="properties-block">
        <h1>Properties in G.N. West</h1>

        {/* Radio Buttons */}
        <div className="category-selector">
          <label>
            <input
              type="radio"
              value="rent"
              checked={category === "rent"}
              onChange={() => setCategory("rent")}
            />
            Rent
          </label>
          <label>
            <input
              type="radio"
              value="buy"
              checked={category === "buy"}
              onChange={() => setCategory("buy")}
            />
            Buy
          </label>
          <label>
            <input
              type="radio"
              value="sale"
              checked={category === "sale"}
              onChange={() => setCategory("sale")}
            />
            Sale
          </label>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div className="property-card" key={property.id}>
                <img
                  src={property.imageUrl}
                  alt={property.name}
                  className="property-image"
                />
                <h3>{property.name}</h3>
                <p>{property.description}</p>
                <p className="property-price">₹{property.price}</p>
                <button className="details-button">View Details</button>
              </div>
            ))
          ) : (
            <p>No properties available for {category}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Realtor;
