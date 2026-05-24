// types/index.ts

export interface Student {
  id: string;
  name: string;
  school: string;
  avatar: string;
  score: number;
  gamesCompleted: number;
  bestTime: string;
  accuracy: number;
  badges: GameBadge[];
  region: string;
}

export interface GameBadge {
  id: string;
  type: 'eq' | 'fe' | 'ff';
  name: string;
}

export interface LeaderboardItem {
  id: string;
  name: string;
  school: string;
  score: number;
  rank: number;
}

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: string;
  icon: string;
  iconClass: string;
}

export interface ProgressItem {
  id: string;
  label: string;
  percentage: number;
  fillClass: string;
}

export interface InsightItem {
  id: string;
  label: string;
  value: string;
}

export interface Institution {
  id: string;
  name: string;
  score: number;
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  active?: boolean;
}

export type FilterRegion = 'all' | 'north' | 'south' | 'east' | 'west'| 'central';