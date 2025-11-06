'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin } from 'lucide-react';

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
  { value: 'cheap', label: 'Cheapest Flights', icon: Search },
  { value: 'direct', label: 'Direct Flights', icon: MapPin },
  { value: 'calendar', label: 'Calendar View', icon: Calendar },
  { value: 'monthly', label: 'Monthly View', icon: Calendar },
  { value: 'latest', label: 'Latest Prices', icon: Search },
];

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

  const [isMounted, setIsMounted] = useState(false);

  // This ensures component only renders after mounting (client-side)
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const setNextWeekDate = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekFormatted = nextWeek.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, depart_date: nextWeekFormatted }));
  };

  // Show loading skeleton until component is mounted
  if (!isMounted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 animate-pulse">
        <div className="space-y-6">
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Search Type
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {searchTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  className={`rounded-lg py-3 px-2 text-sm font-medium transition-all duration-200 ${
                    formData.type === type.value
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mx-auto mb-1" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative">
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
              From Airport
            </label>
            <div className="relative">
              <input
                type="text"
                id="origin"
                required
                maxLength={3}
                placeholder="e.g., NYC"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  origin: e.target.value.toUpperCase().replace(/[^A-Za-z]/g, '')
                }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <p className="mt-1 text-xs text-gray-500">3-letter IATA code (e.g., JFK, LAX)</p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                To Airport
              </label>
              <button
                type="button"
                onClick={swapLocations}
                className="text-xs text-blue-600 hover:text-blue-500 flex items-center"
              >
                <span className="h-3 w-3 mr-1 inline-block" aria-hidden="true">⇄</span>
                Swap
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                id="destination"
                maxLength={3}
                placeholder="e.g., LON"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  destination: e.target.value.toUpperCase().replace(/[^A-Za-z]/g, '')
                }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <p className="mt-1 text-xs text-gray-500">3-letter IATA code (optional for some searches)</p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="depart_date" className="block text-sm font-medium text-gray-700">
                Departure Date
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={setTodayDate}
                  className="text-xs text-blue-600 hover:text-blue-500"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={setNextWeekDate}
                  className="text-xs text-blue-600 hover:text-blue-500"
                >
                  Next Week
                </button>
              </div>
            </div>
            <input
              type="date"
              id="depart_date"
              value={formData.depart_date}
              onChange={(e) => setFormData(prev => ({ ...prev, depart_date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-2">
              Return Date (Optional)
            </label>
            <input
              type="date"
              id="return_date"
              value={formData.return_date}
              onChange={(e) => setFormData(prev => ({ ...prev, return_date: e.target.value }))}
              min={formData.depart_date || new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
          </div>

          <div>
            <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-2">
              Results Limit
            </label>
            <select
              id="limit"
              value={formData.limit}
              onChange={(e) => setFormData(prev => ({ ...prev, limit: Number(e.target.value) }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            >
              <option value={10}>10 results</option>
              <option value={25}>25 results</option>
              <option value={50}>50 results</option>
              <option value={100}>100 results</option>
            </select>
          </div>

          <div>
            <label htmlFor="trip_class" className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              id="trip_class"
              value={formData.trip_class}
              onChange={(e) => setFormData(prev => ({ ...prev, trip_class: Number(e.target.value) }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            >
              <option value={0}>Economy</option>
              <option value={1}>Premium Economy</option>
              <option value={2}>Business</option>
              <option value={3}>First Class</option>
            </select>
          </div>
        </div>

        {/* One-way toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="one_way"
            checked={formData.one_way}
            onChange={(e) => setFormData(prev => ({ ...prev, one_way: e.target.checked }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="one_way" className="ml-2 block text-sm text-gray-700">
            One-way flight
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.origin}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-500 hover:to-indigo-500 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Searching Flights...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Search Flights
            </>
          )}
        </button>
      </form>
    </div>
  );
}