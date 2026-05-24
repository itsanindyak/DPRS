export interface Student {
  id: string;
  name: string;
  class: string;
  score: number;
  games: number;
  bestTime: string;
  accuracy: number;
  badges: string[];
}

export interface TopPerformer {
  rank: number;
  name: string;
  class: string;
  score: number;
  icon: string;
}

export interface GameProgress {
  name: string;
  icon: string;
  completion: number;
  color: string;
}

export interface Insight {
  label: string;
  value: string;
  trend: 'up' | 'down';
}

export interface SchoolStat {
  icon: string;
  value: string;
  label: string;
  change: string;
  changeType: 'positive' | 'negative';
}

export interface AlertData {
  message: string;
  type: 'warning' | 'info' | 'success' | 'error';
  timestamp: Date;
}

export interface SchoolInfo {
  name: string;
  code: string;
  region: string;
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  averageScore: number;
}