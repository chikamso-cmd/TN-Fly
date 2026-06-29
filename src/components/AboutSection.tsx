import { motion } from 'motion/react';
import { Award, Zap, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-15 sm:py-15 bg-white text-slate-900 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16  items-center">

        {/* LEFT COLUMN: Two Overlapping Images exactly matching reference */}
        {/* LEFT COLUMN: CEO Image */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:max-w-md  overflow-hidden rounded-xl shadow-2xl"
          >
            <img
              src="/ceo.jpg" // Replace with your CEO image
              alt="CEO of TN-FLY Drone Aerial Services"
              className="w-full h-[600px] object-cover"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Snapping Fantastic Moments & Landscapes */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=" text-slate-500 font-semibold uppercase text-sm"
          >
           About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-extrabold text-3xl sm:text-4xl leading-tight"
          >
            About <span className="text-[#E8FF1A]">TN-FLY</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 leading-8 text-base"
          >
            TN-FLY Drone Aerial Services is a professional aerial photography and
            videography company dedicated to capturing breathtaking perspectives that
            bring stories to life. We specialize in weddings, real estate, corporate
            events, documentaries, construction monitoring, inspections, tourism
            promotion, and cinematic productions.
            <br /><br />
            Led by our CEO, TN-FLY combines technical drone expertise with creative
            storytelling to deliver stunning visuals that exceed expectations. Every
            project is handled with precision, safety, and a commitment to producing
            high-quality aerial content that helps individuals and businesses showcase
            their vision from a whole new perspective.
          </motion.p>
          <div className="flex flex-wrap gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-left flex-col gap-3"
            >
              <div className="flex gap-2 items-left">
                <Award className="w-6 h-6 text-rose-500" />
                <h4 className="text-slate-700 font-bold">Award-Winning Services</h4>
              </div>
              <p className="text-slate-600">
                Our innovative approach and attention to detail have earned us recognition in the industry.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-left flex-col gap-3"
            >
              <div className="flex gap-2 items-left">
                <Zap className="w-6 h-6 text-rose-500" />
                <h4 className="text-slate-700 font-bold">Fast Turnaround Times</h4>
              </div>
              <p className="text-slate-600">
                We understand the importance of time and deliver your projects quickly without compromising quality.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-left gap-3"
            >
              <div className="flex gap-2 items-left">
                <Heart className="w-6 h-6 text-rose-500" />
                <h4 className="text-slate-700 font-bold">Passionate About Aerial Art</h4>
              </div>
              <p className="text-slate-600">
                We are dedicated to creating stunning aerial content that showcases the beauty and uniqueness of every location.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
