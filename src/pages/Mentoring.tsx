import { useState, useEffect } from "react";
import { MENTORS, MAJORS } from "../data/mockData";
import { useStore } from "../store/useStore";
import { useMascotStore } from "../store/useMascotStore";
import { Link } from "react-router-dom";
import { Star, Calendar, Clock, MessageCircle, Lock, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useGamification } from "../hooks/useGamification";

export default function Mentoring() {
  const user = useStore((state) => state.user);
  const { setState } = useMascotStore();
  const { earnXP } = useGamification();
  const [selectedMajor, setSelectedMajor] = useState(MAJORS[0].id);
  const [bookedSession, setBookedSession] = useState<string | null>(null);

  const filteredMentors = MENTORS.filter((m) => m.major === selectedMajor);
  const isLocked = user?.plan === "FREE" || user?.plan === "BASIC";

  useEffect(() => {
    if (isLocked) {
      setState('locked', 'Yah, fitur mentoring masih terkunci. Upgrade dulu yuk!');
    } else {
      setState('happy', 'Pilih mentor favoritmu dan mulai sesi diskusi!');
    }
  }, [isLocked, setState]);

  const handleBooking = (mentorId: string) => {
    if (isLocked) return;
    
    setBookedSession(mentorId);
    earnXP(40, 'Booking Sesi Mentoring');
    setState('excited', 'Sesi mentoring berhasil dibooking! +40 XP');
    
    setTimeout(() => {
      setBookedSession(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Mentoring 1-on-1
        </h1>
        <p className="text-slate-500">
          Diskusi langsung dengan expert untuk bahas materi, tugas, atau karir.
        </p>
      </div>

      {isLocked && (
        <div className="bg-red-500 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Fitur Terkunci</h3>
              <p className="text-red-100">
                Upgrade ke paket Pro atau Premium untuk akses mentoring tanpa
                batas.
              </p>
            </div>
          </div>
          <Link
            to="/subscription"
            className="shrink-0 bg-yellow-400 text-red-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors shadow-sm"
          >
            Upgrade Sekarang
          </Link>
        </div>
      )}

      {/* Major Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {MAJORS.map((major) => (
          <button
            key={major.id}
            onClick={() => setSelectedMajor(major.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap border-2 ${
              selectedMajor === major.id
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-transparent bg-white text-slate-600 hover:bg-blue-50"
            }`}
          >
            {major.name}
          </button>
        ))}
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor, idx) => {
          const isBooked = bookedSession === mentor.id;
          
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={mentor.id}
              className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden ${isLocked ? "opacity-60 grayscale" : ""}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">
                    {mentor.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400 font-medium text-sm mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    {mentor.rating}
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold uppercase tracking-wider">
                    {MAJORS.find((m) => m.id === mentor.major)?.name}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> Jadwal Tersedia:
                </p>
                <div className="flex flex-wrap gap-2">
                  {mentor.availableTimes.map((time) => (
                    <span
                      key={time}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" /> {time}
                    </span>
                  ))}
                </div>
              </div>

              <button
                disabled={isLocked || isBooked}
                onClick={() => handleBooking(mentor.id)}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                  isLocked
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : isBooked
                    ? "bg-green-500 text-white cursor-default"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                }`}
              >
                {isBooked ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Berhasil Dibooking
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Booking Sesi
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
