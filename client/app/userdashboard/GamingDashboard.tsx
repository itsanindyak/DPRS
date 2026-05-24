'use client';

import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import GameHistory from './GameHistory';
import GameSelection from './GameSelection';
import EmergencyContacts from './EmergencyContacts';
import BadgesSection from './BadgesSection';
import { GameData, GameHistoryItem, UserData } from '../types/types';
import '../globals.css';

const GamingDashboard: React.FC = () => {
  // Game data
  //setGameData is not used
  //use it if you plan to update game data dynamically
  const [gameData] = useState<GameData>({
    flood: { name: 'Flood Fighter', highScore: 8750, icon: '🌊' },
    earthquake: { name: 'Earth Quick', highScore: 6420, icon: '🌍' },
    fire: { name: 'Fire Escape', highScore: 12300, icon: '🔥' }
  });

  // User data
  const userData: UserData = {
    name: 'Hrishikesh',
    location: 'Phek, Manipur',
    level: 15,
    memberSince: 2025
  };

  // Game history state
  // setGameHistory is never used
  // use it if you plan to update game history dynamically
  const [gameHistory] = useState<GameHistoryItem[]>([
    { name: 'Flood Fighter', score: 8750, date: '2025-09-04', isHighScore: true },
    { name: 'Earth Quick', score: 6420, date: '2025-09-03', isHighScore: false },
    { name: 'Fire Escape', score: 12300, date: '2025-09-02', isHighScore: true },
    { name: 'Flood Fighter', score: 7890, date: '2025-09-01', isHighScore: false },
    { name: 'Earth Quick', score: 5670, date: '2025-08-31', isHighScore: false },
    { name: 'Fire Escape', score: 11450, date: '2025-08-30', isHighScore: false }
  ]);

  // Play game function
  const playGame = (gameType: keyof GameData) => {
    const game = gameData[gameType];
    alert(`Starting ${game.name}! Good luck!`);
  };
  //use this function to add a new game entry to history
  // Add game to history
  // const addGameToHistory = (gameName: string, score: number, isHighScore: boolean) => {
  //   const today = new Date().toISOString().split('T')[0];
  //   const newGame: GameHistoryItem = {
  //     name: gameName,
  //     score,
  //     date: today,
  //     isHighScore
  //   };
    
  //   setGameHistory(prev => [newGame, ...prev]);
  // };

  // Animation effect on mount
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      cardElement.style.opacity = '0';
      cardElement.style.transform = 'translateY(20px)';
      setTimeout(() => {
        cardElement.style.transition = 'all 0.5s ease';
        cardElement.style.opacity = '1';
        cardElement.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  return (
    <div className="dashboard">
      <UserProfile userData={userData} />
      <GameHistory gameHistory={gameHistory} />
      <GameSelection gameData={gameData} onPlayGame={playGame} />
      <EmergencyContacts />
      <BadgesSection />
    </div>
  );
};

export default GamingDashboard;