
'use client';

import React from 'react';
import { Institution } from './types';

const TopInstitutionsCard: React.FC = () => {
  const institutionsData: Institution[] = [
    { id: '1', name: 'AOT', score: 9.2 },
    { id: '2', name: 'IIT Bombay', score: 8.9 },
    { id: '3', name: 'Delhi University', score: 8.7 },
    { id: '4', name: 'JNU Delhi', score: 8.5 },
    { id: '5', name: 'Manipur High School', score: 8.3 }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Top Institutions</h3>
        <p className="card-subtitle">Institutional performance rankings</p>
      </div>
      <div className="progress-section">
        {institutionsData.map((institution) => (
          <div key={institution.id} className="institutional-item">
            <span className="institutional-name">{institution.name}</span>
            <span className="institutional-score">{institution.score}</span>
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

        .institutional-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: rgba(255, 137, 6, 0.05);
          border-radius: 8px;
          margin-bottom: 12px;
          border: 1px solid rgba(255, 137, 6, 0.3);
          min-height: 56px;
        }

        .institutional-item:last-child {
          margin-bottom: 0;
        }

        .institutional-name {
          color: #FFFFFE;
          font-weight: 600;
          font-size: 14px;
          line-height: 1.2;
          flex: 1;
          margin-right: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .institutional-score {
          color: #FF8906;
          font-weight: 700;
          font-size: 16px;
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

export default TopInstitutionsCard;