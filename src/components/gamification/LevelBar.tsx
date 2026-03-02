import React from 'react';
import { useStore } from '../../store/useStore';

export const LevelBar: React.FC = () => {
  const user = useStore(state => state.user);

  if (!user) return null;

  const xp = user.xp || 0;
  const level = user.level || 1;
  const xpForCurrentLevel = (level - 1) * 500;
  const xpForNextLevel = level * 500;
  const progress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 tour-levelbar">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Level {level}</span>
          <h3 className="text-lg font-black text-slate-800 leading-none mt-1">
            {xp} <span className="text-sm font-medium text-slate-500">/ {xpForNextLevel} XP</span>
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {user.points || 0} Pts
          </span>
        </div>
      </div>
      
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mt-1 relative">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 text-right mt-0.5">
        {xpForNextLevel - xp} XP lagi ke Level {level + 1}
      </p>
    </div>
  );
};
