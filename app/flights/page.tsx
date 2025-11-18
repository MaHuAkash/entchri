'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plane, Calendar, MapPin } from 'lucide-react';
import FlightSearchForm from '@/components/FlightSearchForm';

interface FlightSearchParams {
  type: string;
  origin: string;
  destination?: string;
  depart_date?: string;
  return_date?: string;
  currency: string;
  limit?: number;
}

interface FlightResult {
  success: boolean;
  data?: any;
  error?: string;
  endpoint?: string;
  timestamp?: string;
}

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);
  const [results, setResults] = useState<FlightResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (params: FlightSearchParams) => {
    setLoading(true);
    setSearchParams(params);
    
    try {
      const response = await fetch('/api/cached-flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      setResults({
        success: false,
        error: 'Failed to fetch flight data. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
       <div className="pt-15 pb-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <FlightSearchForm onSearch={handleSearch} loading={loading} />
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
            
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        {!results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-3"
          >
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Smart Search</h3>
              <p className="mt-2 text-sm text-gray-600">
                Find the best deals across multiple airlines and booking platforms
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-green-600 text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Flexible Dates</h3>
              <p className="mt-2 text-sm text-gray-600">
                Compare prices across different dates to find the cheapest options
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Global Coverage</h3>
              <p className="mt-2 text-sm text-gray-600">
                Access flight data from thousands of destinations worldwide
              </p>
            </div>
          </motion.div>
        )}
      </div>
      </div>
    </div>
  );
}