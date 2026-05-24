import React from 'react';
import './regionAdminStyles.css';
interface Insight {
  label: string;
  value: string;
  trend?: string;
}

export default function KeyInsights() {
  const insights: Insight[] = [
    { label: 'Average Session Duration', value: '16.2 min', trend: '+2.1 min' },
    { label: 'Weekly Active Users', value: '2,847', trend: '+312' },
    { label: 'Drill Participation', value: '94.5%', trend: '+8.2%' },
    { label: 'Knowledge Retention', value: '87.3%', trend: '+5.1%' }
  ];

  return (
    <div className="card">
      <h2>Key Insights</h2>
      <p className="regional-subtitle">
        Performance analytics and trends
      </p>

      <div className="regional-insights-list">
        {insights.map((insight, index) => (
          <div key={index} className="regional-insight-item">
            <div className="regional-insight-label">
              {insight.label}
            </div>
            <div className="regional-insight-content">
              <div className="regional-insight-value">
                {insight.value}
              </div>
              {insight.trend && (
                <div className="regional-insight-trend">
                  {insight.trend}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}