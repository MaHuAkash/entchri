// app/hotels/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hotel, Sparkles, Shield, Zap, TrendingUp, Globe, CheckCircle, Star, Award, CreditCard, Clock, MapPin, Users, Heart, Building, Bed, Wifi, Coffee, Car, Umbrella, Waves, Sun, Moon, Search, Filter, Calendar, ChevronRight } from 'lucide-react';
import HotelSearchForm from '@/components/HotelSearchForm';

export default function HotelsPage() {
  const [searchCount, setSearchCount] = useState(1842973);
  const [activeHotel, setActiveHotel] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');

  // Animate search count
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchCount(prev => prev + Math.floor(Math.random() * 8));
    }, 2000);
    
    // Simulate time of day changes
    const timeTimer = setInterval(() => {
      setTimeOfDay(prev => prev === 'day' ? 'night' : 'day');
    }, 15000);
    
    return () => {
      clearInterval(timer);
      clearInterval(timeTimer);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      timeOfDay === 'day' 
        ? 'bg-gradient-to-b from-blue-50 via-amber-50 to-white' 
        : 'bg-gradient-to-b from-blue-900 via-indigo-900 to-gray-900'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {timeOfDay === 'day' ? (
          <>
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, 50, 0]
              }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute top-1/3 left-1/4 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            />
            <motion.div
              animate={{ 
                x: [0, -80, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 30, repeat: Infinity }}
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
            />
          </>
        ) : (
          <>
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, 50, 0]
              }}
              transition={{ duration: 30, repeat: Infinity }}
              className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            />
            <div className="absolute top-1/4 right-1/4 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ 
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5 
                  }}
                  className="w-1 h-1 bg-white rounded-full mx-1"
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Floating Stats Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-24 right-4 sm:right-8 z-40 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-xl p-4 hidden lg:block"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full border-2 border-blue-200 border-t-blue-600"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Travelers Today</div>
              <div className="text-lg font-bold text-blue-600">
                {searchCount.toLocaleString()}
              </div>
              <div className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +347 now searching
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Section - Enhanced */}
        <div className="mb-16 sm:mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            {/* Animated Badge with Time Awareness */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 shadow-lg ${
                timeOfDay === 'day'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              }`}
            >
              {timeOfDay === 'day' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="text-sm font-semibold">
                {timeOfDay === 'day' ? '☀️ Perfect Day to Book!' : '🌙 Exclusive Night Deals!'}
              </span>
            </motion.div>
            
            {/* Main Heading with Animated Gradient */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            >
              <span className={`block ${timeOfDay === 'day' ? 'text-gray-900' : 'text-white'}`}>
                Find Your
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 block">
                Perfect Escape
              </span>
            </motion.h1>
            
            {/* Animated Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-lg max-w-2xl mx-auto mb-8 ${
                timeOfDay === 'day' ? 'text-gray-600' : 'text-blue-100'
              }`}
            >
              Millions of dream stays. One{" "}
              <span className="font-bold text-blue-500">perfect match</span>.
            </motion.p>

            {/* Live Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {[
                { value: "4.8★", label: "Avg. Rating", icon: Star },
                { value: "28M+", label: "Properties", icon: Building },
                { value: "98%", label: "Satisfaction", icon: Heart },
                { value: "24/7", label: "Support", icon: Clock },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                      timeOfDay === 'day' ? 'text-blue-600' : 'text-white'
                    }`}>
                      <Icon className="h-5 w-5" />
                      {stat.value}
                    </div>
                    <div className={`text-sm ${
                      timeOfDay === 'day' ? 'text-gray-500' : 'text-blue-200'
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Search Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative"
          >
            {/* Floating Search Form */}
            <div className={`rounded-3xl shadow-2xl relative overflow-hidden ${
              timeOfDay === 'day'
                ? 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
                : 'bg-gradient-to-br from-gray-800 to-blue-900/50 border border-blue-800/30'
            }`}>
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full"
              />
              
              <div className="p-6 sm:p-8 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${
                    timeOfDay === 'day' ? 'bg-blue-100' : 'bg-blue-900/50'
                  }`}>
                    <Search className="h-6 w-6 text-blue-500" />
                  </div>
                  <h2 className={`text-xl font-bold ${
                    timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Where Will You Stay Tonight?
                  </h2>
                </div>
                
                <HotelSearchForm />
                
                {/* Quick Filters */}
                <div className="mt-8 pt-6 border-t border-blue-100/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className={`h-4 w-4 ${
                      timeOfDay === 'day' ? 'text-blue-600' : 'text-blue-300'
                    }`} />
                    <span className={`text-sm font-medium ${
                      timeOfDay === 'day' ? 'text-gray-700' : 'text-blue-100'
                    }`}>
                      Popular Filters:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "⭐⭐⭐⭐⭐", bg: "bg-amber-100 text-amber-800" },
                      { label: "🏖️ Beachfront", bg: "bg-cyan-100 text-cyan-800" },
                      { label: "💳 Free Cancellation", bg: "bg-green-100 text-green-800" },
                      { label: "🍳 Free Breakfast", bg: "bg-orange-100 text-orange-800" },
                      { label: "🏊 Pool", bg: "bg-blue-100 text-blue-800" },
                      { label: "🅿️ Free Parking", bg: "bg-purple-100 text-purple-800" },
                    ].map((filter) => (
                      <button
                        key={filter.label}
                        className={`px-3 py-1.5 ${filter.bg} text-sm font-medium rounded-full hover:shadow-md transition-all`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium Features Showcase */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">✨ WHY TRAVELIKEG? ✨</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${
              timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
            }`}>
              More Than Just a{" "}
              <span className="text-blue-500">Booking Site</span>
            </h2>
            <p className={`max-w-xl mx-auto ${
              timeOfDay === 'day' ? 'text-gray-600' : 'text-blue-200'
            }`}>
              We're your personal hotel concierge, powered by AI and human expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Price Drop Protection™",
                description: "We'll refund the difference if prices drop after booking",
                color: "from-green-500 to-emerald-500",
                stat: "Avg. $127 saved"
              },
              {
                icon: Zap,
                title: "Instant Booking",
                description: "Confirmed reservations in under 30 seconds",
                color: "from-blue-500 to-cyan-500",
                stat: "99.7% success rate"
              },
              {
                icon: Award,
                title: "Exclusive Member Deals",
                description: "Access to prices lower than anywhere else online",
                color: "from-purple-500 to-pink-500",
                stat: "Members save 32%"
              },
              {
                icon: Globe,
                title: "Global Coverage",
                description: "Every hotel, everywhere. Even the hidden gems",
                color: "from-amber-500 to-orange-500",
                stat: "192 countries"
              },
              {
                icon: Users,
                title: "Dedicated Support",
                description: "Real humans available 24/7 for any questions",
                color: "from-red-500 to-rose-500",
                stat: "4.9★ support rating"
              },
              {
                icon: CreditCard,
                title: "Flexible Payment",
                description: "Pay now, pay later, or split payment options",
                color: "from-indigo-500 to-blue-500",
                stat: "12 payment methods"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`rounded-2xl p-6 shadow-xl border ${
                  timeOfDay === 'day'
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${
                  timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {feature.description}
                </p>
                <div className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                  timeOfDay === 'day'
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200'
                    : 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-blue-300 border border-blue-700/30'
                }`}>
                  {feature.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Hotel Showcase */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full mb-4">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">🔥 TRENDING NOW 🔥</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${
              timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
            }`}>
              Hotels People Are{" "}
              <span className="text-blue-500">Loving Right Now</span>
            </h2>
            <p className={`max-w-xl mx-auto ${
              timeOfDay === 'day' ? 'text-gray-600' : 'text-blue-200'
            }`}>
              These properties are booking fast! Don't miss out on these gems
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Hotel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className={`rounded-3xl overflow-hidden shadow-2xl ${
                timeOfDay === 'day'
                  ? 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
                  : 'bg-gradient-to-br from-gray-800 to-blue-900/30 border border-blue-800/30'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      <span className={`text-sm font-bold ${
                        timeOfDay === 'day' ? 'text-gray-700' : 'text-white'
                      }`}>
                        4.9 ★ Luxury Collection
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
                    }`}>
                      The Grand Horizon Resort & Spa
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin className={`h-4 w-4 ${
                        timeOfDay === 'day' ? 'text-blue-500' : 'text-blue-300'
                      }`} />
                      <span className={`text-sm ${
                        timeOfDay === 'day' ? 'text-gray-600' : 'text-blue-200'
                      }`}>
                        Santorini, Greece • Beachfront
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white"
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { icon: Wifi, label: "Free WiFi" },
                    { icon: Coffee, label: "Breakfast" },
                    { icon: Car, label: "Parking" },
                    { icon: Umbrella, label: "Pool" },
                    { icon: Waves, label: "Spa" },
                  ].map((amenity, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                        timeOfDay === 'day'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-blue-900/30 text-blue-300'
                      }`}
                    >
                      <amenity.icon className="h-3.5 w-3.5" />
                      <span className="text-xs">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200/30">
                  <div>
                    <div className={`text-sm ${
                      timeOfDay === 'day' ? 'text-gray-500' : 'text-blue-300'
                    }`}>
                      Per night
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        timeOfDay === 'day' ? 'text-blue-600' : 'text-white'
                      }`}>
                        $299
                      </span>
                      <span className={`line-through ${
                        timeOfDay === 'day' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        $450
                      </span>
                      <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded">
                        33% OFF
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-lg"
                  >
                    Book Now
                  </motion.button>
                </div>

                {/* Limited Offer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-bold text-amber-700">
                        Limited offer! Only 2 rooms left at this price
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-600">
                      4h 12m left
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Popular Locations */}
            <div>
              <h3 className={`text-xl font-bold mb-6 ${
                timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
              }`}>
                Popular Destinations
              </h3>
              <div className="space-y-4">
                {[
                  { city: "Bali, Indonesia", hotels: "12,450", price: "$89", trend: "+42%" },
                  { city: "Paris, France", hotels: "8,920", price: "$145", trend: "+28%" },
                  { city: "Tokyo, Japan", hotels: "7,310", price: "$112", trend: "+56%" },
                  { city: "Dubai, UAE", hotels: "5,890", price: "$198", trend: "+34%" },
                  { city: "New York, USA", hotels: "15,230", price: "$210", trend: "+19%" },
                ].map((location, index) => (
                  <motion.div
                    key={location.city}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveHotel(index)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all ${
                      activeHotel === index
                        ? timeOfDay === 'day'
                          ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200'
                          : 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-2 border-blue-700'
                        : timeOfDay === 'day'
                          ? 'bg-white border border-gray-200 hover:border-blue-300'
                          : 'bg-gray-800/50 border border-gray-700 hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className={`h-4 w-4 ${
                            timeOfDay === 'day' ? 'text-blue-500' : 'text-blue-300'
                          }`} />
                          <span className={`font-bold ${
                            timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {location.city}
                          </span>
                        </div>
                        <div className={`text-sm mt-1 ${
                          timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                          {location.hotels} hotels • Avg. {location.price}/night
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${
                          location.trend.startsWith('+')
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {location.trend}
                        </div>
                        <div className={`text-xs ${
                          timeOfDay === 'day' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          Trending
                        </div>
                      </div>
                    </div>
                    {activeHotel === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-200/30"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className={timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'}>
                            Best deals from:
                          </span>
                          <div className="flex gap-2">
                            {["Booking.com", "Expedia", "Hotels.com"].map((source) => (
                              <span
                                key={source}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Security Section */}
        <div className="mb-16">
          <div className={`rounded-3xl p-8 shadow-2xl ${
            timeOfDay === 'day'
              ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100'
              : 'bg-gradient-to-br from-gray-800 to-blue-900/30 border border-blue-800/30'
          }`}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full mb-6">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-semibold">🛡️ 100% SAFE BOOKING</span>
                </div>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${
                  timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
                }`}>
                  Your Security is Our{" "}
                  <span className="text-blue-500">Top Priority</span>
                </h2>
                <div className="space-y-4">
                  {[
                    "🔒 256-bit SSL encryption on all transactions",
                    "🛡️ Your payment details are never stored on our servers",
                    "✅ Verified hotel partners with 5+ year track records",
                    "📞 24/7 fraud monitoring and immediate support",
                    "💳 Chargeback protection for all bookings",
                  ].map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        timeOfDay === 'day'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-green-900/30 text-green-400'
                      }`}>
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <span className={timeOfDay === 'day' ? 'text-gray-700' : 'text-gray-300'}>
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 text-center border ${
                  timeOfDay === 'day'
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                <div className="text-4xl font-bold mb-2 text-blue-500">
                  4.9/5
                </div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${
                  timeOfDay === 'day' ? 'text-gray-900' : 'text-white'
                }`}>
                  TrustScore Rating
                </h3>
                <p className={`text-sm mb-6 ${
                  timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Based on 2.4 million verified customer reviews
                </p>
                
                <div className="space-y-3">
                  {[
                    { label: "Booking Experience", value: 95, color: "from-green-400 to-emerald-500" },
                    { label: "Price Accuracy", value: 98, color: "from-blue-400 to-cyan-500" },
                    { label: "Customer Support", value: 94, color: "from-purple-400 to-pink-500" },
                  ].map((stat, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={timeOfDay === 'day' ? 'text-gray-700' : 'text-gray-300'}>
                          {stat.label}
                        </span>
                        <span className="font-bold text-blue-500">{stat.value}%</span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${
                        timeOfDay === 'day' ? 'bg-gray-200' : 'bg-gray-700'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.value}%` }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                          viewport={{ once: true }}
                          className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Final CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className={`rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden ${
            timeOfDay === 'day'
              ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500'
              : 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900'
          }`}>
            {/* Animated elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-4 opacity-10"
            >
              <Hotel className="h-16 w-16 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-4 right-4 opacity-10"
            >
              <Bed className="h-20 w-20 text-white" />
            </motion.div>
            
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Your Dream Stay Awaits
              </h2>
              <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                Join <span className="font-bold">2.4 million travelers</span> who found their perfect hotel with Travelikeg
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Search Hotels Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full text-lg border-2 border-white/30 hover:bg-white/30 transition-colors"
                >
                  View All Deals →
                </motion.button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>No booking fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Best price guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-center pt-8 border-t ${
            timeOfDay === 'day' ? 'border-gray-200' : 'border-gray-700'
          }`}
        >
          <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
            {[
              "🏆 Award-winning service since 2015",
              "🌎 Hotels in 192 countries",
              "💯 Price match guarantee",
              "⭐ 4.9/5 customer rating",
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={`text-sm ${
                  timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {text}
                </span>
              </div>
            ))}
          </div>
          <p className={`text-xs mb-4 max-w-2xl mx-auto ${
            timeOfDay === 'day' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Travelikeg is a leading hotel comparison platform. We search hundreds of booking sites to help you find the best hotel deals. 
            We are not a booking agency and do not charge any booking fees. All reservations are made directly with the hotel or booking site.
          </p>
          <div className={`flex flex-wrap justify-center items-center gap-4 text-xs ${
            timeOfDay === 'day' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>© 2024 Travelikeg.com</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>Privacy Policy</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>Terms of Service</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>Cookie Policy</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}