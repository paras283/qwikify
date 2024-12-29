const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String, // "rent", "buy", or "sale"
  imageUrl: String,
});

module.exports = mongoose.model("Property", PropertySchema);