import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Users, Calendar, DollarSign, Search, 
  Plus, Edit2, Trash2, Download, Save, Eye, EyeOff,
  Sparkles, CheckCircle2, RefreshCw, Layers, PlusCircle, Check, X, ShieldAlert, BadgeInfo
} from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import { DronePackage, BookingRequest } from '../types';

export default function Dashboard() {
  const { 
    packages, bookings, transactions, theme,
    addPackage, updatePackage, deletePackage,
    updateBookingStatus, updateBookingPaymentStatus, getStats
  } = useTicketStore();

  const stats = getStats();

  // Tab controls
  const [activeTab, setActiveTab] = useState<'analytics' | 'packages' | 'bookings'>('analytics');

  // Search/Filter control
  const [bookingSearch, setBookingSearch] = useState('');
  const [selectedPackageFilter, setSelectedPackageFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Package Edit Form Control
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);

  // Form State for Package
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState(299);
  const [formBadge, setFormBadge] = useState('');
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formFeaturesText, setFormFeaturesText] = useState('');

  // CSV Export simulator
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Booking ID", "Reference ID", "Client Name", "Email", "Phone", "Service Type", "Package", "Duration (Hrs)", "Total Price", "Date", "Status", "Payment"].join(",") + "\n"
      + bookings.map(b => [
          b.id, 
          b.referenceId,
          b.fullName, 
          b.email, 
          b.phone, 
          b.serviceType, 
          b.packageName, 
          b.eventDuration,
          `$${b.totalPrice}`, 
          b.eventDate,
          b.status,
          b.paymentStatus
        ].join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tn_fly_drone_bookings_manifest.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditPackage = (pkg: DronePackage) => {
    setEditingPackageId(pkg.id);
    setFormName(pkg.name);
    setFormPrice(pkg.price);
    setFormBadge(pkg.badge || '');
    setFormIsPopular(!!pkg.isPopular);
    setFormFeaturesText(pkg.features.join('\n'));
    setIsCreatingPackage(true);
  };

  const handleCreateNewClick = () => {
    setEditingPackageId(null);
    setFormName('Custom Service Package');
    setFormPrice(450);
    setFormBadge('Special');
    setFormIsPopular(false);
    setFormFeaturesText('UHD 4K Drone Photography\n30 Mins Edited Walkthrough Reel\nNext-Day Quick Delivery\nFAA Licensed Pilot\nCommercial Rights Transfer');
    setIsCreatingPackage(true);
  };

  const handleSavePackageForm = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresList = formFeaturesText.split('\n').map(f => f.trim()).filter(f => f.length > 0);

    if (editingPackageId) {
      const updated: DronePackage = {
        id: editingPackageId,
        name: formName,
        price: Number(formPrice),
        badge: formBadge || undefined,
        isPopular: formIsPopular,
        features: featuresList
      };
      updatePackage(updated);
    } else {
      const newId = 'pkg-' + Math.random().toString(36).substr(2, 6);
      const newPkg: DronePackage = {
        id: newId,
        name: formName,
        price: Number(formPrice),
        badge: formBadge || undefined,
        isPopular: formIsPopular,
        features: featuresList
      };
      addPackage(newPkg);
    }

    setIsCreatingPackage(false);
  };

  const isDark = theme === 'dark';

  // Filtered bookings list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.referenceId.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(bookingSearch.toLowerCase());
    
    const matchesPackage = 
      selectedPackageFilter === 'all' || 
      b.packageName === selectedPackageFilter ||
      b.packageId === selectedPackageFilter;

    const matchesStatus =
      selectedStatusFilter === 'all' ||
      b.status === selectedStatusFilter ||
      b.paymentStatus === selectedStatusFilter;

    return matchesSearch && matchesPackage && matchesStatus;
  });

  return (
    <div className={`p-6 md:p-10 rounded-3xl border transition-colors duration-300 ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`} id="admin-dashboard-root">
      
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <span className="text-[10px] bg-sky-500/10 text-sky-400 px-3 py-1 rounded border border-sky-500/20 uppercase tracking-widest font-bold inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            ORGANIZER OPERATIONS GATEWAY
          </span>
          <h2 className={`font-display font-black text-2xl md:text-3xl uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            TN Fly Admin Control Center
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-sky-500 text-white shadow-lg'
                : isDark
                  ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-950 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-sky-500 text-white shadow-lg'
                : isDark
                  ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-950 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Packages ({packages.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-sky-500 text-white shadow-lg'
                : isDark
                  ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-950 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Bookings ({bookings.length})
          </button>
        </div>
      </div>

      {/* RENDER ANALYTICS MODULE */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block">Total Sales Revenue</span>
                <span className={`font-display font-black text-xl md:text-2xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  ${stats.revenue.toLocaleString()}
                </span>
                <span className="text-[9px] text-emerald-400 font-semibold block mt-0.5">
                  +18.4% vs last week
                </span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-3 bg-sky-500/15 text-sky-400 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block">Total Flight Bookings</span>
                <span className={`font-display font-black text-xl md:text-2xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {stats.totalBookings} <span className="text-xs text-slate-500 font-normal">registered</span>
                </span>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-3 bg-amber-500/15 text-amber-400 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block">Upcoming Flights</span>
                <span className={`font-display font-black text-xl md:text-2xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {stats.upcomingEvents} <span className="text-xs text-slate-500 font-normal">scheduled</span>
                </span>
                <span className="text-[9px] text-amber-400 font-semibold block mt-0.5">
                  FAA clearance ready
                </span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex items-center gap-4 ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="p-3 bg-blue-500/15 text-blue-400 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block">Booking Authorization</span>
                <span className={`font-display font-black text-xl md:text-2xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {stats.conversionRate}%
                </span>
                <div className="h-5 mt-1">
                  <svg className="w-24 h-full" viewBox="0 0 100 30">
                    <path
                      d="M 0 25 Q 20 10 40 22 T 80 5 T 100 12"
                      fill="none; outline: none;"
                      stroke="#0ea5e9"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Vector Chart Panel */}
          <div className={`p-5 md:p-6 rounded-2xl border ${isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className={`font-bold text-sm uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Flight Revenue Matrix</h4>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Cumulative daily gross receipts generated from customized flights and video package sales.</p>
              </div>
              <span className="text-[9px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                LIVE TELEMETRY
              </span>
            </div>

            {/* Custom SVG area chart curve */}
            <div className="relative pt-4">
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Guide lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeDasharray="3,3" />
                <line x1="0" y1="60" x2="500" y2="60" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeDasharray="3,3" />
                <line x1="0" y1="100" x2="500" y2="100" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeDasharray="3,3" />
                
                {/* Closed path for filled gradient */}
                <path
                  d="M 0 110 C 50 100, 100 70, 150 78 C 200 88, 250 40, 300 48 C 350 58, 400 15, 450 18 C 475 20, 500 10, 500 10 L 500 120 L 0 120 Z"
                  fill="url(#revenue-gradient)"
                />

                {/* Highlighted stroke path */}
                <path
                  d="M 0 110 C 50 100, 100 70, 150 78 C 200 88, 250 40, 300 48 C 350 58, 400 15, 450 18 C 475 20, 500 10, 500 10"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Highlighting points */}
                <circle cx="150" cy="78" r="4.5" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />
                <circle cx="300" cy="48" r="4.5" fill="#0ea5e9" stroke="#fff" strokeWidth="1.5" />
                <circle cx="450" cy="18" r="5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
              </svg>
              
              {/* X-axis indicators */}
              <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-3.5 px-2">
                <span>Jun 15</span>
                <span>Jun 17</span>
                <span>Jun 19</span>
                <span>Jun 21</span>
                <span>Jun 23</span>
                <span>Jun 24 (Today)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER PACKAGES MANAGEMENT MODULE */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Drone Packages
            </h3>
            <button
              onClick={handleCreateNewClick}
              className="px-4 py-2 bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 hover:bg-sky-450 transition-all shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Create Custom Package
            </button>
          </div>

          {/* Package creation form */}
          {isCreatingPackage && (
            <motion.form
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSavePackageForm}
              className={`p-5 rounded-2xl border space-y-4 shadow-xl ${
                isDark ? 'bg-slate-950/80 border-sky-500/20' : 'bg-slate-50 border-sky-500/20'
              }`}
            >
              <h4 className="font-semibold text-xs text-sky-400 flex items-center gap-1.5 uppercase">
                <Edit2 className="w-3.5 h-3.5" />
                {editingPackageId ? 'Configure Package Settings' : 'Create Custom Flight Package'}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Package Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Pricing Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Badge / Ribbon (e.g. Best Value, Popular, Gold)</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="None"
                    className={`w-full p-2.5 rounded-lg border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                  />
                </div>

                <div className="space-y-1 flex items-center pt-5 pl-1">
                  <input
                    type="checkbox"
                    id="is-popular-checkbox"
                    checked={formIsPopular}
                    onChange={(e) => setFormIsPopular(e.target.checked)}
                    className="w-4.5 h-4.5 rounded text-sky-500 bg-slate-900 border-slate-800 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="is-popular-checkbox" className="text-[11px] text-slate-300 font-medium ml-2.5 cursor-pointer">
                    Highlight as Popular Package
                  </label>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Package Features list (One feature per line)</label>
                  <textarea
                    rows={5}
                    required
                    value={formFeaturesText}
                    onChange={(e) => setFormFeaturesText(e.target.value)}
                    placeholder="UHD 4K Drone Photography&#10;3-Min Cinematic Highlight Film&#10;Full Rights and Release"
                    className={`w-full p-2.5 rounded-lg border focus:outline-none font-mono text-[11px] ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreatingPackage(false)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 text-white text-xs font-bold uppercase rounded-lg hover:bg-sky-450 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Package
                </button>
              </div>
            </motion.form>
          )}

          {/* List of active packages */}
          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    {pkg.badge && (
                      <span className="text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {pkg.badge}
                      </span>
                    )}
                    {pkg.isPopular && (
                      <span className="text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Featured
                      </span>
                    )}
                    <h4 className={`font-bold text-sm md:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                    <span>Pricing: <strong className="text-sky-400">${pkg.price}</strong></span>
                    <span>Includes: <strong className={isDark ? 'text-white' : 'text-slate-700'}>{pkg.features.length} Features</strong></span>
                  </div>
                  <ul className="text-[10px] text-slate-400 list-disc pl-4 space-y-0.5">
                    {pkg.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                    {pkg.features.length > 3 && <li>And {pkg.features.length - 3} more...</li>}
                  </ul>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleEditPackage(pkg)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    title="Edit details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {packages.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm('Delete this flight package? This will remove it from the frontend.')) {
                          deletePackage(pkg.id);
                        }
                      }}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        isDark ? 'bg-slate-900 border-slate-800 text-rose-500 hover:bg-rose-950/20' : 'bg-white border-slate-200 text-rose-600 hover:bg-rose-50'
                      }`}
                      title="Delete package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER BOOKINGS DIRECTORY */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Drone Booking Registry
            </h3>

            <button
              onClick={handleExportCSV}
              className={`px-4 py-2 border rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-950'
              }`}
            >
              <Download className="w-4 h-4" />
              Export CSV Manifest
            </button>
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by client name, email, flight type, or reference ID..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <select
              value={selectedPackageFilter}
              onChange={(e) => setSelectedPackageFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border text-xs focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="all">All Packages</option>
              {packages.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border text-xs focus:outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Flight: Pending Approval</option>
              <option value="approved">Flight: Approved</option>
              <option value="rejected">Flight: Rejected</option>
              <option value="paid">Payment: Paid</option>
            </select>
          </div>

          {/* Bookings Directory Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`${isDark ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-600'} font-semibold border-b border-slate-800`}>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Client details</th>
                  <th className="p-3">Service & Package</th>
                  <th className="p-3">Flight Logistics</th>
                  <th className="p-3">Price Paid</th>
                  <th className="p-3">Flight status</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500 font-medium">
                      No matching drone flights or quotes found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className={isDark ? 'hover:bg-slate-950/40' : 'hover:bg-slate-50/50'}>
                      <td className="p-3 font-mono font-bold text-sky-400 uppercase">{b.referenceId}</td>
                      <td className="p-3">
                        <p className="font-semibold">{b.fullName}</p>
                        <p className="text-[10px] text-slate-500">{b.email}</p>
                        <p className="text-[10px] text-slate-500">{b.phone}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold">{b.serviceType}</p>
                        <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 font-bold">
                          {b.packageName}
                        </span>
                      </td>
                      <td className="p-3 space-y-0.5">
                        <p className="text-[10px]"><span className="text-slate-500">Date:</span> {b.eventDate}</p>
                        <p className="text-[10px] max-w-xs truncate"><span className="text-slate-500">Loc:</span> {b.eventLocation}</p>
                        <p className="text-[10px]"><span className="text-slate-500">Duration:</span> {b.eventDuration} Hours</p>
                      </td>
                      <td className="p-3 font-mono font-bold text-sky-400">${b.totalPrice}</td>
                      <td className="p-3">
                        <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                          b.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : b.status === 'rejected'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${
                          b.paymentStatus === 'paid'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Toggle Approval status */}
                          {b.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(b.id, 'approved')}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[10px] uppercase tracking-wider cursor-pointer"
                                title="Approve booking"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateBookingStatus(b.id, 'rejected')}
                                className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded text-[10px] uppercase tracking-wider cursor-pointer"
                                title="Reject flight"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {/* Toggle Payment status */}
                          <button
                            onClick={() => {
                              const nextPay = b.paymentStatus === 'paid' ? 'pending' : 'paid';
                              updateBookingPaymentStatus(b.id, nextPay);
                            }}
                            className={`px-2 py-1 border rounded text-[10px] uppercase tracking-wider font-semibold cursor-pointer ${
                              isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
                            }`}
                            title="Toggle payment status"
                          >
                            Mark {b.paymentStatus === 'paid' ? 'Unpaid' : 'Paid'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
