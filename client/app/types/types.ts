export interface Game {
  name: string;
  highScore: number;
  icon: string;
}

export interface GameData {
  flood: Game;
  earthquake: Game;
  fire: Game;
}

export interface UserData {
  name: string;
  location: string;
  level: number;
  memberSince: number;
}

export interface GameHistoryItem {
  name: string;
  score: number;
  date: string;
  isHighScore: boolean;
}

export interface Contact {
  name: string;
  relation: string;
  phone: string;
}

export interface Badge {
  icon: string;
  name: string;
  className: string;
}