import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { Achievement } from '../types';

export const useGamification = () => {
  const { user, addXP, unlockAchievement, redeemPoints } = useStore();
  const [xpAnimation, setXpAnimation] = useState<{ amount: number; id: number } | null>(null);

  const triggerConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }, []);

  const earnXP = useCallback((amount: number, reason: string) => {
    if (!user) return;
    
    const oldLevel = user.level;
    addXP(amount);
    
    // Show floating XP animation
    setXpAnimation({ amount, id: Date.now() });
    setTimeout(() => setXpAnimation(null), 2000);

    // Check for level up
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    
    if (newLevel > oldLevel) {
      triggerConfetti();
      // Here we could trigger mascot animation via event or store
      window.dispatchEvent(new CustomEvent('mascot-action', { detail: { action: 'excited', message: `Selamat! Kamu naik ke Level ${newLevel}! 🎉` } }));
    } else if (amount >= 50) {
      window.dispatchEvent(new CustomEvent('mascot-action', { detail: { action: 'happy', message: `Wow! +${amount} XP untuk ${reason}! 🚀` } }));
    }
  }, [user, addXP, triggerConfetti]);

  const checkAchievements = useCallback(() => {
    if (!user) return;
    
    // Example achievement checks
    if (user.xp >= 1000 && !user.achievements?.find(a => a.id === 'xp_1000')) {
      unlockAchievement({
        id: 'xp_1000',
        title: '1000 XP Milestone',
        description: 'Mencapai 1000 XP pertama',
        icon: '🌟',
        unlockedAt: new Date().toISOString()
      });
      earnXP(100, 'Achievement Unlocked');
    }
    
    if (user.streak >= 7 && !user.achievements?.find(a => a.id === 'streak_7')) {
      unlockAchievement({
        id: 'streak_7',
        title: '7-Day Streak',
        description: 'Belajar 7 hari berturut-turut',
        icon: '🔥',
        unlockedAt: new Date().toISOString()
      });
      earnXP(150, 'Achievement Unlocked');
    }
  }, [user, unlockAchievement, earnXP]);

  return {
    earnXP,
    triggerConfetti,
    checkAchievements,
    xpAnimation
  };
};
