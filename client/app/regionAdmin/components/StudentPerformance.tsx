'use client';
import React, { useState } from 'react';
import './regionAdminStyles.css';
interface Student {
  id: number;
  name: string;
  school: string;
  grade: string;
  score: number;
  games: number;
  bestTime: string;
  accuracy: number;
  badges: string[];
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`regional-tab-button ${active ? 'active' : ''}`}
    >
      {children}
    </button>
  );
}

export default function StudentPerformance() {
  const [activeTab, setActiveTab] = useState('All Schools');

  const students: Student[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      school: 'Greenwood High School',
      grade: 'B.Tech 3rd Year',
      score: 9.2,
      games: 15,
      bestTime: '2:30',
      accuracy: 95,
      badges: ['🥇', '🏆', '🎯']
    },
    {
      id: 2,
      name: 'Priya Patel',
      school: 'Delhi Public School',
      grade: 'B.Tech 2nd Year',
      score: 8.8,
      games: 12,
      bestTime: '2:45',
      accuracy: 92,
      badges: ['🥈', '🎯']
    },
    {
      id: 3,
      name: 'Amit Kumar',
      school: 'St. Mary\'s School',
      grade: 'B.Tech 4th Year',
      score: 8.5,
      games: 18,
      bestTime: '3:10',
      accuracy: 88,
      badges: ['🥉']
    },
    {
      id: 4,
      name: 'Sneha Singh',
      school: 'Modern School',
      grade: 'B.Tech 1st Year',
      score: 8.9,
      games: 14,
      bestTime: '2:55',
      accuracy: 90,
      badges: ['🥇', '🎯']
    }
  ];

  return (
    <div className="card">
      <div className="regional-performance-header">
        <h2>Student Performance</h2>
        <div className="regional-tab-container">
          {['All Schools', 'Top 10', 'Recent'].map(tab => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </div>
      </div>

      <div className="game-history scrollbar regional-student-list">
        {students.map((student, index) => (
          <div key={student.id} className="game-item fade-in">
            <div className="regional-student-info">
              <div className={`regional-student-avatar ${index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary'}`}>
                {student.name.charAt(0)}
              </div>
              <div>
                <div className="game-name">{student.name}</div>
                <div className="regional-student-details">
                  {student.school} • {student.grade}
                </div>
              </div>
            </div>
            <div className="regional-student-stats">
              <div className="regional-stat-item">
                <div className="game-score">{student.score}</div>
                <div className="regional-stat-item-label">Score</div>
              </div>
              {/* <div className="regional-stat-item">
                <div className="regional-stat-item-value">{student.games}</div>
                <div className="regional-stat-item-label">Games</div>
              </div>
              <div className="regional-stat-item">
                <div className="regional-stat-item-value">{student.bestTime}</div>
                <div className="regional-stat-item-label">Best Time</div>
              </div>
              <div className="regional-stat-item">
                <div className="regional-stat-item-value">{student.accuracy}%</div>
                <div className="regional-stat-item-label">Accuracy</div>
              </div>
              <div className="regional-badges">
                {student.badges.map((badge, i) => (
                  <span key={i} className="regional-badge-icon">{badge}</span>
                ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}