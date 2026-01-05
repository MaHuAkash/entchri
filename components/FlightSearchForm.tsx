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

  // Get local date string (FIXED: Handle timezone correctly)
  const getLocalDateString = (date: Date): string => {
    // Get local date components without timezone conversion
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get today's date in local timezone
  const getTodayDate = (): string => {
    const today = new Date();
    return getLocalDateString(today);
  };

  // Get tomorrow's date (7 days from now)
  const getTomorrowDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    return getLocalDateString(tomorrow);
  };

  // Get next week's date (14 days from now)
  const getNextWeekDate = (): string => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 14);
    return getLocalDateString(nextWeek);
  };

  // FIXED: Date formatting for Aviasales - NO Date object conversion!
  const formatDateForAviasales = (dateStr: string): string => {
    try {
      if (!dateStr) return '';
      
      // The date string is already in YYYY-MM-DD format from the input
      // Just validate it's the correct format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateStr)) {
        console.error('Invalid date format. Expected YYYY-MM-DD:', dateStr);
        return '';
      }
      
      // Parse the parts to ensure it's a valid date
      const [year, month, day] = dateStr.split('-').map(Number);
      
      // Basic validation
      if (year < 2024 || month < 1 || month > 12 || day < 1 || day > 31) {
        console.error('Invalid date components:', dateStr);
        return '';
      }
      
      // Return the original string (it's already in correct format)
      console.log('Sending date to Aviasales:', dateStr);
      return dateStr;
      
    } catch (error) {
      console.error('Error processing date:', error);
      return '';
    }
  };

  // FIXED: Generate AVIA SALES affiliate URL with proper parameters
  const getAviasalesSearchUrl = () => {
    // Validate required fields
    if (!formData.from.trim() || !formData.to.trim() || !formData.departureDate) {
      console.error('Missing required fields');
      return null;
    }

    console.log('Form departure date:', formData.departureDate);
    console.log('Form return date:', formData.returnDate);
    
    // Get formatted dates (NO conversion, just validation)
    const departDate = formatDateForAviasales(formData.departureDate);
    if (!departDate) {
      console.error('Invalid departure date format');
      return null;
    }

    // Base Aviasales URL
    const baseUrl = 'https://www.aviasales.com';
    
    // Build query parameters
    const params = new URLSearchParams({
      origin: formData.from.trim().toUpperCase(),
      destination: formData.to.trim().toUpperCase(),
      depart_date: departDate,
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      infants: formData.infants.toString(),
      trip_class: '0',
      marker: '297036',
      with_request: 'true',
      locale: 'en',
      currency: 'usd'
    });

    // Add return date for round trips
    if (tripType === 'round-trip' && formData.returnDate) {
      const returnDate = formatDateForAviasales(formData.returnDate);
      if (returnDate) {
        params.set('return_date', returnDate);
      }
    }

    // For one-way trips
    if (tripType === 'one-way') {
      params.set('one_way', 'true');
    }

    const url = `${baseUrl}/search?${params.toString()}`;
    console.log('=== DEBUG INFO ===');
    console.log('Selected departure date (form):', formData.departureDate);
    console.log('Selected return date (form):', formData.returnDate);
    console.log('Sending departure date to Aviasales:', departDate);
    console.log('Sending return date to Aviasales:', formData.returnDate ? formatDateForAviasales(formData.returnDate) : 'none');
    console.log('Generated Aviasales URL:', url);
    console.log('=== END DEBUG ===');
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

    // Get the URL
    const aviasalesUrl = getAviasalesSearchUrl();
    
    if (aviasalesUrl) {
      // Open Aviasales in new tab with affiliate tracking
      window.open(aviasalesUrl, '_blank', 'noopener,noreferrer');
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

  // Initialize default dates on component mount (FIXED)
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      departureDate: getTomorrowDate(),
      returnDate: getNextWeekDate()
    }));
  }, []); // Empty dependency array - run once on mount

  // FIXED: Create a simple format function for date inputs
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
                      returnDate: getNextWeekDate()
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
                  onChange={(e) => {
                    console.log('Departure date selected:', e.target.value);
                    handleInputChange('departureDate', e.target.value);
                  }}
                  min={getTodayDate()}
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
                    onChange={(e) => {
                      console.log('Return date selected:', e.target.value);
                      handleInputChange('returnDate', e.target.value);
                    }}
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
                    departureDate: getLocalDateString(tomorrow),
                    returnDate: tripType === 'round-trip' ? getLocalDateString(nextWeek) : ''
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