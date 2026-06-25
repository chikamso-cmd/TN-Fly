import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, MapPin, User, Mail, Phone, Clock, Users, 
  UploadCloud, ShieldCheck, FileText, CreditCard, ArrowLeft, 
  ArrowRight, Download, Sparkles, Check, CheckCircle
} from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import { BookingRequest } from '../types';
import { toast } from 'react-toastify';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTicketTypeId?: string; // Reused as initial service type name if passed
}

// Zod schema for form validation
const bookingSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please provide a valid email address' }),
  phone: z.string().min(8, { message: 'Please provide a valid phone number' }),
  serviceType: z.string().min(1, { message: 'Please select a service type' }),
  eventDate: z.string().min(1, { message: 'Please select a valid event date' }),
  eventLocation: z.string().min(5, { message: 'Please share a detailed event location' }),
  eventDuration: z.number().min(1, { message: 'Duration must be at least 1 hour' }).max(24),
  attendeesCount: z.number().optional(),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function CheckoutModal({ isOpen, onClose, initialTicketTypeId }: CheckoutModalProps) {
  const { services, packages, addBooking, updateBookingPaymentStatus, theme } = useTicketStore();
  const isDark = theme === 'dark';

  const [step, setStep] = useState(1);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('Paystack');
  const [simulatedFile, setSimulatedFile] = useState<string | null>(null);
  const [createdBooking, setCreatedBooking] = useState<BookingRequest | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Form setup with React Hook Form & Zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      serviceType: initialTicketTypeId || 'Wedding Coverage',
      eventDate: '',
      eventLocation: '',
      eventDuration: 4,
      attendeesCount: 50,
      specialRequests: ''
    }
  });

  const watchedServiceType = watch('serviceType');
  const watchedDuration = watch('eventDuration');

  // Sync initial service type when modal triggers
  useEffect(() => {
    if (isOpen) {
      if (initialTicketTypeId) {
        setValue('serviceType', initialTicketTypeId);
      }
      setStep(1);
      setCreatedBooking(null);
      setSimulatedFile(null);
      setIsProcessingPayment(false);
    }
  }, [isOpen, initialTicketTypeId, setValue]);

  if (!isOpen) return null;

  // Calculate prices dynamically
  const selectedService = services.find(s => s.title === watchedServiceType) || services[0];
  const selectedPackage = packages.find(p => p.id === selectedPackageId) || packages[1];
  
  // Custom formula: base starting price + hourly rate for durations beyond 2h
  const basePrice = selectedService ? selectedService.startingPrice : 150;
  const packagePrice = selectedPackage ? selectedPackage.price : 549;
  const durationModifier = watchedDuration > 2 ? (watchedDuration - 2) * 50 : 0;
  
  // Total Price is standard Package Price + duration modifiers
  const finalPrice = packagePrice + durationModifier;

  // Handle Drag & Drop File Simulation
  const handleFileDropSimulate = (e: React.DragEvent) => {
    e.preventDefault();
    setSimulatedFile('storyboard_reference.mp4 (4.8 MB)');
    toast.success('Reference storyboard file selected!', { autoClose: 2000 });
  };

  const selectSimulatedFileClick = () => {
    setSimulatedFile('inspiration_layout_design.png (1.2 MB)');
    toast.success('Mock reference image attached!', { autoClose: 2000 });
  };

  // Submit Step 1: Save request details
  const onSubmitBooking = (data: BookingFormValues) => {
    const referenceCode = 'TNF-2026-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const newBooking: BookingRequest = {
      id: 'bk-' + Math.random().toString(36).substr(2, 9),
      referenceId: referenceCode,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      serviceType: data.serviceType,
      eventDate: data.eventDate,
      eventLocation: data.eventLocation,
      eventDuration: data.eventDuration,
      attendeesCount: data.attendeesCount,
      specialRequests: data.specialRequests,
      referenceFile: simulatedFile || undefined,
      packageId: selectedPackageId,
      packageName: selectedPackage.name,
      totalPrice: finalPrice,
      paymentStatus: 'pending',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setCreatedBooking(newBooking);
    setStep(2); // Go to Package & Review Selection
  };

  // Step 2 Proceed
  const handleProceedToPayment = () => {
    if (createdBooking) {
      // Update package configuration inside the created booking object
      const updated = {
        ...createdBooking,
        packageId: selectedPackageId,
        packageName: selectedPackage.name,
        totalPrice: finalPrice,
        paymentMethod: paymentMethod
      };
      setCreatedBooking(updated);
      setStep(3); // Go to Secure payment gateway
    }
  };

  // Step 3: Trigger payment confirmation
  const handleProcessPayment = () => {
    if (!createdBooking) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      // Complete booking registration in state
      const completedBooking: BookingRequest = {
        ...createdBooking,
        paymentStatus: 'paid',
        status: 'approved' // Automatically approved on immediate payments
      };

      addBooking(completedBooking);
      setCreatedBooking(completedBooking);
      setIsProcessingPayment(false);
      setStep(4); // Show final receipt and downloadable invoice
      toast.success('Payment authorized! Order Reference ' + completedBooking.referenceId + ' saved.', {
        position: 'bottom-right'
      });
    }, 2000);
  };

  // Simulated Invoice Download
  const handleDownloadInvoice = () => {
    if (!createdBooking) return;
    toast.info('Downloading PDF invoice TNF_Invoice_' + createdBooking.referenceId + '.pdf...', {
      autoClose: 2500
    });
  };

  const stepsIndicators = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Package' },
    { num: 3, label: 'Pay' },
    { num: 4, label: 'Confirm' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-4xl rounded-3xl border overflow-hidden z-10 flex flex-col md:flex-row ${
            isDark 
              ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl' 
              : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          }`}
          id="checkout-wizard"
        >
          {/* Close Trigger Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-20 p-2 rounded-xl transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            } cursor-pointer`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Primary Form Wizard Steps */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Stepper indicators */}
              <div className="flex items-center justify-between mb-8 px-1">
                {stepsIndicators.map((s, idx) => (
                  <div key={s.num} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center relative">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                          step >= s.num
                            ? 'bg-sky-500 text-white border-transparent shadow-md'
                            : isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-400'
                              : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                      >
                        {step > s.num ? '✓' : s.num}
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider mt-1.5 absolute -bottom-5 whitespace-nowrap text-slate-500">
                        {s.label}
                      </span>
                    </div>
                    {idx < stepsIndicators.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 rounded-full transition-all ${
                          step > s.num
                            ? 'bg-sky-500'
                            : isDark
                              ? 'bg-slate-800'
                              : 'bg-slate-100'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Booking Details Submission Form */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4 pt-4"
                >
                  {/* Custom Welcome Alert Container */}
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                    isDark ? 'bg-sky-950/20 border-sky-500/20 text-slate-300' : 'bg-sky-50 border-sky-200 text-slate-800'
                  }`}>
                    <p className="font-bold text-sky-400 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                      ✨ Hello and welcome to TN Fly Drone Aerial Services! 🚁📸
                    </p>
                    <p>
                      Thank you for reaching out — we're excited to capture your moments from the sky and bring your vision to life with stunning aerial visuals.
                    </p>
                    <p>
                      Kindly share the details below so we can serve you better. Let's take your event to new heights! 🚀
                    </p>
                  </div>

                  {/* Form fields */}
                  <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder="John Doe"
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                            }`}
                            {...register('fullName')}
                          />
                        </div>
                        {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName.message}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="email"
                            placeholder="john@example.com"
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                            }`}
                            {...register('email')}
                          />
                        </div>
                        {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder="+234..."
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                            }`}
                            {...register('phone')}
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone.message}</p>}
                      </div>

                      {/* Service Type */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Aerial Coverage Type
                        </label>
                        <select
                          className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                            isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                          }`}
                          {...register('serviceType')}
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Event Date */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="date"
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                            }`}
                            {...register('eventDate')}
                          />
                        </div>
                        {errors.eventDate && <p className="text-[10px] text-red-500 mt-1">{errors.eventDate.message}</p>}
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Flight Duration (Hours)
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="number"
                            placeholder="4"
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                            }`}
                            {...register('eventDuration', { valueAsNumber: true })}
                          />
                        </div>
                        {errors.eventDuration && <p className="text-[10px] text-red-500 mt-1">{errors.eventDuration.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Location */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Event Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder="e.g. Landmark Beach Hall, Lagos"
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                            }`}
                            {...register('eventLocation')}
                          />
                        </div>
                        {errors.eventLocation && <p className="text-[10px] text-red-500 mt-1">{errors.eventLocation.message}</p>}
                      </div>

                      {/* Approximate Attendees */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Approx. Attendees
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="number"
                            placeholder="150"
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                            }`}
                            {...register('attendeesCount', { valueAsNumber: true })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Specific Angles / Ideas / Special Requests
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Sunset tracking shots of the garden, slow orbital views over the pool area..."
                        className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none transition-colors ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-950 focus:border-sky-500'
                        }`}
                        {...register('specialRequests')}
                      />
                    </div>

                    {/* Drag & Drop File Upload */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Upload Reference Images / Storyboards
                      </label>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDropSimulate}
                        onClick={selectSimulatedFileClick}
                        className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                          simulatedFile 
                            ? 'border-emerald-500/40 bg-emerald-500/5' 
                            : isDark 
                              ? 'border-slate-800 hover:border-sky-500/30 hover:bg-slate-950/40' 
                              : 'border-slate-200 hover:border-sky-500/30 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center space-y-1.5">
                          <UploadCloud className={`w-6 h-6 ${simulatedFile ? 'text-emerald-400' : 'text-slate-500'}`} />
                          {simulatedFile ? (
                            <div className="space-y-1">
                              <p className="text-[11px] font-bold text-emerald-400">Successfully Attached!</p>
                              <p className="text-[10px] text-slate-500">{simulatedFile}</p>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold">Drag and drop files here, or click to browse</p>
                              <p className="text-[10px] text-slate-500">Supports PNG, JPG, PDF or MP4 files up to 25MB</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Row */}
                    <div className="pt-4 border-t border-slate-500/10 text-right">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <span>Request Quote</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}

              {/* Step 2: Choose packages (Basic, Standard, Premium) & Review */}
              {step === 2 && createdBooking && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5 pt-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Select Flight Package Tier
                    </h3>
                    <span className="text-[9px] font-mono text-sky-400 bg-sky-500/15 border border-sky-500/20 px-2 py-0.5 rounded font-bold uppercase">
                      REF: {createdBooking.referenceId}
                    </span>
                  </div>

                  {/* Pricing Cards Grid inside layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {packages.map((pkg) => {
                      const isSelected = selectedPackageId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                            isSelected 
                              ? 'border-sky-500 bg-sky-500/5' 
                              : isDark 
                                ? 'border-slate-800 hover:border-slate-700 bg-slate-950/40' 
                                : 'border-slate-200 hover:border-slate-300 bg-slate-50 shadow-xs'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs">{pkg.name}</span>
                              {pkg.badge && (
                                <span className="text-[8px] bg-sky-500 text-white px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-widest">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                            <div className="pt-2">
                              <span className="text-xl font-black text-sky-400">${pkg.price}</span>
                              <span className="text-[9px] text-slate-500 block">Base Fee</span>
                            </div>
                          </div>

                          <ul className="text-[9px] text-slate-400 space-y-1 pt-2 border-t border-slate-500/10">
                            {pkg.features.slice(0, 3).map((f, idx) => (
                              <li key={idx} className="truncate flex items-center gap-1">
                                <Check className="w-3 h-3 text-sky-500 flex-shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary card with calculated price details */}
                  <div className={`p-4 rounded-2xl border space-y-3 text-xs ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <p className="font-bold border-b border-slate-500/10 pb-2 flex justify-between uppercase tracking-wider text-[10px] text-slate-400">
                      <span>Order Summary Details</span>
                      <span className="text-sky-400">{selectedPackage.name}</span>
                    </p>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-500">Service Theme:</span>
                      <span className="font-semibold text-sky-500">{createdBooking.serviceType}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Flight Location:</span>
                      <span className="font-semibold">{createdBooking.eventLocation}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration Scheduled:</span>
                      <span className="font-semibold">{createdBooking.eventDuration} Hours</span>
                    </div>

                    <div className="flex justify-between border-t border-slate-500/10 pt-2.5 font-bold text-sm">
                      <span>Calculated Charge:</span>
                      <span className="text-sky-400 font-mono">${finalPrice}</span>
                    </div>
                  </div>

                  {/* Control Rows */}
                  <div className="flex justify-between pt-4 border-t border-slate-500/10">
                    <button
                      onClick={() => setStep(1)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Edit Details</span>
                    </button>

                    <button
                      onClick={handleProceedToPayment}
                      className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed To Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Secure Checkout (Paystack, Flutterwave, Debit Card, Bank Transfer) */}
              {step === 3 && createdBooking && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5 pt-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Choose Secure Payment Gateway
                    </h3>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                      SECURED SSL
                    </span>
                  </div>

                  {/* Supported Payment Channels Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Paystack', desc: 'Secure African Gateway' },
                      { id: 'Flutterwave', desc: 'Mobile Money & Cards' },
                      { id: 'Debit Card', desc: 'Instant Processing' },
                      { id: 'Bank Transfer', desc: 'Wire confirmation' }
                    ].map(pay => (
                      <button
                        key={pay.id}
                        type="button"
                        onClick={() => setPaymentMethod(pay.id)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between space-y-1 cursor-pointer ${
                          paymentMethod === pay.id
                            ? 'bg-sky-500 border-transparent text-white shadow-md'
                            : isDark
                              ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-bold">{pay.id}</span>
                        <span className={`text-[8px] font-semibold uppercase ${paymentMethod === pay.id ? 'text-sky-100' : 'text-slate-500'}`}>
                          {pay.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Form fields based on selected checkout channel */}
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-3 ${
                    isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {paymentMethod === 'Debit Card' && (
                      <div className="space-y-2">
                        <p className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-2">Card Details</p>
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Cardholder Name"
                            className={`w-full p-2 rounded-lg text-xs border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                          />
                          <input
                            type="text"
                            maxLength={16}
                            placeholder="Card Number"
                            className={`w-full p-2 rounded-lg text-xs border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              maxLength={5}
                              placeholder="MM/YY"
                              className={`w-full p-2 rounded-lg text-xs border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                            />
                            <input
                              type="password"
                              maxLength={3}
                              placeholder="CVV"
                              className={`w-full p-2 rounded-lg text-xs border focus:outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'Paystack' && (
                      <div className="text-center py-4 space-y-1.5">
                        <p className="font-semibold text-slate-300">Authorize Paystack Gateway redirect</p>
                        <p className="text-[10px] text-slate-500">Supports direct bank deposits, USSD pins, and cards safely.</p>
                      </div>
                    )}

                    {paymentMethod === 'Flutterwave' && (
                      <div className="text-center py-4 space-y-1.5">
                        <p className="font-semibold text-slate-300">Open Flutterwave modal checkout</p>
                        <p className="text-[10px] text-slate-500">Supports multi-currency bank accounts, card payments, and wallets.</p>
                      </div>
                    )}

                    {paymentMethod === 'Bank Transfer' && (
                      <div className="space-y-2 font-mono text-[11px] text-slate-300">
                        <p className="font-bold text-sky-400 font-sans text-xs">Wire Transfer Information:</p>
                        <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Bank Name:</span>
                            <span className="text-white">Apex Alliance Bank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Account No:</span>
                            <span className="text-white">99330911002</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Ref Tag:</span>
                            <span className="text-sky-400 font-bold uppercase">{createdBooking.referenceId}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                          Once transfer is initiated, click the confirm button below. Our systems poll transaction grids instantly.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Summary order review */}
                  <div className="flex justify-between items-center text-xs px-1">
                    <span className="text-slate-400">Total Booking Charge (USD):</span>
                    <span className="font-mono text-base font-black text-sky-500">${createdBooking.totalPrice}</span>
                  </div>

                  {/* Action row */}
                  <div className="flex justify-between pt-4 border-t border-slate-500/10">
                    <button
                      onClick={() => setStep(2)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={handleProcessPayment}
                      disabled={isProcessingPayment}
                      className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                      {isProcessingPayment ? (
                        <span>Validating Wire...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Pay & Reserve Event Date</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success confirmation screen & downloadable invoice */}
              {step === 4 && createdBooking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 pt-4 text-center"
                >
                  <div className="space-y-2">
                    <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-bounce">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-black text-xl text-emerald-400 uppercase tracking-tight">
                      Booking Confirmed Successfully!
                    </h3>
                    <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      An email confirmation has been dispatched to <strong className="text-sky-400">{createdBooking.email}</strong> detailing flight times, pre-site permit requirements and checklists.
                    </p>
                  </div>

                  {/* Digital invoice dashboard presentation */}
                  <div className={`p-6 rounded-3xl border text-left relative overflow-hidden font-sans space-y-4 ${
                    isDark ? 'bg-gradient-to-br from-slate-950 to-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {/* Top banner watermark */}
                    <div className="flex justify-between items-start border-b border-slate-500/10 pb-4">
                      <div>
                        <h4 className="font-black text-xs uppercase text-sky-400">TN FLY DRONE SERVICES</h4>
                        <span className="text-[9px] text-slate-500 block">Aviation Reference Invoice</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-slate-400 block">{createdBooking.referenceId}</span>
                        <span className="text-[8px] text-slate-500 uppercase font-bold">STATUS: AUTHORIZED & PAID</span>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Client Name</span>
                        <span className="font-bold text-white">{createdBooking.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Aerial Coverage Theme</span>
                        <span className="font-bold text-white">{createdBooking.serviceType}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Event Location</span>
                        <span className="font-semibold">{createdBooking.eventLocation}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Event Date</span>
                        <span className="font-semibold font-mono text-sky-400">{createdBooking.eventDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Duration Schedule</span>
                        <span className="font-semibold">{createdBooking.eventDuration} Hours Flight</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Total Amount Paid</span>
                        <span className="font-black text-emerald-400 font-mono text-xs">${createdBooking.totalPrice} USD</span>
                      </div>
                    </div>

                    {/* Note watermark */}
                    <p className="text-[9px] text-slate-500 leading-relaxed pt-2 border-t border-slate-500/10">
                      Disclaimer: Flight schedules remain subject to flight space permit validations and weather constraints. In instances of bad weather, full standard priority rescheduling is covered.
                    </p>
                  </div>

                  {/* Actions row */}
                  <div className="flex gap-2.5 pt-2">
                    <button
                      onClick={handleDownloadInvoice}
                      className="flex-1 py-3 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Receipt Invoice</span>
                    </button>

                    <button
                      onClick={onClose}
                      className={`px-6 py-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                        isDark ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Close Gateway</span>
                    </button>
                  </div>

                </motion.div>
              )}
            </div>
          </div>

          {/* Right Panel: Informational Static Summary Backdrop */}
          {step < 4 && (
            <div className={`w-full md:w-72 border-t md:border-t-0 md:border-l p-6 md:p-8 flex flex-col justify-between ${
              isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="space-y-5">
                <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase block">Selected Service</span>
                
                {/* Image overview preview */}
                <div className="rounded-2xl overflow-hidden shadow-md relative h-32 border border-slate-800">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[9px] bg-sky-500 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    UHD 4K SCAN
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-xs uppercase tracking-tight text-white">{selectedService.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-3">{selectedService.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-500/10 space-y-2 text-[10px] text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Standard Features</span>
                    <span className="font-semibold text-white">• FAA Part 107 Pilot</span>
                    <span className="font-semibold text-white block">• HDR color grading</span>
                    <span className="font-semibold text-white block">• High bandwidth cloud delivery</span>
                  </div>
                </div>
              </div>

              {/* Secure booking assurance badge */}
              <div className="pt-6 border-t border-slate-500/10 flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-5 h-5 text-sky-500" />
                <span className="text-[8px] uppercase tracking-wider font-bold">Licensed & Bonded Fleet</span>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
