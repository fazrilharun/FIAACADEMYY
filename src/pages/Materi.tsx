import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MAJORS, COURSES } from "../data/mockData";
import { useStore } from "../store/useStore";
import { useMascotStore } from "../store/useMascotStore";
import { motion } from "motion/react";
import { BookOpen, PlayCircle, Lock } from "lucide-react";

export default function Materi() {
  const [activeMajor, setActiveMajor] = useState(MAJORS[0].id);
  const progress = useStore((state) => state.progress);
  const user = useStore((state) => state.user);
  const { setState } = useMascotStore();

  const filteredCourses = COURSES.filter((c) => c.major === activeMajor);

  useEffect(() => {
    setState('thinking', 'Wah, banyak materi menarik nih! Mau belajar apa hari ini?');
  }, [activeMajor, setState]);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Materi Pembelajaran
        </h1>
        <p className="text-slate-500">
          Pilih jurusan dan mulai pelajari materi yang tersedia.
        </p>
      </div>

      {/* Major Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {MAJORS.map((major) => (
          <button
            key={major.id}
            onClick={() => setActiveMajor(major.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all whitespace-nowrap border-2 ${
              activeMajor === major.id
                ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                : "border-transparent bg-white text-slate-600 hover:bg-blue-50"
            }`}
          >
            <div
              className={`p-2 rounded-xl bg-gradient-to-br ${major.color} text-white`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            {major.name}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => {
          const courseProgress = progress[course.id]?.progressPercentage || 0;
          const isLocked = user?.plan === "FREE" && idx > 1; // Lock some courses for free users

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col relative group"
            >
              {isLocked && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200">
                    <Lock className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    Materi Terkunci
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Upgrade ke paket Pro untuk mengakses materi ini.
                  </p>
                  <Link
                    to="/subscription"
                    className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition-colors"
                  >
                    Upgrade Sekarang
                  </Link>
                </div>
              )}

              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-xl leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-sm text-white/80 mt-1 line-clamp-1">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-slate-500 mb-2 font-medium">
                    <span>{course.lessons.length} Materi</span>
                    <span
                      className={
                        courseProgress === 100
                          ? "text-yellow-600 font-bold"
                          : ""
                      }
                    >
                      {courseProgress}% Selesai
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        courseProgress === 100 ? "bg-yellow-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${courseProgress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={isLocked ? "#" : `/materi/${course.major}/${course.id}`}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-colors ${
                    isLocked
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  <PlayCircle className="w-5 h-5" />
                  {courseProgress > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
