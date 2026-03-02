import { MAJORS } from '../../data/mockData';
import { RESOURCE_TYPES, ResourceType } from '../../data/mockBankMateri';

interface ResourceFilterProps {
  selectedMajor: string | null;
  setSelectedMajor: (id: string | null) => void;
  selectedType: ResourceType | null;
  setSelectedType: (type: ResourceType | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function ResourceFilter({
  selectedMajor, setSelectedMajor,
  selectedType, setSelectedType,
  sortBy, setSortBy
}: ResourceFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex flex-wrap gap-6">
        {/* Major Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">Jurusan:</span>
          <select 
            value={selectedMajor || ''} 
            onChange={(e) => setSelectedMajor(e.target.value || null)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium outline-none"
          >
            <option value="">Semua Jurusan</option>
            {MAJORS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">Tipe File:</span>
          <select 
            value={selectedType || ''} 
            onChange={(e) => setSelectedType(e.target.value as ResourceType || null)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium outline-none"
          >
            <option value="">Semua Tipe</option>
            {RESOURCE_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-700">Urutkan:</span>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium outline-none"
        >
          <option value="terbaru">Terbaru</option>
          <option value="terpopuler">Terpopuler</option>
          <option value="download">Paling Banyak Download</option>
        </select>
      </div>
    </div>
  );
}
