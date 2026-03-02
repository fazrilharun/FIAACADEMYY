import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMascotStore } from '../../store/useMascotStore';
import { MascotSVG } from './MascotSVG';
import { MascotBubble } from './MascotBubble';
import { Volume2, VolumeX, Minimize2, Maximize2, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { useStore } from '../../store/useStore';

export function Mascot() {
  const { 
    state, 
    message, 
    isVisible, 
    isMinimized, 
    soundEnabled, 
    xp, 
    level,
    setState, 
    clearMessage, 
    toggleMinimize, 
    toggleSound 
  } = useMascotStore();
  
  const user = useStore((state) => state.user);
  const isPremium = user?.plan === 'PRO' || user?.plan === 'PREMIUM';
  
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  // Handle inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(timeout);
      if (state === 'sad') {
        setState('happy', 'Asik, kamu kembali! Yuk lanjut belajar!');
      }
      timeout = setTimeout(() => {
        setState('sad', 'Aku tungguin kamu belajar lagi ya...');
      }, 5 * 60 * 1000); // 5 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [state, setState]);

  // Handle scroll reactions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - scrollY) > 500) {
        if (state === 'idle') {
          setState('excited');
          setTimeout(() => setState('idle'), 2000);
        }
        setScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, state, setState]);

  // Route change reactions
  useEffect(() => {
    if (location.pathname === '/') {
      setState('happy', 'Selamat datang kembali di FIAcademy! 🦉');
    } else if (location.pathname.includes('/materi')) {
      setState('thinking', 'Wah, materi baru! Yuk kita pelajari sama-sama.');
    } else if (location.pathname.includes('/tracker')) {
      setState('excited', 'Lihat progress belajarmu! Keren banget!');
    }
  }, [location.pathname, setState]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Controls */}
      <div className="flex gap-2 mb-2 pointer-events-auto">
        <button 
          onClick={toggleSound}
          className="p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-blue-600 transition-colors"
          title={soundEnabled ? "Mute Mascot" : "Unmute Mascot"}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <button 
          onClick={toggleMinimize}
          className="p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-blue-600 transition-colors"
          title={isMinimized ? "Show Mascot" : "Hide Mascot"}
        >
          {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative pointer-events-auto cursor-pointer group"
            onClick={() => {
              if (state === 'idle') setState('happy', 'Puk puk! Aku FIAmi siap menemani belajarmu!');
            }}
          >
            {/* XP Bar (Gamification) */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-slate-700">Lvl {level}</span>
              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${(xp % 100)}%` }}
                />
              </div>
            </div>

            <MascotBubble message={message} onClose={clearMessage} />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MascotSVG state={state} isPremium={isPremium} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
