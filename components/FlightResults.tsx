'use client';

import { motion } from 'framer-motion';
import { Plane, Calendar, DollarSign, MapPin, AlertCircle, Clock, Users, ArrowRight, ExternalLink } from 'lucide-react';

interface FlightResultsProps {
  results: any;
  searchParams: any;
  loading: boolean;
}

export default function FlightResults({ results, searchParams, loading }: FlightResultsProps) {
  const TRAVELPAYOUTS_MARKER = '297036';

  const handleFlightClick = (flight: any) => {
    // Construct TravelPayouts URL based on flight data
    const baseUrl = 'https://www.aviasales.com/search';
    const params = new URLSearchParams({
      marker: TRAVELPAYOUTS_MARKER,
      origin: flight.origin || searchParams.origin,
      destination: flight.destination || searchParams.destination,
      depart_date: flight.departure_at?.split('T')[0] || searchParams.depart_date,
      adults: searchParams.adults || '1',
      children: searchParams.children || '0',
      infants: searchParams.infants || '0',
      currency: results.data?.currency || 'USD',
      with_request: 'true'
    });

    const travelPayoutsUrl = `${baseUrl}?${params.toString()}`;
    window.open(travelPayoutsUrl, '_blank');
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-700 font-medium">Searching for flights...</p>
        <p className="text-sm text-gray-500 mt-2">Finding the best deals for you</p>
      </motion.div>
    );
  }

  if (!results.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center border border-red-200"
      >
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-3">Search Failed</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{results.error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  if (!results.data || Object.keys(results.data).length === 0 || !results.data.data || Object.keys(results.data.data).length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center border border-yellow-200"
      >
        <MapPin className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-3">No Flights Found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your search criteria or dates</p>
        <div className="text-sm text-gray-500 space-y-2 max-w-xs mx-auto">
          <p className="flex items-center justify-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Check if airport codes are correct
          </p>
          <p className="flex items-center justify-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Try different dates
          </p>
          <p className="flex items-center justify-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Remove destination for some search types
          </p>
        </div>
      </motion.div>
    );
  }

  const renderFlightData = () => {
    const { data, endpoint } = results;

    switch (endpoint) {
      case 'cheap':
        return renderCheapFlights(data);
      case 'direct':
        return renderDirectFlights(data);
      case 'calendar':
        return renderCalendar(data);
      case 'monthly':
        return renderMonthly(data);
      case 'latest':
        return renderLatestFlights(data);
      default:
        return renderGenericData(data);
    }
  };

  const renderCheapFlights = (data: any) => {
    const flights = data.data || {};
    const currency = data.currency || 'USD';
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(flights).map(([key, flight]: [string, any], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleFlightClick(flight)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {flight.origin} <ArrowRight className="h-4 w-4 inline mx-2" /> {flight.destination}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {flight.airline} • {flight.flight_number}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <div className="space-y-3 mb-4">
                {flight.departure_at && (
                  <div className="flex items-center text-sm text-gray-700 bg-white px-3 py-2 rounded-lg">
                    <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                    <span className="font-medium">{new Date(flight.departure_at).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                )}
                
                {flight.duration && (
                  <div className="flex items-center text-sm text-gray-700 bg-white px-3 py-2 rounded-lg">
                    <Clock className="h-4 w-4 mr-3 text-green-500" />
                    <span>Duration: {flight.duration}</span>
                  </div>
                )}
                
                {flight.transfers !== undefined && (
                  <div className="flex items-center text-sm text-gray-700 bg-white px-3 py-2 rounded-lg">
                    <Users className="h-4 w-4 mr-3 text-purple-500" />
                    <span>{flight.transfers === 0 ? 'Direct Flight' : `${flight.transfers} stop(s)`}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      {currency} {flight.price}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Click to view on TravelPayouts</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                    View Deal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderDirectFlights = (data: any) => {
    const flights = data.data || {};
    const currency = data.currency || 'USD';
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <h3 className="font-bold text-green-900 text-lg flex items-center mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            Direct Flights Only
          </h3>
          <p className="text-green-700">Showing non-stop flights for your convenience</p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(flights).map(([key, flight]: [string, any], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleFlightClick(flight)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-green-100 p-4 rounded-2xl group-hover:bg-green-200 transition-colors">
                    <Plane className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">
                      {flight.origin} → {flight.destination}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {flight.airline} • Direct Flight
                    </p>
                    {flight.duration && (
                      <p className="text-gray-500 mt-2">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Duration: {flight.duration}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">
                    {currency} {flight.price}
                  </p>
                  {flight.departure_at && (
                    <p className="text-gray-600 mt-2">
                      {new Date(flight.departure_at).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex items-center justify-end mt-2 text-blue-600">
                    <span className="text-sm mr-2">View on TravelPayouts</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderCalendar = (data: any) => {
    const calendar = data.data || {};
    const currency = data.currency || 'USD';
    
    const dates = Object.keys(calendar).sort();
    
    return (
      <div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-200">
          <h3 className="font-bold text-purple-900 text-lg flex items-center mb-2">
            <Calendar className="h-5 w-5 mr-2" />
            Calendar View - Price by Date
          </h3>
          <p className="text-purple-700">Click on a date to see flight details on TravelPayouts</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {dates.map((date, index) => {
            const priceData = calendar[date];
            return (
              <motion.button
                key={date}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 group cursor-pointer"
                onClick={() => priceData && handleFlightClick(priceData)}
              >
                <p className="text-sm font-medium text-gray-900 group-hover:text-purple-600">
                  {new Date(date).getDate()}
                </p>
                <p className="text-xs text-gray-600 mb-3 group-hover:text-purple-500">
                  {new Date(date).toLocaleDateString('en', { month: 'short' })}
                </p>
                {priceData && priceData.price ? (
                  <div>
                    <p className="text-lg font-bold text-green-600 group-hover:text-green-700">
                      {currency} {priceData.price}
                    </p>
                    <p className="text-xs text-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No data</p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthly = (data: any) => {
    const monthly = data.data || {};
    const currency = data.currency || 'USD';
    
    return (
      <div>
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-8 border border-orange-200">
          <h3 className="font-bold text-orange-900 text-lg flex items-center mb-2">
            <Calendar className="h-5 w-5 mr-2" />
            Monthly View - Best Prices by Month
          </h3>
          <p className="text-orange-700">Click on a month to explore flights on TravelPayouts</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Object.entries(monthly).map(([month, priceData]: [string, any], index) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center border border-orange-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => priceData && handleFlightClick(priceData)}
            >
              <h4 className="font-bold text-gray-900 mb-3 text-lg">{month}</h4>
              {priceData && priceData.price ? (
                <div>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    {currency} {priceData.price}
                  </p>
                  <p className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view flights
                  </p>
                </div>
              ) : (
                <p className="text-gray-400">No data</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderLatestFlights = (data: any) => {
    const flights = data.data || [];
    const currency = data.currency || 'USD';
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
          <h3 className="font-bold text-green-900 text-lg flex items-center mb-2">
            <Clock className="h-5 w-5 mr-2" />
            Latest Flight Prices
          </h3>
          <p className="text-green-700">Most recent flight price updates - click any flight to view on TravelPayouts</p>
        </div>
        
        <div className="space-y-4">
          {flights.slice(0, 10).map((flight: any, index: number) => (
            <motion.div
              key={flight.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleFlightClick(flight)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors">
                    <Plane className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">
                      {flight.origin} → {flight.destination}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {flight.airline} • {flight.flight_number}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Updated: {flight.actual_utc ? new Date(flight.actual_utc).toLocaleString() : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">
                    {currency} {flight.value}
                  </p>
                  <p className="text-gray-600 text-lg mt-2">
                    {flight.depart_date}
                  </p>
                  <div className="flex items-center justify-end mt-2 text-blue-600">
                    <span className="text-sm mr-2">View Deal</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderGenericData = (data: any) => {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 text-lg mb-4">Flight Data</h3>
        <div className="bg-white p-4 rounded-xl border overflow-auto max-h-96">
          <pre className="text-sm text-gray-700">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  const getResultCount = () => {
    const data = results.data?.data || results.data || {};
    if (Array.isArray(data)) return data.length;
    return Object.keys(data).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Flight Results</h2>
          <div className="flex items-center text-gray-600 text-lg">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-medium">{searchParams?.origin}</span>
            {searchParams?.destination && (
              <>
                <ArrowRight className="h-4 w-4 mx-3" />
                <span className="font-medium">{searchParams.destination}</span>
              </>
            )}
            {searchParams?.depart_date && (
              <span className="ml-4">
                • {new Date(searchParams.depart_date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-start lg:items-end space-y-2">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 font-semibold text-sm">
            {results.endpoint?.charAt(0).toUpperCase() + results.endpoint?.slice(1)} Search
          </div>
          <p className="text-gray-600 font-medium">
            Found {getResultCount()} results
          </p>
          {results.timestamp && (
            <p className="text-sm text-gray-500">
              Updated: {new Date(results.timestamp).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Flight Results */}
      {renderFlightData()}

      {/* Footer Note */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          💡 Click on any flight to view detailed information and book on TravelPayouts
        </p>
      </div>
    </motion.div>
  );
}