import { FileText, File, FileSpreadsheet, Download, Star } from 'lucide-react';
import { MaterialResource } from '../../data/mockBankMateri';
import { MAJORS } from '../../data/mockData';
import { motion } from 'motion/react';

interface ResourceCardProps {
  resource: MaterialResource;
  onPreview: (resource: MaterialResource) => void;
  onDownload: (resource: MaterialResource) => void;
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'PDF': return <FileText className="text-red-500 w-4 h-4" />;
    case 'PPT': return <FileSpreadsheet className="text-orange-500 w-4 h-4" />;
    case 'DOC': return <File className="text-blue-500 w-4 h-4" />;
    default: return <FileText className="text-slate-500 w-4 h-4" />;
  }
};

export function ResourceCard({ resource, onPreview, onDownload }: ResourceCardProps) {
  const major = MAJORS.find(m => m.id === resource.majorId);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
    >
      <div className="relative h-40 bg-slate-100 cursor-pointer" onClick={() => onPreview(resource)}>
        <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm">
          FREE
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
          {getIconForType(resource.type)}
          <span className="text-xs font-bold text-slate-700">{resource.type}</span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-slate-100 text-slate-600`}>
            {major?.name}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600 truncate">
            {resource.courseName}
          </span>
        </div>
        
        <h3 className="font-bold text-slate-900 leading-tight mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onPreview(resource)}>
          {resource.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              {resource.rating}
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              {resource.downloadCount}
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onDownload(resource); }}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            Unduh
          </button>
        </div>
      </div>
    </motion.div>
  );
}
