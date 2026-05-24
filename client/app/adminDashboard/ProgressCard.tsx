
'use client';

import React from 'react';
import { ProgressItem } from './types';

const ProgressCard: React.FC = () => {
  const progressData: ProgressItem[] = [
    { id: '1', label: '🔥 Fire Escape', percentage: 94, fillClass: 'progress-fe' },
    { id: '2', label: '⚡ Earth Quick', percentage: 91, fillClass: 'progress-eq' },
    { id: '3', label: '🌊 Flood Fighter', percentage: 87, fillClass: 'progress-ff' },
    { id: '4', label: '🚨 General Preparedness', percentage: 78, fillClass: 'progress-general' }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Game Completion Rates</h3>
        <p className="card-subtitle">Progress across different disaster scenarios</p>
      </div>
      <div className="progress-section">
        {progressData.map((item) => (
          <div key={item.id} className="progress-item">
            <div className="progress-header">
              <span className="progress-label">{item.label}</span>
              <span className="progress-percentage">{item.percentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${item.fillClass}`} 
                style={{ width: `${item.percentage}%` }}
              />
            </div>
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

        .progress-item {
          margin-bottom: 24px;
        }

        .progress-item:last-child {
          margin-bottom: 0;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .progress-label {
          font-weight: 600;
          color: #FFFFFE;
          font-size: 14px;
          line-height: 1.2;
        }

        .progress-percentage {
          font-weight: 700;
          color: #A7A9BE;
          font-size: 14px;
          line-height: 1.2;
        }

        .progress-bar {
          height: 10px;
          background: rgba(255, 137, 6, 0.1);
          border-radius: 5px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.5s ease;
        }

        .progress-eq { background: #FF8906; }
        .progress-fe { background: #F25F4C; }
        .progress-ff { background: #E53170; }
        .progress-general { background: #A7A9BE; }

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

export default ProgressCard;