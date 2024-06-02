// src/App.js
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import './App.css';

const App = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    return (
        <div className="app">
            <Navbar onSectionChange={setActiveSection} />
            <div className="content">
                <Dashboard activeSection={activeSection} />
            </div>
        </div>
  );
}

export default App;
