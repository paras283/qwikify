import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/HomePage.css';
import blogo from '../images/logo-banner.png';
import bname from '../images/logo-banner2.png';

const LandingPage = () => {
  const navigate = useNavigate();

  // Navigation Handlers
  const handleNavigation = (path) => navigate(path);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section>
        <div class="animated-banner">
          <div class="text-container">
            <img src={blogo} alt="Brand Logo" class="brand-logo" />
            <img src={bname} alt="Brand Name" class="brand-name" />
          </div>
        </div>

      </section>

      {/* Featured Services Section */}

      <div class="featured-services">
        <h2> ☆ Featured Services</h2>
        <div class="services-container">
          <div class="service-item" onClick={() => handleNavigation('/menu')}>
            <span class="service-text">Hungry Hub</span>
          </div>
          <div class="service-item" onClick={() => handleNavigation('/fab-protect')}>
          <span class="service-text">Laundry</span>
          </div>
          <div class="service-item" onClick={() => handleNavigation('/medicine')}>
          <span class="service-text">Pharmacy</span>
          </div>
          <div class="service-item"></div>
          <div class="service-item"></div>
          <div class="service-item"></div>
        </div>
      </div>


      {/* Our Services Section */}
      <section className="services">
        <h2>Explore Our Services</h2>
        <div className="services-tiles">
          <div className="service-tile" onClick={() => handleNavigation('/menu')}>
            <img src="https://via.placeholder.com/280x200" alt="Hungry Hub" />
            <h3>Hungry Hub</h3>
            <p>Dive into a world of delicious cuisine.</p>
          </div>
          <div className="service-tile" onClick={() => handleNavigation('/fab-protect')}>
            <img src="https://via.placeholder.com/280x200" alt="Fab Protect" />
            <h3>Fab Protect</h3>
            <p>Premium solutions for all your packaging needs.</p>
          </div>
          <div className="service-tile" onClick={() => handleNavigation('/tech-care')}>
            <img src="https://via.placeholder.com/280x200" alt="TechCare +" />
            <h3>TechCare +</h3>
            <p>Fast, secure, and reliable delivery services.</p>
          </div>
          <div className="service-tile" onClick={() => handleNavigation('/fitness')}>
            <img src="https://via.placeholder.com/280x200" alt="Fitness & Wellness" />
            <h3>Fitness & Wellness</h3>
            <p>Embrace a healthier lifestyle today.</p>
          </div>
          <div className="service-tile" onClick={() => handleNavigation('/medicine')}>
            <img src="https://via.placeholder.com/280x200" alt="Medicine" />
            <h3>Medicine</h3>
            <p>Healthcare solutions at your fingertips.</p>
          </div>
          <div className="service-tile" onClick={() => handleNavigation('/realtor-partners')}>
            <img src="https://via.placeholder.com/280x200" alt="Realtor" />
            <h3>Realtor</h3>
            <p>Your trusted partner in real estate.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 [Qwikify.in]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
