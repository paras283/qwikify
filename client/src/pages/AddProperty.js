import React, { useState } from "react";
import axios from "axios";
import "../style/AddProperty.css";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "rent", // default category
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Replace the URL with your backend API endpoint
      const response = await axios.post("http://localhost:5000/api/realtor", formData);
      if (response.status === 201) {
        setMessage("Property added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "rent",
          imageUrl: "",
        });
      }
    } catch (error) {
      setMessage("Failed to add the property. Please try again.");
    }
  };

  return (
    <div className="add-property-container">
      <h2>Add a Property</h2>
      <form className="property-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Property Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter property name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter property description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter property price"
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="category"
                value="rent"
                checked={formData.category === "rent"}
                onChange={handleChange}
              />
              Rent
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="buy"
                checked={formData.category === "buy"}
                onChange={handleChange}
              />
              Buy
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="sale"
                checked={formData.category === "sale"}
                onChange={handleChange}
              />
              Sale
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Property
        </button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AddProperty;
