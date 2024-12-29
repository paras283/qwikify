const mongoose = require("mongoose");

// Mongoose Schema for Realtor Partner
const realtorPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, default: "" },
});

// Export the model
module.exports = mongoose.model("RealtorPartner", realtorPartnerSchema);
