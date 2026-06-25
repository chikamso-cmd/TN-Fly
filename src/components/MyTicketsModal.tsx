import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Camera, Calendar, MapPin, ShieldCheck, Mail, Phone, Download, Clock, DollarSign } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import { BookingRequest } from '../types';

interface MyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyTicketsModal({ isOpen, onClose }: MyTicketsModalProps) {
  const [emailInput, setEmailInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundBookings, setFoundBookings] = useState<BookingRequest[]>([]);
  const { bookings, theme } = useTicketStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const matched = bookings.filter(
      (b) => b.email.toLowerCase() === emailInput.trim().toLowerCase()
    );
    setFoundBookings(matched);
    setSearched(true);
  };

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full max-w-4xl rounded-2xl border p-6 md:p-8 overflow-hidden z-10 ${
              isDark 
                ? 'bg-slate-900 text-slate-100 border-slate-800 shadow-2xl' 
                : 'bg-white text-slate-900 border-slate-200 shadow-2xl'
            }`}
            id="my-tickets-modal"
          >
            {/* Background design accents */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="font-display font-black text-xl md:text-2xl flex items-center gap-2">
                  <Camera className="text-sky-500 w-6 h-6" />
                  My Booking Portal
                </h3>
                <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Retrieve your TN Fly flight registrations, custom quotes, invoices, and authorization status.
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-8 relative z-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter the email address used during booking..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs transition-all focus:outline-none ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-sky-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-500'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-450 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Retrieve Bookings
                </button>
              </div>
            </form>

            {/* Results Grid */}
            <div className="max-h-[50vh] overflow-y-auto pr-2 relative z-10">
              {!searched ? (
                <div className="text-center py-12 flex flex-col items-center justify-center">
                  <div className="p-4 rounded-full bg-sky-500/10 mb-4">
                    <Search className="w-8 h-8 text-sky-400" />
                  </div>
                  <h4 className="font-semibold text-base mb-1">Search Your Drone Bookings</h4>
                  <p className={`text-xs max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Enter the email address you specified during checkout. We will instantly locate all drone flight histories.
                  </p>
                </div>
              ) : foundBookings.length === 0 ? (
                <div className={`text-center py-12 flex flex-col items-center justify-center border rounded-xl border-dashed p-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <h4 className="font-semibold text-base text-rose-400 mb-2">No Bookings Found</h4>
                  <p className={`text-xs max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    We couldn't find any bookings matching <strong className="text-sky-400">{emailInput}</strong>. 
                    Please ensure spelling is correct. If you just placed a booking, it may take a brief moment to log.
                  </p>
                  <div className="mt-4 flex gap-3 text-[10px] uppercase font-bold text-slate-500">
                    <span>Quick presets:</span>
                    <button 
                      type="button"
                      onClick={() => { setEmailInput('alex.wright@gmail.com'); }}
                      className="text-sky-400 hover:underline cursor-pointer"
                    >
                      alex.wright@gmail.com
                    </button>
                    <button 
                      type="button"
                      onClick={() => { setEmailInput('michael.okon@techdev.ng'); }}
                      className="text-sky-400 hover:underline cursor-pointer"
                    >
                      michael.okon@techdev.ng
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
                      Found {foundBookings.length} Booking(s)
                    </span>
                  </div>

                  {foundBookings.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col md:flex-row gap-6 ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {/* LEFT: Booking Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {b.packageName}
                          </span>
                          <span className={`text-[9px] px-2.5 py-1 rounded font-bold uppercase tracking-wider border ${
                            b.paymentStatus === 'paid'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {b.paymentStatus === 'paid' ? 'Paid & Authorized' : 'Pending Payment'}
                          </span>
                        </div>

                        <div>
                          <h4 className={`font-display font-black text-base uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {b.serviceType}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">Reference: {b.referenceId}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar className="w-4 h-4 text-sky-500 flex-shrink-0" />
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{b.eventDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                            <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{b.eventLocation}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4 text-sky-500 flex-shrink-0" />
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{b.eventDuration} Hours Scheduled</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <DollarSign className="w-4 h-4 text-sky-500 flex-shrink-0" />
                            <span className="font-bold text-sky-400">${b.totalPrice} Paid</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-500/10 flex flex-wrap justify-between items-center gap-4 text-[10px] text-slate-500">
                          <div>
                            <span>Client Name:</span>
                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>{b.fullName}</p>
                          </div>
                          <div>
                            <span>Phone:</span>
                            <p className={`font-mono ${isDark ? 'text-white' : 'text-slate-950'}`}>{b.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT: Actions */}
                      <div className="flex flex-col items-center justify-center md:border-l md:border-dashed md:border-slate-800 md:pl-6 text-center shrink-0">
                        <button
                          onClick={() => {
                            alert(`Downloading Invoice for Reference: ${b.referenceId}`);
                          }}
                          className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-white transition-colors border border-sky-500/30 px-4 py-2 rounded-xl bg-sky-950/20 hover:bg-sky-500 cursor-pointer font-bold"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF Invoice</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Notice Footer */}
            <div className="mt-6 pt-4 border-t border-slate-500/10 text-center flex items-center justify-center gap-1.5 text-xs text-slate-500 relative z-10">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
              <span>Verified Secure Connection. Standard FAA Clearances synchronized.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
