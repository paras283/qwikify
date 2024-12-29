// FitnessWellness.js
import React, { useState } from 'react';
import '../style/Fitness.css';

const FitnessWellness = () => {
  const [gyms] = useState([
    { name: "FitHub Gym", location: "5th Ave, New York", rating: 4.5 },
    { name: "Ironclad Fitness", location: "3rd Street, Los Angeles", rating: 4.7 },
    { name: "Muscle Factory", location: "Elm Street, Chicago", rating: 4.3 },
  ]);

  const [danceClasses] = useState([
    { name: "Dance Xpress", location: "Park Ave, New York", rating: 4.8 },
    { name: "Salsa Fever", location: "Broadway, Los Angeles", rating: 4.6 },
    { name: "Rhythmic Motion", location: "Westwood, Chicago", rating: 4.4 },
  ]);

  return (
    <div className="fitness-container">
      <h1>Nearby Fitness & Wellness Centers</h1>

      <div className="categories">
        {/* Gym Section */}
        <div className="category">
          <h2>Gyms</h2>
          <div className="item-list">
            {gyms.map((gym, index) => (
              <div key={index} className="item-card">
                <h3>{gym.name}</h3>
                <p>Location: {gym.location}</p>
                <p>Rating: {gym.rating}⭐</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dance Classes Section */}
        <div className="category">
          <h2>Dance Classes</h2>
          <div className="item-list">
            {danceClasses.map((dance, index) => (
              <div key={index} className="item-card">
                <h3>{dance.name}</h3>
                <p>Location: {dance.location}</p>
                <p>Rating: {dance.rating}⭐</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessWellness;
