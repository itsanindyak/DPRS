
'use client';

import React from 'react';
import ProgressCard from './ProgressCard';
import InsightsCard from './InsightsCard';
import TopInstitutionsCard from './TopInstitutionsCard';
import DistrictRanking from './TopRegionsCard';

const AnalyticsGrid: React.FC = () => {
  return (
    <>
      <div className="analytics-grid">
        <div className="analytics-item">
          <ProgressCard />
        </div>
        <div className="analytics-item">
          <InsightsCard />
        </div>
        <div className="analytics-item">
          <TopInstitutionsCard />
        </div>
         <div className="analytics-item">
          <DistrictRanking />
        </div>
      </div>
      

      <style jsx>{`
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .analytics-item {
          min-height: 300px;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1200px) {
          .analytics-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 24px;
          }
          
          .analytics-item {
            min-height: 250px;
          }
        }

        @media (max-width: 480px) {
          .analytics-grid {
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default AnalyticsGrid;