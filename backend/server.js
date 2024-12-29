// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const menuRoutes = require('./routes/menuRoutes');
const Menu = require('./models/menuModel');

const Property = require("./models/realtorModel")
const realtorRoute = require("./routes/realtorRoutes")
const realtorPartnersRoute = require("./routes/realtorPartnersRoutes");
const realtorPartnerProfileRoute = require("./routes/realtorPartnerProfileRoutes");

const phonepeRoute = require("./routes/phonepeRoutes")
const paytmRoute = require('./routes/paytmRoutes');


dotenv.config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error:', error));


// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON payloads


// Use menu routes
app.use('/api', menuRoutes);
app.use('/api/phonepe', phonepeRoute)
app.use('/api/paytm', paytmRoute);
app.use('/api/realtor', realtorRoute);
app.use("/api", realtorPartnersRoute);
app.use("/api/realtor-partners", realtorPartnerProfileRoute);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Management API');
});

// Placeholder route for orders
app.post('/api/orders', (req, res) => {
  const { orderDetails } = req.body;
  // Here you would save the order to your database
  res.status(201).json({ message: 'Order created successfully', orderDetails });
});


// POST endpoint to add a new menu item
app.post('/api/menu', async (req, res) => {
    const { name, price, category } = req.body;
    try {
      const newItem = new Menu({ name, price, category }); // Use the Menu model here
      const savedItem = await newItem.save();  // Save the item in the database
      res.status(201).json({ message: 'Menu item added successfully', item: savedItem });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add menu item', error });
    }
  });

  app.post("/api/realtor", async (req, res) => {
    try {
      const newProperty = new Property(req.body);
      await newProperty.save();
      res.status(201).send("Property added successfully!");
    } catch (error) {
      res.status(500).send("Failed to add the property.");
    }
  });


// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
