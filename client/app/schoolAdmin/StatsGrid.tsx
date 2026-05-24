import React from 'react';
import { FaUsers, FaCheckSquare, FaStar } from "react-icons/fa";

const StatsGrid = () => {
  const stats = [
    {
      icon: <FaUsers size={28} color="#141313ff" />,
      value: "1,247",
      label: "Active Students",
      change: "+12%",
      changeType: "positive"
    },
    {
      icon: <FaCheckSquare size={28} color="#141313ff" />,
      value: "87.5%",
      label: "Completion Rate",
      change: "+5%",
      changeType: "positive"
    },
    {
      icon: <FaStar size={28} color="#141313ff" />,
      value: "8.2",
      label: "Average Score",
      change: "+0.3",
      changeType: "positive"
    }
  ];

  return (
    <div className="stats-grid-admin">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <div className="stat-icon">{stat.icon}</div>
            <div className={`stat-change ${stat.changeType}`}>
              {stat.change}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;