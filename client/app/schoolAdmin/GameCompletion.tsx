import React from 'react';
import { FaFire, FaGlobe, FaWater, FaBullseye } from "react-icons/fa";
const GameCompletion = () => {
  const games = [
    {
      name: "Fire Escape",
      icon: <FaFire color="red" />,
      completion: 92,
      color: "#e53170"
    },
    {
      name: "Earth Quick",
      icon: <FaGlobe color="blue" />, 
      completion: 87,
      color: "#ff8906"
    },
    {
      name: "Flood Fighter",
      icon: <FaWater color="skyblue" />,
      completion: 83,
      color: "#f25f4c"
    },
    {
      name: "General Preparedness",
      icon: <FaBullseye color="crimson" />,
      completion: 75,
      color: "#a7a9be"
    }
  ];

  return (
    <div className="admin-game-completion">
      <div className="card-header">
        <h2>Game Completion Rates</h2>
        <p>Progress across different disaster scenarios</p>
      </div>
      <div className="games-progress">
        {games.map((game, index) => (
          <div key={index} className="game-progress-item">
            <div className="game-info">
              <span className="game-icon">{game.icon}</span>
              <span className="game-name">{game.name}</span>
            </div>
            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${game.completion}%`,
                    backgroundColor: game.color
                  }}
                ></div>
              </div>
              <span className="progress-percentage">{game.completion}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCompletion;