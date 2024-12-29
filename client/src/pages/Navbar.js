import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';
import logo from '../images/logo.png';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [logoError, setLogoError] = useState(false); // State to handle logo error

  const handleClick = () => setClick(!click);
  const toggleDropdown = () => setDropdown(!dropdown);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <NavLink to="/" className="nav-logo">
          {!logoError ? (
            <img
              src={logo}
              alt="Qwikify Logo"
              className="logo-image"
              onError={() => setLogoError(true)} // Set error state if the image fails to load
            />
          ) : (
            <h2>Qwikify.in</h2> // Fallback text if image fails to load
          )}
        </NavLink>

        {/* Menu Items */}
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={handleClick}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-menu-item" className="nav-links" onClick={handleClick}>
              About
            </NavLink>
          </li>
          <li
            className="nav-item dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <span className="nav-links dropdown-toggle">Services</span>
            {dropdown && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/menu" className="dropdown-link" onClick={handleClick}>
                    Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/fab-protect" className="dropdown-link" onClick={handleClick}>
                    FabProtect
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tech-care" className="dropdown-link" onClick={handleClick}>
                    TechCare+
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <NavLink to="/add-property" className="nav-links" onClick={handleClick}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon-close">X</span>
          ) : (
            <span className="icon-menu">&#9776;</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
