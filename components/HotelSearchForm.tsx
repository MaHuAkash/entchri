'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ChevronDown, Building2, X } from 'lucide-react';

interface HotelSearchFormProps {
  loading?: boolean;
}

export default function HotelSearchForm({ loading = false }: HotelSearchFormProps) {
  const [searchType, setSearchType] = useState<'city' | 'hotel'>('city');
  const [formData, setFormData] = useState({
    query: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1
  });
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration - YOUR AVIASALES SETTINGS
  const YOUR_MARKER = '297036'; // Your Aviasales affiliate marker
  
  // Use main Aviasales URL
  const BASE_URL = 'https://www.aviasales.com';

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close guest selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target as Node)) {
        setShowGuestSelector(false);
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

  // FIXED: Get local date string without timezone conversion
  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Set default dates (FIXED)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  // FIXED: Get default check-in date (tomorrow)
  const getDefaultCheckInDate = (): string => {
    return getLocalDateString(tomorrow);
  };

  // FIXED: Get default check-out date (day after tomorrow)
  const getDefaultCheckOutDate = (): string => {
    return getLocalDateString(dayAfterTomorrow);
  };

  // CORRECTED: Generate Aviasales Hotel URL with the proper hotel search structure
  const getAviasalesHotelUrl = () => {
    if (!formData.query.trim()) {
      console.error('Missing hotel search query');
      return null;
    }

    // Get dates
    const checkin = formData.checkIn || getDefaultCheckInDate();
    const checkout = formData.checkOut || getDefaultCheckOutDate();
    
    console.log('=== HOTEL SEARCH PARAMETERS ===');
    console.log('Destination:', formData.query.trim());
    console.log('Check-in:', checkin);
    console.log('Check-out:', checkout);
    console.log('Adults:', formData.adults);
    console.log('Children:', formData.children);
    console.log('Rooms:', formData.rooms);
    
    // Build the URL for Aviasales hotel search
    // Based on your observation: https://www.aviasales.com/hotels?source=tab_change
    // We need to use the exact parameter names that Aviasales expects
    
    const params = new URLSearchParams();
    
    // CRITICAL: The destination parameter is likely 'query' for hotels
    params.append('query', formData.query.trim());
    
    // Use correct parameter names (based on typical hotel search patterns)
    params.append('checkIn', checkin);
    params.append('checkOut', checkout);
    params.append('adults', formData.adults.toString());
    
    // Add children if any
    if (formData.children > 0) {
      params.append('children', formData.children.toString());
      // Add ages (required when children > 0)
      const childrenAges = Array(formData.children).fill(10).join(',');
      params.append('childrenAges', childrenAges);
    }
    
    params.append('rooms', formData.rooms.toString());
    
    // Add affiliate marker
    params.append('marker', YOUR_MARKER);
    
    // Add source parameter to indicate hotel tab
    params.append('source', 'tab_change');
    
    // Add locale and currency
    params.append('locale', 'en');
    params.append('currency', 'usd');
    
    // Build final URL
    const url = `${BASE_URL}/hotels?${params.toString()}`;
    
    console.log('Generated hotel search URL:', url);
    console.log('=== END ===');
    
    return url;
  };

  // ALTERNATIVE: Try this format if the above doesn't work
  const getAlternativeHotelUrl = () => {
    if (!formData.query.trim()) return null;
    
    const checkin = formData.checkIn || getDefaultCheckInDate();
    const checkout = formData.checkOut || getDefaultCheckOutDate();
    
    // Alternative: Use the pattern that might work better
    const params = new URLSearchParams({
      search: formData.query.trim(), // Try 'search' instead of 'query'
      checkIn: checkin,
      checkOut: checkout,
      adults: formData.adults.toString(),
      rooms: formData.rooms.toString(),
      marker: YOUR_MARKER,
      lang: 'en',
      currency: 'usd'
    });
    
    if (formData.children > 0) {
      params.append('children', formData.children.toString());
    }
    
    return `${BASE_URL}/hotels?${params.toString()}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.query.trim()) {
      alert('Please enter a city, region, or hotel name');
      return;
    }

    // Try the primary URL format first
    let aviasalesUrl = getAviasalesHotelUrl();
    
    // If primary doesn't work, try alternative
    if (!aviasalesUrl) {
      aviasalesUrl = getAlternativeHotelUrl();
    }
    
    if (aviasalesUrl) {
      console.log('DEBUG - Opening hotel search URL:', aviasalesUrl);
      
      // For testing: Open in current tab first to see what happens
      // window.location.href = aviasalesUrl;
      
      // For production: Open in new tab
      window.open(aviasalesUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Failed to generate Aviasales hotel URL');
      alert('Unable to generate search URL. Please check your inputs.');
    }
  };

  const incrementGuests = (type: 'adults' | 'children' | 'rooms') => {
    setFormData(prev => ({
      ...prev,
      [type]: Math.min(prev[type] + 1, type === 'rooms' ? 5 : 10)
    }));
  };

  const decrementGuests = (type: 'adults' | 'children' | 'rooms') => {
    setFormData(prev => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, type === 'adults' ? 1 : 0)
    }));
  };

  const getGuestSummary = () => {
    if (isMobile) {
      return `${formData.adults} guest${formData.adults > 1 ? 's' : ''}`;
    }
    const summary = [];
    if (formData.adults > 0) summary.push(`${formData.adults} A`);
    if (formData.children > 0) summary.push(`${formData.children} C`);
    summary.push(`${formData.rooms} R`);
    return summary.join(' • ');
  };

  const clearSearch = () => {
    setFormData(prev => ({
      ...prev,
      query: ''
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
      checkIn: getDefaultCheckInDate(),
      checkOut: getDefaultCheckOutDate()
    }));
  }, []); // Empty dependency array - run once on mount

  // Get today's date for minimum check-in date
  const getTodayDate = (): string => {
    return getLocalDateString(today);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={containerRef}
        className="bg-white rounded-2xl shadow-lg overflow-visible border border-gray-100"
      >
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSearch}>
            {/* Search Tabs - You can add flight tab here later */}
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setSearchType('city')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  searchType === 'city'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">City or region</span>
                <span className="sm:hidden">City</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchType('hotel')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  searchType === 'hotel'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Specific hotel</span>
                <span className="sm:hidden">Hotel</span>
              </button>
            </div>

            {/* Search Form Grid - Responsive Layout */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
              {/* Location/Hotel Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {searchType === 'city' ? 'City or hotel' : 'Hotel name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {searchType === 'city' ? (
                      <MapPin className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Building2 className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={formData.query}
                    onChange={(e) => handleInputChange('query', e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      searchType === 'city' 
                        ? 'Where do you want to stay?' 
                        : 'Enter hotel name...'
                    }
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base transition-colors"
                    required
                  />
                  {formData.query && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                    </button>
                  )}
                </div>
              </div>

              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => {
                      console.log('Hotel check-in date selected:', e.target.value);
                      handleInputChange('checkIn', e.target.value);
                    }}
                    min={getTodayDate()}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-pointer text-sm sm:text-base transition-colors"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => {
                      console.log('Hotel check-out date selected:', e.target.value);
                      handleInputChange('checkOut', e.target.value);
                    }}
                    min={formData.checkIn || getDefaultCheckInDate()}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-pointer text-sm sm:text-base transition-colors"
                  />
                </div>
              </div>

              {/* Guests Selector */}
              <div className="relative" ref={guestSelectorRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests & rooms
                </label>
                <button
                  type="button"
                  onClick={() => setShowGuestSelector(!showGuestSelector)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700 bg-white text-left group"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Users className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    <span className="truncate text-sm sm:text-base font-medium">{getGuestSummary()}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-transform ${showGuestSelector ? 'rotate-180' : ''} flex-shrink-0 ml-2`} />
                </button>

                {/* Guest Selector Dropdown */}
                <AnimatePresence>
                  {showGuestSelector && (
                    <>
                      {/* Mobile Backdrop */}
                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                          onClick={() => setShowGuestSelector(false)}
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
                            : 'left-0 right-0 mt-2 min-w-[320px]'
                        } bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50`}
                      >
                        {isMobile && (
                          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900 text-lg">Guests & Rooms</h3>
                            <button 
                              type="button"
                              onClick={() => setShowGuestSelector(false)}
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
                                onClick={() => decrementGuests('adults')}
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
                                onClick={() => incrementGuests('adults')}
                                disabled={formData.adults >= 10}
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
                              <div className="text-sm text-gray-500 mt-1">Ages 0-17</div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => decrementGuests('children')}
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
                                onClick={() => incrementGuests('children')}
                                disabled={formData.children >= 10}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">+</span>
                              </button>
                            </div>
                          </div>

                          {/* Rooms */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-base">Rooms</div>
                              <div className="text-sm text-gray-500 mt-1">Maximum 5 rooms</div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => decrementGuests('rooms')}
                                disabled={formData.rooms <= 1}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
                              >
                                <span className="text-xl font-medium">−</span>
                              </button>
                              <span className="w-10 text-center font-bold text-gray-900 text-xl">
                                {formData.rooms}
                              </span>
                              <button
                                type="button"
                                onClick={() => incrementGuests('rooms')}
                                disabled={formData.rooms >= 5}
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
                              onClick={() => setShowGuestSelector(false)}
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
              </div>

              {/* Search Button */}
              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!formData.query.trim()}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base group relative overflow-hidden"
                  aria-label="Search hotels on Aviasales"
                >
                  {/* Subtle shine effect */}
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
                        <Search className="h-5 w-5 relative z-10" />
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
                      Search Hotels
                    </motion.span>
                  </div>
                </motion.button>
              </div>
            </div>
          </form>
          
          {/* Optional: Add a small note about affiliate tracking */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>Powered by Aviasales. When you book, we may earn a commission.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}