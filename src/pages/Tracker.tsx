import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { useMascotStore } from "../store/useMascotStore";
import { COURSES, MAJORS } from "../data/mockData";
import { Trophy, Flame, Target, Award, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Tracker() {
  const user = useStore((state) => state.user);
  const progress = useStore((state) => state.progress);
  const { setState } = useMascotStore();

  // Calculate overall progress
  const totalCourses = COURSES.length;
  const completedCourses = Object.values(progress).filter(
    (p) => p.progressPercentage === 100,
  ).length;
  const overallPercentage =
    Math.round((completedCourses / totalCourses) * 100) || 0;

  // Calculate progress per major
  const majorProgress = MAJORS.map((major) => {
    const majorCourses = COURSES.filter((c) => c.major === major.id);
    const completedInMajor = majorCourses.filter(
      (c) => progress[c.id]?.progressPercentage === 100,
    ).length;
    return {
      ...major,
      percentage:
        Math.round((completedInMajor / majorCourses.length) * 100) || 0,
      completed: completedInMajor,
      total: majorCourses.length,
    };
  });

  const badges = [
    {
      id: 1,
      name: "First Blood",
      desc: "Selesaikan 1 materi pertama",
      icon: Target,
      color: "text-blue-600",
      bg: "bg-blue-100",
      unlocked: Object.keys(progress).length > 0,
    },
    {
      id: 2,
      name: "On Fire",
      desc: "Streak 3 hari berturut-turut",
      icon: Flame,
      color: "text-red-600",
      bg: "bg-red-100",
      unlocked: (user?.streak || 0) >= 3,
    },
    {
      id: 3,
      name: "Master Niaga",
      desc: "Selesaikan semua materi Niaga",
      icon: Award,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      unlocked: majorProgress[0].percentage === 100,
    },
    {
      id: 4,
      name: "Speed Runner",
      desc: "Selesaikan 5 materi dalam 1 hari",
      icon: Zap,
      color: "text-slate-600",
      bg: "bg-slate-100",
      unlocked: false,
    },
  ];

  useEffect(() => {
    if (overallPercentage === 100) {
      setState('celebrating', 'Luar biasa! Kamu sudah menyelesaikan semua materi!');
    } else if (overallPercentage > 50) {
      setState('happy', 'Hebat! Kamu sudah menyelesaikan lebih dari setengah materi!');
    } else {
      setState('excited', 'Yuk semangat! Masih banyak materi seru yang menunggu!');
    }
  }, [overallPercentage, setState]);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Progress Tracker
        </h1>
        <p className="text-slate-500">
          Pantau perkembangan belajarmu dan kumpulkan pencapaian.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-8">
          <div className="relative w-32 h-32 shrink-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallPercentage / 100)}`}
                className="text-blue-600 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-slate-900">
                {overallPercentage}%
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Progress Keseluruhan
            </h3>
            <p className="text-slate-500 mb-4">
              Kamu telah menyelesaikan {completedCourses} dari {totalCourses}{" "}
              kelas yang tersedia.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm">
              <Trophy className="w-4 h-4" /> Teruskan perjuanganmu!
            </div>
          </div>
        </div>

        <div className="bg-red-500 p-8 rounded-3xl shadow-lg shadow-red-200/50 text-white flex flex-col justify-center relative overflow-hidden">
          <Flame className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10" />
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Study Streak</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-6xl font-black">{user?.streak || 0}</span>
              <span className="text-xl font-medium text-red-100">Hari</span>
            </div>
            <p className="text-red-50">
              Pertahankan streak belajarmu untuk mendapatkan bonus poin dan
              badge eksklusif!
            </p>
          </div>
        </div>
      </div>

      {/* Progress Per Major */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Progress per Jurusan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {majorProgress.map((major, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={major.id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${major.color} text-white flex items-center justify-center mb-4 shadow-sm`}
              >
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">
                {major.name}
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                {major.completed} dari {major.total} kelas selesai
              </p>

              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-700">{major.percentage}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${major.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${major.percentage}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges / Achievements */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Pencapaian (Badges)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              key={badge.id}
              className={`bg-white p-6 rounded-3xl border text-center transition-all ${
                badge.unlocked
                  ? "border-slate-200 shadow-sm"
                  : "border-dashed border-slate-200 opacity-60 grayscale"
              }`}
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${badge.bg} ${badge.color}`}
              >
                <badge.icon className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{badge.name}</h4>
              <p className="text-xs text-slate-500">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Temporary import fix for Tracker
import { BookOpen } from "lucide-react";
