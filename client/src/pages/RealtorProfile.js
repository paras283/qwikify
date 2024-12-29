import React from 'react';
import '../style/RealtorProfile.css';

const RealtorProfile = () => {
  const realtor = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/150", // Replace with the actual URL of the realtor's image
    description:
      "John Doe is an experienced real estate professional with over 10 years in the industry. Known for providing exceptional service, he specializes in helping clients find their dream homes and investment properties.",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    location: "New York, USA",
    socialLinks: {
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  };

  return (
    <div className="realtor-profile-container">
      <div className="realtor-profile">
        <div className="profile-pic">
          <img src={realtor.profilePic} alt={`${realtor.name}`} />
        </div>
        <div className="profile-info">
          <h1>{realtor.name}</h1>
          <p className="description">{realtor.description}</p>
          <div className="contact-info">
            <p><strong>Email:</strong> {realtor.email}</p>
            <p><strong>Phone:</strong> {realtor.phone}</p>
            <p><strong>Location:</strong> {realtor.location}</p>
          </div>
          <div className="social-links">
            <h3>Connect with {realtor.name}:</h3>
            <a href={realtor.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={realtor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={realtor.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtorProfile;
