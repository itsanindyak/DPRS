import React from 'react';
import { FaGraduationCap } from "react-icons/fa";


const Header = () => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="admin-info">
          <div className="admin-logo">
            <span className="logo-icon">
                <FaGraduationCap size={28} color="#090909ff" />
            </span>
            <span className="logo-text">School Admin</span>
          </div>
          <div className="admin-details">
            <h1 className="school-name">DPS</h1>
            <p className="admin-subtitle">School Administration Portal</p>
          </div>
        </div>
        {/* <div className="admin-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search students, classes, or reports..." 
              className="search-input"
            />
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;