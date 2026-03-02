import React from 'react';
import { motion } from 'motion/react';
import { Leaderboard } from '../components/gamification/Leaderboard';
import { RewardStore } from '../components/gamification/RewardStore';
import { LevelBar } from '../components/gamification/LevelBar';

export default function Gamification() {
  return (
    <div className="space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-slate-900 mb-2">Peringkat & Hadiah 🏆</h1>
        <p className="text-slate-500">Kumpulkan XP, naikkan levelmu, dan tukarkan poin dengan hadiah menarik!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <LevelBar />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-1"
        >
          <Leaderboard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          <RewardStore />
        </motion.div>
      </div>
    </div>
  );
}
