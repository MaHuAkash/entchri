'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plane, Calendar, Users, ChevronDown, MapPin, X } from 'lucide-react';

interface FlightSearchFormProps {
  loading?: boolean;
}

export default function FlightSearchForm({ loading = false }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi-city'>('round-trip');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0
  });
  const [showPassengerSelector, setShowPassengerSelector] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const passengerSelectorRef = useRef<HTMLDivElement>(null);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close passenger selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (passengerSelectorRef.current && !passengerSelectorRef.current.contains(event.target as Node)) {
        setShowPassengerSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Set default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 7);
  const nextWeek = new Date(tomorrow);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // FIXED: Date formatting for Aviasales (YYYY-MM-DD format - CORRECTED)
  const formatDateForAviasales = (dateStr: string): string => {
    try {
      if (!dateStr) return '';
      
      // Parse the date string
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateStr);
        return '';
      }
      
      // Format to YYYY-MM-DD (CORRECT FORMAT)
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      
      return `${year}-${month}-${day}`; // CORRECT: YYYY-MM-DD
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // FIXED: Generate AVIA SALES affiliate URL with proper parameters
  const getAviasalesSearchUrl = () => {
    // Validate required fields
    if (!formData.from.trim() || !formData.to.trim() || !formData.departureDate) {
      return null;
    }

    // Get formatted dates (YYYY-MM-DD format)
    const departDate = formatDateForAviasales(formData.departureDate);
    if (!departDate) {
      console.error('Invalid departure date format');
      return null;
    }

    // FIXED: Base Aviasales URL (no /search in base URL)
    const baseUrl = 'https://aviasales.com';
    
    // Build query parameters - FIXED: Using correct parameter names
    const params = new URLSearchParams({
      origin: formData.from.trim().toUpperCase(),
      destination: formData.to.trim().toUpperCase(),
      depart_date: departDate, // Already in YYYY-MM-DD format
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      infants: formData.infants.toString(),
      trip_class: '0', // 0 = economy, 1 = premium, 2 = business, 3 = first
      marker: '297036', // Your affiliate marker
      with_request: 'true',
      locale: 'en', // Added locale
      currency: 'usd' // Added currency
    });

    // FIXED: Add return date for round trips
    if (tripType === 'round-trip' && formData.returnDate) {
      const returnDate = formatDateForAviasales(formData.returnDate);
      if (returnDate) {
        params.set('return_date', returnDate);
      }
    }

    // FIXED: For one-way trips, use one_way=true parameter
    if (tripType === 'one-way') {
      params.set('one_way', 'true');
    }

    // FIXED: Construct the URL correctly
    const url = `${baseUrl}/search?${params.toString()}`;
    console.log('Generated Aviasales URL:', url);
    console.log('Parameters:', Object.fromEntries(params.entries()));
    return url;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.from.trim()) {
      alert('Please enter departure city/airport');
      return;
    }
    
    if (!formData.to.trim()) {
      alert('Please enter destination city/airport');
      return;
    }
    
    if (!formData.departureDate) {
      alert('Please select departure date');
      return;
    }

    // FIXED: Get the correct URL
    const aviasalesUrl = getAviasalesSearchUrl();
    
    if (aviasalesUrl) {
      // FIXED: Ensure the URL opens properly
      console.log('Redirecting to:', aviasalesUrl);
      
      // Open Aviasales in new tab with affiliate tracking
      window.open(aviasalesUrl, '_blank', 'noopener,noreferrer');
      
      // Alternative: You can also redirect in the same tab
      // window.location.href = aviasalesUrl;
    } else {
      console.error('Failed to generate Aviasales URL');
      alert('Unable to generate search URL. Please check your inputs.');
    }
  };

  const incrementPassengers = (type: 'adults' | 'children' | 'infants') => {
    const max = type === 'infants' ? formData.adults : 9;
    setFormData(prev => ({
      ...prev,
      [type]: Math.min(prev[type] + 1, max)
    }));
  };

  const decrementPassengers = (type: 'adults' | 'children' | 'infants') => {
    setFormData(prev => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, type === 'adults' ? 1 : 0)
    }));
  };

  const getPassengerSummary = () => {
    if (isMobile) {
      return `${formData.adults + formData.children} passenger${formData.adults + formData.children > 1 ? 's' : ''}`;
    }
    const summary = [];
    if (formData.adults > 0) summary.push(`${formData.adults} Adult${formData.adults > 1 ? 's' : ''}`);
    if (formData.children > 0) summary.push(`${formData.children} Child${formData.children > 1 ? 'ren' : ''}`);
    if (formData.infants > 0) summary.push(`${formData.infants} Infant${formData.infants > 1 ? 's' : ''}`);
    return summary.join(', ');
  };

  const clearLocation = (field: 'from' | 'to') => {
    setFormData(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // Initialize default dates on component mount
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      departureDate: formatDate(tomorrow),
      returnDate: formatDate(nextWeek)
    }));
  }, []); // Empty dependency array - run once on mount

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-4 sm:p-6">
        <form onSubmit={handleSearch}>
          {/* Trip Type Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="flex items-center gap-2 mr-4">
              <Plane className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-700">Trip type:</span>
            </div>
            {(['one-way', 'round-trip', 'multi-city'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setTripType(type);
                  // Clear return date for one-way trips
                  if (type === 'one-way') {
                    setFormData(prev => ({ ...prev, returnDate: '' }));
                  } else if (type === 'round-trip' && !formData.returnDate) {
                    // Set return date for round trips if not set
                    setFormData(prev => ({ 
                      ...prev, 
                      returnDate: formatDate(nextWeek) 
                    }));
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base capitalize ${
                  tripType === type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Search Form Grid */}
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-12 sm:gap-4">
            {/* From Location */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="City or airport (e.g., JFK, LHR)"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base transition-colors"
                  required
                />
                {formData.from && (
                  <button
                    type="button"
                    onClick={() => clearLocation('from')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* To Location */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="City or airport (e.g., LAX, CDG)"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base transition-colors"
                  required
                />
                {formData.to && (
                  <button
                    type="button"
                    onClick={() => clearLocation('to')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Departure Date */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  min={formatDate(today)}
                  className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-pointer text-sm sm:text-base transition-colors"
                  required
                />
              </div>
            </div>

            {/* Return Date - Conditionally shown */}
            {tripType === 'round-trip' && (
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    min={formData.departureDate}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-pointer text-sm sm:text-base transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Passengers Selector */}
            <div className={`${tripType === 'round-trip' ? 'lg:col-span-2' : 'lg:col-span-4'} relative`} ref={passengerSelectorRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travelers
              </label>
              <button
                type="button"
                onClick={() => setShowPassengerSelector(!showPassengerSelector)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700 bg-white text-left group"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Users className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base font-medium">
                    {getPassengerSummary()}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-transform ${showPassengerSelector ? 'rotate-180' : ''} flex-shrink-0 ml-2`} />
              </button>

              {/* Passenger Selector Dropdown - Same as before */}
              <AnimatePresence>
                  {showPassengerSelector && (
                    <>
                      {/* Mobile Backdrop */}
                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                          onClick={() => setShowPassengerSelector(false)}
                        />
                      )}
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute ${
                          isMobile 
                            ? 'fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm max-h-[80vh] overflow-y-auto' 
                            : 'right-0 mt-2 min-w-[320px]'
                        } bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50`}
                      >
                        {isMobile && (
                          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900 text-lg">Travelers</h3>
                            <button 
                              type="button"
                              onClick={() => setShowPassengerSelector(false)}
                              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                        
                        <div className="space-y-6">
                          {/* Adults */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-base">Adults</div>
                              <div className="text-sm text-gray-500 mt-1">Age 18+</div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => decrementPassengers('adults')}
                                disabled={formData.adults <= 1}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">−</span>
                              </button>
                              <span className="w-10 text-center font-bold text-gray-900 text-xl">
                                {formData.adults}
                              </span>
                              <button
                                type="button"
                                onClick={() => incrementPassengers('adults')}
                                disabled={formData.adults >= 9}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">+</span>
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-base">Children</div>
                              <div className="text-sm text-gray-500 mt-1">Age 2-17</div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => decrementPassengers('children')}
                                disabled={formData.children <= 0}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">−</span>
                              </button>
                              <span className="w-10 text-center font-bold text-gray-900 text-xl">
                                {formData.children}
                              </span>
                              <button
                                type="button"
                                onClick={() => incrementPassengers('children')}
                                disabled={formData.children >= 9}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">+</span>
                              </button>
                            </div>
                          </div>

                          {/* Infants */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-base">Infants</div>
                              <div className="text-sm text-gray-500 mt-1">Under 2</div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => decrementPassengers('infants')}
                                disabled={formData.infants <= 0}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">−</span>
                              </button>
                              <span className="w-10 text-center font-bold text-gray-900 text-xl">
                                {formData.infants}
                              </span>
                              <button
                                type="button"
                                onClick={() => incrementPassengers('infants')}
                                disabled={formData.infants >= formData.adults}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">+</span>
                              </button>
                            </div>
                          </div>

                          {/* Mobile Apply Button */}
                          {isMobile && (
                            <button
                              type="button"
                              onClick={() => setShowPassengerSelector(false)}
                              className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-base mt-4"
                            >
                              Apply
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              {/* ... (keep your existing dropdown code) ... */}
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 lg:col-span-12">
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                whileTap={{ scale: 0.98 }}
                disabled={!formData.from.trim() || !formData.to.trim() || !formData.departureDate}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base group relative overflow-hidden"
                aria-label="Search flights"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent/0 via-white/10 to-transparent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="flex items-center justify-center gap-3">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity 
                      }}
                    />
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Plane className="h-5 w-5 relative z-10 rotate-45" />
                    </motion.div>
                  </div>
                  <motion.span
                    animate={{ x: [0, 1, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3 
                    }}
                  >
                    Search Flights on Aviasales
                  </motion.span>
                </div>
              </motion.button>
            </div>
          </div>
        </form>
        
        {/* Quick Search Suggestions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Popular routes:</span>
            {[
              { from: 'JFK', to: 'LAX', label: 'New York → Los Angeles' },
              { from: 'LHR', to: 'CDG', label: 'London → Paris' },
              { from: 'DXB', to: 'SIN', label: 'Dubai → Singapore' },
              { from: 'SYD', to: 'MEL', label: 'Sydney → Melbourne' },
            ].map((route) => (
              <button
                key={route.label}
                type="button"
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 7);
                  const nextWeek = new Date(tomorrow);
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  
                  setFormData(prev => ({
                    ...prev,
                    from: route.from,
                    to: route.to,
                    departureDate: formatDate(tomorrow),
                    returnDate: tripType === 'round-trip' ? formatDate(nextWeek) : ''
                  }));
                }}
                className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}