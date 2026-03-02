import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MascotBubbleProps {
  message: string | null;
  onClose: () => void;
}

export function MascotBubble({ message, onClose }: MascotBubbleProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute bottom-[110%] right-0 mb-4 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
        >
          {/* Tail */}
          <div className="absolute -bottom-3 right-12 w-6 h-6 bg-white border-b border-r border-slate-100 transform rotate-45 shadow-[2px_2px_4px_rgba(0,0,0,0.05)]" />
          
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={14} />
          </button>
          
          <p className="text-slate-800 font-medium text-sm leading-relaxed pr-4">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
