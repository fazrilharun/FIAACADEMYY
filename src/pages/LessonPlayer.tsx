import { useParams, Link, useNavigate } from "react-router-dom";
import { COURSES } from "../data/mockData";
import { useStore } from "../store/useStore";
import {
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useMascotStore } from "../store/useMascotStore";
import { useGamification } from "../hooks/useGamification";

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.id === courseId);
  const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = course?.lessons[lessonIndex];

  const markComplete = useStore((state) => state.markLessonComplete);
  const progress = useStore((state) => state.progress[courseId || ""]);
  const completedLessons = progress?.completedLessons || [];
  const { setState } = useMascotStore();
  const { earnXP, checkAchievements } = useGamification();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [lessonId]);

  if (!course || !lesson) return <div>Lesson not found</div>;

  const handleComplete = () => {
    if (!completedLessons.includes(lesson.id)) {
      markComplete(course.id, lesson.id, course.lessons.length);
      
      // Gamification
      if (lesson.type === 'quiz') {
        earnXP(50, 'Menyelesaikan Kuis');
        setState('celebrating', 'Jawaban kamu tepat! +50 XP');
      } else {
        earnXP(20, 'Menyelesaikan Materi');
        setState('excited', 'Keren banget! Kamu makin jago nih! +20 XP');
      }
      
      checkAchievements();
    }

    // Auto-play next if available
    if (lessonIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[lessonIndex + 1];
      if (!nextLesson.isLocked) {
        navigate(`/materi/${course.major}/${course.id}/${nextLesson.id}`);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <Link
        to={`/materi/${course.major}/${course.id}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Kembali ke Daftar Materi
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-3xl overflow-hidden aspect-video relative flex items-center justify-center shadow-lg">
            {lesson.type === "video" ? (
              isPlaying ? (
                <div className="w-full h-full">
                  <ReactPlayer
                    src={lesson.videoUrl}
                    width="100%"
                    height="100%"
                    playing={true}
                    controls={true}
                    onEnded={handleComplete}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white">
                  <PlayCircle
                    className="w-20 h-20 text-yellow-400 mb-4 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => setIsPlaying(true)}
                  />
                  <p className="text-lg font-medium">
                    Klik untuk memutar video
                  </p>
                </div>
              )
            ) : lesson.type === "quiz" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50 text-blue-900 p-8 text-center">
                <HelpCircle className="w-20 h-20 text-blue-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  Kuis: {lesson.title}
                </h3>
                <p className="mb-8 max-w-md">
                  Uji pemahamanmu tentang materi sebelumnya dengan kuis singkat
                  ini.
                </p>
                <button
                  onClick={handleComplete}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Mulai Kuis
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-900">
                <FileText className="w-20 h-20 text-slate-400 mb-4" />
                <p className="text-lg font-medium">Materi Bacaan (PDF)</p>
                <button
                  onClick={handleComplete}
                  className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors"
                >
                  Tandai Selesai
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {lesson.title}
            </h1>
            <p className="text-slate-500 mb-6">Durasi: {lesson.duration}</p>

            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <button
                onClick={handleComplete}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${
                  completedLessons.includes(lesson.id)
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                {completedLessons.includes(lesson.id)
                  ? "Selesai"
                  : "Tandai Selesai"}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Playlist */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg text-slate-900 mb-4">
            Daftar Materi
          </h3>
          <div className="space-y-3">
            {course.lessons.map((l, idx) => {
              const isCurrent = l.id === lesson.id;
              const isCompleted = completedLessons.includes(l.id);

              return (
                <Link
                  key={l.id}
                  to={`/materi/${course.major}/${course.id}/${l.id}`}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                    isCurrent
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div
                    className={`mt-1 shrink-0 ${isCompleted ? "text-yellow-500" : isCurrent ? "text-blue-600" : "text-slate-400"}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <PlayCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium line-clamp-2 ${isCurrent ? "text-blue-900" : "text-slate-700"}`}
                    >
                      {idx + 1}. {l.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{l.duration}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
