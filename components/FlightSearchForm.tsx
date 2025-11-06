'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shuffle, Calendar, MapPin, Plane, ChevronDown, User, DollarSign, Settings } from 'lucide-react';

interface FlightSearchParams {
  type: string;
  origin: string;
  destination?: string;
  depart_date?: string;
  return_date?: string;
  currency: string;
  limit?: number;
  page?: number;
  show_to_affiliates?: boolean;
  trip_class?: number;
  one_way?: boolean;
}

interface FlightSearchFormProps {
  onSearch: (params: FlightSearchParams) => void;
  loading: boolean;
}

const searchTypes = [
  { value: 'cheap', label: 'Cheapest', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
  { value: 'direct', label: 'Direct', icon: MapPin, color: 'from-blue-500 to-cyan-500' },
  { value: 'calendar', label: 'Calendar', icon: Calendar, color: 'from-purple-500 to-pink-500' },
  { value: 'monthly', label: 'Monthly', icon: Calendar, color: 'from-orange-500 to-red-500' },
  { value: 'latest', label: 'Latest', icon: Search, color: 'from-indigo-500 to-purple-500' },
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
];

const tripClasses = [
  { value: 0, label: 'Economy', description: 'Best value' },
  { value: 1, label: 'Premium', description: 'More comfort' },
  { value: 2, label: 'Business', description: 'Premium' },
  { value: 3, label: 'First', description: 'Luxury' },
];

const resultLimits = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

interface CustomDropdownProps {
  value: any;
  options: any[];
  onChange: (value: any) => void;
  icon?: React.ComponentType<any>;
  placeholder?: string;
  className?: string;
}

function CustomDropdown({ value, options, onChange, icon: Icon, placeholder, className = '' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border-2 border-gray-300 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm min-w-[80px] hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <div className="flex items-center space-x-1 sm:space-x-2 truncate">
          {Icon && <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-600 flex-shrink-0" />}
          <span className="text-gray-800 font-medium truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown className={`h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-600 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-50 w-full mt-1 bg-white border-2 border-blue-200 rounded-lg shadow-lg py-1 text-xs sm:text-sm min-w-[120px]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors duration-150 truncate ${
                  value === option.value ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-800'
                }`}
              >
                <div className="font-medium truncate">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-600 mt-0.5 truncate">{option.description}</div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FlightSearchForm({ onSearch, loading }: FlightSearchFormProps) {
  const [formData, setFormData] = useState<FlightSearchParams>({
    type: 'cheap',
    origin: '',
    destination: '',
    depart_date: '',
    return_date: '',
    currency: 'USD',
    limit: 50,
    show_to_affiliates: true,
    trip_class: 0,
    one_way: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.origin && !/^[A-Za-z]{3}$/.test(formData.origin)) {
      alert('Please enter a valid 3-letter IATA code for origin');
      return;
    }
    
    if (formData.destination && !/^[A-Za-z]{3}$/.test(formData.destination)) {
      alert('Please enter a valid 3-letter IATA code for destination');
      return;
    }

    onSearch(formData);
  };

  const swapLocations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination || '',
      destination: prev.origin || '',
    }));
  };

  const setTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, depart_date: today }));
  };

  const addDaysToDate = (days: number) => {
    const baseDate = formData.depart_date ? new Date(formData.depart_date) : new Date();
    baseDate.setDate(baseDate.getDate() + days);
    const newDate = baseDate.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, depart_date: newDate }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6 max-w-6xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Search Type - Responsive Grid */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
            Search Type
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-2">
            {searchTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <motion.button
                  key={type.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  className={`rounded-lg py-1.5 px-1 sm:py-2 sm:px-2 text-xs font-medium transition-all duration-200 min-h-[48px] border-2 ${
                    formData.type === type.value
                      ? `bg-gradient-to-r ${type.color} text-white shadow-md border-transparent`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5 mx-auto mb-0.5 sm:mb-1" />
                  <span className="block text-center leading-tight">{type.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Main Search Section */}
        <div className="space-y-4">
          {/* Locations Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
            {/* From Input */}
            <div className="md:col-span-5">
              <label htmlFor="origin" className="block text-xs font-medium text-gray-700 mb-1">
                From
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="origin"
                  required
                  maxLength={3}
                  placeholder="NYC"
                  value={formData.origin}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    origin: e.target.value.toUpperCase().replace(/[^A-Za-z]/g, '')
                  }))}
                  className="w-full rounded-lg border-2 border-gray-300 px-2 py-1.5 sm:px-3 sm:py-2 pl-7 sm:pl-8 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white text-gray-900 placeholder-gray-500"
                />
                <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
              </div>
            </div>

            {/* Swap Button - Centered on mobile, inline on desktop */}
            <div className="flex justify-center md:justify-center md:items-end md:py-2 md:col-span-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapLocations}
                className="p-1.5 sm:p-2 bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg shadow-sm transition-colors"
              >
                <Shuffle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-700" />
              </motion.button>
            </div>

            {/* To Input */}
            <div className="md:col-span-5">
              <label htmlFor="destination" className="block text-xs font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="destination"
                  maxLength={3}
                  placeholder="LON"
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    destination: e.target.value.toUpperCase().replace(/[^A-Za-z]/g, '')
                  }))}
                  className="w-full rounded-lg border-2 border-gray-300 px-2 py-1.5 sm:px-3 sm:py-2 pl-7 sm:pl-8 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white text-gray-900 placeholder-gray-500"
                />
                <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Dates and Options Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
            {/* Dates Section */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Departure Date */}
              <div>
                <label htmlFor="depart_date" className="block text-xs font-medium text-gray-700 mb-1">
                  Departure
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    id="depart_date"
                    value={formData.depart_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, depart_date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="flex-1 rounded-lg border-2 border-gray-300 px-2 py-1.5 sm:px-3 sm:py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors min-w-0 bg-white text-gray-900"
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={setTodayDate}
                      className="text-xs bg-white border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-700 px-2 py-1 rounded transition-colors whitespace-nowrap font-medium"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => addDaysToDate(7)}
                      className="text-xs bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 px-2 py-1 rounded transition-colors whitespace-nowrap font-medium"
                    >
                      +7d
                    </button>
                  </div>
                </div>
              </div>

              {/* Return Date */}
              <div>
                <label htmlFor="return_date" className="block text-xs font-medium text-gray-700 mb-1">
                  Return
                </label>
                <input
                  type="date"
                  id="return_date"
                  value={formData.return_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, return_date: e.target.value }))}
                  min={formData.depart_date || new Date().toISOString().split('T')[0]}
                  className="w-full rounded-lg border-2 border-gray-300 px-2 py-1.5 sm:px-3 sm:py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Quick Options */}
            <div className="lg:col-span-4 grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <CustomDropdown
                  value={formData.currency}
                  options={currencies.map(c => ({ value: c.code, label: c.code }))}
                  onChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  icon={DollarSign}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Class
                </label>
                <CustomDropdown
                  value={formData.trip_class}
                  options={tripClasses}
                  onChange={(value) => setFormData(prev => ({ ...prev, trip_class: value }))}
                  icon={User}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading || !formData.origin}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg font-medium text-xs sm:text-sm disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm min-h-[42px] border-2 border-transparent hover:border-blue-800"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1.5"></div>
                  ) : (
                    <Search className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 flex-shrink-0" />
                  )}
                  <span className="truncate">{loading ? '...' : 'Search'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-medium text-gray-700 whitespace-nowrap">Results:</label>
            <select
              value={formData.limit}
              onChange={(e) => setFormData(prev => ({ ...prev, limit: Number(e.target.value) }))}
              className="text-xs border-2 border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-16 bg-white text-gray-900"
            >
              {resultLimits.map(limit => (
                <option key={limit.value} value={limit.value}>{limit.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="one_way"
              checked={formData.one_way}
              onChange={(e) => setFormData(prev => ({ ...prev, one_way: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-200 border-2 border-gray-300 rounded"
            />
            <label htmlFor="one_way" className="text-xs text-gray-700 whitespace-nowrap font-medium">
              One-way flight
            </label>
          </div>

          <div className="text-xs text-gray-600 flex items-center font-medium">
            <Plane className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">Enter 3-letter IATA codes</span>
          </div>
        </div>
      </form>
    </motion.div>
  );
}