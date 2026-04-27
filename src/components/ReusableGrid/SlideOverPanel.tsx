import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Columns, Filter as FilterIcon } from 'lucide-react';

interface SlideOverPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function SlideOverPanel({ isOpen, onClose, title, children, icon }: SlideOverPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[2000]"
          />

          {/* Panel */}
          <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
            className="fixed right-0 top-0 h-full w-[320px] bg-white shadow-2xl z-[2001] flex flex-col border-l border-slate-200"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {icon && <div className="text-slate-400">{icon}</div>}
                <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">{title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
