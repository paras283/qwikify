const express = require('express');
const Menu = require('../models/menuModel');
const router = express.Router();

// Fetch all menu items, categorized
router.get('/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;