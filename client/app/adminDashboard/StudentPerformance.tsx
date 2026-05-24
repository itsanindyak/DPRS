
'use client';

import React from 'react';
import { Student, FilterRegion } from './types';

interface StudentPerformanceProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const StudentPerformance: React.FC<StudentPerformanceProps> = ({ 
  activeFilter, 
  onFilterChange 
}) => {
  const studentsData: Student[] = [
    {
      id: '1',
      name: 'Hrishikesh Mondal',
      school: 'AOT • B.Tech 3rd Year',
      avatar: 'P',
      score: 8.5,
      gamesCompleted: 12,
      bestTime: '3:45',
      accuracy: 92,
      badges: [
        { id: 'eq', type: 'eq', name: 'Earthquake' },
        { id: 'fe', type: 'fe', name: 'Fire Escape' },
        { id: 'ff', type: 'ff', name: 'Flood Fighter' }
      ],
      region: 'east'
    },
    {
      id: '2',
      name: 'Aniket Patra',
      school: 'AOT • B.Tech 3rd Year',
      avatar: 'P',
      score: 9.2,
      gamesCompleted: 8,
      bestTime: '2:30',
      accuracy: 96,
      badges: [
        { id: 'eq', type: 'eq', name: 'Earthquake' },
        { id: 'fe', type: 'fe', name: 'Fire Escape' }
      ],
      region: 'east'
    },
    {
      id: '3',
      name: 'Kritika Das',
      school: 'AOT • B.Tech 3rd Year',
      avatar: 'A',
      score: 7.8,
      gamesCompleted: 5,
      bestTime: '4:12',
      accuracy: 85,
      badges: [
        { id: 'ff', type: 'ff', name: 'Flood Fighter' }
      ],
      region: 'east'
    },
    {
      id: '4',
      name: 'Anindya Koley',
      school: 'AOT • B.Tech 3rd Year',
      avatar: 'S',
      score: 9.7,
      gamesCompleted: 15,
      bestTime: '2:15',
      accuracy: 98,
      badges: [
        { id: 'eq', type: 'eq', name: 'Earthquake' },
        { id: 'fe', type: 'fe', name: 'Fire Escape' },
        { id: 'ff', type: 'ff', name: 'Flood Fighter' }
      ],
      region: 'east'
    }
  ];

  const filterTabs = [
    { key: 'all', label: 'All Regions' },
    { key: 'north', label: 'North' },
    { key: 'south', label: 'South' },
    { key: 'east', label: 'East' },
    { key: 'west', label: 'West' }
  ];

  // Filter students based on active filter
  const filteredStudents = activeFilter === 'all' 
    ? studentsData 
    : studentsData.filter(student => student.region === activeFilter);

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Student Performance</h2>
          <p className="card-subtitle">Track individual student progress and achievements</p>
          
          <div className="filter-tabs">
            {filterTabs.map((tab) => (
              <div
                key={tab.key}
                className={`filter-tab ${activeFilter === tab.key ? 'active' : ''}`}
                onClick={() => handleFilterClick(tab.key as FilterRegion)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>
        
        <div className="student-list">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student.id} className="student-item">
                <div className="student-avatar">{student.avatar}</div>
                <div className="student-info">
                  <div className="student-name">{student.name}</div>
                  <div className="student-school">🏫 {student.school}</div>
                </div>
                <div className="student-stats">
                  <div className="student-stat">
                    <div className="student-stat-value">{student.score}</div>
                    <div className="student-stat-label">Score</div>
                  </div>
                  <div className="student-stat">
                    <div className="student-stat-value">{student.gamesCompleted}</div>
                    <div className="student-stat-label">Games</div>
                  </div>
                  <div className="student-stat">
                    <div className="student-stat-value">{student.bestTime}</div>
                    <div className="student-stat-label">Best Time</div>
                  </div>
                  <div className="student-stat">
                    <div className="student-stat-value">{student.accuracy}%</div>
                    <div className="student-stat-label">Accuracy</div>
                  </div>
                </div>
                <div className="game-badges">
                  {student.badges.map((badge) => (
                    <div key={badge.id} className={`game-badge badge-${badge.type}`}>
                      {badge.type.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-students">
              <p>No students found for the selected region.</p>
            </div>
          )}
        </div>
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
          margin-bottom: 24px;
          line-height: 1.4;
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 10px 16px;
          background: rgba(255, 137, 6, 0.1);
          border: 1px solid #FF8906;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #A7A9BE;
          white-space: nowrap;
        }

        .filter-tab.active {
          background: #FF8906;
          color: #FFFFFE;
          border-color: #FF8906;
        }

        .filter-tab:hover:not(.active) {
          background: rgba(255, 137, 6, 0.2);
        }

        .student-list {
          max-height: 500px;
          overflow-y: auto;
          padding: 24px 32px 32px;
        }

        .student-item {
          display: flex;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 137, 6, 0.3);
          transition: all 0.2s ease;
          min-height: 80px;
        }

        .student-item:hover {
          background: rgba(255, 137, 6, 0.05);
          margin: 0 -20px;
          padding: 20px;
          border-radius: 8px;
        }

        .student-item:last-child {
          border-bottom: none;
        }

        .student-avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FF8906, #F25F4C);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFE;
          font-weight: 700;
          font-size: 18px;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .student-info {
          flex: 1;
          min-width: 0;
          margin-right: 16px;
        }

        .student-name {
          font-weight: 600;
          color: #FFFFFE;
          font-size: 16px;
          margin-bottom: 4px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .student-school {
          color: #A7A9BE;
          font-size: 14px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .student-stats {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .student-stat {
          text-align: center;
          min-width: 40px;
        }

        .student-stat-value {
          font-weight: 700;
          color: #FFFFFE;
          font-size: 14px;
          line-height: 1.2;
          margin-bottom: 2px;
        }

        .student-stat-label {
          color: #A7A9BE;
          font-size: 11px;
          line-height: 1.1;
        }

        .game-badges {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }

        .game-badge {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #FFFFFE;
        }

        .badge-eq { background: #FF8906; }
        .badge-fe { background: #F25F4C; }
        .badge-ff { background: #E53170; }

        .no-students {
          text-align: center;
          padding: 40px 20px;
          color: #A7A9BE;
        }

        @media (max-width: 968px) {
          .student-stats {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .card-header {
            padding: 24px 20px 20px;
          }
          
          .student-list {
            padding: 16px 20px 24px;
          }
        }
      `}</style>
    </>
  );
};

export default StudentPerformance;