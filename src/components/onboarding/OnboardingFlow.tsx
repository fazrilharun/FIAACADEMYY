import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { useMascotStore } from '../../store/useMascotStore';
import { BookOpen, Users, Target, FolderOpen, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

const MAJORS = [
  { id: 'niaga', name: 'Ilmu Administrasi Niaga', icon: '🏢' },
  { id: 'fiskal', name: 'Ilmu Administrasi Fiskal', icon: '💰' },
  { id: 'negara', name: 'Ilmu Administrasi Negara', icon: '🏛️' },
];

const FEATURES = [
  { icon: BookOpen, title: 'Materi', desc: 'Video & PDF lengkap sesuai kurikulum' },
  { icon: Users, title: 'Mentoring', desc: 'Diskusi 1-on-1 dengan expert' },
  { icon: Target, title: 'Tracker', desc: 'Pantau progress belajarmu' },
  { icon: FolderOpen, title: 'Bank Materi', desc: 'Kumpulan soal & catatan gratis' },
  { icon: Trophy, title: 'Gamifikasi', desc: 'Belajar seru dapat hadiah' },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [selectedMajor, setSelectedMajor] = useState('');
  const completeOnboarding = useStore((state) => state.completeOnboarding);
  const { setState } = useMascotStore();

  const handleNext = () => {
    if (step === 1) {
      setState('excited', 'Pilih jurusanmu biar aku bisa kasih materi yang pas!');
    } else if (step === 2) {
      if (!selectedMajor) return;
      setState('happy', 'Wah, jurusan yang keren! Di FIAcademy banyak fitur seru lho!');
    } else if (step === 3) {
      setState('excited', 'Kumpulin XP yang banyak ya biar levelmu naik!');
    } else if (step === 4) {
      setState('celebrating', 'Siap jadi juara di Leaderboard? Gas terus!');
    } else if (step === 5) {
      setState('celebrating', 'Ini +50 XP buat modal awalmu! Selamat belajar!');
    } else if (step === 6) {
      completeOnboarding(selectedMajor);
      return;
    }
    setStep(s => s + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
      >
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-6xl mb-6">
                  🦉
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Halo! Aku FIAmi</h2>
                <p className="text-lg text-slate-600 max-w-md">
                  Aku bakal bantu kamu belajar di FIAcademy! Yuk kita atur profilmu dulu biar belajarnya makin asik.
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Pilih Jurusanmu</h2>
                <p className="text-slate-500 mb-8">Pilih jurusan agar materi disesuaikan dengan kurikulummu.</p>
                
                <div className="space-y-3">
                  {MAJORS.map(major => (
                    <button
                      key={major.id}
                      onClick={() => setSelectedMajor(major.name)}
                      className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                        selectedMajor === major.name 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-3xl">{major.icon}</span>
                      <span className="text-lg font-bold text-slate-700">{major.name}</span>
                      {selectedMajor === major.name && (
                        <CheckCircle className="w-6 h-6 text-blue-600 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Fitur Utama FIAcademy</h2>
                <p className="text-slate-500 mb-8">Semua yang kamu butuhkan untuk sukses di FIA UI.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FEATURES.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600">
                        <feat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{feat.title}</h4>
                        <p className="text-sm text-slate-500">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mb-6 rotate-12">
                  <Trophy className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Sistem XP & Level</h2>
                <p className="text-lg text-slate-600 max-w-md">
                  Setiap kali kamu belajar, kamu akan dapat XP. Kumpulkan XP untuk naik level dan tukarkan dengan hadiah menarik!
                </p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 -rotate-12">
                  <Target className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Leaderboard Season 1</h2>
                <p className="text-lg text-slate-600 max-w-md">
                  Bersaing dengan mahasiswa FIA lainnya! Kumpulkan XP terbanyak dan jadilah juara di akhir Season.
                </p>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div 
                key="step6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-3xl shadow-xl mb-8"
                >
                  <h3 className="text-xl font-bold mb-2">Welcome Bonus!</h3>
                  <div className="text-6xl font-black">+50 XP</div>
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Kamu Sudah Siap!</h2>
                <p className="text-lg text-slate-600 max-w-md">
                  Ini modal awalmu untuk mulai belajar. Mari kita mulai petualangan belajarmu di FIAcademy!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={step === 2 && !selectedMajor}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 6 ? 'Mulai Belajar' : 'Lanjut'} 
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
