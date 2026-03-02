import { Course, Major, Mentor } from "../types";

export const MAJORS: Major[] = [
  {
    id: "niaga",
    name: "Ilmu Administrasi Niaga",
    description: "Pelajari seluk-beluk bisnis, keuangan, dan pemasaran.",
    color: "from-blue-500 to-blue-600",
    icon: "Briefcase",
  },
  {
    id: "fiskal",
    name: "Ilmu Administrasi Fiskal",
    description: "Kuasai perpajakan, kebijakan fiskal, dan akuntansi pajak.",
    color: "from-yellow-400 to-yellow-500",
    icon: "Landmark",
  },
  {
    id: "negara",
    name: "Ilmu Administrasi Negara",
    description: "Pahami kebijakan publik, manajemen publik, dan organisasi.",
    color: "from-red-500 to-red-600",
    icon: "Building2",
  },
];

const generateLessons = (courseId: string, count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${courseId}-lesson-${i + 1}`,
    title: `Materi Pembelajaran ${i + 1}`,
    duration: `${Math.floor(Math.random() * 10) + 5}:00`,
    videoUrl: "https://www.youtube.com/watch?v=xZ_vE_hGjXo", // Educational YouTube video
    isLocked: i > 1, // Lock after 2nd lesson for free users
    type: (i % 4 === 3 ? "quiz" : "video") as "video" | "pdf" | "quiz",
  }));
};

export const COURSES: Course[] = [
  // NIAGA
  {
    id: "n1",
    title: "Pengantar Bisnis",
    description:
      "Konsep dasar bisnis, bentuk kepemilikan, dan lingkungan bisnis.",
    major: "niaga",
    image: "https://picsum.photos/seed/bisnis/400/250",
    lessons: generateLessons("n1", 6),
  },
  {
    id: "n2",
    title: "Manajemen Keuangan",
    description:
      "Analisis laporan keuangan, nilai waktu uang, dan penganggaran modal.",
    major: "niaga",
    image: "https://picsum.photos/seed/keuangan/400/250",
    lessons: generateLessons("n2", 8),
  },
  {
    id: "n3",
    title: "Manajemen Pemasaran",
    description: "Strategi pemasaran, bauran pemasaran, dan perilaku konsumen.",
    major: "niaga",
    image: "https://picsum.photos/seed/pemasaran/400/250",
    lessons: generateLessons("n3", 7),
  },
  {
    id: "n4",
    title: "Akuntansi Dasar",
    description: "Siklus akuntansi, persamaan dasar, dan penyusunan laporan.",
    major: "niaga",
    image: "https://picsum.photos/seed/akuntansi/400/250",
    lessons: generateLessons("n4", 5),
  },
  {
    id: "n5",
    title: "Ekonomi Mikro",
    description: "Teori permintaan penawaran, elastisitas, dan struktur pasar.",
    major: "niaga",
    image: "https://picsum.photos/seed/mikro/400/250",
    lessons: generateLessons("n5", 6),
  },

  // FISKAL
  {
    id: "f1",
    title: "Hukum Pajak",
    description:
      "Dasar-dasar hukum pajak dan peraturan perpajakan di Indonesia.",
    major: "fiskal",
    image: "https://picsum.photos/seed/hukumpajak/400/250",
    lessons: generateLessons("f1", 6),
  },
  {
    id: "f2",
    title: "Perpajakan Internasional",
    description:
      "Konsep pajak internasional, tax treaty, dan transfer pricing.",
    major: "fiskal",
    image: "https://picsum.photos/seed/pajakint/400/250",
    lessons: generateLessons("f2", 7),
  },
  {
    id: "f3",
    title: "Akuntansi Pajak",
    description:
      "Rekonsiliasi fiskal dan pencatatan akuntansi untuk perpajakan.",
    major: "fiskal",
    image: "https://picsum.photos/seed/akuntansipajak/400/250",
    lessons: generateLessons("f3", 8),
  },
  {
    id: "f4",
    title: "Pajak Penghasilan",
    description: "Perhitungan PPh Orang Pribadi dan Badan.",
    major: "fiskal",
    image: "https://picsum.photos/seed/pph/400/250",
    lessons: generateLessons("f4", 6),
  },
  {
    id: "f5",
    title: "Pajak Pertambahan Nilai",
    description: "Mekanisme PPN, Faktur Pajak, dan pelaporan SPT Masa PPN.",
    major: "fiskal",
    image: "https://picsum.photos/seed/ppn/400/250",
    lessons: generateLessons("f5", 5),
  },

  // NEGARA
  {
    id: "ne1",
    title: "Administrasi Publik",
    description: "Konsep dasar dan paradigma administrasi publik.",
    major: "negara",
    image: "https://picsum.photos/seed/admpublik/400/250",
    lessons: generateLessons("ne1", 6),
  },
  {
    id: "ne2",
    title: "Kebijakan Publik",
    description: "Formulasi, implementasi, dan evaluasi kebijakan publik.",
    major: "negara",
    image: "https://picsum.photos/seed/kebijakan/400/250",
    lessons: generateLessons("ne2", 7),
  },
  {
    id: "ne3",
    title: "Hukum Administrasi Negara",
    description:
      "Asas-asas pemerintahan yang baik dan peradilan tata usaha negara.",
    major: "negara",
    image: "https://picsum.photos/seed/han/400/250",
    lessons: generateLessons("ne3", 6),
  },
  {
    id: "ne4",
    title: "Manajemen Publik",
    description: "New Public Management dan inovasi sektor publik.",
    major: "negara",
    image: "https://picsum.photos/seed/manajemenpublik/400/250",
    lessons: generateLessons("ne4", 5),
  },
  {
    id: "ne5",
    title: "Teori Organisasi",
    description: "Struktur, budaya, dan perilaku dalam organisasi publik.",
    major: "negara",
    image: "https://picsum.photos/seed/organisasi/400/250",
    lessons: generateLessons("ne5", 6),
  },
];

export const MENTORS: Mentor[] = [
  {
    id: "m1",
    name: "Budi Santoso, M.Si",
    major: "niaga",
    rating: 4.9,
    image: "https://picsum.photos/seed/budi/150/150",
    availableTimes: ["Senin 10:00", "Rabu 14:00", "Jumat 16:00"],
  },
  {
    id: "m2",
    name: "Siti Aminah, M.Ak",
    major: "fiskal",
    rating: 4.8,
    image: "https://picsum.photos/seed/siti/150/150",
    availableTimes: ["Selasa 09:00", "Kamis 13:00"],
  },
  {
    id: "m3",
    name: "Dr. Andi Wijaya",
    major: "negara",
    rating: 5.0,
    image: "https://picsum.photos/seed/andi/150/150",
    availableTimes: ["Senin 13:00", "Kamis 10:00"],
  },
];
