import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Trophy, Medal, Crown, Star, Flame } from 'lucide-react';

// Mock Data for Leaderboard
const MOCK_LEADERBOARD = {
  daily: [
    { id: '1', name: 'Budi Santoso', level: 12, xp: 450, major: 'Ilmu Administrasi Niaga', avatar: '👨‍🎓' },
    { id: '2', name: 'Siti Aminah', level: 11, xp: 420, major: 'Ilmu Administrasi Fiskal', avatar: '👩‍🎓' },
    { id: '3', name: 'Andi Wijaya', level: 10, xp: 380, major: 'Ilmu Administrasi Negara', avatar: '👨‍💻' },
    { id: '4', name: 'Rina Melati', level: 9, xp: 350, major: 'Ilmu Administrasi Niaga', avatar: '👩‍💻' },
    { id: '5', name: 'Deni Pratama', level: 8, xp: 310, major: 'Ilmu Administrasi Fiskal', avatar: '👨‍🏫' },
  ],
  weekly: [
    { id: '2', name: 'Siti Aminah', level: 11, xp: 2450, major: 'Ilmu Administrasi Fiskal', avatar: '👩‍🎓' },
    { id: '1', name: 'Budi Santoso', level: 12, xp: 2320, major: 'Ilmu Administrasi Niaga', avatar: '👨‍🎓' },
    { id: '3', name: 'Andi Wijaya', level: 10, xp: 2180, major: 'Ilmu Administrasi Negara', avatar: '👨‍💻' },
    { id: '5', name: 'Deni Pratama', level: 8, xp: 1950, major: 'Ilmu Administrasi Fiskal', avatar: '👨‍🏫' },
    { id: '4', name: 'Rina Melati', level: 9, xp: 1840, major: 'Ilmu Administrasi Niaga', avatar: '👩‍💻' },
  ],
  yearly: [
    { id: '3', name: 'Andi Wijaya', level: 10, xp: 15450, major: 'Ilmu Administrasi Negara', avatar: '👨‍💻' },
    { id: '1', name: 'Budi Santoso', level: 12, xp: 14820, major: 'Ilmu Administrasi Niaga', avatar: '👨‍🎓' },
    { id: '2', name: 'Siti Aminah', level: 11, xp: 14280, major: 'Ilmu Administrasi Fiskal', avatar: '👩‍🎓' },
    { id: '4', name: 'Rina Melati', level: 9, xp: 12950, major: 'Ilmu Administrasi Niaga', avatar: '👩‍💻' },
    { id: '5', name: 'Deni Pratama', level: 8, xp: 11840, major: 'Ilmu Administrasi Fiskal', avatar: '👨‍🏫' },
  ]
};

type Period = 'daily' | 'weekly' | 'yearly';

export const Leaderboard: React.FC = () => {
  const [period, setPeriod] = useState<Period>('weekly');
  const currentUser = useStore(state => state.user);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-6 h-6 text-yellow-500 drop-shadow-sm" />;
      case 1: return <Medal className="w-6 h-6 text-slate-400 drop-shadow-sm" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600 drop-shadow-sm" />;
      default: return <span className="text-slate-500 font-bold w-6 text-center">{index + 1}</span>;
    }
  };

  const getRankStyle = (index: number, isCurrentUser: boolean) => {
    let baseStyle = "flex items-center gap-4 p-4 rounded-2xl transition-all ";
    
    if (isCurrentUser) {
      baseStyle += "bg-blue-50 border-2 border-blue-200 shadow-sm transform scale-[1.02] ";
    } else {
      baseStyle += "bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm ";
    }

    switch (index) {
      case 0: return baseStyle + "bg-gradient-to-r from-yellow-50 to-white border-yellow-200";
      case 1: return baseStyle + "bg-gradient-to-r from-slate-50 to-white border-slate-200";
      case 2: return baseStyle + "bg-gradient-to-r from-amber-50 to-white border-amber-200";
      default: return baseStyle;
    }
  };

  // Insert current user into mock data if they exist
  const displayData = [...MOCK_LEADERBOARD[period]];
  if (currentUser) {
    const userEntry = {
      id: currentUser.id,
      name: currentUser.name,
      level: currentUser.level || 1,
      xp: currentUser.xp || 0,
      major: currentUser.major || 'Belum diatur',
      avatar: '👤'
    };
    
    // Simple mock logic to place user in leaderboard based on XP
    // In a real app, this would come from the backend
    const userIndex = displayData.findIndex(u => u.xp < userEntry.xp);
    if (userIndex !== -1) {
      displayData.splice(userIndex, 0, userEntry);
    } else {
      displayData.push(userEntry);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Trophy className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-black">Leaderboard</h2>
              <p className="text-blue-100 text-sm">Peringkat Mahasiswa FIA</p>
            </div>
          </div>
        </div>

        <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm">
          {(['daily', 'weekly', 'yearly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold capitalize transition-all ${
                period === p 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              {p === 'daily' ? 'Hari Ini' : p === 'weekly' ? 'Minggu Ini' : 'Tahun Ini'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {displayData.slice(0, 10).map((user, index) => {
          const isCurrentUser = currentUser?.id === user.id;
          
          return (
            <div key={`${user.id}-${index}`} className={getRankStyle(index, isCurrentUser)}>
              <div className="flex items-center justify-center w-8">
                {getRankIcon(index)}
              </div>
              
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                {user.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold truncate ${isCurrentUser ? 'text-blue-700' : 'text-slate-800'}`}>
                    {user.name}
                    {isCurrentUser && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Kamu</span>}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 truncate">{user.major}</p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-yellow-500 font-black">
                  <Star className="w-4 h-4 fill-current" />
                  {user.xp.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  Level {user.level}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
