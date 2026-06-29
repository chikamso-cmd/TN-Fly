import { motion } from 'motion/react';
import { ArrowRight, Image as ImageIcon, Cpu, Video } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const highlights = [
    {
      id: 'highlight-1',
      title: 'Cinematic Photography',
      desc: 'Professional aerial imaging with vivid HDR clarity, precision framing, and fast turnaround for marketing and event campaigns.',
      image: '/white.jpg',
      icon: ImageIcon,
    },
    {
      id: 'highlight-2',
      title: '4K Cinematic Video',
      desc: 'Broadcast-quality footage with smooth stabilization, cinematic motion, and rich color for every aerial story.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600',
      icon: Cpu,
    },
    {
      id: 'highlight-3',
      title: 'Survey & Inspection',
      desc: 'Accurate aerial mapping, structure inspection, and monitoring services for construction, real estate, and land management.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
      icon: Video,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-100" id="services">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400">
            Transforming Visions
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight uppercase" id="services-heading">
            Cutting-Edge Drone Services
          </h2>
        </div>

        {/* 3 Large Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                // onClick={() => onSelectService(item.title)}
                className="group relative h-[450px] rounded-sm overflow-hidden shadow-xl cursor-pointer flex flex-col justify-end p-8 text-white"
                id={`services-card-${index}`}
              >
                {/* Background Image with Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Dark gradient overlay matching reference */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                </div>

                {/* Content over image */}
                <div className="relative z-10 space-y-4">
                  {/* Icon with light gray borders */}
                  <div className="w-12 h-12 rounded-sm border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <h3 className="font-sans font-bold text-xl sm:text-2xl uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Circle button with arrow at bottom */}
                  <div className="pt-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E8FF1A] hover:text-black text-white flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Decorative neon yellow hover outline */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#E8FF1A]/30 rounded-sm pointer-events-none transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
