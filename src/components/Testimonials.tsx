import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SingleTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: SingleTestimonial[] = [
  {
    id: 't-1',
    quote: 'TN FLY delivered stunning aerial footage for our resort launch. The team was punctual, professional, and the final edit exceeded our expectations.',
    author: 'Brian Cumin',
    role: 'Hospitality Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 't-2',
    quote: 'Our construction survey became faster and safer with clear aerial inspection footage. The drone team helped us spot issues before they became costly delays.',
    author: 'Sarah Jenkins',
    role: 'Real Estate Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 't-3',
    quote: 'Our wedding video featured epic aerial reveals and gentle cinematic movement. The drone team made the whole process feel effortless.',
    author: 'Marcus Sterling',
    role: 'Event Coordinator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotate carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 overflow-hidden relative" id="testimonials">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-10 relative z-10">

         <div className="space-y-6 text-center lg:text-left max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Testimonial
          </p>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            What Our Clients Say
          </h2>
        </div>
        
        {/* Giant curved quotation symbol matching reference */}
        {/* <div className="flex justify-center" id="testimonials-quote-mark">
          <span className="font-serif text-[80px] sm:text-[90px] leading-none text-slate-800 select-none">”</span>
        </div> */}

        {/* Dynamic Testimonial Carousel Text */}
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
              id="active-testimonial-card"
            >
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="space-y-0.5">
                <h4 className="font-sans font-bold text-sm tracking-wider text-slate-900 uppercase">
                  {testimonials[activeIndex].author}
                </h4>
                <span className="text-[10px] font-mono font-bold text-[#EF4444] tracking-widest uppercase">
                  {testimonials[activeIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overlapping client avatar row matching reference */}
        <div className="relative pt-8 flex items-center justify-center gap-4" id="testimonials-avatars">
          
          {/* Curved track lines behind avatars */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-slate-200 z-0 max-w-[280px] mx-auto" />

          <div className="flex items-center justify-center gap-3 relative z-10">
            {testimonials.map((test, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={test.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? 'w-16 h-16 ring-4 ring-[#E8FF1A] scale-110 shadow-lg' 
                      : 'w-10 h-10 filter grayscale opacity-45 hover:opacity-100 hover:scale-105'
                  }`}
                  id={`testimonial-avatar-btn-${index}`}
                >
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Interactive side slider indicators similar to reference */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="flex flex-col gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-[#E8FF1A] w-6' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
