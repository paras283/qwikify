const express = require("express");
const router = express.Router();
const Property = require("../models/realtorModel"); // Your MongoDB model

// Get properties by category
router.get("/", async (req, res) => {
  const category = req.query.category || "rent"; // Default to "rent"

  try {
    const properties = await Property.find({ category });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

module.exports = router;
