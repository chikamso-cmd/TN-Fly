import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

export default function HeroSection({ onExplore, onContact }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white" 
      id="hero-section"
    >
      {/* Background aerial drone image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-main.webp" 
          alt="Aerial scenic landscape backdrop" 
          className="w-full h-full object-cover filter brightness-50"
          referrerPolicy="no-referrer"
        />
        {/* Dark radial overlay for dramatic cinematic mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35 md:from-black/90 md:via-black/70 md:to-black/45" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-32 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10 w-full">
        
        {/* LEFT COLUMN: Hero content flexed side by side */}
        <div className="w-full lg:w-[58%] space-y-6 md:space-y-8 text-left max-w-2xl">
          <div className="space-y-4 md:space-y-5">
            {/* Exploring The Skies with Drones */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[50px] tracking-tight leading-[1.05]"
              id="hero-heading"
            >
              Exploring The <br />
              Skies with Drones.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-xs sm:text-base md:text-lg font-light leading-relaxed max-w-lg"
              id="hero-supporting-text"
            >
              From cinematic event coverage to precision mapping and inspection flights, TN FLY delivers bold aerial visuals with fast turnarounds and professional support.
            </motion.p>
          </div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center gap-4"
          >
            {/* Primary yellow button */}
            <button
              onClick={onExplore}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-[#E8FF1A] hover:bg-[#d4eb14] text-black font-semibold text-[10px] sm:text-base tracking-wide rounded-sm transition-all duration-300 active:scale-95 shadow-lg hover:shadow-[#E8FF1A]/20 cursor-pointer"
              id="hero-primary-cta"
            >
              Explore Services
            </button>
            
            {/* Secondary outline button */}
            <button
              onClick={onContact}
              className="px-6 py-3 sm:px-8 sm:py-4 border border-white hover:bg-white/10 text-white font-semibold text-sm sm:text-base tracking-wide rounded-sm transition-all duration-300 active:scale-95 cursor-pointer"
              id="hero-secondary-cta"
            >
              Book a Flight
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Floating drone image flexed side by side */}
        <div className="w-full lg:w-[42%] flex justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 50, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] md:max-w-[480px]"
          >
            {/* Main Floating Drone */}
            <motion.img
              src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800"
              alt="Premium quadcopter drone in mid-air"
              className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(232,255,26,0.15)] rounded-2xl"
              referrerPolicy="no-referrer"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 1.5, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
              id="hero-floating-drone"
            />
            
            {/* Tiny indicator badge exactly like reference: "02" */}
            <div className="absolute top-1/2 -right-4 flex items-center gap-2 transform -translate-y-1/2">
              <div className="h-0.5 w-8 bg-[#E8FF1A]" />
              <span className="font-mono text-xs text-slate-400 font-bold tracking-widest">02</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
