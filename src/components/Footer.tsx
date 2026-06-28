import { Mail, Camera,  Phone, MapPin, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
// import {FaWhatsapp, FaTiktok } from "react-icons/fa"
 
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
             <img src="/LOGO1.png" alt="drone logo" className="w-20 object-fit" />
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
            {/* <div className="flex gap-1.5 opacity-40">
              <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded font-bold tracking-widest text-white">VISA</span>
              <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded font-bold tracking-widest text-white font-mono">MC</span>
              <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded font-bold tracking-widest text-white">AMEX</span>
            </div> */}
          </div>

          {/* Right: socials and back to top button */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-slate-500">
              <a href="https://www.tiktok.com/@teenaughty" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-[#E8FF1A] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.2v13.18a2.89 2.89 0 1 1-2.89-2.89c.29 0 .57.04.84.12V9.15a6.1 6.1 0 0 0-.84-.06A6.09 6.09 0 1 0 15.82 15V8.31a8.04 8.04 0 0 0 4.7 1.51V6.69c-.31 0-.62-.03-.93-.1Z" />
                </svg></a>
              <a href="https://wa.me/2348169810014 " target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-[#E8FF1A] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.14 1.59 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.16-3.45-8.43ZM12.07 21.8a9.83 9.83 0 0 1-5.02-1.37l-.36-.22-3.74.98 1-3.65-.24-.38a9.84 9.84 0 1 1 8.36 4.64Zm5.4-7.36c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.55.72.3 1.28.48 1.72.62.72.23 1.38.2 1.9.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" />
                </svg>
              </a>
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
