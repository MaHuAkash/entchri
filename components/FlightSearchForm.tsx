'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plane, Calendar, Users, ChevronDown, MapPin, X } from 'lucide-react';

interface FlightSearchFormProps {
  loading?: boolean;
}

export default function FlightSearchForm({ loading = false }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi-city'>('round-trip');
  const [cabinClass, setCabinClass] = useState<'economy' | 'premium' | 'business' | 'first'>('economy');
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

  // Generate search URL (example with Skyscanner-like format)
  const getFlightSearchUrl = () => {
    const params = new URLSearchParams({
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      infants: formData.infants.toString(),
      cabinClass: cabinClass,
      tripType: tripType,
      from: formData.from,
      to: formData.to,
      departureDate: formData.departureDate || formatDate(tomorrow),
    });

    if (tripType === 'round-trip' && formData.returnDate) {
      params.set('returnDate', formData.returnDate);
    }

    return `https://www.skyscanner.net/transport/flights/${formData.from}/${formData.to}/${params}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim()) return;
    const flightUrl = getFlightSearchUrl();
    window.open(flightUrl, '_blank', 'noopener,noreferrer');
  };

  const incrementPassengers = (type: 'adults' | 'children' | 'infants') => {
    const max = type === 'infants' ? formData.adults : 9; // Infants cannot exceed adults
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
                  onClick={() => setTripType(type)}
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

            {/* Search Form Grid - Adjusted for better alignment */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-12 sm:gap-4">
              {/* From Location - Adjusted to span 3 columns */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
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
                    placeholder="City or airport"
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

              {/* To Location - Adjusted to span 3 columns */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
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
                    placeholder="City or airport"
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

              {/* Departure Date - Adjusted to span 2 columns */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.departureDate || formatDate(tomorrow)}
                    onChange={(e) => handleInputChange('departureDate', e.target.value)}
                    min={formatDate(today)}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-pointer text-sm sm:text-base transition-colors"
                  />
                </div>
              </div>

              {/* Return Date - Conditionally shown - Adjusted to span 2 columns */}
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
                      value={formData.returnDate || formatDate(nextWeek)}
                      onChange={(e) => handleInputChange('returnDate', e.target.value)}
                      min={formData.departureDate || formatDate(tomorrow)}
                      className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-pointer text-sm sm:text-base transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Passengers & Cabin Class Selector - Adjusted span */}
              <div className={`${tripType === 'round-trip' ? 'lg:col-span-2' : 'lg:col-span-4'} relative`} ref={passengerSelectorRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travelers & Class
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassengerSelector(!showPassengerSelector)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700 bg-white text-left group"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Users className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    <span className="truncate text-sm sm:text-base font-medium">
                      {getPassengerSummary()} • {cabinClass}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-transform ${showPassengerSelector ? 'rotate-180' : ''} flex-shrink-0 ml-2`} />
                </button>

                {/* Passenger Selector Dropdown */}
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
                            <h3 className="font-semibold text-gray-900 text-lg">Travelers & Class</h3>
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

                          {/* Cabin Class Selection */}
                          <div className="pt-4 border-t border-gray-200">
                            <div className="font-semibold text-gray-900 text-base mb-3">Cabin Class</div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {([
                                { value: 'economy', label: 'Economy' },
                                { value: 'premium', label: 'Premium' },
                                { value: 'business', label: 'Business' },
                                { value: 'first', label: 'First' },
                              ] as const).map((cls) => (
                                <button
                                  key={cls.value}
                                  type="button"
                                  onClick={() => setCabinClass(cls.value)}
                                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    cabinClass === cls.value
                                      ? 'bg-blue-600 text-white shadow-sm'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {cls.label}
                                </button>
                              ))}
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
              </div>

              {/* Search Button - Adjusted to span full width */}
              <div className="sm:col-span-2 lg:col-span-12">
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!formData.from.trim() || !formData.to.trim()}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-base group relative overflow-hidden"
                  aria-label="Search flights"
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
                      Search Flights
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
                    setFormData(prev => ({
                      ...prev,
                      from: route.from,
                      to: route.to
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