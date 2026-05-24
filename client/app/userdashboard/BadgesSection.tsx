import React from 'react';
import { FaTrophy, FaHeadphones, FaStar, FaBullseye, FaRunning, FaPuzzlePiece } from 'react-icons/fa';

const BadgesSection: React.FC = () => {
  const badges = [
    { icon: <FaTrophy />, name: 'Champion', className: 'badge' },
    { icon: <FaHeadphones />, name: 'Gamer', className: 'badge silver' },
    { icon: <FaStar />, name: 'Rising Star', className: 'badge bronze' },
    { icon: <FaBullseye />, name: 'Sharpshooter', className: 'badge' },
    { icon: <FaRunning />, name: 'Speed Runner', className: 'badge silver' },
    { icon: <FaPuzzlePiece />, name: 'Puzzle Solver', className: 'badge bronze' }
  ];

  return (
    <div className="card">
      <h2>Badges Awarded</h2>
      <div className="badges-container">
        {badges.map((badge, index) => (
          <div key={index} className={`${badge.className} flex flex-col gap-y-3 `}>
            <>
              <div className="badge-icon self-center text-2xl flex justify-center items-center">{badge.icon}</div>
              <div className="badge-name">{badge.name}</div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesSection;