'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Calendar, Users, ChevronDown, MapPin, X } from 'lucide-react';

export default function FlightSearchForm() {
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Date helpers
  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayDate = (): string => getLocalDateString(new Date());

  const getTomorrowDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return getLocalDateString(date);
  };

  const getNextWeekDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return getLocalDateString(date);
  };

  const isValidDate = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const [year, month, day] = dateStr.split('-').map(Number);
    return year >= 2024 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
  };

  // Generate affiliate link
  const getAviasalesSearchUrl = (): string | null => {
    if (!formData.from.trim() || !formData.to.trim() || !formData.departureDate) {
      return null;
    }
    if (!isValidDate(formData.departureDate)) return null;

    // Build destination URL
    const baseUrl = 'https://www.aviasales.com';
    const searchParams = new URLSearchParams({
      origin_iata: formData.from.trim().toUpperCase(),
      destination_iata: formData.to.trim().toUpperCase(),
      depart_date: formData.departureDate,
      adults: formData.adults.toString(),
      children: formData.children.toString(),
      infants: formData.infants.toString(),
      trip_class: '0',
      currency: 'usd'
    });

    if (tripType === 'round-trip' && formData.returnDate && isValidDate(formData.returnDate)) {
      searchParams.append('return_date', formData.returnDate);
    }
    if (tripType === 'one-way') {
      searchParams.append('oneway', '1');
    }

    const destinationUrl = `${baseUrl}/search?${searchParams.toString()}`;

    // Wrap in Travelpayouts affiliate link
    const tpBase = 'https://tp.media/r';
    const affiliateParams = new URLSearchParams({
      marker: '297036',
      trs: '504856',
      p: '4114',
      u: encodeURIComponent(destinationUrl)
    });

    return `${tpBase}?${affiliateParams.toString()}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.from.trim()) { alert('Please enter departure city/airport'); return; }
    if (!formData.to.trim()) { alert('Please enter destination city/airport'); return; }
    if (!formData.departureDate) { alert('Please select departure date'); return; }

    const affiliateUrl = getAviasalesSearchUrl();
    if (affiliateUrl) {
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Unable to generate search URL. Please check your inputs.');
    }
  };

  const incrementPassengers = (type: 'adults' | 'children' | 'infants') => {
    const max = type === 'infants' ? formData.adults : 9;
    setFormData(prev => ({ ...prev, [type]: Math.min(prev[type] + 1, max) }));
  };

  const decrementPassengers = (type: 'adults' | 'children' | 'infants') => {
    setFormData(prev => ({ ...prev, [type]: Math.max(prev[type] - 1, type === 'adults' ? 1 : 0) }));
  };

  const getPassengerSummary = () => {
    if (isMobile) {
      return `${formData.adults + formData.children} passenger${formData.adults + formData.children > 1 ? 's' : ''}`;
    }
    const parts = [];
    if (formData.adults) parts.push(`${formData.adults} Adult${formData.adults > 1 ? 's' : ''}`);
    if (formData.children) parts.push(`${formData.children} Child${formData.children > 1 ? 'ren' : ''}`);
    if (formData.infants) parts.push(`${formData.infants} Infant${formData.infants > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const clearLocation = (field: 'from' | 'to') => {
    setFormData(prev => ({ ...prev, [field]: '' }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(e);
  };

  // Set default dates on mount
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      departureDate: getTomorrowDate(),
      returnDate: getNextWeekDate()
    }));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" >
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
                  if (type === 'one-way') {
                    setFormData(prev => ({ ...prev, returnDate: '' }));
                  } else if (type === 'round-trip' && !formData.returnDate) {
                    setFormData(prev => ({ ...prev, returnDate: getNextWeekDate() }));
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
            {/* From */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="City or airport (e.g., JFK, LHR)"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  required
                />
                {formData.from && (
                  <button
                    type="button"
                    onClick={() => clearLocation('from')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* To */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="City or airport (e.g., LAX, CDG)"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  required
                />
                {formData.to && (
                  <button
                    type="button"
                    onClick={() => clearLocation('to')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
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
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  min={getTodayDate()}
                  className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  required
                />
              </div>
            </div>

            {/* Return Date */}
            {tripType === 'round-trip' && (
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    min={formData.departureDate}
                    className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Passengers */}
            <div className={`${tripType === 'round-trip' ? 'lg:col-span-2' : 'lg:col-span-4'} relative`} ref={passengerSelectorRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travelers
              </label>
              <button
                type="button"
                onClick={() => setShowPassengerSelector(!showPassengerSelector)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-left"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm sm:text-base font-medium">{getPassengerSummary()}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showPassengerSelector ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showPassengerSelector && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
                  >
                    {/* Adult counter */}
                    <div className="flex items-center justify-between">
                      <div><div className="font-medium text-gray-900">Adults</div><div className="text-sm text-gray-500">Age 12+</div></div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => decrementPassengers('adults')} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900">-</button>
                        <span className="w-8 text-center font-medium text-gray-900">{formData.adults}</span>
                        <button type="button" onClick={() => incrementPassengers('adults')} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900">+</button>
                      </div>
                    </div>

                    {/* Children counter */}
                    <div className="flex items-center justify-between mt-4">
                      <div><div className="font-medium text-gray-900">Children</div><div className="text-sm text-gray-500">Age 2-11</div></div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => decrementPassengers('children')} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900">-</button>
                        <span className="w-8 text-center font-medium text-gray-900">{formData.children}</span>
                        <button type="button" onClick={() => incrementPassengers('children')} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900">+</button>
                      </div>
                    </div>

                    {/* Infants counter */}
                    <div className="flex items-center justify-between mt-4">
                      <div><div className="font-medium text-gray-900">Infants</div><div className="text-sm text-gray-500">Under 2</div></div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => decrementPassengers('infants')} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900">-</button>
                        <span className="w-8 text-center font-medium text-gray-900">{formData.infants}</span>
                        <button type="button" onClick={() => incrementPassengers('infants')} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900">+</button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 mt-4">
                      <button type="button" onClick={() => setShowPassengerSelector(false)} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 lg:col-span-12">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!formData.from.trim() || !formData.to.trim() || !formData.departureDate}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent/0 via-white/10 to-transparent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Plane className="h-5 w-5 rotate-45" />
                <span>Search Flights on Aviasales</span>
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
                className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 border border-blue-200"
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