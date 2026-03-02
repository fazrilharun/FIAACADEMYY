import { X, Download, Star, Calendar, FileText } from 'lucide-react';
import { MaterialResource } from '../../data/mockBankMateri';
import { MAJORS } from '../../data/mockData';
import { motion, AnimatePresence } from 'motion/react';

interface ResourcePreviewModalProps {
  resource: MaterialResource | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (resource: MaterialResource) => void;
}

export function ResourcePreviewModal({ resource, isOpen, onClose, onDownload }: ResourcePreviewModalProps) {
  if (!resource) return null;
  
  const major = MAJORS.find(m => m.id === resource.majorId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="relative h-64 bg-slate-100 shrink-0">
              <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {major?.name}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {resource.courseName}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-black uppercase tracking-wider ml-auto">
                  FREE
                </span>
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-4">{resource.title}</h2>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {resource.type}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.uploadDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  {resource.rating} Rating
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {resource.downloadCount} Kali Diunduh
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Deskripsi</h3>
                <p className="text-slate-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>
              
              <div className="flex items-center justify-end gap-4">
                <button 
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Tutup
                </button>
                <button 
                  onClick={() => { onDownload(resource); onClose(); }}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-200 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Unduh Sekarang
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
