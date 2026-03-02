import { motion } from 'framer-motion';
import { MascotState } from '../../store/useMascotStore';
import { Lock, Crown, Headphones, BookOpen, TrendingUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface MascotSVGProps {
  state: MascotState;
  className?: string;
  isPremium?: boolean;
}

export function MascotSVG({ state, className = '', isPremium = false }: MascotSVGProps) {
  const location = useLocation();
  const path = location.pathname;

  // Determine contextual props based on route
  const isMateri = path.includes('/materi');
  const isMentoring = path.includes('/mentoring');
  const isTracker = path.includes('/tracker');

  // Animation variants
  const bodyVariants = {
    idle: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    happy: { y: [0, -15, 0], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } },
    excited: { y: [0, -25, 0], scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } },
    sad: { y: [0, 5, 0], scale: [1, 0.95, 1], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    thinking: { rotate: [0, 15, 15, 0], y: [0, -5, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
    celebrating: { rotate: [0, 360], scale: [1, 1.2, 1], transition: { duration: 1, ease: "easeInOut" } },
    locked: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } }
  };

  const eyeBgVariants = {
    idle: { scaleY: [1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 4, times: [0, 0.02, 0.04, 1], ease: "easeInOut" } },
    happy: { scaleY: 0.6, y: -2, transition: { duration: 0.2 } },
    excited: { scale: 1.15, transition: { duration: 0.2 } },
    sad: { scaleY: 0.8, y: 2, transition: { duration: 0.2 } },
    thinking: { scaleY: [1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 4, times: [0, 0.02, 0.04, 1], ease: "easeInOut" } },
    celebrating: { scaleY: [1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 2, times: [0, 0.05, 0.1, 1] } },
    locked: { scaleY: 0.5, transition: { duration: 0.2 } }
  };

  const pupilVariants = {
    idle: { x: 0, y: 0, transition: { duration: 0.2 } },
    happy: { x: 0, y: 0, transition: { duration: 0.2 } },
    excited: { x: 0, y: 0, transition: { duration: 0.2 } },
    sad: { x: 0, y: 2, transition: { duration: 0.2 } },
    thinking: { x: [0, 6, 6, -6, -6, 0], y: [0, -2, -2, -2, -2, 0], transition: { repeat: Infinity, duration: 3, times: [0, 0.1, 0.4, 0.5, 0.8, 1] } },
    celebrating: { x: 0, y: 0, transition: { duration: 0.2 } },
    locked: { x: 0, y: 0, transition: { duration: 0.2 } }
  };

  const wingLeftVariants = {
    idle: { rotate: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } },
    excited: { rotate: [0, -45, 0], transition: { repeat: Infinity, duration: 0.4 } },
    happy: { rotate: [0, -20, 0], transition: { repeat: Infinity, duration: 1 } },
    sad: { rotate: 10, transition: { duration: 0.5 } },
  };

  const wingRightVariants = {
    idle: { rotate: [0, 10, 0], transition: { repeat: Infinity, duration: 2 } },
    excited: { rotate: [0, 45, 0], transition: { repeat: Infinity, duration: 0.4 } },
    happy: { rotate: [0, 20, 0], transition: { repeat: Infinity, duration: 1 } },
    sad: { rotate: -10, transition: { duration: 0.5 } },
  };

  const bookVariants = {
    idle: { y: [0, -5, 0], rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 } },
    excited: { y: [0, -15, 0], rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 1, ease: "easeInOut" } },
  };

  return (
    <div className={`relative w-32 h-32 ${className}`}>
      {/* Shadow */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 rounded-[100%] blur-sm"
        animate={{
          scale: state === 'excited' ? [1, 0.6, 1] : state === 'happy' ? [1, 0.8, 1] : [1, 0.9, 1],
          opacity: state === 'excited' ? [0.5, 0.2, 0.5] : [0.5, 0.4, 0.5]
        }}
        transition={{ repeat: Infinity, duration: state === 'excited' ? 0.8 : 2, ease: "easeInOut" }}
      />

      {/* Main Body */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        variants={bodyVariants}
        animate={state}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="owlBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" /> {/* Indigo 500 */}
              <stop offset="100%" stopColor="#4f46e5" /> {/* Indigo 600 */}
            </linearGradient>
            <linearGradient id="owlBelly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0e7ff" /> {/* Indigo 100 */}
              <stop offset="100%" stopColor="#c7d2fe" /> {/* Indigo 200 */}
            </linearGradient>
          </defs>

          {/* Body */}
          <path
            d="M 100 40 C 40 40 40 100 40 140 C 40 180 70 190 100 190 C 130 190 160 180 160 140 C 160 100 160 40 100 40 Z"
            fill="url(#owlBody)"
          />

          {/* Belly */}
          <path
            d="M 100 100 C 70 100 60 130 60 150 C 60 170 80 180 100 180 C 120 180 140 170 140 150 C 140 130 130 100 100 100 Z"
            fill="url(#owlBelly)"
          />

          {/* Left Wing */}
          <motion.path
            d="M 50 100 Q 20 120 30 160 Q 50 150 60 130 Z"
            fill="#4338ca"
            variants={wingLeftVariants}
            animate={state}
            style={{ transformOrigin: "60px 100px" }}
          />

          {/* Right Wing */}
          <motion.path
            d="M 150 100 Q 180 120 170 160 Q 150 150 140 130 Z"
            fill="#4338ca"
            variants={wingRightVariants}
            animate={state}
            style={{ transformOrigin: "140px 100px" }}
          />

          {/* Feet */}
          <path d="M 70 185 Q 75 195 85 195 Q 80 185 75 185 Z" fill="#fbbf24" />
          <path d="M 130 185 Q 125 195 115 195 Q 120 185 125 185 Z" fill="#fbbf24" />

          {/* Eyes Group (Background + Pupils) */}
          <motion.g variants={eyeBgVariants} animate={state} style={{ transformOrigin: "100px 85px" }}>
            {/* Eyes Background */}
            <circle cx="75" cy="85" r="22" fill="white" />
            <circle cx="125" cy="85" r="22" fill="white" />

            {/* Pupils */}
            <motion.g variants={pupilVariants} animate={state}>
              <circle cx="75" cy="85" r="12" fill="#1e1b4b" />
              <circle cx="125" cy="85" r="12" fill="#1e1b4b" />
              {/* Eye Highlights */}
              <circle cx="70" cy="80" r="4" fill="white" />
              <circle cx="120" cy="80" r="4" fill="white" />
              <circle cx="80" cy="88" r="2" fill="white" />
              <circle cx="130" cy="88" r="2" fill="white" />
            </motion.g>
          </motion.g>

          {/* Beak */}
          <path d="M 95 100 L 105 100 L 100 115 Z" fill="#fbbf24" />

          {/* Graduation Cap */}
          <g transform="translate(0, -10)">
            <path d="M 100 15 L 140 30 L 100 45 L 60 30 Z" fill="#1e1b4b" />
            <path d="M 75 35 L 75 55 C 75 60 125 60 125 55 L 125 35 Z" fill="#312e81" />
            {/* Tassel */}
            <path d="M 100 30 L 135 45 L 135 65" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="100" cy="30" r="4" fill="#fbbf24" />
          </g>
        </svg>

        {/* Contextual Accessories */}
        {isPremium && (
          <motion.div 
            className="absolute -top-6 text-yellow-400 drop-shadow-md"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Crown size={32} fill="currentColor" />
          </motion.div>
        )}

        {isMentoring && (
          <div className="absolute top-10 text-slate-800">
            <Headphones size={48} strokeWidth={1.5} />
          </div>
        )}

        {state === 'locked' && (
          <motion.div 
            className="absolute bottom-4 text-red-500 bg-white rounded-full p-1 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Lock size={24} />
          </motion.div>
        )}

        {isTracker && state !== 'locked' && (
          <motion.div 
            className="absolute -right-2 bottom-4 text-emerald-500 bg-white rounded-full p-1 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <TrendingUp size={24} />
          </motion.div>
        )}
      </motion.div>

      {/* Floating Companion (Book) */}
      {isMateri && state !== 'locked' && (
        <motion.div
          className="absolute -right-6 top-10 text-blue-500 bg-white rounded-lg p-1.5 shadow-lg border border-blue-100"
          variants={bookVariants}
          animate={state === 'idle' ? 'idle' : 'excited'}
        >
          <BookOpen size={20} />
        </motion.div>
      )}

      {/* Confetti for celebrating state */}
      {state === 'celebrating' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${['bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500'][i % 4]}`}
              initial={{ x: 64, y: 64, scale: 0 }}
              animate={{ 
                x: 64 + (Math.random() - 0.5) * 150, 
                y: 64 + (Math.random() - 0.5) * 150,
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
