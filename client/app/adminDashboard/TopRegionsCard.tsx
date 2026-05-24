'use client';

import React from 'react';

interface Region {
  id: string;
  name: string;
  score: number;
}

const TopRegionsCard: React.FC = () => {
  const regionsData: Region[] = [
    { id: '1', name: 'West Bengal', score: 9.1 },
    { id: '2', name: 'Maharashtra', score: 8.8 },
    { id: '3', name: 'Karnataka', score: 8.6 },
    { id: '4', name: 'Tamil Nadu', score: 8.4 },
    { id: '5', name: 'Gujarat', score: 8.2 }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Top Regions</h3>
        <p className="card-subtitle">Regional performance rankings</p>
      </div>
      <div className="progress-section">
        {regionsData.map((region) => (
          <div key={region.id} className="regional-item">
            <span className="regional-name">{region.name}</span>
            <span className="regional-score">{region.score}</span>
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

        .regional-item {
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

        .regional-item:last-child {
          margin-bottom: 0;
        }

        .regional-name {
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

        .regional-score {
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

export default TopRegionsCard;