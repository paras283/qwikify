import React, { useEffect } from 'react';
import '../style/TechCare.css';



const TechCare = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const services = [
        {
            id: 1,
            name: 'Mobile Repair',
            description: 'Fast and reliable repair services for your mobile devices.',
            icon: '📱',
        },
        {
            id: 2,
            name: 'Laptop Repair',
            description: 'Expert solutions for all laptop issues.',
            icon: '💻',
        },
        {
            id: 3,
            name: 'Accessories',
            description: 'Browse and buy quality accessories for all devices.',
            icon: '🎧',
        },
        {
            id: 4,
            name: 'Screen Replacement',
            description: 'Get your cracked screens replaced quickly.',
            icon: '🔧',
        },
        {
            id: 5,
            name: 'Battery Replacement',
            description: 'Extend your device’s life with a new battery.',
            icon: '🔋',
        },
    ];

    return (
        <div className="techcare-container">
            <h1 className="techcare-heading">Welcome to TechCare +</h1>
            <p className="techcare-subheading">Your one-stop solution for all gadget needs!</p>

            <div className="services-grid">
                {services.map((service) => (
                    <div key={service.id} className="service-card">
                        <span className="service-icon">{service.icon}</span>
                        <h2 className="service-name">{service.name}</h2>
                        <p className="service-description">{service.description}</p>
                        <button className="service-button">Explore</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechCare;
