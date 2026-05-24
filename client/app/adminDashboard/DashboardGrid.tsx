
'use client';

import React from 'react';
import StudentPerformance from './StudentPerformance';
import LeaderBoard from './LeaderBoard';
import { FilterRegion } from './types';

interface DashboardGridProps {
  activeFilter: FilterRegion;
  onFilterChange: (filter: string) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ 
  activeFilter, 
  onFilterChange 
}) => {
  return (
    <>
      <div className="dashboard-grid">
        <div className="dashboard-grid-item dashboard-grid-main">
          <StudentPerformance 
            activeFilter={activeFilter} 
            onFilterChange={onFilterChange} 
          />
        </div>
        <div className="dashboard-grid-item dashboard-grid-sidebar">
          <LeaderBoard />
        </div>
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          margin-bottom: 32px;
          align-items: start;
        }

        .dashboard-grid-item {
          min-height: 400px;
          display: flex;
          flex-direction: column;
        }

        .dashboard-grid-main {
          min-width: 0; /* Prevents overflow issues */
        }

        .dashboard-grid-sidebar {
          min-width: 300px;
        }

        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .dashboard-grid-sidebar {
            min-width: auto;
          }
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            gap: 16px;
            margin-bottom: 24px;
          }
          
          .dashboard-grid-item {
            min-height: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default DashboardGrid;