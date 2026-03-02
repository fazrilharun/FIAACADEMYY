import { useParams, Link } from "react-router-dom";
import { COURSES } from "../data/mockData";
import { useStore } from "../store/useStore";
import {
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = COURSES.find((c) => c.id === courseId);
  const progress = useStore((state) => state.progress[courseId || ""]);
  const user = useStore((state) => state.user);

  if (!course) return <div>Course not found</div>;

  const completedLessons = progress?.completedLessons || [];
  const courseProgress = progress?.progressPercentage || 0;

  return (
    <div className="space-y-8 pb-12">
      <Link
        to="/materi"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Kembali ke Materi
      </Link>

      {/* Course Header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row">
        <div className="md:w-1/3 h-64 md:h-auto relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-8 md:w-2/3 flex flex-col justify-center">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wide mb-4 w-max">
            {course.major.toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {course.title}
          </h1>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            {course.description}
          </p>

          <div>
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-slate-500">Progress Belajar</span>
              <span className="text-blue-600 font-bold">{courseProgress}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Daftar Materi
        </h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = lesson.isLocked && user?.plan === "FREE";

            let Icon = PlayCircle;
            if (lesson.type === "pdf") Icon = FileText;
            if (lesson.type === "quiz") Icon = HelpCircle;

            return (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={lesson.id}
              >
                <Link
                  to={
                    isLocked
                      ? "/subscription"
                      : `/materi/${course.major}/${course.id}/${lesson.id}`
                  }
                  className={`flex items-center p-4 rounded-2xl border transition-all ${
                    isLocked
                      ? "bg-slate-50 border-slate-200 opacity-75"
                      : isCompleted
                        ? "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                        : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4 ${
                      isLocked
                        ? "bg-slate-200 text-slate-500"
                        : isCompleted
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`font-bold text-lg ${isLocked ? "text-slate-500" : "text-slate-900"}`}
                    >
                      {idx + 1}. {lesson.title}
                    </h3>
                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                      <span className="capitalize">{lesson.type}</span> •{" "}
                      {lesson.duration}
                    </p>
                  </div>

                  {isCompleted && (
                    <CheckCircle2 className="w-8 h-8 text-yellow-500 shrink-0" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
