export type Plan = "FREE" | "BASIC" | "PRO" | "PREMIUM";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  streak: number;
  points: number;
  xp: number;
  level: number;
  achievements: Achievement[];
  leaderboardRank: number;
  major: string;
  lastLoginDate: string;
  isOnboarded?: boolean;
  hasSeenTutorial?: boolean;
}

export interface Progress {
  [courseId: string]: {
    completedLessons: string[];
    progressPercentage: number;
  };
}

export interface Mentor {
  id: string;
  name: string;
  major: string;
  rating: number;
  image: string;
  availableTimes: string[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isLocked: boolean;
  type: "video" | "pdf" | "quiz";
}

export interface Course {
  id: string;
  title: string;
  description: string;
  major: string;
  image: string;
  lessons: Lesson[];
}

export interface Major {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}
