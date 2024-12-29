import React, { useState } from "react";
import "../style/AddRealtorPartner.css";

const AddRealtorPartner = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    imageUrl: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.contact || !formData.imageUrl) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.102:5000/api/realtor-partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Realtor partner added successfully!");
        setFormData({
          name: "",
          contact: "",
          imageUrl: "",
          description: "",
        });
      } else {
        setMessage("Failed to add realtor partner. Please try again.");
      }
    } catch (error) {
      console.error("Error adding realtor partner:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="add-realtor-container">
      <h1>Add Realtor Partner</h1>
      {message && <p className="message">{message}</p>}
      <form className="add-realtor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter partner's name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact *</label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter contact details"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Profile Image URL *</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a brief description (optional)"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Add Partner
        </button>
      </form>
    </div>
  );
};

export default AddRealtorPartner;
