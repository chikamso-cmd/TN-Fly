import { motion } from 'motion/react';

export default function WhyChooseUs() {
  // We'll define the features with their positions and connector paths
  // Left Side Features
  const leftFeatures = [
    {
      id: 'lf-1',
      title: 'Robust Structure',
      desc: 'High-strength carbon fiber construction for stable flight in windy conditions and reliable payload support.',
      top: '12%',
      left: '10%',
      dotX: '45%',
      dotY: '42%',
    },
    {
      id: 'lf-2',
      title: 'Foldable Drone',
      desc: 'Fast, compact setup for rapid deployment on-location and convenient transport between shoots.',
      top: '46%',
      left: '8%',
      dotX: '34%',
      dotY: '50%',
    },
    {
      id: 'lf-3',
      title: 'HD Video Recording',
      desc: 'Smooth 4K capture with advanced stabilization and dynamic auto-exposure for crisp aerial storytelling.',
      top: '78%',
      left: '10%',
      dotX: '45%',
      dotY: '72%',
    },
  ];

  // Right Side Features
  const rightFeatures = [
    {
      id: 'rf-1',
      title: 'Reliable Production Support',
      desc: 'A dedicated crew partners with you from briefing to final delivery, ensuring every frame matches your vision and event timeline.',
      top: '12%',
      right: '10%',
      dotX: '55%',
      dotY: '45%',
    },
    {
      id: 'rf-2',
      title: 'Fast Delivery',
      desc: 'Quick editing workflows and efficient flight operations mean your photos and videos are ready for launch sooner.',
      top: '46%',
      right: '8%',
      dotX: '65%',
      dotY: '48%',
    },
    {
      id: 'rf-3',
      title: 'Experienced Pilots',
      desc: 'FAA-certified operators with extensive experience in events, real estate, inspections, and cinematic shoot environments.',
      top: '78%',
      right: '10%',
      dotX: '55%',
      dotY: '60%',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 relative overflow-hidden" id="diagram">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 space-y-16">
        
        <div className="space-y-6 text-center lg:text-left max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Why Choose Us
          </p>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Professional Photo & Video Drone Coverage
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We blend cinematic aerial video with premium still photography to tell your story clearly and beautifully, backed by experienced pilots and reliable production support.
          </p>
        </div>

        {/* Technical Diagram Container */}
        <div className="relative w-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
          
          {/* BACKGROUND SVG LINES FOR CONNECTORS (Visible on desktop/lg screens) */}
        

          {/* CENTER: Massive high-quality drone */}
          <div className="relative z-10 w-full max-w-[450px] lg:max-w-[550px] mx-auto py-12 lg:py-0 flex items-center justify-center">
            <motion.img 
              src="/white-drone.png"
              alt="Center drone feature diagram model"
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-lg"
              referrerPolicy="no-referrer"
              animate={{ 
                y: [0, -8, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5, 
                ease: "easeInOut" 
              }}
              id="diagram-center-drone"
            />

            {/* Interactive Pulse Dots */}
            {/* Left 1 Robust Structure dot */}
            

            {/* Right 1 Easy Disassembly dot */}
           
          </div>

          {/* LEFT SIDE FEATURES: List */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[320px] pointer-events-none flex flex-col justify-between py-8 lg:py-0 z-20">
            {leftFeatures.map((item) => (
              <div 
                key={item.id}
                className="pointer-events-auto bg-white/90 backdrop-blur-sm lg:bg-transparent p-4 lg:p-0 rounded-lg shadow-sm lg:shadow-none border lg:border-none border-slate-100 max-w-sm mx-auto lg:mx-0 lg:absolute space-y-1 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  top: window.innerWidth >= 1024 ? item.top : undefined,
                  left: window.innerWidth >= 1024 ? item.left : undefined,
                }}
              >
                <h4 className="font-sans font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[240px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE FEATURES: List */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[320px] pointer-events-none flex flex-col justify-between py-8 lg:py-0 z-20">
            {rightFeatures.map((item) => (
              <div 
                key={item.id}
                className="pointer-events-auto bg-white/90 backdrop-blur-sm lg:bg-transparent p-4 lg:p-0 rounded-lg shadow-sm lg:shadow-none border lg:border-none border-slate-100 max-w-sm mx-auto lg:mx-0 lg:absolute space-y-1 text-left lg:text-right transition-all duration-300 hover:scale-[1.02]"
                style={{
                  top: window.innerWidth >= 1024 ? item.top : undefined,
                  right: window.innerWidth >= 1024 ? item.right : undefined,
                }}
              >
                <h4 className="font-sans font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-[240px] lg:ml-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
