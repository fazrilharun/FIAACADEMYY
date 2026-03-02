import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { useMascotStore } from "../store/useMascotStore";
import { CheckCircle2, Crown, Zap, Star } from "lucide-react";
import { motion } from "motion/react";

const PLANS = [
  {
    id: "BASIC",
    name: "Basic Plan",
    price: "Rp49.000",
    period: "/bulan",
    description: "Akses terbatas untuk mulai belajar mandiri.",
    features: [
      "Akses 2 materi per jurusan",
      "Video pembelajaran dasar",
      "Kuis interaktif",
    ],
    icon: Star,
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    id: "PRO",
    name: "Pro Plan",
    price: "Rp149.000",
    period: "/bulan",
    description: "Akses penuh ke semua materi dan mentoring.",
    features: [
      "Akses SEMUA materi",
      "Mentoring 1-on-1 (2x/bulan)",
      "Download modul PDF",
      "Sertifikat penyelesaian",
    ],
    icon: Zap,
    color: "from-yellow-400 to-yellow-500",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    popular: true,
  },
  {
    id: "PREMIUM",
    name: "Premium Plan",
    price: "Rp249.000",
    period: "/bulan",
    description: "Pengalaman belajar terbaik dengan prioritas.",
    features: [
      "Semua fitur Pro",
      "Mentoring prioritas (Unlimited)",
      "Webinar eksklusif bulanan",
      "Review CV & Karir",
    ],
    icon: Crown,
    color: "from-red-500 to-red-600",
    bg: "bg-red-50",
    text: "text-red-600",
  },
];

export default function Subscription() {
  const user = useStore((state) => state.user);
  const updatePlan = useStore((state) => state.updatePlan);
  const { setState } = useMascotStore();
  const [isYearly, setIsYearly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.plan === 'BASIC') {
      setState('locked', 'Upgrade dulu yuk biar bisa akses semua materi dan fitur premium!');
    } else {
      setState('happy', 'Kamu sudah berlangganan paket premium! Selamat belajar!');
    }
  }, [user?.plan, setState]);

  const handleSubscribe = (planId: string) => {
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      updatePlan(planId as any);
      setIsProcessing(false);
      setState('celebrating', `Hore! Kamu berhasil berlangganan paket ${planId}! 🎉`);
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Pilih Paket Belajarmu
        </h1>
        <p className="text-lg text-slate-500 mb-8">
          Investasi terbaik untuk masa depan karirmu di bidang administrasi.
        </p>

        {/* Toggle Billing */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-full">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
              !isYearly
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Bulanan
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
              isYearly
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Tahunan{" "}
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
              Hemat 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PLANS.map((plan, idx) => {
          const isCurrentPlan = user?.plan === plan.id;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all flex flex-col ${
                plan.popular
                  ? "border-yellow-400 shadow-xl shadow-yellow-100"
                  : "border-slate-100 shadow-sm hover:border-slate-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-red-900 px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
                  PALING POPULER
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.bg} ${plan.text}`}
              >
                <plan.icon className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-500 text-sm mb-6 h-10">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-500 font-medium">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-700 font-medium"
                  >
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.text}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isCurrentPlan || isProcessing}
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center ${
                  isCurrentPlan
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : plan.popular
                      ? "bg-yellow-400 text-red-900 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isProcessing
                  ? "Memproses..."
                  : isCurrentPlan
                    ? "Paket Saat Ini"
                    : "Pilih Paket"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
