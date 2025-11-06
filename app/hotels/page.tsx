'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Maximize2, Search, Hotel, MapPin, Star, Users, Calendar, Building } from 'lucide-react';

interface HotelResult {
  id: string;
  name: string;
  location: string;
  price?: number;
  stars?: number;
  rating?: number;
  image?: string;
  distance?: number;
}

interface SearchData {
  type: string;
  query: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  currency: string;
}

interface HotelSearchFormData {
  type: 'lookup' | 'cache' | 'static-hotels';
  query: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  currency: string;
  limit: number;
  lang: string;
}

const hotelSearchTypes: { value: HotelSearchFormData['type']; label: string; icon: any; description: string }[] = [
  { value: 'lookup', label: 'Search Hotels', icon: Search, description: 'Find hotels by name or location' },
  { value: 'cache', label: 'Check Prices', icon: MapPin, description: 'Get pricing for specific locations' },
  { value: 'static-hotels', label: 'Browse All', icon: Building, description: 'View all available hotels' },
];

function HotelSearchForm({ onSearch, loading }: { onSearch: (data: HotelSearchFormData) => void; loading?: boolean }) {
  const [formData, setFormData] = useState<HotelSearchFormData>({
    type: 'lookup',
    query: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    currency: 'USD',
    limit: 10,
    lang: 'en',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type !== 'static-hotels' && !formData.query.trim()) {
      alert('Please enter a search query');
      return;
    }
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

  const getPlaceholder = (): string => {
    switch (formData.type) {
      case 'lookup': return "e.g., New York, Hilton, or Paris";
      case 'cache': return "e.g., Vancouver, NYC, or London";
      case 'static-hotels': return "Enter location (optional)";
      default: return "Enter search term";
    }
  };

  const getInputLabel = (): string => {
    switch (formData.type) {
      case 'lookup': return 'Search Hotels & Locations';
      case 'cache': return 'Location for Price Check';
      case 'static-hotels': return 'Location (Optional)';
      default: return 'Search';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-4">
            Search Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {hotelSearchTypes.map((searchType) => {
              const IconComponent = searchType.icon;
              const isSelected = formData.type === searchType.value;
              
              return (
                <button
                  key={searchType.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: searchType.value }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white/60 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className={`font-semibold ${
                      isSelected ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {searchType.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">
                    {searchType.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Query */}
        <div>
          <label htmlFor="query" className="block text-sm font-semibold text-gray-800 mb-2">
            {getInputLabel()}
          </label>
          <div className="relative">
            <input
              type="text"
              id="query"
              required={formData.type !== 'static-hotels'}
              placeholder={getPlaceholder()}
              value={formData.query}
              onChange={(e) => setFormData(prev => ({ ...prev, query: e.target.value }))}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-11 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Dates - Only for cache searches */}
        {formData.type === 'cache' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="checkIn" className="block text-sm font-semibold text-gray-800">
                  Check-in Date
                </label>
                <button
                  type="button"
                  onClick={setDefaultDates}
                  className="text-xs text-blue-600 hover:text-blue-500 font-medium"
                >
                  Set Dates
                </button>
              </div>
              <div className="relative">
                <input
                  type="date"
                  id="checkIn"
                  required
                  value={formData.checkIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm font-semibold text-gray-800 mb-2">
                Check-out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="checkOut"
                  required
                  value={formData.checkOut}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Guests & Currency - Only for cache searches */}
        {formData.type === 'cache' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="adults" className="block text-sm font-semibold text-gray-800 mb-2">
                Guests
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <select
                    id="adults"
                    value={formData.adults}
                    onChange={(e) => setFormData(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1 relative">
                  <select
                    id="children"
                    value={formData.children}
                    onChange={(e) => setFormData(prev => ({ ...prev, children: parseInt(e.target.value) }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 appearance-none"
                  >
                    {[0, 1, 2, 3].map(num => (
                      <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="currency" className="block text-sm font-semibold text-gray-800 mb-2">
                Currency
              </label>
              <div className="relative">
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 appearance-none"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || (formData.type !== 'static-hotels' && !formData.query.trim())}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-500 hover:to-indigo-500 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Searching Hotels...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              {formData.type === 'lookup' && 'Search Hotels'}
              {formData.type === 'cache' && 'Check Prices'}
              {formData.type === 'static-hotels' && 'Browse Hotels'}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default function HotelsPage() {
  const [searchResults, setSearchResults] = useState<HotelResult[]>([]);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState<'open' | 'minimized' | 'closed'>('closed');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSearch = async (formData: HotelSearchFormData) => {
    setLoading(true);
    setSearchData(formData);
    
    try {
      const response = await fetch('/api/cached-hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Transform API response to our HotelResult format
        const transformedResults = transformApiResults(result.data, formData.type);
        setSearchResults(transformedResults);
        setModalState('open');
      } else {
        console.error('Search failed:', result.error);
        alert('Search failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error searching hotels:', error);
      alert('Error searching hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const transformApiResults = (apiData: any, searchType: string): HotelResult[] => {
    // Mock data for demonstration - replace with actual API transformation
    return Array.from({ length: 8 }, (_, i) => ({
      id: `hotel-${i + 1}`,
      name: `Hotel ${['Grand', 'Luxury', 'Premium', 'Comfort', 'Business', 'Resort', 'Boutique', 'City'][i]}`,
      location: `${['New York', 'Paris', 'London', 'Tokyo', 'Sydney', 'Dubai', 'Rome', 'Barcelona'][i]}, ${['USA', 'France', 'UK', 'Japan', 'Australia', 'UAE', 'Italy', 'Spain'][i]}`,
      price: Math.floor(Math.random() * 300) + 100,
      stars: Math.floor(Math.random() * 3) + 3,
      rating: Math.floor(Math.random() * 30) + 70,
      distance: Math.floor(Math.random() * 20) + 1,
    }));
  };

  const handleCloseModal = () => {
    setModalState('closed');
    setIsFullscreen(false);
  };

  const handleMinimizeModal = () => {
    setModalState('minimized');
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRestoreModal = () => {
    setModalState('open');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
              <Hotel className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Hotel Search
              </h1>
              <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
                Discover perfect accommodations for your journey. Search by location, check real-time prices, or explore all available options.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <HotelSearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Minimized Modal Tab */}
        <AnimatePresence>
          {modalState === 'minimized' && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-6 left-6 z-50"
            >
              <button
                onClick={handleRestoreModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-3 group border-2 border-white/20 backdrop-blur-sm"
              >
                <Hotel className="h-5 w-5" />
                <span className="font-semibold">Hotel Results</span>
                <span className="bg-blue-500 px-2 py-1 rounded-lg text-xs font-bold">
                  {searchResults.length} found
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Modal */}
        <AnimatePresence>
          {modalState === 'open' && (
            <div className={`fixed inset-0 z-50 ${isFullscreen ? 'bg-white' : 'bg-black/50'} flex items-center justify-center p-4`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 ${
                  isFullscreen ? 'w-full h-full' : 'max-w-6xl max-h-[90vh] w-full'
                }`}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Hotel className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl">Hotel Search Results</h2>
                      <p className="text-blue-100 text-sm">
                        {searchData?.query} • {searchResults.length} hotels found
                      </p>
                    </div>
                  </div>
                  
                  {/* Window Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMinimizeModal}
                      className="p-2 hover:bg-blue-500 rounded-lg transition-all duration-200"
                      title="Minimize"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleToggleFullscreen}
                      className="p-2 hover:bg-blue-500 rounded-lg transition-all duration-200"
                      title={isFullscreen ? "Restore" : "Maximize"}
                    >
                      {isFullscreen ? <Maximize2 className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 hover:bg-red-500 rounded-lg transition-all duration-200"
                      title="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Search Criteria Summary */}
                <div className="p-4 bg-blue-50 border-b border-blue-100">
                  <div className="flex flex-wrap gap-6 text-sm">
                    {searchData?.query && (
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Search:</span>
                        <span className="text-gray-700">{searchData.query}</span>
                      </div>
                    )}
                    {searchData?.checkIn && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Dates:</span>
                        <span className="text-gray-700">{searchData.checkIn} to {searchData.checkOut}</span>
                      </div>
                    )}
                    {searchData?.adults && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Guests:</span>
                        <span className="text-gray-700">{searchData.adults} adults, {searchData.children} children</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-auto p-6">
                  {searchResults.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <Hotel className="h-16 w-16 mb-4 text-gray-300" />
                      <p className="text-xl font-semibold text-gray-400">No hotels found</p>
                      <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  ) : (
                    <div className={`grid gap-6 ${
                      isFullscreen ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {searchResults.map((hotel, index) => (
                        <motion.div
                          key={hotel.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                        >
                          {/* Hotel Image */}
                          <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                              <span className="text-sm font-bold text-blue-600">${hotel.price}/night</span>
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                              <h3 className="font-bold text-lg">{hotel.name}</h3>
                              <div className="flex items-center gap-1 text-sm opacity-90">
                                <MapPin className="h-3 w-3" />
                                <span>{hotel.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Hotel Info */}
                          <div className="p-4 space-y-3">
                            {/* Rating and Stars */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < (hotel.stars || 0) 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'fill-gray-200 text-gray-200'
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">
                                  {hotel.stars} stars
                                </span>
                              </div>
                              {hotel.rating && (
                                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs font-semibold text-blue-700">
                                    {hotel.rating}% rating
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Distance */}
                            {hotel.distance && (
                              <div className="text-xs text-gray-500">
                                {hotel.distance} km from city center
                              </div>
                            )}

                            {/* Price and Action */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <div>
                                <div className="text-2xl font-bold text-blue-600">
                                  ${hotel.price}
                                </div>
                                <div className="text-xs text-gray-500">per night</div>
                              </div>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                                View Deal
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-between items-center">
                  <div className="text-sm text-gray-600 font-medium">
                    Showing {searchResults.length} of {searchResults.length} results
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalState('minimized')}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                      Minimize
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
                    >
                      Close Results
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}