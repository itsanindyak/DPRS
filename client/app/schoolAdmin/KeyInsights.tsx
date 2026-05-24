import React from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
const KeyInsights = () => {
  const insights = [
    {
      label: "Average Session Duration",
      value: "15.2 min",
      trend: "up"
    },
    {
      label: "Weekly Active Students", 
      value: "1,089",
      trend: "up"
    },
    {
      label: "Drill Participation",
      value: "94.5%",
      trend: "up"
    },
    {
      label: "Knowledge Retention",
      value: "89.3%",
      trend: "down"
    }
  ];

  return (
    <div className="admin-key-insights">
      <div className="card-header">
        <h2>Key Insights</h2>
        <p>Performance analytics and trends</p>
      </div>
      <div className="insights-grid">
        {insights.map((insight) => (
          <div key={insight.label} className="insight-item">
            <div className="insight-value">
              {insight.value}
              <span className={`trend-arrow ${insight.trend}`}>
                {insight.trend === 'up' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
              </span>
            </div>
            <div className="insight-label">{insight.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyInsights;