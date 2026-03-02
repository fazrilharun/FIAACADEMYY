import { useState, useEffect, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { useMascotStore } from '../store/useMascotStore';
import { BANK_MATERI_DATA, MaterialResource, ResourceType } from '../data/mockBankMateri';
import { ResourceCard } from '../components/bank-materi/ResourceCard';
import { ResourceSearch } from '../components/bank-materi/ResourceSearch';
import { ResourceFilter } from '../components/bank-materi/ResourceFilter';
import { ResourcePreviewModal } from '../components/bank-materi/ResourcePreviewModal';
import { Upload, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BankMateri() {
  const user = useStore(state => state.user);
  const { setState } = useMascotStore();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const [sortBy, setSortBy] = useState('terbaru');
  
  const [previewResource, setPreviewResource] = useState<MaterialResource | null>(null);

  // Initial mascot greeting
  useEffect(() => {
    setState('happy', 'Semua materi di sini GRATIS lho! Silakan cari yang kamu butuhkan.');
  }, [setState]);

  const filteredAndSortedResources = useMemo(() => {
    let result = [...BANK_MATERI_DATA];

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.courseName.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }

    // Filter by major
    if (selectedMajor) {
      result = result.filter(r => r.majorId === selectedMajor);
    }

    // Filter by type
    if (selectedType) {
      result = result.filter(r => r.type === selectedType);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'terbaru') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      } else if (sortBy === 'terpopuler') {
        return b.rating - a.rating;
      } else if (sortBy === 'download') {
        return b.downloadCount - a.downloadCount;
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedMajor, selectedType, sortBy]);

  // Mascot reaction for empty search
  useEffect(() => {
    if (searchQuery && filteredAndSortedResources.length === 0) {
      setState('thinking', 'Hmm... materinya belum ada nih. Coba kata kunci lain ya!');
    } else if (searchQuery && filteredAndSortedResources.length > 0) {
      setState('excited', `Wah ketemu ${filteredAndSortedResources.length} materi nih!`);
    }
  }, [searchQuery, filteredAndSortedResources.length, setState]);

  const handleDownload = (resource: MaterialResource) => {
    if (!user) {
      setState('sad', 'Kamu harus login dulu ya untuk mengunduh materi ini.');
      navigate('/login');
      return;
    }
    
    // Mock download action
    setState('celebrating', 'Berhasil diunduh! Semoga materinya membantu belajarmu ya!');
    
    // In a real app, trigger file download here
    console.log(`Downloading ${resource.title}...`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-lg">
        <div>
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black tracking-wider mb-4">
            100% GRATIS
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Bank Materi FIA</h1>
          <p className="text-blue-100 max-w-xl text-lg">
            Akses ribuan materi kuliah, catatan, soal ujian, dan template tugas secara gratis untuk mahasiswa FIA.
          </p>
        </div>
        
        {user?.role === 'ADMIN' ? (
          <button className="flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shrink-0">
            <Upload className="w-5 h-5" />
            Upload Materi
          </button>
        ) : (
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-bold transition-colors shrink-0">
            <Upload className="w-5 h-5" />
            Sumbang Materi
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <ResourceSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
        <ResourceFilter 
          selectedMajor={selectedMajor} setSelectedMajor={setSelectedMajor}
          selectedType={selectedType} setSelectedType={setSelectedType}
          sortBy={sortBy} setSortBy={setSortBy}
        />
      </div>

      {/* Content */}
      {filteredAndSortedResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              onPreview={setPreviewResource}
              onDownload={handleDownload}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Materi Tidak Ditemukan</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Maaf, kami tidak dapat menemukan materi yang sesuai dengan filter atau kata kunci pencarianmu.
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedMajor(null);
              setSelectedType(null);
            }}
            className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Preview Modal */}
      <ResourcePreviewModal 
        resource={previewResource} 
        isOpen={!!previewResource} 
        onClose={() => setPreviewResource(null)}
        onDownload={handleDownload}
      />
    </div>
  );
}
