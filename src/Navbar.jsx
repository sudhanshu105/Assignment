// src/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onSectionChange }) => {
    const [activeLink, setActiveLink] = useState('dashboard');

    const handleLinkClick = (section) => {
        setActiveLink(section);
        onSectionChange(section);
    };

    return (
        <div className="navbar">
            <div className={`menu ${activeLink === 'dashboard' ? 'active' : ''}`} onClick={() => handleLinkClick('dashboard')}><a href="#dashboard">Dashboard</a></div>
            <div className={`menu ${activeLink === 'time-series' ? 'active' : ''}`} onClick={() => handleLinkClick('time-series')}><a href="#time-series">Time Series</a></div>
            <div className={`menu ${activeLink === 'alerts-category' ? 'active' : ''}`} onClick={() => handleLinkClick('alerts-category')}><a href="#alerts-category">Alerts by Category</a></div>
            <div className={`menu ${activeLink === 'source-ips' ? 'active' : ''}`} onClick={() => handleLinkClick('source-ips')}><a href="#source-ips">Top Source IPs</a></div>
            <div className={`menu ${activeLink === 'destination-ports' ? 'active' : ''}`} onClick={() => handleLinkClick('destination-ports')}><a href="#destination-ports">Top Destination Ports</a></div>
        </div>
    );
};

export default Navbar;
