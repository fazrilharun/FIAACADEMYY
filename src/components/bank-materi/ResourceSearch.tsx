import { Search, SlidersHorizontal } from 'lucide-react';

interface ResourceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResourceSearch({ value, onChange }: ResourceSearchProps) {
  return (
    <div className="relative flex-1 max-w-2xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari materi, mata kuliah, atau topik..." 
        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-sm"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors">
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
