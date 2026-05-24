import React from "react";
import { FaMedal, FaTrophy, FaStar } from "react-icons/fa";

const StudentPerformance = () => {
  const students = [
    {
      name: "Arjun Sharma",
      class: "Class X-A",
      score: 9.2,
      games: 15,
      bestTime: "2:15",
      accuracy: 95,
      badges: [
        { type: "medal", color: "gold" },
        { type: "trophy", color: "gold" },
        { type: "star", color: "gold" }
      ]
    },
    {
      name: "Priya Singh",
      class: "Class IX-B",
      score: 8.8,
      games: 12,
      bestTime: "2:45",
      accuracy: 89,
      badges: [
        { type: "medal", color: "silver" },
        { type: "trophy", color: "gold" }
      ]
    },
    {
      name: "Rohit Kumar",
      class: "Class X-C",
      score: 8.5,
      games: 18,
      bestTime: "3:20",
      accuracy: 92,
      badges: [
        { type: "medal", color: "#cd7f32" },
        { type: "star", color: "gold" }
      ]
    },
    {
      name: "Sneha Patel",
      class: "Class VIII-A",
      score: 8.1,
      games: 10,
      bestTime: "2:55",
      accuracy: 87,
      badges: [
        { type: "trophy", color: "gold" }
      ]
    }
  ];

  const renderBadge = (badge: { type: string; color: string }, index: number) => {
    switch (badge.type) {
      case "medal":
        return <FaMedal key={index} color={badge.color} />;
      case "trophy":
        return <FaTrophy key={index} color={badge.color} />;
      case "star":
        return <FaStar key={index} color={badge.color} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-performance-card">
      <div className="card-header">
        <h2>Student Performance</h2>
        <p>Track individual student progress and achievements</p>
      </div>

      <div className="performance-filters">
        <button className="filter-btn active">All Classes</button>
        <button className="filter-btn">Class X</button>
        <button className="filter-btn">Class IX</button>
        <button className="filter-btn">Class VIII</button>
      </div>

      <div className="performance-list">
        {students.map((student) => (
          <div key={student.name} className="student-row">
            <div className="student-info">
              <div className="student-avatar">{student.name.charAt(0)}</div>
              <div className="student-details">
                <div className="student-name">{student.name}</div>
                <div className="student-class">{student.class}</div>
              </div>
            </div>

            <div className="student-stats">
              <div className="stat-item">
                <span className="stat-value">{student.score}</span>
                <span className="stat-label">Score</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{student.games}</span>
                <span className="stat-label">Games</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{student.bestTime}</span>
                <span className="stat-label">Best Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{student.accuracy}%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>

            <div className="student-badges">
              {student.badges.map((badge, i) => (
                <span key={i} className="badge-icon">
                  {renderBadge(badge, i)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPerformance;
