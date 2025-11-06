'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react';

const hotelSearchTypes = [
  { value: 'lookup', label: 'Search Hotels', icon: Search },
  { value: 'cache', label: 'Price Check', icon: MapPin },
  { value: 'static-hotels', label: 'Hotel List', icon: Star },
];

type HotelSearchFormData = {
  type: 'lookup' | 'cache' | 'static-hotels' | string;
  query: string;
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  currency: string;
  limit: number;
  lang: string;
};

interface HotelSearchFormProps {
  onSearch: (data: HotelSearchFormData) => void;
  loading?: boolean;
}

export default function HotelSearchForm({ onSearch, loading }: HotelSearchFormProps) {
  const [formData, setFormData] = useState<HotelSearchFormData>({
    type: 'lookup',
    query: '',
    location: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    currency: 'USD',
    limit: 10,
    lang: 'en',
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSearch(formData);
  };

  const setDefaultDates = () => {
    const today = new Date();
    const checkIn = today.toISOString().split('T')[0];
    
    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + 3);
    const checkOutFormatted = checkOut.toISOString().split('T')[0];
    
    setFormData(prev => ({
      ...prev,
      checkIn,
      checkOut: checkOutFormatted
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Search Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {hotelSearchTypes.map((searchType) => {
              const IconComponent = searchType.icon;
              return (
                <button
                  key={searchType.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: searchType.value }))}
                  className={`rounded-lg py-3 px-2 text-sm font-medium transition-all duration-200 ${
                    formData.type === searchType.value
                      ? 'bg-green-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mx-auto mb-1" />
                  {searchType.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Query */}
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
            {formData.type === 'lookup' ? 'Search Location or Hotel' : 'Location'}
          </label>
          <div className="relative">
            <input
              type="text"
              id="query"
              required={formData.type === 'lookup'}
              placeholder={formData.type === 'lookup' ? "e.g., New York or Hilton" : "e.g., NYC"}
              value={formData.query}
              onChange={(e) => setFormData(prev => ({ ...prev, query: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-green-500 focus:ring-green-500 transition-colors"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Dates */}
        {(formData.type === 'cache' || formData.type === 'search-start') && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <button
                  type="button"
                  onClick={setDefaultDates}
                  className="text-xs text-green-600 hover:text-green-500"
                >
                  Set Dates
                </button>
              </div>
              <input
                type="date"
                id="checkIn"
                required
                value={formData.checkIn}
                onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Date
              </label>
              <input
                type="date"
                id="checkOut"
                required
                value={formData.checkOut}
                onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Guests */}
        {(formData.type === 'cache' || formData.type === 'search-start') && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-2">
                Adults
              </label>
              <select
                id="adults"
                value={formData.adults}
                onChange={(e) => setFormData(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-2">
                Children
              </label>
              <select
                id="children"
                value={formData.children}
                onChange={(e) => setFormData(prev => ({ ...prev, children: parseInt(e.target.value) }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 transition-colors"
              >
                {[0, 1, 2, 3].map(num => (
                  <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:ring-green-500 transition-colors"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.query}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-500 hover:to-emerald-500 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Searching Hotels...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Search Hotels
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}