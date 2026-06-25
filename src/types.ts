export interface DroneService {
  id: string;
  title: string;
  description: string;
  image: string;
  startingPrice: number;
}

export interface DronePackage {
  id: string;
  name: string;
  price: number;
  features: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface BookingRequest {
  id: string;
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate: string;
  eventLocation: string;
  eventDuration: number; // in hours
  attendeesCount?: number;
  specialRequests?: string;
  referenceFile?: string; // Simulated file path/name
  packageId?: string; // Optional links to packages
  packageName?: string;
  totalPrice: number;
  paymentMethod?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Transaction {
  id: string;
  bookingId: string;
  bookingReference: string;
  clientName: string;
  serviceType: string;
  amount: number;
  paymentMethod: string;
  status: 'successful' | 'pending' | 'failed';
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface DashboardStats {
  totalBookings: number;
  revenue: number;
  upcomingEvents: number;
  conversionRate: number;
}
