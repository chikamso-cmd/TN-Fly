import { motion } from 'motion/react';
// import { Award, Zap, Heart } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-15 sm:py-15 bg-white text-slate-900 overflow-hidden" id="CTA">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16  items-center">

        {/* LEFT COLUMN: Two Overlapping Images exactly matching reference */}
        {/* LEFT COLUMN: drone pilot image Image */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:max-w-md  overflow-hidden rounded-xl shadow-2xl"
          >
            <img
              src="/pilot.jpg" // Replace with your CEO image
              alt="CEO of TN-FLY Drone Aerial Services"
              className="w-full h-[600px] object-cover"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Snapping Fantastic Moments & Landscapes */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-slate-500 font-semibold uppercase tracking-widest text-sm"
              >
                Become a Certified Drone Pilot
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-extrabold text-2xl md:text-4xl leading-tight"
              >
                Start Your Drone Pilot Journey With TN-FLY
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-slate-600 leading-8"
              >
                Whether you're a complete beginner or looking to sharpen your aerial
                skills, our hands-on drone pilot training equips you with the knowledge,
                confidence, and practical experience needed to fly safely and capture
                stunning aerial footage. Learn from experienced professionals using
                industry-standard equipment in a supportive learning environment.
              </motion.p>
            </div>
            <div className="flex flex-wrap gap-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-left gap-3"
              >
                {/* <Award className="w-6 h-6 text-rose-500" /> */}
                <h4 className="text-slate-700 font-bold">Hands-on Flight Training</h4>
                <p className="text-slate-600 text-[12px] sm:text-sm">
                  Learn drone control, take-off, landing, navigation, and safety protocols through practical exercises and real-world scenarios.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-left gap-3"
              >
                {/* <Zap className="w-6 h-6 text-rose-500" /> */}
                <h4 className="text-slate-700 font-bold">Professional Arial Filmmaking</h4>
                <p className="text-slate-600 text-[12px] sm:text-sm">
                  Master cinematic drone shotsc camera settings,flight planning, and editing techniques to create visually stunning aerial footage for films, commercials, and promotional content.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-left gap-3"
              >
                {/* <Heart className="w-6 h-6 text-rose-500" /> */}
                <h4 className="text-slate-700 font-bold">Mentorship & Career Support</h4>
                <p className="text-slate-600 text-[12px] sm:text-sm">
                  Resceieve one-on-one mentorship from experienced drone pilots, career guidance, Practical assignments, and assistance in building a professional portfolio to kickstart your journey in the drone industry.
                </p>
              </motion.div>
            </div>
            {/* cta button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="https://wa.me/2348169810014?text=Hello%20TN-FLY%2C%20I%20am%20interested%20in%20enrolling%20for%20drone%20pilot%20training.%20Please%20provide%20me%20with%20more%20information."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#dcf20f] hover:bg-[#E8FF1A] text-black rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Enroll for Training
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
