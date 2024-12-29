import React, { useState, useEffect } from 'react';
import '../style/FabProtect.css';

const FabProtect = () => {
  const [selectedService, setSelectedService] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { id: 1, name: 'Laundry + Ironing', description: 'Fresh and clean laundry service.' },
    { id: 2, name: 'Dry Cleaning', description: 'Professional dry cleaning for your clothes.' },
    { id: 3, name: 'Ironing', description: 'Get perfectly pressed clothes.' },
  ];


  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setSuccess('');
  };

  const handleBooking = () => {
    if (!selectedService || !contact) {
      setError('Please select a service and provide your contact number.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contact)) {
      setError('Invalid contact number. Please provide a 10-digit number.');
      return;
    }

    setError('');
    setSuccess(`Successfully booked ${selectedService}. We will contact you shortly!`);
    setSelectedService('');
    setContact('');
  };

  return (
    <div className="fab-protect">
      <h1 className="heading">Welcome to FabProtect</h1>
      <p className="subheading">Choose from our premium services for your garments.</p>

      <div className="services">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card ${selectedService === service.name ? 'selected' : ''}`}
            onClick={() => handleServiceClick(service.name)}
          >
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="booking-section">
        <input
          type="text"
          placeholder="Enter your contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button className="book-btn" onClick={handleBooking}>
          Book Now
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
    </div>
  );
};

export default FabProtect;
