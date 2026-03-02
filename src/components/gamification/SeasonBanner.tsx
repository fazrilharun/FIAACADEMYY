import { motion } from 'motion/react';
import { CalendarDays, Sparkles } from 'lucide-react';

export function SeasonBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <div>
          <h3 className="font-bold text-sm md:text-base">Season 1 - Fresh Start! 🚀</h3>
          <p className="text-xs text-indigo-100 hidden md:block">Kumpulkan XP terbanyak dan jadilah juara di akhir season.</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
        <CalendarDays className="w-4 h-4 text-indigo-200" />
        <div className="text-xs font-bold tracking-wider">
          SISA WAKTU: <span className="text-yellow-300">89 HARI</span>
        </div>
      </div>
    </motion.div>
  );
}
