import { create } from 'zustand';

export type MascotState = 'idle' | 'happy' | 'excited' | 'sad' | 'thinking' | 'celebrating' | 'locked';

interface MascotStore {
  state: MascotState;
  message: string | null;
  isVisible: boolean;
  isMinimized: boolean;
  soundEnabled: boolean;
  xp: number;
  level: number;
  streak: number;
  setState: (state: MascotState, message?: string) => void;
  clearMessage: () => void;
  toggleMinimize: () => void;
  toggleSound: () => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
}

export const useMascotStore = create<MascotStore>((set) => ({
  state: 'idle',
  message: 'Halo! Aku FIAmi 🦉 Yuk mulai belajar hari ini!',
  isVisible: true,
  isMinimized: false,
  soundEnabled: true,
  xp: 0,
  level: 1,
  streak: 1,
  setState: (state, message) => {
    set({ state, message: message || null });
    if (message) {
      setTimeout(() => {
        set((s) => s.message === message ? { message: null, state: 'idle' } : s);
      }, 5000);
    }
  },
  clearMessage: () => set({ message: null, state: 'idle' }),
  toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  addXp: (amount) => set((state) => {
    const newXp = state.xp + amount;
    const newLevel = Math.floor(newXp / 100) + 1;
    if (newLevel > state.level) {
      return { xp: newXp, level: newLevel, state: 'celebrating', message: `Level Up! Kamu sekarang level ${newLevel} 🎉` };
    }
    return { xp: newXp };
  }),
  incrementStreak: () => set((state) => ({ 
    streak: state.streak + 1, 
    state: 'excited', 
    message: `STREAK NAIK! Kamu luar biasa! 🔥` 
  })),
}));
