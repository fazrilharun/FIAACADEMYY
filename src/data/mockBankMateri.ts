export type ResourceType = 'PDF' | 'PPT' | 'DOC' | 'Notes' | 'Exam Questions' | 'Summary' | 'Template';

export interface MaterialResource {
  id: string;
  title: string;
  majorId: string; // 'niaga', 'fiskal', 'negara'
  courseName: string;
  type: ResourceType;
  description: string;
  uploadDate: string;
  downloadCount: number;
  fileUrl: string;
  thumbnail: string;
  rating: number;
  likes: number;
}

export const BANK_MATERI_DATA: MaterialResource[] = [
  {
    id: '1',
    title: 'Pengantar Ilmu Administrasi Niaga - Bab 1 & 2',
    majorId: 'niaga',
    courseName: 'Pengantar Ilmu Administrasi Niaga',
    type: 'PPT',
    description: 'Slide presentasi dosen untuk pertemuan 1 dan 2. Membahas konsep dasar administrasi dan bisnis.',
    uploadDate: '2023-09-05',
    downloadCount: 1250,
    fileUrl: '#',
    thumbnail: 'https://picsum.photos/seed/ppt1/400/300',
    rating: 4.8,
    likes: 342,
  },
  {
    id: '2',
    title: 'Rangkuman Kebijakan Fiskal Indonesia 2023',
    majorId: 'fiskal',
    courseName: 'Kebijakan Fiskal',
    type: 'Summary',
    description: 'Rangkuman komprehensif tentang kebijakan fiskal yang diterapkan di Indonesia sepanjang tahun 2023.',
    uploadDate: '2023-12-10',
    downloadCount: 890,
    fileUrl: '#',
    thumbnail: 'https://picsum.photos/seed/fiskal1/400/300',
    rating: 4.9,
    likes: 512,
  },
  {
    id: '3',
    title: 'Soal UAS Hukum Administrasi Negara 2022',
    majorId: 'negara',
    courseName: 'Hukum Administrasi Negara',
    type: 'Exam Questions',
    description: 'Kumpulan soal Ujian Akhir Semester tahun 2022 beserta kunci jawaban (unofficial).',
    uploadDate: '2023-06-15',
    downloadCount: 2100,
    fileUrl: '#',
    thumbnail: 'https://picsum.photos/seed/negara1/400/300',
    rating: 4.7,
    likes: 890,
  },
  {
    id: '4',
    title: 'Template Makalah Format APA 7th Edition',
    majorId: 'niaga',
    courseName: 'Metodologi Penelitian',
    type: 'Template',
    description: 'Template Microsoft Word yang sudah disesuaikan dengan format APA 7th Edition untuk tugas makalah.',
    uploadDate: '2023-02-20',
    downloadCount: 3400,
    fileUrl: '#',
    thumbnail: 'https://picsum.photos/seed/template1/400/300',
    rating: 5.0,
    likes: 1200,
  },
  {
    id: '5',
    title: 'Catatan Kelas: Pajak Internasional',
    majorId: 'fiskal',
    courseName: 'Pajak Internasional',
    type: 'Notes',
    description: 'Catatan tulisan tangan yang sudah di-scan (PDF) dari mahasiswa A angkatan 2020.',
    uploadDate: '2023-11-05',
    downloadCount: 450,
    fileUrl: '#',
    thumbnail: 'https://picsum.photos/seed/notes1/400/300',
    rating: 4.5,
    likes: 120,
  },
  {
    id: '6',
    title: 'Modul Praktikum Statistik Bisnis',
    majorId: 'niaga',
    courseName: 'Statistik Bisnis',
    type: 'PDF',
    description: 'Modul lengkap praktikum statistik bisnis menggunakan SPSS.',
    uploadDate: '2023-08-25',
    downloadCount: 1560,
    fileUrl: '#',
    thumbnail: 'https://picsum.photos/seed/modul1/400/300',
    rating: 4.6,
    likes: 430,
  },
  {
    id: '7',
    title: 'Contoh Proposal Skripsi Administrasi Negara',
    majorId: 'negara',
    courseName: 'Seminar Proposal',
    type: 'DOC',
    description: 'Contoh proposal skripsi yang sudah di-ACC dengan topik pelayanan publik.',
    uploadDate: '2023-04-12',
    downloadCount: 2800,
    fileUrl: '#',
    thumbnail: 'https://picsum.photos/seed/proposal1/400/300',
    rating: 4.9,
    likes: 950,
  }
];

export const RESOURCE_TYPES: ResourceType[] = [
  'PDF', 'PPT', 'DOC', 'Notes', 'Exam Questions', 'Summary', 'Template'
];
