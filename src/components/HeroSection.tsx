import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

const heroSlides = [
  {
    src: '/arialview.jpg',
    alt: 'Aerial scenic landscape backdrop',
    title: ['Exploring The', 'Skies with Drones.'],
    description:
      'From cinematic event coverage to precision mapping and inspection flights, TN FLY delivers bold aerial visuals with fast turnarounds and professional support.',
  },
  {
    src: '/dept.jpg',
    alt: 'Drone flying above a coastal landscape',
    title: ['Precision', 'Flight, Premium Results.'],
    description:
      'We combine cinematic motion with technical accuracy for events, inspections, and high-impact marketing content.',
  },
  {
    src: '/poly.jpg',
    alt: 'Drone capturing a sweeping outdoor scene',
    title: ['Elevated', 'Storytelling, Anywhere.'],
    description:
      'From sweeping landscapes to tight commercial shots, our aerial work brings a polished edge to every frame.',
  },
];

export default function HeroSection({ onExplore, onContact }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white"
      id="hero-section"
    >
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            } filter brightness-50`}
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35 md:from-black/90 md:via-black/70 md:to-black/45" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-6 py-32 sm:px-12 md:px-16 lg:flex-row lg:gap-5">
        <div className="w-full max-w-8xl space-y-6 text-left lg:w-[58%] md:space-y-8 ">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 md:space-y-5"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[70px]"
              id="hero-heading"
            >
              {heroSlides[activeSlide].title.map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg text-xs font-light leading-relaxed text-slate-300 sm:text-base md:text-lg"
              id="hero-supporting-text"
            >
              {heroSlides[activeSlide].description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center gap-4"
          >
            <button
              onClick={onExplore}
              className="rounded-sm bg-[#E8FF1A] px-6 py-3 text-[10px] font-semibold tracking-wide text-black shadow-lg transition-all duration-300 hover:bg-[#d4eb14] hover:shadow-[#E8FF1A]/20 active:scale-95 sm:px-8 sm:py-4 sm:text-base"
              id="hero-primary-cta"
            >
              Explore Services
            </button>

            <button
              onClick={onContact}
              className="cursor-pointer rounded-sm border border-white px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white/10 active:scale-95 sm:px-8 sm:py-4 sm:text-base"
              id="hero-secondary-cta"
            >
              Book a Flight
            </button>
          </motion.div>
        </div>
{/* right img */}
        <div className="relative flex w-full justify-center lg:w-[46%] lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 50, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[540px] md:max-w-[580px]"
          >
            <motion.img
              src="/white-drone.png"
              alt="Premium quadcopter drone in mid-air"
              className="h-auto w-full object-contain bg-transparent drop-shadow-[0_25px_35px_rgba(232,255,26,0.15)]"
              referrerPolicy="no-referrer"
              // animate={{
              //   y: [0, -15, 0],
              //   rotate: [0, 1.5, -1, 0],
              // }}
              // transition={{
              //   repeat: Infinity,
              //   duration: 6,
              //   ease: 'easeInOut',
              // }}
              id="hero-floating-drone"
            />

            {/* <div className="absolute top-1/2 -right-4 flex -translate-y-1/2 items-center gap-2">
              <div className="h-0.5 w-8 bg-[#E8FF1A]" />
              <span className="font-mono text-xs font-bold tracking-widest text-slate-400">02</span>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
