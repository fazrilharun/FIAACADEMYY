import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Progress, Achievement } from "../types";

interface StoreState {
  user: User | null;
  progress: Progress;
  login: (user: User) => void;
  logout: () => void;
  updatePlan: (plan: User["plan"]) => void;
  markLessonComplete: (
    courseId: string,
    lessonId: string,
    totalLessons: number,
  ) => void;
  addPoints: (amount: number) => void;
  incrementStreak: () => void;
  addXP: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
  checkDailyLogin: () => void;
  unlockAchievement: (achievement: Achievement) => void;
  resetSystem: () => void;
  completeOnboarding: (major: string) => void;
  completeTutorial: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      progress: {},
      login: (user) => set({ user }),
      logout: () => set({ user: null, progress: {} }),
      updatePlan: (plan) =>
        set((state) => ({
          user: state.user ? { ...state.user, plan } : null,
        })),
      markLessonComplete: (courseId, lessonId, totalLessons) =>
        set((state) => {
          const courseProgress = state.progress[courseId] || {
            completedLessons: [],
            progressPercentage: 0,
          };

          if (courseProgress.completedLessons.includes(lessonId)) {
            return state;
          }

          const newCompleted = [...courseProgress.completedLessons, lessonId];
          const newPercentage = Math.round(
            (newCompleted.length / totalLessons) * 100,
          );

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                completedLessons: newCompleted,
                progressPercentage: newPercentage,
              },
            },
          };
        }),
      addPoints: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, points: (state.user.points || 0) + amount }
            : null,
        })),
      incrementStreak: () =>
        set((state) => ({
          user: state.user
            ? { ...state.user, streak: (state.user.streak || 0) + 1 }
            : null,
        })),
      addXP: (amount) =>
        set((state) => {
          if (!state.user) return state;
          
          const newXP = (state.user.xp || 0) + amount;
          const newLevel = Math.floor(newXP / 500) + 1;
          const pointsToAdd = Math.floor(amount / 100); // 100 XP = 1 Point
          
          return {
            user: {
              ...state.user,
              xp: newXP,
              level: newLevel,
              points: (state.user.points || 0) + pointsToAdd,
            },
          };
        }),
      redeemPoints: (amount) => {
        const state = get();
        if (!state.user || state.user.points < amount) return false;
        
        set({
          user: {
            ...state.user,
            points: state.user.points - amount,
          },
        });
        return true;
      },
      checkDailyLogin: () =>
        set((state) => {
          if (!state.user) return state;
          
          const today = new Date().toISOString().split('T')[0];
          const lastLogin = state.user.lastLoginDate;
          
          if (lastLogin === today) return state; // Already logged in today
          
          let newStreak = state.user.streak || 0;
          
          if (lastLogin) {
            const lastDate = new Date(lastLogin);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              newStreak += 1; // Consecutive day
            } else if (diffDays > 1) {
              newStreak = 1; // Streak broken
            }
          } else {
            newStreak = 1; // First login
          }
          
          // Add 5 XP for daily login, 10 XP for streak
          const xpBonus = 5 + (newStreak > 1 ? 10 : 0);
          const newXP = (state.user.xp || 0) + xpBonus;
          const newLevel = Math.floor(newXP / 500) + 1;
          
          return {
            user: {
              ...state.user,
              streak: newStreak,
              lastLoginDate: today,
              xp: newXP,
              level: newLevel,
            },
          };
        }),
      unlockAchievement: (achievement) =>
        set((state) => {
          if (!state.user) return state;
          
          const hasAchievement = state.user.achievements?.some(a => a.id === achievement.id);
          if (hasAchievement) return state;
          
          return {
            user: {
              ...state.user,
              achievements: [...(state.user.achievements || []), achievement],
            },
          };
        }),
      resetSystem: () =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              xp: 0,
              level: 1,
              points: 0,
              streak: 0,
              achievements: [],
              leaderboardRank: 0,
              isOnboarded: false,
              hasSeenTutorial: false,
            },
            progress: {},
          };
        }),
      completeOnboarding: (major) =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              major,
              isOnboarded: true,
              xp: 50, // Welcome bonus
              level: 1,
            }
          };
        }),
      completeTutorial: () =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              hasSeenTutorial: true,
            }
          };
        }),
    }),
    {
      name: "fiacademy-storage",
    },
  ),
);
