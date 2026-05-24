import React from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
const AlertBanner = () => {
  return (
    <div className="alert-banner">
      <div className="alert-icon"><FaExclamationTriangle color="orange" /></div>
      <div className="alert-content">
        <span className="alert-text">
          Emergency Drill Alert: Fire safety drill scheduled for Class VI-XII students next Tuesday
        </span>
      </div>
    </div>
  );
};

export default AlertBanner;