
'use client';

import React from 'react';
import { LeaderboardItem } from './types';

const LeaderBoard: React.FC = () => {
  const leaderboardData: LeaderboardItem[] = [
    { id: '1', name: 'Anindya Koley', school: 'AOT', score: 9.7, rank: 1 },
    { id: '2', name: 'Aniket Patra', school: 'AOT', score: 9.2, rank: 2 },
    { id: '3', name: 'Hrishikesh Mondal', school: 'AOT', score: 8.5, rank: 3 },
    { id: '4', name: 'Kritika Das', school: 'AOT', score: 7.8, rank: 4 },
    { id: '5', name: 'Rahul Kumar', school: 'Delhi University', score: 7.6, rank: 5 }
  ];

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver  
      case 3: return '#CD7F32'; // Bronze
      default: return '#E53170'; // Default pink
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Top Performers</h2>
          <p className="card-subtitle">Weekly leaderboard rankings</p>
        </div>
        
        <div className="leaderboard">
          {leaderboardData.map((item) => (
            <div key={item.id} className="leaderboard-item">
              <div 
                className="rank-badge"
                style={{ backgroundColor: getRankBadgeColor(item.rank) }}
              >
                {item.rank === 1 ? '🏆' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : item.rank}
              </div>
              <div className="leaderboard-info">
                <div className="leaderboard-name">{item.name}</div>
                <div className="leaderboard-school">🏫 {item.school}</div>
              </div>
              <div className="leaderboard-score">{item.score}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .card {
          background: #0F0E17;
          border-radius: 12px;
          border: 1px solid #FF8906;
          overflow: hidden;
          height: fit-content;
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

        .leaderboard {
          padding: 24px 32px 32px;
          max-height: 400px;
          overflow-y: auto;
        }

        .leaderboard-item {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 137, 6, 0.3);
          min-height: 60px;
          transition: all 0.2s ease;
        }

        .leaderboard-item:hover {
          background: rgba(255, 137, 6, 0.05);
          margin: 0 -16px;
          padding: 16px;
          border-radius: 8px;
        }

        .leaderboard-item:last-child {
          border-bottom: none;
        }

        .rank-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          margin-right: 16px;
          flex-shrink: 0;
          color: #000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .leaderboard-info {
          flex: 1;
          min-width: 0;
          margin-right: 16px;
        }

        .leaderboard-name {
          font-weight: 600;
          color: #FFFFFE;
          margin-bottom: 4px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 15px;
        }

        .leaderboard-school {
          color: #A7A9BE;
          font-size: 13px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .leaderboard-score {
          font-weight: 700;
          color: #FF8906;
          font-size: 18px;
          flex-shrink: 0;
        }

        .leaderboard::-webkit-scrollbar {
          width: 4px;
        }

        .leaderboard::-webkit-scrollbar-track {
          background: rgba(255, 137, 6, 0.1);
        }

        .leaderboard::-webkit-scrollbar-thumb {
          background: #FF8906;
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .card-header {
            padding: 24px 20px 20px;
          }
          
          .leaderboard {
            padding: 16px 20px 24px;
          }
          
          .rank-badge {
            width: 32px;
            height: 32px;
            font-size: 12px;
          }
          
          .leaderboard-name {
            font-size: 14px;
          }
          
          .leaderboard-school {
            font-size: 12px;
          }
          
          .leaderboard-score {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default LeaderBoard;