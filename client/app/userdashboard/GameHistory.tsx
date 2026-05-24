import React from 'react';
import { GameHistoryItem } from '../types/types';

interface GameHistoryProps {
  gameHistory: GameHistoryItem[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ gameHistory }) => {
  return (
    <div className="card">
      <h2>Game History</h2>
      <div className="game-history scrollbar">
        {gameHistory.map((game, index) => (
          <div key={index} className="game-item">
            <div>
              <div className="game-name">{game.name}</div>
              <div className="game-date">{game.date}</div>
            </div>
            <div>
              <div className="game-score">{game.score.toLocaleString()}</div>
              {game.isHighScore && <div className="high-score">New High Score!</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;