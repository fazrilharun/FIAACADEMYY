import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Gift, Star, Ticket, BookOpen, Video, Coffee } from 'lucide-react';

const REWARDS = [
  {
    id: 'r1',
    title: 'Diskon 50% Langganan PRO',
    description: 'Potongan harga untuk paket PRO bulan pertama.',
    points: 500,
    icon: Ticket,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    stock: 10
  },
  {
    id: 'r2',
    title: 'Sesi Mentoring Gratis (1 Jam)',
    description: 'Konsultasi 1-on-1 dengan mentor pilihan.',
    points: 1000,
    icon: Video,
    color: 'bg-green-50 text-green-600 border-green-200',
    stock: 5
  },
  {
    id: 'r3',
    title: 'Akses Webinar Eksklusif',
    description: 'Tiket masuk webinar "Strategi Lulus Cumlaude".',
    points: 300,
    icon: Star,
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    stock: 50
  },
  {
    id: 'r4',
    title: 'E-Certificate FIAcademy',
    description: 'Sertifikat resmi tanda keaktifan belajar.',
    points: 200,
    icon: BookOpen,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    stock: 999
  },
  {
    id: 'r5',
    title: 'Merchandise: Mug FIAcademy',
    description: 'Mug eksklusif dikirim ke alamatmu.',
    points: 2500,
    icon: Coffee,
    color: 'bg-red-50 text-red-600 border-red-200',
    stock: 2
  },
  {
    id: 'r6',
    title: 'Study Bundle Download',
    description: 'Kumpulan template tugas & catatan lengkap.',
    points: 150,
    icon: Gift,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    stock: 999
  }
];

export const RewardStore: React.FC = () => {
  const { user, redeemPoints } = useStore();
  const [selectedReward, setSelectedReward] = useState<typeof REWARDS[0] | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRedeem = async () => {
    if (!selectedReward || !user) return;
    
    setIsRedeeming(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = redeemPoints(selectedReward.points);
    
    setIsRedeeming(false);
    
    if (success) {
      setSuccessMessage(`Berhasil menukar ${selectedReward.points} Pts untuk ${selectedReward.title}!`);
      setTimeout(() => {
        setSuccessMessage('');
        setSelectedReward(null);
      }, 3000);
      
      // Trigger mascot
      window.dispatchEvent(new CustomEvent('mascot-action', { 
        detail: { action: 'happy', message: `Yey! Hadiah ${selectedReward.title} berhasil ditukar! 🎁` } 
      }));
    } else {
      alert('Poin tidak cukup!');
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Gift className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Toko Hadiah</h2>
              <p className="text-indigo-100">Tukar poinmu dengan hadiah menarik</p>
            </div>
          </div>
          <div className="text-right bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">Poin Saya</div>
            <div className="text-3xl font-black text-yellow-300 flex items-center gap-2">
              <Star className="w-6 h-6 fill-current" />
              {user.points || 0}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-2xl font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xl">🎉</div>
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REWARDS.map((reward) => {
            const canAfford = (user.points || 0) >= reward.points;
            const Icon = reward.icon;
            
            return (
              <div 
                key={reward.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  canAfford 
                    ? 'border-slate-100 hover:border-indigo-200 hover:shadow-md bg-white cursor-pointer' 
                    : 'border-slate-100 bg-slate-50 opacity-75 cursor-not-allowed'
                }`}
                onClick={() => canAfford && setSelectedReward(reward)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${reward.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{reward.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[40px]">{reward.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 font-black text-indigo-600">
                    <Star className="w-4 h-4 fill-current" />
                    {reward.points} Pts
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Sisa: {reward.stock}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redemption Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${selectedReward.color}`}>
              <selectedReward.icon className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-black text-center text-slate-800 mb-2">
              Tukar Hadiah?
            </h3>
            <p className="text-center text-slate-500 mb-6">
              Kamu akan menukarkan <strong className="text-indigo-600">{selectedReward.points} Poin</strong> untuk mendapatkan <strong>{selectedReward.title}</strong>.
            </p>
            
            <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Poin saat ini:</span>
                <span className="font-bold text-slate-800">{user.points || 0} Pts</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Harga hadiah:</span>
                <span className="font-bold text-red-500">-{selectedReward.points} Pts</span>
              </div>
              <div className="h-px bg-slate-200 my-2"></div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Sisa poin:</span>
                <span className="font-black text-indigo-600">{(user.points || 0) - selectedReward.points} Pts</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedReward(null)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                disabled={isRedeeming}
              >
                Batal
              </button>
              <button 
                onClick={handleRedeem}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                disabled={isRedeeming}
              >
                {isRedeeming ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Tukar Sekarang</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
