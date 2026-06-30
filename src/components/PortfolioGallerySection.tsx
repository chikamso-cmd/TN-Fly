import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Image as ImageIcon, Video, X, Eye, ExternalLink } from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string; // e.g. youtube or video embed
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'gal-1',
    type: 'video',
    title: '2025 All White Party',
    category: 'Cinematic',
    thumbnail: '/whiteall.jpg',
    videoUrl: 'https://youtu.be/lmUVAi82SH4?si=RqBLznTT8UgxYydp',
    description: 'Ultra HD 4K aerial capture of the all white party. in Ibadan Oyo State.'
  },
  {
    id: 'gal-2',
    type: 'image',
    title: 'Ocean Coast Cliffside',
    category: 'Photography',
    thumbnail: '/poly.jpg',
    description: 'Breathtaking 20MP HDR shot capturing deep turquoise water crashing against basalt cliffs.'
  },
  {
    id: 'gal-3',
    type: 'video',
    title: 'Arial View of the Polytechnic Ibadan',
    category: 'Commercial',
    thumbnail: '/arialpoly.png',
    videoUrl: 'https://youtube.com/shorts/8t8z50zf3_Y?si=dwgzkDwzA_CKYzUs',
    description: 'Dynamic FPV fly-through around architectural building during sunset golden hour in the polytechnic ibadan.'
  },
  {
    id: 'gal-4',
    type: 'image',
    title: 'Agricultural Crop Mapping',
    category: 'Mapping',
    thumbnail: '/agricultural.jpeg',
    description: 'Orthomosaic mapping layout showing crop health and structural moisture index.'
  },
  {
    id: 'gal-5',
    type: 'video',
    title: 'Induction & Award Night of Joint Minds Club',
    category: 'Cinematic',
    thumbnail: '/award.jpg',
    videoUrl: 'https://youtu.be/VI8t60LMs2Q?si=xqKAznE2C4g4zy3D',
    description: 'Scenic high-altitude ascent over gellani event center catching the scenic view of the induction & award night party.'
  },
  {
    id: 'gal-6',
    type: 'image',
    title: 'Wind Turbine Inspection',
    category: 'Inspection',
    thumbnail: '/arialview.jpg',
    description: 'High-detail close-up photograph of rotor blade tips for predictive maintenance.'
  }
];

export default function PortfolioGallerySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  const filteredItems = galleryData.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 overflow-hidden relative" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400">
              Work Portfolio
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none uppercase">
              Aerial Imagery & Video Gallery
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-light max-w-xl">
              Explore our pristine collection of 4K cinematic videos and professional high-resolution aerial photography.
            </p>
          </div>

          {/* Tab Filters */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeFilter === 'all' 
                  ? 'bg-slate-900 text-white shadow' 
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                activeFilter === 'video' 
                  ? 'bg-slate-900 text-white shadow' 
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setActiveFilter('image')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                activeFilter === 'image' 
                  ? 'bg-slate-900 text-white shadow' 
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-video rounded-sm overflow-hidden bg-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedMedia(item)}
                id={`gallery-item-${item.id}`}
              >
                {/* Thumbnail Image */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Overlays / Hover indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Interactive Indicator / Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center border border-white/15">
                  {item.type === 'video' ? (
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-[#E8FF1A]" />
                  )}
                </div>

                {/* Content Panel at the bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#E8FF1A] bg-white/10 px-2 py-0.5 rounded-sm">
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg uppercase tracking-tight group-hover:text-[#E8FF1A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#E8FF1A] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{item.type === 'video' ? 'Play Cinematic Video' : 'View Full Image'}</span>
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Accent neon yellow outline */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#E8FF1A]/30 rounded-sm pointer-events-none transition-all duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 backdrop-blur-md"
            onClick={() => setSelectedMedia(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-slate-950 rounded-lg overflow-hidden shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/65 text-white hover:text-[#E8FF1A] hover:bg-black/90 transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media Container */}
              <div className="aspect-video bg-black flex items-center justify-center">
                {selectedMedia.type === 'video' && selectedMedia.videoUrl ? (
                  <iframe 
                    src={`${selectedMedia.videoUrl}?autoplay=1`} 
                    title={selectedMedia.title}
                    className="w-full h-full border-none"
                    allow="autoplay; encrypted-media; gyroscope"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedMedia.thumbnail}
                    alt={selectedMedia.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Details bar */}
              <div className="p-6 sm:p-8 bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#E8FF1A]">
                    {selectedMedia.category} • {selectedMedia.type}
                  </span>
                </div>
                <h3 className="font-sans font-extrabold text-xl sm:text-2xl uppercase tracking-tight">
                  {selectedMedia.title}
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {selectedMedia.description}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
