import { motion } from 'motion/react';
import { Award, Zap, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-15 items-center">
        
        {/* LEFT COLUMN: Two Overlapping Images exactly matching reference */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
          {/* Back Image (Top Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-0 left-0 w-[65%] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl z-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600" 
              alt="Aerial view of scenic landscape at night" 
              className="w-full h-full object-cover filter brightness-90"
              referrerPolicy="no-referrer"
              id="about-img-back"
            />
          </motion.div>

          {/* Front Image (Bottom Right overlapping) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="absolute bottom-0 right-0 w-[65%] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl z-10 border-8 border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600" 
              alt="Hand holding drone over spectacular coast" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              id="about-img-front"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Snapping Fantastic Moments & Landscapes */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight"
              id="about-heading"
            >
              Snapping Fantastic <br />
              Moments & Landscapes.
            </motion.h2>
          </div>

          {/* Three Feature Items matching reference */}
          <div className="space-y-6 sm:space-y-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-2 sm:gap-3 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-sm border border-rose-200 bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors duration-300">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base sm:text-lg text-slate-900 uppercase tracking-tight group-hover:text-rose-600 transition-colors">
                  Year of Experience
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md">
                  Mauris molestie erat et sollicitudin auctor Cres auctor feugiat lacinia. Aliquam non aliquet urna. Mauris dignissim leo.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4 sm:gap-6 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-sm border border-rose-200 bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base sm:text-lg text-slate-900 uppercase tracking-tight group-hover:text-rose-600 transition-colors">
                  Elite Cinematic Standards
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md">
                  Mauris molestie erat et sollicitudin auctor Cres auctor feugiat lacinia. Aliquam non aliquet urna. Mauris dignissim leo.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4 sm:gap-6 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-sm border border-rose-200 bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base sm:text-lg text-slate-900 uppercase tracking-tight group-hover:text-rose-600 transition-colors">
                  Dedicated Premium Service
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md">
                  Mauris molestie erat et sollicitudin auctor Cres auctor feugiat lacinia. Aliquam non aliquet urna. Mauris dignissim leo.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
