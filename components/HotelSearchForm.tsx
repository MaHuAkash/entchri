// components/HotelSearchForm.tsx
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
  const BASE_URL = 'https://aviasales.tp.st'; // Travelpayouts tracking domain

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

  // Set default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // Generate Aviasales Hotel URL with your affiliate tracking
  const getAviasalesHotelUrl = () => {
    const encodedQuery = encodeURIComponent(formData.query);
    const checkin = formData.checkIn || formatDate(tomorrow);
    const checkout = formData.checkOut || formatDate(dayAfterTomorrow);
    
    // Build Aviasales hotels URL with your affiliate marker
    let url = `${BASE_URL}/hotels?url_id=${YOUR_MARKER}`;
    
    // Add search parameters
    url += `&city=${encodedQuery}`;
    url += `&checkin=${checkin}`;
    url += `&checkout=${checkout}`;
    url += `&adults=${formData.adults}`;
    url += `&rooms=${formData.rooms}`;
    
    // Add children if any (with default age 10 for each child as required by Aviasales)
    if (formData.children > 0) {
      url += `&children=${formData.children}`;
      // Create ages string (e.g., "10,10" for 2 children)
      const childrenAges = Array(formData.children).fill(10).join(',');
      url += `&children_age=${childrenAges}`;
    }
    
    return url;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.query.trim()) return;
    
    const aviasalesUrl = getAviasalesHotelUrl();
    
    // Open Aviasales in new tab with affiliate tracking
    window.open(aviasalesUrl, '_blank', 'noopener,noreferrer');
    
    // Optional: Log for debugging
    console.log('Redirecting to Aviasales:', aviasalesUrl);
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

  // Updated getGuestSummary to be more compact
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

  // Helper to clean input for airport codes (if needed for future flight integration)
  const cleanAirportCode = (input: string) => {
    const match = input.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : input.toUpperCase().replace(/[^A-Z]/g, '');
  };

  // For future: If you want to add flight search functionality
  const redirectToAviasalesFlights = () => {
    // This function can be implemented when you add flight search
    // Example flight URL structure:
    // https://aviasales.tp.st/?url_id=297036&origin=JFK&destination=LON&search_date=2024-12-25
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
              {/* Future: Add Flights tab */}
              {/* <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm sm:text-base"
                onClick={() => {
                  // Navigate to flight search page or show flight form
                  window.location.href = '/flights';
                }}
              >
                <Plane className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Flights</span>
              </button> */}
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
                    value={formData.checkIn || formatDate(tomorrow)}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    min={formatDate(today)}
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
                    value={formData.checkOut || formatDate(dayAfterTomorrow)}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    min={formData.checkIn || formatDate(tomorrow)}
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
                      Search
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