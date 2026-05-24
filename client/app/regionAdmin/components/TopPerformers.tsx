import React from 'react';
import './regionAdminStyles.css';
interface Performer {
  name: string;
  school: string;
  score: number;
}

export default function TopPerformers() {
  const performers: Performer[] = [
    { name: 'Rahul Sharma', school: 'Greenwood High', score: 9.2 },
    { name: 'Priya Patel', school: 'DPS Sector 45', score: 8.9 },
    { name: 'Amit Kumar', school: 'St. Mary\'s School', score: 8.8 },
    { name: 'Sneha Singh', school: 'Modern School', score: 8.5 },
    { name: 'Vikash Roy', school: 'Delhi Public School', score: 8.3 }
  ];

  const getRankClass = (index: number) => {
    switch (index) {
      case 0: return 'regional-rank-first';
      case 1: return 'regional-rank-second';
      case 2: return 'regional-rank-third';
      default: return 'regional-rank-other';
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}`;
    }
  };

  return (
    <div className="card">
      <h2>Top Performers</h2>
      <p className="regional-subtitle">
        Regional leaderboard rankings
      </p>

      <div className="regional-performers-list">
        {performers.map((performer, index) => (
          <div key={index} className="regional-item">
            <div className="regional-performer-info">
              <div className={`regional-rank-icon ${getRankClass(index)}`}>
                {getRankIcon(index)}
              </div>
              <div>
                <div className="regional-name">{performer.name}</div>
                <div className="regional-performer-school">
                  {performer.school}
                </div>
              </div>
            </div>
            <div className="regional-score">
              {performer.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}