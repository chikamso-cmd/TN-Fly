import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  date: string;
  title: string;
  desc: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    tag: 'Drone',
    tagBg: 'bg-[#E8FF1A]/10',
    tagColor: 'text-[#C9DD14]',
    date: 'March 16, 2023',
    title: 'Exploring The Drone Universe.',
    desc: 'Sed finibus amet dolor maximus sodales egestas ut elit id sollicitudin.',
    image: 'https://images.unsplash.com/photo-1501597301489-8b75b675ba0a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'post-2',
    tag: 'Air Base',
    tagBg: 'bg-emerald-500/10',
    tagColor: 'text-emerald-500',
    date: 'March 16, 2023',
    title: 'Pulsating News and Insights Above.',
    desc: 'Sed finibus amet dolor maximus sodales egestas ut elit id sollicitudin.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'post-3',
    tag: 'Fly High',
    tagBg: 'bg-indigo-500/10',
    tagColor: 'text-indigo-500',
    date: 'March 16, 2023',
    title: 'Stories of High-Flying Adventures.',
    desc: 'Sed finibus amet dolor maximus sodales egestas ut elit id sollicitudin.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600',
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F8F7FC] text-slate-900 overflow-hidden" id="blog">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 space-y-16">
        
        {/* Header centered matching reference */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight uppercase" id="blog-heading">
            Flight Notes Stories and Tips <br />
            From Drone Enthusiast.
          </h2>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col justify-between bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 border border-slate-100 p-6"
              id={`blog-card-${index}`}
            >
              <div className="space-y-6">
                {/* Category Tag & Date row */}
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-sm text-xs font-semibold ${post.tagBg} ${post.tagColor}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#EF4444] transition-colors uppercase tracking-tight leading-tight line-clamp-2">
                  {post.title}
                </h3>

                {/* Desc */}
                <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                  {post.desc}
                </p>
              </div>

              {/* Read More Link */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-[#EF4444] transition-colors cursor-pointer group/btn">
                  <span>Read More</span>
                  <ArrowRight className="w-4.5 h-4.5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
