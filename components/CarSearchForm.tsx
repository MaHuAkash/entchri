'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface CarSearchFormData {
  pickUpLocation: string;
  sameLocation: boolean;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  dropOffTime: string;
  country: string;
  ageRange: string;
}

export default function CarSearchForm() {
  const [formData, setFormData] = useState<CarSearchFormData>({
    pickUpLocation: '',
    sameLocation: true,
    pickUpDate: '',
    dropOffDate: '',
    pickUpTime: '11:00',
    dropOffTime: '11:00',
    country: 'Canada',
    ageRange: '30-65'
  });

  const countries = [
    'Canada', 'United States', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Ireland', 'New Zealand', 'Japan',
    'South Korea', 'Singapore', 'United Arab Emirates'
  ];

  const ageRanges = [
    '18-21', '21-24', '24-27', '27-30', '30-65', '65+'
  ];

  const timeSlots = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const formatTimeForDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    return `${day}, ${month} ${dateNum < 10 ? '0' + dateNum : dateNum}`;
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format date for DiscoverCars (YYYY-MM-DD)
  const formatDateForDiscoverCars = (dateString: string): string => {
    return dateString; // Already in YYYY-MM-DD format
  };

  // Format time for DiscoverCars (HH:MM:SS)
  const formatTimeForDiscoverCars = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}:00`;
  };

  // Format date-time for DiscoverCars (YYYY-MM-DDTHH:MM:SS)
  const formatDateTimeForDiscoverCars = (dateString: string, timeString: string): string => {
    const datePart = formatDateForDiscoverCars(dateString);
    const timePart = formatTimeForDiscoverCars(timeString);
    return `${datePart}T${timePart}`;
  };

  // Get country code
  const getCountryCode = (countryName: string): string => {
    const countryCodes: { [key: string]: string } = {
      'Canada': 'CA',
      'United States': 'US',
      'United Kingdom': 'GB',
      'Australia': 'AU',
      'Germany': 'DE',
      'France': 'FR',
      'Italy': 'IT',
      'Spain': 'ES',
      'Netherlands': 'NL',
      'Switzerland': 'CH',
      'Sweden': 'SE',
      'Norway': 'NO',
      'Denmark': 'DK',
      'Finland': 'FI',
      'Ireland': 'IE',
      'New Zealand': 'NZ',
      'Japan': 'JP',
      'South Korea': 'KR',
      'Singapore': 'SG',
      'United Arab Emirates': 'AE'
    };
    return countryCodes[countryName] || 'CA';
  };

  // Get default dates
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 8); // 8 days from now (7 days rental)

    setFormData(prev => ({
      ...prev,
      pickUpDate: formatDateForInput(today),
      dropOffDate: formatDateForInput(nextWeek)
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Generate TP Media affiliate URL with DiscoverCars search parameters
  const generateAffiliateUrl = () => {
    // Validate required fields
    if (!formData.pickUpLocation.trim()) {
      alert('Please enter pick-up location');
      return null;
    }

    // Format the DiscoverCars URL with search parameters
    // Since we don't have location IDs, we'll use the simplest approach
    // that should still work with TP Media tracking
    
    // Build search parameters for DiscoverCars
    const searchParams = new URLSearchParams();
    
    // Add location
    searchParams.append('pick-up', formData.pickUpLocation.trim());
    
    // Add dates and times
    if (formData.pickUpDate) {
      const pickUpDateTime = formatDateTimeForDiscoverCars(formData.pickUpDate, formData.pickUpTime);
      searchParams.append('pick-up_date', formData.pickUpDate);
      searchParams.append('pick-up_time', formData.pickUpTime.split(':')[0]);
      searchParams.append('pick-up_time_period', parseInt(formData.pickUpTime.split(':')[0]) >= 12 ? 'pm' : 'am');
    }
    
    if (formData.dropOffDate) {
      const dropOffDateTime = formatDateTimeForDiscoverCars(formData.dropOffDate, formData.dropOffTime);
      searchParams.append('drop-off_date', formData.dropOffDate);
      searchParams.append('drop-off_time', formData.dropOffTime.split(':')[0]);
      searchParams.append('drop-off_time_period', parseInt(formData.dropOffTime.split(':')[0]) >= 12 ? 'pm' : 'am');
    }
    
    // Add driver information
    searchParams.append('country', getCountryCode(formData.country));
    searchParams.append('driver_age', formData.ageRange.split('-')[0]);
    
    // Build the DiscoverCars search URL
    const discoverCarsSearchUrl = `https://www.discovercars.com/search?${searchParams.toString()}`;
    
    console.log('Generated DiscoverCars Search URL:', discoverCarsSearchUrl);
    
    // Encode the URL for TP Media
    const encodedUrl = encodeURIComponent(discoverCarsSearchUrl);
    
    // Build TP Media affiliate URL with your tracking parameters
    const affiliateUrl = `https://tp.media/r?marker=297036&trs=126212&p=3555&u=${encodedUrl}&campaign_id=117`;
    
    console.log('Final Affiliate URL:', affiliateUrl);
    
    return affiliateUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the affiliate URL
    const affiliateUrl = generateAffiliateUrl();
    
    if (affiliateUrl) {
      // Open in new tab with affiliate tracking
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Affordable Car Rentals</h1>
        <p className="text-gray-600">Compare prices from 500+ trusted car rental companies</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Pick-up Location */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                <span>Pick-up location</span>
              </div>
            </label>
            <input
              type="text"
              name="pickUpLocation"
              value={formData.pickUpLocation}
              onChange={handleChange}
              placeholder="Enter airport or city"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Same Location Checkbox */}
          <div className="flex items-end">
            <label className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <input
                type="checkbox"
                name="sameLocation"
                checked={formData.sameLocation}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">Return car in same location</span>
            </label>
          </div>
        </div>

        {/* Dates and Times Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Pick-up Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <span>Pick-up date</span>
              </div>
            </label>
            <div className="relative">
              <input
                type="date"
                name="pickUpDate"
                value={formData.pickUpDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                min={formatDateForInput(new Date())}
                required
              />
              <div className="absolute right-3 top-3 text-sm text-gray-500 font-medium">
                {formatDateForDisplay(formData.pickUpDate)}
              </div>
            </div>
          </div>

          {/* Pick-up Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                <span>Time</span>
              </div>
            </label>
            <select
              name="pickUpTime"
              value={formData.pickUpTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 appearance-none bg-white"
            >
              {timeSlots.map(time => (
                <option key={`pickup-${time}`} value={time}>
                  {formatTimeForDisplay(time)}
                </option>
              ))}
            </select>
          </div>

          {/* Drop-off Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <span>Drop-off date</span>
              </div>
            </label>
            <div className="relative">
              <input
                type="date"
                name="dropOffDate"
                value={formData.dropOffDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                min={formData.pickUpDate || formatDateForInput(new Date())}
                required
              />
              <div className="absolute right-3 top-3 text-sm text-gray-500 font-medium">
                {formatDateForDisplay(formData.dropOffDate)}
              </div>
            </div>
          </div>

          {/* Drop-off Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                <span>Time</span>
              </div>
            </label>
            <select
              name="dropOffTime"
              value={formData.dropOffTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 appearance-none bg-white"
            >
              {timeSlots.map(time => (
                <option key={`dropoff-${time}`} value={time}>
                  {formatTimeForDisplay(time)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Driver Info Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <User size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Driver's country of residence is</span>
          </div>
          
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">and age is</span>
          </div>

          <select
            name="ageRange"
            value={formData.ageRange}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
          >
            {ageRanges.map(range => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            Search now
          </button>
        </div>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4">
          <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600">Trusted rental companies</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
          <div className="text-gray-600">Customer support</div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-blue-600 mb-2">Free</div>
          <div className="text-gray-600">Amendments & cancellations</div>
        </div>
      </div>

      {/* Debug Info (remove in production) */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">Debug Information:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Pick-up: {formData.pickUpLocation}</div>
          <div>Pick-up Date: {formData.pickUpDate}</div>
          <div>Drop-off Date: {formData.dropOffDate}</div>
          <div>Country: {formData.country} ({getCountryCode(formData.country)})</div>
          <div>Age: {formData.ageRange}</div>
        </div>
      </div>
    </div>
  );
}