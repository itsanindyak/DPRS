import React from 'react';
import { FaMedal } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
const TopPerformers = () => {
  const performers = [
    {
      rank: 1,
      name: "Arjun Sharma",
      class: "Class X-A",
      score: 9.2,
      icon: <FaMedal color="gold" />
    },
    {
      rank: 2,
      name: "Priya Singh", 
      class: "Class IX-B",
      score: 8.8,
      icon: <FaMedal color="silver" />
    },
    {
      rank: 3,
      name: "Rohit Kumar",
      class: "Class X-C", 
      score: 8.5,
      icon: <FaMedal color="#cd7f32" />
    },
    {
      rank: 4,
      name: "Sneha Patel",
      class: "Class VIII-A",
      score: 8.1,
      icon: <FaStar color="gold" />
    },
    {
      rank: 5,
      name: "Amit Verma",
      class: "Class IX-A",
      score: 7.9,
      icon: <FaStar color="gold" />
    }
  ];

  return (
    <div className="admin-top-performers">
      <div className="card-header">
        <h2>Top Performers</h2>
        <p>Weekly leaderboard rankings</p>
      </div>
      <div className="performers-list">
        {performers.map((performer, index) => (
          <div key={index} className="performer-row">
            <div className="performer-rank">
              <span className="rank-icon">{performer.icon}</span>
              <span className="rank-number">{performer.rank}</span>
            </div>
            <div className="performer-info">
              <div className="performer-name">{performer.name}</div>
              <div className="performer-class">{performer.class}</div>
            </div>
            <div className="performer-score">
              {performer.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;