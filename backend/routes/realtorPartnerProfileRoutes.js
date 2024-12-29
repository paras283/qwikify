const express = require("express");
const RealtorPartner = require("../models/RealtorPartner"); // Import model
const router = express.Router();

// Add a new realtor partner
router.post("/", async (req, res) => {
  const { name, contact, imageUrl, description } = req.body;

  // Validate input
  if (!name || !contact || !imageUrl) {
    return res.status(400).json({ error: "Name, contact, and image URL are required." });
  }

  try {
    const newPartner = new RealtorPartner({ name, contact, imageUrl, description });
    await newPartner.save();
    res.status(201).json({ message: "Realtor partner added successfully!", partner: newPartner });
  } catch (error) {
    console.error("Error adding realtor partner:", error);
    res.status(500).json({ error: "Failed to add realtor partner." });
  }
});

// Fetch all realtor partners
router.get("/", async (req, res) => {
  try {
    const partners = await RealtorPartner.find();
    res.status(200).json(partners);
  } catch (error) {
    console.error("Error fetching realtor partners:", error);
    res.status(500).json({ error: "Failed to fetch realtor partners." });
  }
});

module.exports = router;
