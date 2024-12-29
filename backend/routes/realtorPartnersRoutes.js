const express = require("express");
const router = express.Router();

// Sample data for realtor partners
const realtorPartners = [
  { id: 1, name: "Partner A", contact: "123-456-7890", imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "Partner B", contact: "987-654-3210", imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "Partner C", contact: "555-444-3333", imageUrl: "https://via.placeholder.com/150" },
];

// Get all realtor partners
router.get("/realtor-partners", (req, res) => {
  res.json(realtorPartners);
});

module.exports = router;
