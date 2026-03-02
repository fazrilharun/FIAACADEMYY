import { useStore } from "../store/useStore";
import { Link } from "react-router-dom";
import { PlayCircle, Trophy, Flame, Star, ArrowRight } from "lucide-react";
import { COURSES, MAJORS } from "../data/mockData";
import { motion } from "motion/react";
import { LevelBar } from "../components/gamification/LevelBar";
import { SeasonBanner } from "../components/gamification/SeasonBanner";

export default function Home() {
  const user = useStore((state) => state.user);
  const progress = useStore((state) => state.progress);

  const featuredCourses = COURSES.slice(0, 3);

  return (
    <div className="space-y-8 pb-12">
      <SeasonBanner />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Halo, {user?.name}! 👋</h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            "Pendidikan adalah senjata paling mematikan di dunia, karena dengan
            pendidikan, Anda dapat mengubah dunia." - Nelson Mandela
          </p>
          <Link
            to="/materi"
            className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors shadow-sm"
          >
            Mulai Belajar Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      {/* Gamification Level Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <LevelBar />
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
        >
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Study Streak</p>
            <p className="text-2xl font-bold text-slate-900">
              {user?.streak || 0} Hari
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
        >
          <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total XP</p>
            <p className="text-2xl font-bold text-slate-900">
              {user?.xp || 0} XP
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4"
        >
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <Star className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Kelas Selesai</p>
            <p className="text-2xl font-bold text-slate-900">
              {
                Object.values(progress).filter(
                  (p) => p.progressPercentage === 100,
                ).length
              }{" "}
              Kelas
            </p>
          </div>
        </motion.div>
      </div>

      {/* Featured Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Lanjutkan Belajar
          </h2>
          <Link
            to="/materi"
            className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
          >
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course, idx) => {
            const courseProgress = progress[course.id]?.progressPercentage || 0;
            const major = MAJORS.find((m) => m.id === course.major);

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                key={course.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-1 rounded-md mb-2 inline-block">
                      {major?.name}
                    </span>
                    <h3 className="font-bold text-lg leading-tight">
                      {course.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                      <span>Progress</span>
                      <span>{courseProgress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${courseProgress}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    to={`/materi/${course.major}/${course.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition-colors"
                  >
                    <PlayCircle className="w-5 h-5" />
                    {courseProgress > 0 ? "Lanjutkan" : "Mulai Belajar"}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subscription CTA */}
      {user?.plan === "FREE" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-500 rounded-3xl p-8 text-white shadow-lg shadow-red-200/50 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">Upgrade ke Pro! 🚀</h3>
            <p className="text-red-50 max-w-xl">
              Dapatkan akses penuh ke semua materi, mentoring eksklusif, dan
              download modul PDF. Tingkatkan nilai IPK kamu sekarang juga.
            </p>
          </div>
          <Link
            to="/subscription"
            className="shrink-0 bg-yellow-400 text-red-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors shadow-sm"
          >
            Lihat Paket
          </Link>
        </motion.div>
      )}
    </div>
  );
}
