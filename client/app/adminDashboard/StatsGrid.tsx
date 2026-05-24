
'use client';

import React, { useEffect } from 'react';
import { StatCard } from './types';

const StatsGrid: React.FC = () => {
  const statsData: StatCard[] = [
    {
      id: '1',
      title: 'Active Students',
      value: '12,847',
      change: '+12%',
      icon: '👥',
      iconClass: 'students'
    },
    {
      id: '2',
      title: 'Institutions',
      value: '342',
      change: '+5%',
      icon: '🏫',
      iconClass: 'institutions'
    },
    {
      id: '3',
      title: 'Completion Rate',
      value: '89.2%',
      change: '+3%',
      icon: '✅',
      iconClass: 'completion'
    },
    {
      id: '4',
      title: 'Average Score',
      value: '7.4',
      change: '+0.3',
      icon: '⭐',
      iconClass: 'score'
    }
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-in');
      }, index * 100);
    });
  }, []);

  return (
    <div className="stats-grid">
      {statsData.map((stat) => (
        <div key={stat.id} className="stat-card">
          <div className="stat-header">
            <div className={`stat-icon ${stat.iconClass}`}>
              {stat.icon}
            </div>
            <span className="stat-change">{stat.change}</span>
          </div>
          <div className="stat-number">{stat.value}</div>
          <div className="stat-label">{stat.title}</div>
        </div>
      ))}

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #0F0E17;
          border-radius: 12px;
          padding: 28px;
          border: 1px solid #FF8906;
          transition: all 0.2s ease;
          min-height: 140px;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          border-color: #FF8906;
          box-shadow: 0 8px 32px rgba(255, 137, 6, 0.2);
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #FFFFFE;
          flex-shrink: 0;
        }

        .stat-icon.students { background: #FF8906; }
        .stat-icon.institutions { background: #F25F4C; }
        .stat-icon.completion { background: #E53170; }
        .stat-icon.score { background: #A7A9BE; }

        .stat-change {
          font-size: 12px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 6px;
          background: #FF8906;
          color: #0F0E17;
          flex-shrink: 0;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 700;
          color: #FFFFFE;
          margin-bottom: 8px;
          line-height: 1;
        }

        .stat-label {
          color: #A7A9BE;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.2;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @media (max-width: 968px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default StatsGrid;