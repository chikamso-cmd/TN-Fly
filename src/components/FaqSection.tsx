import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ } from '../types';

interface FaqSectionProps {
  faqs: FAQ[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-100" id="faq">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400">
            TN-Fly FAQ
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight uppercase" id="faq-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Everything you need to know about flight regulations, licensing, weather cancellations, and turnaround speeds.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-sm border transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-[#E8FF1A] bg-[#E8FF1A]/5 shadow-sm'
                    : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-slate-800 flex-shrink-0" />
                    <span className="font-sans font-bold text-xs sm:text-sm text-slate-950 uppercase tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="p-1 rounded-sm border bg-white border-slate-200 text-slate-600 flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-800" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm leading-relaxed border-t border-slate-100 text-slate-600 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
