import { useState } from 'react';
import { Camera, ShieldCheck, UserCheck, Menu, X } from 'lucide-react';

interface NavbarProps {
  viewMode: 'landing' | 'admin';
  setViewMode: (mode: 'landing' | 'admin') => void;
  onOpenMyBookings: () => void;
  onBookNow: () => void;
}

export default function Navbar({ viewMode, setViewMode, onOpenMyBookings, onBookNow }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Products' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#Contact', label: 'Book Now' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100" id="main-navigation">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => setViewMode('landing')}
        >
          <div className="p-0.5 bg-black rounded-sm relative overflow-hidden group-hover:scale-105 transition-transform flex items-center justify-center">
           <img src="/LOGO1.png" alt="Tnfly logo" className="w-15 object-fit" />
          </div>
          <div>
            <h1 className="font-sans font-black text-sm md:text-base tracking-widest uppercase text-slate-950">
              TN FLY<span className="text-slate-500 font-normal text-xs ml-1">DRONES</span>
            </h1>
            <span className="text-[9px] text-slate-400 block -mt-1 font-mono tracking-widest uppercase font-semibold">
              Aerial Services
            </span>
          </div>
        </div>

        {/* MIDDLE NAV LINKS */}
        {viewMode === 'landing' && (
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-500">
            <a href="#about" className="transition-colors hover:bg-[#d4eb14] hover:text-black p-2 rounded-sm px-5">About</a>
            <a href="#services" className="transition-colors hover:bg-[#d4eb14] hover:text-black p-2 rounded-sm px-5">Services</a>
            {/* <a href="#diagram" className="transition-colors hover:text-rose-600">Tech Specs</a> */}
            {/* <a href="#video-showcase" className="transition-colors hover:text-rose-600">Stabilization</a> */}
            <a href="#portfolio" className=" hover:bg-[#d4eb14] hover:text-black p-2 rounded-sm px-5">Products</a>
            <a href="#testimonials" className="transition-colors hover:bg-[#d4eb14] hover:text-black p-2 rounded-sm px-5">Reviews</a>
            <a href="#Contact" className="transition-colors hover:bg-[#d4eb14] hover:text-black p-2 rounded-sm px-5">Book Now</a>
          </nav>
        )}

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3">
          
        

          {/* Book Now Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="lg:hidden p-2 rounded-sm border border-slate-200 bg-white/90 text-slate-900 transition hover:bg-slate-50"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* <button
            type='button'
            onClick={() => {
              // setIsMobileMenuOpen(false);
              onBookNow();
            }}
            className="hidden md:flex px-4 py-2 bg-[#E8FF1A] hover:bg-[#d4eb14] text-black border border-transparent hover:border-black/5 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow"
            id="nav-book-now"
          >
            Enroll Now
          </button> */}

        </div>
      </div>

      {viewMode === 'landing' && (
        <div className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${isMobileMenuOpen ? 'max-h-[420px]' : 'max-h-0'}`}>
          <nav className="flex flex-col gap-3 px-6 pb-4 pt-10 text-sm font-bold uppercase tracking-wider text-slate-700 border-t border-slate-200 bg-white/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 transition-colors hover:bg-[#d4eb14] hover:text-black p-2 w-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookNow();
              }}
              className="w-full py-3 mt-2 bg-[#E8FF1A] hover:bg-[#d4eb14] text-black rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all shadow"
            >
              Enroll Now
            </button> */}
          </nav>
        </div>
      )}
    </header>
  );
}
