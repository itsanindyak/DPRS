import React from 'react';
import './regionAdminStyles.css';

interface GameData {
  name: string;
  completion: number;
  color: string;
  icon: string;
  type: 'fire' | 'earth' | 'flood' | 'general';
}

export default function GameCompletion() {
  const games: GameData[] = [
    { name: 'Fire Escape', completion: 94, color: '#F25F4C', icon: '🔥', type: 'fire' },
    { name: 'Earth Quick', completion: 91, color: '#FF8906', icon: '⚡', type: 'earth' },
    { name: 'Flood Fighter', completion: 87, color: '#E53170', icon: '🌊', type: 'flood' },
    { name: 'General Preparedness', completion: 78, color: '#A7A9BE', icon: '🛡️', type: 'general' }
  ];

  return (
    <div className="card regional-games-list">
      <h2 className="text-white text-2xl font-semibold mb-4 border-b-2 border-orange-500 pb-2">
        Game Completion Rates
      </h2>
      <p className="regional-subtitle">
        Progress across different disaster scenarios
      </p>
      <div className="regional-games-list">
        {games.map((game, index) => (
          <div key={index} className="regional-game-item">
            <div className="regional-game-header">
              <div className="regional-game-title">
                <span className="regional-game-icon">{game.icon}</span>
                <span className="regional-game-name">{game.name}</span>
              </div>
              <span className={`regional-game-percentage ${game.type}`}>
                {game.completion}%
              </span>
            </div>
            <div className="regional-progress-bar">
              <div 
                className={`regional-progress-fill ${game.type}`}
                style={{ width: `${game.completion}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}