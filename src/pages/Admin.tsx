import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useMascotStore } from '../store/useMascotStore';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Admin() {
  const user = useStore((state) => state.user);
  const resetSystem = useStore((state) => state.resetSystem);
  const { setState } = useMascotStore();
  const [isResetting, setIsResetting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const handleReset = () => {
    if (!window.confirm("ARE YOU SURE? This will reset ALL user progress, XP, and levels to start a new season.")) {
      return;
    }

    setIsResetting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      resetSystem();
      setIsResetting(false);
      setIsDone(true);
      setState('excited', 'Wah! Kita mulai dari awal lagi ya! Siapa yang bakal jadi juara Season ini?');
      
      setTimeout(() => {
        setIsDone(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-500">
          Manage system settings and seasons.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">System Reset (New Season)</h2>
            <p className="text-slate-600">
              Triggering this will reset all users' XP, Levels, Points, Streaks, Achievements, and Leaderboard rankings. 
              Use this to start a new Gamification Season.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={isResetting || isDone}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isDone 
              ? 'bg-green-500 text-white'
              : isResetting
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200'
          }`}
        >
          {isDone ? (
            <>
              <CheckCircle2 className="w-5 h-5" /> System Reset Complete
            </>
          ) : isResetting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" /> Resetting System...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" /> Start New Season (Reset All Data)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
