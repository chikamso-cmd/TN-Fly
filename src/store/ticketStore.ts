import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DroneService, DronePackage, BookingRequest, Transaction, Testimonial, FAQ, DashboardStats } from '../types';

interface AppStore {
  services: DroneService[];
  packages: DronePackage[];
  bookings: BookingRequest[];
  transactions: Transaction[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  
  // Bookings
  addBooking: (booking: BookingRequest) => void;
  updateBookingStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  updateBookingPaymentStatus: (id: string, paymentStatus: 'pending' | 'paid' | 'failed') => void;
  
  // Packages
  addPackage: (pkg: DronePackage) => void;
  updatePackage: (pkg: DronePackage) => void;
  deletePackage: (id: string) => void;
  
  // Transactions
  addTransaction: (tx: Transaction) => void;
  
  // Helper to query stats
  getStats: () => DashboardStats;
}

const initialServices: DroneService[] = [
  {
    id: 's-birthday',
    title: 'Birthday Coverage',
    description: 'Breathtaking aerial views of your outdoor birthday celebrations, capturing the scale, the venue, and vibrant guests from above.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600',
    startingPrice: 150
  },
  {
    id: 's-wedding',
    title: 'Wedding Coverage',
    description: 'Elegant, sweeping cinematic shots of your special day. Capture the cathedral, gardens, grand entrance, and romantic sunset walks.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
    startingPrice: 350
  },
  {
    id: 's-engagement',
    title: 'Engagement Coverage',
    description: 'Intimate and dramatic high-resolution aerial storytelling for your proposal and outdoor engagement photoshoots.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
    startingPrice: 200
  },
  {
    id: 's-burial',
    title: 'Burial Coverage',
    description: 'Serene and respectful aerial photography capturing the memorial grounds, layouts, and peaceful tribute gatherings.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    startingPrice: 180
  },
  {
    id: 's-corporate',
    title: 'Corporate Events',
    description: 'Professional video marketing of corporate retreats, product launches, outdoor conferences, and campus real estate assets.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
    startingPrice: 400
  },
  {
    id: 's-realestate',
    title: 'Real Estate Photography',
    description: 'Stunning HDR aerial photos and 4K property walkthroughs showcasing boundaries, neighborhood, and layout advantages.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600',
    startingPrice: 250
  },
  {
    id: 's-mapping',
    title: 'School Mapping',
    description: 'High-precision 2D orthomosaic maps, topographic data, and high-definition promotional material for school boards.',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600',
    startingPrice: 500
  },
  {
    id: 's-fullevent',
    title: 'Full Event Coverage',
    description: 'All-inclusive multi-angle aerial photography and videography from dawn to dusk, tailored for massive festivals and sports gatherings.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
    startingPrice: 800
  },
  {
    id: 's-highlights',
    title: 'Highlight Clips',
    description: 'Polished, 60-second social-media ready cinematic highlight reels, synced to licensed modern audio tracks.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600',
    startingPrice: 120
  },
  {
    id: 's-promotional',
    title: 'Promotional Videos',
    description: 'Premium business marketing campaigns featuring high-speed drone visuals, active text integration, and professional color grading.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600',
    startingPrice: 300
  }
];

const initialPackages: DronePackage[] = [
  {
    id: 'pkg-basic',
    name: 'Basic Package',
    price: 299,
    badge: 'Standard',
    features: [
      'UHD 4K Drone Photography',
      '15 Edited Ultra-HD Digital Photos',
      'Digital Cloud Delivery in 48 Hours',
      '1 Licensed FAA Part 107 Pilot',
      'Full Rights and Royalty Release'
    ]
  },
  {
    id: 'pkg-standard',
    name: 'Standard Package',
    price: 549,
    badge: 'Best Value',
    isPopular: true,
    features: [
      'UHD 4K Drone Photography',
      'UHD 4K Drone Video Coverage (up to 2h)',
      '3-Min Cinematic Highlight Film',
      '30 Edited Ultra-HD Photos',
      'Digital Delivery in 5 Days',
      'Professional Editing & Sound Design'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Premium Package',
    price: 999,
    badge: 'Elite Cinema',
    features: [
      'Full Event Multi-angle Drone Coverage',
      'Cinematic UHD 4K Video (unlimited)',
      'Edited 5-Min Highlights Film',
      'All Raw Footage Provided on Delivery',
      '50+ Edited Ultra-HD Photos',
      'Priority 48-Hour delivery',
      'Pre-event Site Survey & Flight Path Planning'
    ]
  }
];

const initialBookings: BookingRequest[] = [
  {
    id: 'bk-91f82c',
    referenceId: 'TNF-2026-X8392',
    fullName: 'David Adeleke',
    email: 'david.ade@weddingstudio.ng',
    phone: '+234 813 490 2831',
    serviceType: 'Wedding Coverage',
    eventDate: '2026-07-15',
    eventLocation: 'LaCampagne Tropicana Beach Resort, Lagos',
    eventDuration: 5,
    attendeesCount: 300,
    specialRequests: 'Would love some sweeping beach sunset shots and coverage of the outdoor altar exchange.',
    totalPrice: 549,
    packageName: 'Standard Package',
    packageId: 'pkg-standard',
    paymentMethod: 'Paystack',
    paymentStatus: 'paid',
    status: 'approved',
    createdAt: '2026-06-20T10:14:00Z'
  },
  {
    id: 'bk-b7a120',
    referenceId: 'TNF-2026-R1920',
    fullName: 'Sophia Jenkins',
    email: 'sophia.j@primeproperties.com',
    phone: '+1 (555) 902-1823',
    serviceType: 'Real Estate Photography',
    eventDate: '2026-06-28',
    eventLocation: 'Vantage Point Hill Estates, San Francisco',
    eventDuration: 2,
    attendeesCount: 15,
    specialRequests: 'We need mapping-style overview and orbital loops of the 5-acre property boundaries.',
    totalPrice: 299,
    packageName: 'Basic Package',
    packageId: 'pkg-basic',
    paymentMethod: 'Debit Card',
    paymentStatus: 'paid',
    status: 'approved',
    createdAt: '2026-06-22T14:45:00Z'
  },
  {
    id: 'bk-e8c390',
    referenceId: 'TNF-2026-W4291',
    fullName: 'John Olamide',
    email: 'olamide.j@schoolboard.edu',
    phone: '+234 905 182 3123',
    serviceType: 'School Mapping',
    eventDate: '2026-08-01',
    eventLocation: 'Greenwood High Academy Campus Grounds',
    eventDuration: 8,
    attendeesCount: 50,
    specialRequests: 'Require highly detailed 2D orthomosaic scan and standard elevation details.',
    totalPrice: 999,
    packageName: 'Premium Package',
    packageId: 'pkg-premium',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'pending',
    status: 'pending',
    createdAt: '2026-06-23T11:30:00Z'
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 'tx-001',
    bookingId: 'bk-91f82c',
    bookingReference: 'TNF-2026-X8392',
    clientName: 'David Adeleke',
    serviceType: 'Wedding Coverage',
    amount: 549,
    paymentMethod: 'Paystack',
    status: 'successful',
    date: '2026-06-20T10:15:30Z'
  },
  {
    id: 'tx-002',
    bookingId: 'bk-b7a120',
    bookingReference: 'TNF-2026-R1920',
    clientName: 'Sophia Jenkins',
    serviceType: 'Real Estate Photography',
    amount: 299,
    paymentMethod: 'Debit Card',
    status: 'successful',
    date: '2026-06-22T14:47:15Z'
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Jenkins',
    role: 'Real Estate Developer, Prime Properties',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    comment: 'TN Fly captured our estate listings beautifully. The response rate increased by 40% after adding their stunning 4K drone videography! Truly premium visuals.'
  },
  {
    id: 't-2',
    name: 'Damilola Adebayo',
    role: 'Event Director, Elite Weddings & Events',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    comment: 'Absolutely spectacular results! The wedding cinematic video they made was magical. Their pilots are professional and very attentive to safety and framing.'
  },
  {
    id: 't-3',
    name: 'Marcus Sterling',
    role: 'Headmaster, Greenwood High Academy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    comment: 'The 2D orthomosaic school mapping they provided helped our construction planning immensely. Highly detailed visuals and extremely reliable service.'
  }
];

const initialFAQs: FAQ[] = [
  {
    id: 'f-1',
    question: 'How far in advance should I book my service?',
    answer: 'We recommend booking at least 2 to 4 weeks in advance to secure your preferred date, plan flight paths, obtain airspace clearances, and run standard safety surveys.'
  },
  {
    id: 'f-2',
    question: 'Do you travel outside my home state?',
    answer: 'Yes! TN Fly provides nationwide coverage. We regularly fly events across different regions. Standard travel rates apply for bookings outside our primary service zones.'
  },
  {
    id: 'f-3',
    question: 'How long does visual editing and delivery take?',
    answer: 'Standard editing and delivery take 3 to 5 business days. Our Premium Package includes priority 48-hour delivery. RAW footage can also be provided immediately upon flight completion.'
  },
  {
    id: 'f-4',
    question: 'What happens during unfavorable weather conditions?',
    answer: 'Safety is our absolute priority. In case of heavy rain, strong winds, or restricted airspace weather, we coordinate with you to reschedule for a clear day at no additional cost, or offer a 100% refund.'
  },
  {
    id: 'f-5',
    question: 'Are your drone operators certified and insured?',
    answer: 'Yes. All TN Fly operators are licensed under FAA Part 107 (or respective regional aviation guidelines) and carry comprehensive flight and property damage insurance.'
  }
];

export const useTicketStore = create<AppStore>()(
  persist(
    (set, get) => ({
      services: initialServices,
      packages: initialPackages,
      bookings: initialBookings,
      transactions: initialTransactions,
      testimonials: initialTestimonials,
      faqs: initialFAQs,
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
      
      updateBookingStatus: (id, status) => set((state) => ({
        bookings: state.bookings.map((bk) => bk.id === id ? { ...bk, status } : bk)
      })),
      
      updateBookingPaymentStatus: (id, paymentStatus) => set((state) => {
        const bookings = state.bookings.map((bk) => {
          if (bk.id === id) {
            const updatedBk = { ...bk, paymentStatus };
            // If transitioned to paid, generate a Transaction
            if (paymentStatus === 'paid') {
              const txExists = state.transactions.some(tx => tx.bookingId === id);
              if (!txExists) {
                const newTx: Transaction = {
                  id: `tx-${Math.random().toString(36).substr(2, 9)}`,
                  bookingId: id,
                  bookingReference: bk.referenceId,
                  clientName: bk.fullName,
                  serviceType: bk.serviceType,
                  amount: bk.totalPrice,
                  paymentMethod: bk.paymentMethod || 'Debit Card',
                  status: 'successful',
                  date: new Date().toISOString()
                };
                setTimeout(() => {
                  set((prev) => ({ transactions: [newTx, ...prev.transactions] }));
                }, 0);
              }
            }
            return updatedBk;
          }
          return bk;
        });
        return { bookings };
      }),
      
      addPackage: (pkg) => set((state) => ({ packages: [...state.packages, pkg] })),
      
      updatePackage: (updated) => set((state) => ({
        packages: state.packages.map((p) => p.id === updated.id ? updated : p)
      })),
      
      deletePackage: (id) => set((state) => ({
        packages: state.packages.filter((p) => p.id !== id)
      })),
      
      addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
      
      getStats: () => {
        const state = get();
        const totalBookings = state.bookings.length;
        const approvedBookings = state.bookings.filter(b => b.status === 'approved').length;
        const upcomingEvents = state.bookings.filter(b => b.status === 'approved' && new Date(b.eventDate) >= new Date()).length;
        
        const revenue = state.transactions
          .filter(t => t.status === 'successful')
          .reduce((sum, t) => sum + t.amount, 0);
          
        const conversionRate = totalBookings > 0 ? parseFloat(((approvedBookings / totalBookings) * 100).toFixed(1)) : 82.5;
        
        return {
          totalBookings,
          revenue,
          upcomingEvents,
          conversionRate
        };
      }
    }),
    {
      name: 'tn-fly-app-storage-v1',
    }
  )
);
