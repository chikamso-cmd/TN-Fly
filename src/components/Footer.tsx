import { Mail, Camera,  Phone, MapPin, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instagramImages = [
    'https://images.unsplash.com/photo-1501597301489-8b75b675ba0a?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1521405924368-64c5b84bec6a?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=150',
  ];

  return (
    <footer className="bg-black text-slate-400 py-16 md:py-20 px-6 sm:px-12 md:px-16" id="footer">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">
          
          {/* Column 1: Company Information */}
          <div className="lg:col-span-4 space-y-6">
            <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          
        >
          <div className="p-2 bg-black rounded-sm relative overflow-hidden group-hover:scale-105 transition-transform flex items-center justify-center">
             <img src="/dronelogo.png" alt="drone logo" className="w-15 object-fit" />
          </div>
          <div>
            <h1 className="font-sans font-black text-sm md:text-base tracking-widest uppercase text-slate-500">
              TN FLY<span className="text-slate-500 font-normal text-xs ml-1">DRONES</span>
            </h1>
            <span className="text-[9px] text-slate-400 block -mt-1 font-mono tracking-widest uppercase font-semibold">
              Aerial Services
            </span>
          </div>
        </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
              TN FLY specializes in professional aerial imagery, cinematic event coverage, precision surveys, and inspection flights for clients who need reliable drone production.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8FF1A] flex-shrink-0 mt-0.5" />
                <span>Oyo Ibadan, Nigeria.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8FF1A] flex-shrink-0" />
                <span>+234 324 5879 66</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E8FF1A] flex-shrink-0" />
                <span className="truncate">info@tnflydrone.com</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Stores */}
          {/* <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
              Our Stores
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">New York</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">London SF</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Cockfosters BP</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Los Angeles</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Chicago</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Las Vegas</a></li>
            </ul>
          </div> */}

          {/* Column 3: Useful Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#E8FF1A] transition-colors">Our Sitemap</a></li>
            </ul>
          </div>

          {/* Column 4: Instagram Gallery Grid */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
              Instagram
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {instagramImages.map((src, idx) => (
                <div key={idx} className="aspect-square rounded-sm overflow-hidden border border-white/5 hover:border-[#E8FF1A]/40 transition-colors group">
                  <img
                    src={src}
                    alt={`Instagram thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright and social bars */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          
          {/* Left: payment icon mockup / copyright */}
          <div className="flex items-center gap-3">
            <span className="text-slate-600">Copyright © 2026 TN-Fly. All rights reserved.</span>
            <div className="flex gap-1.5 opacity-40">
              <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded font-bold tracking-widest text-white">VISA</span>
              <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded font-bold tracking-widest text-white font-mono">MC</span>
              <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded font-bold tracking-widest text-white">AMEX</span>
            </div>
          </div>

          {/* Right: socials and back to top button */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-slate-500">
              <a href="#" className="hover:text-[#E8FF1A] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#E8FF1A] transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#E8FF1A] transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="p-2 border border-slate-900 bg-slate-950 text-slate-400 hover:text-[#E8FF1A] hover:border-[#E8FF1A] transition-all rounded-sm shadow-md"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
