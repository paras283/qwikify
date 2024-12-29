const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Category field (e.g., "Starters", "Main Course")
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;