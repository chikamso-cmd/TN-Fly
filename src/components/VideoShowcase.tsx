import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Cpu, Scale } from 'lucide-react';

export default function VideoShowcase() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className=" bg-slate-50 text-slate-900 overflow-hidden" id="video-showcase">
      <div className=" mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Video Thumbnail with Centered Yellow Play Button */}
          <div className="lg:col-span-6 relative aspect-video  sm:aspect-[6/3] rounded-sm overflow-hidden shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" 
              alt="Professional female pilot operating a drone" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
              id="video-showcase-thumbnail"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-300" />

            {/* Centered Yellow Play Button */}
            <button 
              onClick={() => setIsVideoPlaying(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8FF1A] text-black flex items-center justify-center shadow-xl active:scale-90 group-hover:scale-110 transition-all duration-300 cursor-pointer"
              id="video-play-btn"
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-black text-black ml-1" />
            </button>
          </div>

          {/* RIGHT COLUMN: Informational Panel */}
          <div className="lg:col-span-6 space-y-8 text-left px-5">
            <div className="space-y-4">
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight" id="video-showcase-heading">
                The Power of Integrated <br />
                Camera Stabilization.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                Experience the precision of our integrated stabilization systems and how they turn powerful aerial motion into smooth, broadcast-ready storytelling.
              </p>
            </div>

            {/* Statistics Row with Lucide Icons */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-slate-200">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-white border border-slate-200 rounded-sm text-slate-800 flex-shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-slate-900">34</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">FPS</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono block">4k Video Capture</span>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-white border border-slate-200 rounded-sm text-slate-800 flex-shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-slate-900">380</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">G</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono block">Aircraft Weight</span>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('diagram');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-sm transition-colors duration-300 active:scale-95 shadow-lg"
                id="video-showcase-cta"
              >
                View Product
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* FULL SCREEN VIDEO MODAL */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 backdrop-blur-md"
            onClick={() => setIsVideoPlaying(false)}
          >
            <div className="relative max-w-4xl w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 text-white hover:text-[#E8FF1A] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Embed an actual beautiful atmospheric aerial video or simulated video loop */}
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Cinematic Drone Footage Showcase"
                className="w-full h-full border-none"
                allow="autoplay; encrypted-media; gyroscope"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
