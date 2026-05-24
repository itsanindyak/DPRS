import React from "react";
import { GameData } from "../types/types";
import { FaWater, FaGlobeAmericas, FaFireAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

interface GameSelectionProps {
  gameData: GameData;
  onPlayGame: (ameType: keyof GameData) => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({
  gameData,
  onPlayGame,
}) => {
  return (
    <div className="card">
      <h2>Choose Your Game</h2>
      <div className="game-options">
        <button className="game-btn">
        <Link href="/flood">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaWater style={{ fontSize: "20px", marginRight: "4px" }} />
            <span>Flood Fighter</span>
          </div>
          <div style={{ fontSize: "14px", opacity: "0.8", marginTop: "5px" }}>
            High Score: {gameData.flood.highScore.toLocaleString()}
          </div>
          </Link>
        </button>
        <button className="game-btn" >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaGlobeAmericas style={{ fontSize: "20px", marginRight: "4px" }} />
            <span>Earth Quick</span>
          </div>
          <div style={{ fontSize: "14px", opacity: "0.8", marginTop: "5px" }}>
            High Score: {gameData.earthquake.highScore.toLocaleString()}
          </div>
        </button>
        <button className="game-btn" >
          <Link href="/unity">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaFireAlt style={{ fontSize: "20px", marginRight: "4px" }} />
            <span>Fire Escape</span>
          </div>
          <div style={{ fontSize: "14px", opacity: "0.8", marginTop: "5px" }}>
            High Score: {gameData.fire.highScore.toLocaleString()}
          </div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default GameSelection;
