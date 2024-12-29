// App.js
import React from 'react';
import Navbar from './pages/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import AddMenuItemPage from "./pages/AddMenuItemPage";
import FabProtect from "./pages/FabProtect";
import TechCare from './pages/TechCare';
import Fitness from "./pages/Fitness";
import Medicine from './pages/Medicine';
import RealtorPartners from "./pages/RealtorPartners";
import AddProperty from "./pages/AddProperty";
import RealtorProfile from './pages/RealtorProfile';
import AddRealtorPartner from './pages/AddRealtorPartner';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar always visible */}
      <Routes>
        {/* Route for home page */}
        <Route path="/" element={<HomePage />} />
        {/* Route for menu page */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/add-menu-item" element={<AddMenuItemPage />} />
        <Route path="/fab-protect" element = {<FabProtect />} />
        <Route path="/tech-care" element = {<TechCare />} />
        <Route path="/fitness" element = {<Fitness />} />
        <Route path="/medicine" element = {<Medicine />} />
        <Route path="/realtor-partners" element = {<RealtorPartners />} />
        <Route path="/add-property" element = {<AddProperty />} />
        <Route path="/realtor-profile" element = {<RealtorProfile />} />
        <Route path="/add-realtor-partner" element = {<AddRealtorPartner />} />
      </Routes>
    </Router>
  );
}

export default App;
