
'use client';

import React from 'react';
import { InsightItem } from './types'

const InsightsCard: React.FC = () => {
  const insightsData: InsightItem[] = [
    { id: '1', label: 'Average Session Duration', value: '18.4 min' },
    { id: '2', label: 'Weekly Active Users', value: '8,932' },
    { id: '3', label: 'Drill Participation', value: '92.1%' },
    { id: '4', label: 'Knowledge Retention', value: '88.7%' }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Key Insights</h3>
        <p className="card-subtitle">Performance analytics and trends</p>
      </div>
      <div className="progress-section">
        {insightsData.map((item) => (
          <div key={item.id} className="insight-item">
            <span className="insight-label">{item.label}</span>
            <span className="insight-value">{item.value}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .card {
          background: #0F0E17;
          border-radius: 12px;
          border: 1px solid #FF8906;
          overflow: hidden;
        }

        .card-header {
          padding: 32px 32px 24px;
          border-bottom: 1px solid #FF8906;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #FFFFFE;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .card-subtitle {
          color: #A7A9BE;
          font-size: 14px;
          margin-bottom: 0;
          line-height: 1.4;
        }

        .progress-section {
          padding: 24px 32px 32px;
        }

        .insight-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 137, 6, 0.3);
          min-height: 50px;
        }

        .insight-item:last-child {
          border-bottom: none;
        }

        .insight-label {
          color: #A7A9BE;
          font-size: 14px;
          line-height: 1.2;
          flex: 1;
          margin-right: 16px;
        }

        .insight-value {
          font-weight: 600;
          color: #FFFFFE;
          font-size: 14px;
          line-height: 1.2;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .card-header {
            padding: 24px 20px 20px;
          }
          
          .progress-section {
            padding: 16px 20px 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default InsightsCard;