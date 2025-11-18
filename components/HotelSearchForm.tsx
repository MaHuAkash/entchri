// components/HotelSearchForm.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building, Calendar, Users, ChevronDown } from 'lucide-react';

interface HotelSearchFormProps {
  loading?: boolean;
}

export default function HotelSearchForm({ loading = false }: HotelSearchFormProps) {
  const [searchType, setSearchType] = useState<'location' | 'hotel'>('location');
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

  // Generate Booking.com URL
  const getBookingUrl = () => {
    const encodedQuery = encodeURIComponent(formData.query);
    const baseParams = {
      checkin: formData.checkIn || formatDate(tomorrow),
      checkout: formData.checkOut || formatDate(dayAfterTomorrow),
      group_adults: formData.adults.toString(),
      group_children: formData.children.toString(),
      no_rooms: formData.rooms.toString(),
    };

    const params = new URLSearchParams(baseParams);
    return `https://www.booking.com/searchresults.html?ss=${encodedQuery}&${params}`;
  };

  const handleSearch = () => {
    const bookingUrl = getBookingUrl();
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
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
      return `${formData.adults}A ${formData.children}C ${formData.rooms}R`;
    }
    return `${formData.adults} adult${formData.adults > 1 ? 's' : ''} • ${formData.children} child${formData.children !== 1 ? 'ren' : ''} • ${formData.rooms} room${formData.rooms > 1 ? 's' : ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />

      <div className="py-4 lg:py-6">
        {/* Search Type Toggle */}
        <div className="flex bg-gray-100/80 p-1 rounded-2xl w-fit mx-auto mb-6 lg:mb-8 backdrop-blur-sm border border-white/20">
          {(['location', 'hotel'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSearchType(type)}
              className={`flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-xl font-semibold transition-all duration-300 ${
                searchType === type
                  ? 'bg-white text-blue-600 shadow-lg shadow-blue-100'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              {type === 'location' ? (
                <MapPin className="h-4 w-4 lg:h-5 lg:w-5" />
              ) : (
                <Building className="h-4 w-4 lg:h-5 lg:w-5" />
              )}
              <span className="text-sm lg:text-base">
                {type === 'location' ? 'Location' : 'Hotel'}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4 lg:space-y-6">
          {/* Main Search Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none z-10">
              {searchType === 'location' ? (
                <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
              ) : (
                <Building className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
              )}
            </div>
            <input
              type="text"
              value={formData.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              placeholder={
                searchType === 'location' 
                  ? 'Where do you want to go? City, region, or country...' 
                  : 'Search for specific hotels...'
              }
              className="block w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 text-base lg:text-lg bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-gray-900 backdrop-blur-sm focus:outline-none"
              required
            />
          </div>

          {/* Date and Guest Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
            {/* Check-in Date */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none z-10">
                <Calendar className="h-4 w-4 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="date"
                value={formData.checkIn || formatDate(tomorrow)}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                min={formatDate(today)}
                className="block w-full pl-10 lg:pl-11 pr-3 py-3 lg:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 cursor-pointer text-sm lg:text-base text-gray-900 focus:outline-none"
              />
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600 rounded">
                Check-in
              </label>
            </div>

            {/* Check-out Date */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none z-10">
                <Calendar className="h-4 w-4 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="date"
                value={formData.checkOut || formatDate(dayAfterTomorrow)}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                min={formData.checkIn || formatDate(tomorrow)}
                className="block w-full pl-10 lg:pl-11 pr-3 py-3 lg:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 cursor-pointer text-sm lg:text-base text-gray-900 focus:outline-none"
              />
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600 rounded">
                Check-out
              </label>
            </div>

            {/* Guests Selector */}
            <div className="relative" ref={guestSelectorRef}>
              <button
                onClick={() => setShowGuestSelector(!showGuestSelector)}
                className="w-full pl-10 lg:pl-11 pr-3 py-3 lg:py-3.5 bg-white border-2 border-gray-200 rounded-xl text-left transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 group text-gray-900 focus:outline-none active:bg-white"
              >
                <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                  <Users className="h-4 w-4 text-blue-500 group-focus:text-blue-600 transition-colors" />
                </div>
                <div className="text-sm font-medium text-gray-900 truncate">
                  {getGuestSummary()}
                </div>
                <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${showGuestSelector ? 'rotate-180' : ''}`} />
                </div>
                <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-600 rounded">
                  Guests & Rooms
                </label>
              </button>

              {/* Guest Selector Dropdown */}
              <AnimatePresence>
                {showGuestSelector && (
                  <>
                    {/* Backdrop for mobile */}
                    {isMobile && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setShowGuestSelector(false)}
                      />
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute ${
                        isMobile 
                          ? 'fixed inset-x-4 bottom-4 max-h-[70vh] overflow-y-auto transform' 
                          : 'top-full left-0 right-0 mt-2 min-w-[320px]'
                      } bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 lg:p-6 z-50`}
                    >
                      {isMobile && (
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900 text-lg">Guests & Rooms</h3>
                          <button 
                            onClick={() => setShowGuestSelector(false)}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      <div className="space-y-5 lg:space-y-6">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm lg:text-base">Adults</div>
                            <div className="text-xs lg:text-sm text-gray-500 mt-1">Age 18+</div>
                          </div>
                          <div className="flex items-center gap-3 lg:gap-4">
                            <button
                              onClick={() => decrementGuests('adults')}
                              disabled={formData.adults <= 1}
                              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                              <span className="text-lg font-medium">−</span>
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900 text-base lg:text-lg">
                              {formData.adults}
                            </span>
                            <button
                              onClick={() => incrementGuests('adults')}
                              disabled={formData.adults >= 10}
                              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                              <span className="text-lg font-medium">+</span>
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm lg:text-base">Children</div>
                            <div className="text-xs lg:text-sm text-gray-500 mt-1">Ages 0-17</div>
                          </div>
                          <div className="flex items-center gap-3 lg:gap-4">
                            <button
                              onClick={() => decrementGuests('children')}
                              disabled={formData.children <= 0}
                              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                              <span className="text-lg font-medium">−</span>
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900 text-base lg:text-lg">
                              {formData.children}
                            </span>
                            <button
                              onClick={() => incrementGuests('children')}
                              disabled={formData.children >= 10}
                              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                              <span className="text-lg font-medium">+</span>
                            </button>
                          </div>
                        </div>

                        {/* Rooms */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm lg:text-base">Rooms</div>
                            <div className="text-xs lg:text-sm text-gray-500 mt-1">Maximum 5 rooms</div>
                          </div>
                          <div className="flex items-center gap-3 lg:gap-4">
                            <button
                              onClick={() => decrementGuests('rooms')}
                              disabled={formData.rooms <= 1}
                              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                              <span className="text-lg font-medium">−</span>
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900 text-base lg:text-lg">
                              {formData.rooms}
                            </span>
                            <button
                              onClick={() => incrementGuests('rooms')}
                              disabled={formData.rooms >= 5}
                              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                              <span className="text-lg font-medium">+</span>
                            </button>
                          </div>
                        </div>

                        {/* Done Button */}
                        <button
                          onClick={() => setShowGuestSelector(false)}
                          className="w-full py-3.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 mt-2"
                        >
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={!formData.query}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-3 lg:py-4 px-6 rounded-2xl font-semibold text-base lg:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl shadow-blue-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
          >
            <Search className="h-4 w-4 lg:h-5 lg:w-5" />
            {isMobile ? 'Search Hotels' : 'Search Hotels on Booking.com'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}