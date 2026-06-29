import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Store
import { useTicketStore } from './store/ticketStore';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs'; // Rendered as Drone Feature Diagram
import VideoShowcase from './components/VideoShowcase';
import PortfolioGallerySection from './components/PortfolioGallerySection'; // Rendered as Custom Media & Video Gallery
import Testimonials from './components/Testimonials';
// import BlogSection from './components/BlogSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

// Modals / Portals
import CheckoutModal from './components/CheckoutModal';
// import MyTicketsModal from './components/MyTicketsModal';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import CTASection from './components/CTASection';

export default function App() {
  const { faqs } = useTicketStore();

  const [viewMode, setViewMode] = useState<'landing' | 'admin'>('landing');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState<string | undefined>(undefined);
  const [isMyTicketsOpen, setIsMyTicketsOpen] = useState(false);

  // Trigger brief introductory toast upon application boot
  useEffect(() => {
    toast.info('Welcome to TN Fly Drone Aerial Services!', {
      position: 'bottom-right',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  }, []);

  const handleOpenCheckout = (ticketTypeId?: string) => {
    setSelectedTicketTypeId(ticketTypeId);
    setIsCheckoutOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#E8FF1A] selection:text-black" id="app-wrapper">

      {/* Toast Notifications */}
      <ToastContainer limit={3} aria-label="Secure Booking Notifications" />

      {/* Persistent Navigation */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenMyBookings={() => setIsMyTicketsOpen(true)}
        onBookNow={() => handleOpenCheckout('CTA')}
      />

      {/* Main Content Render */}
      {viewMode === 'landing' ? (
        <main className="animate-[fadeIn_0.5s_ease]">

          {/* 1. Hero segment with flexed side-by-side design */}
          <HeroSection
            onExplore={() => handleScrollToSection('portfolio')}
            onContact={() => handleScrollToSection('contact')}
          />

          {/* 2. About us info with counters */}
          <AboutSection />

          {/* 3. Premium drone services section */}
          <ServicesSection
            onSelectService={(serviceName) => handleOpenCheckout(serviceName)}
          />

          {/* 4. Drone Feature Diagram */}
          <WhyChooseUs />

          {/* 5. Video Showcase Section */}
          <VideoShowcase />

          {/* 6. Dynamic Video and Image Portfolio Gallery */}
          <PortfolioGallerySection />

          {/* 7. Authentic client comments */}
          <Testimonials />

          {/* 8. Flight Notes & Stories Blog Section */}
          <CTASection />

          {/* 9. Expandable drone FAQs */}
          <FaqSection
            faqs={faqs}
          />
          {/* 9. Expandable drone FAQs */}
          <Contact />

          {/* 10. Global Footer */}
          <Footer />

        </main>

      ) : (
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Organizer operations control panel */}
          <Dashboard />

        </div>
      )}

      {/* Checkout wizard modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialTicketTypeId={selectedTicketTypeId}
      />

      {/* My Tickets Look-up digital wallet */}
      {/* <MyTicketsModal 
        isOpen={isMyTicketsOpen} 
        onClose={() => setIsMyTicketsOpen(false)} 
      /> */}

    </div>
  );
}
