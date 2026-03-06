// app/flights/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Sparkles, Shield, Zap, TrendingUp, Globe, CheckCircle, Star, Award, CreditCard, Clock, Cloud, Navigation, Wind, Users, ChevronRight, Search, Filter, Calendar } from 'lucide-react';
import FlightSearchForm from '@/components/FlightSearchForm';

// Mock data for dynamic content
const airlines = [
  { id: 1, name: "Delta Airlines", code: "DL", rating: 4.8, routes: "300+ destinations", color: "from-red-500 to-red-600" },
  { id: 2, name: "Emirates", code: "EK", rating: 4.9, routes: "150+ countries", color: "from-red-600 to-red-700" },
  { id: 3, name: "Singapore Airlines", code: "SQ", rating: 4.9, routes: "130+ cities", color: "from-blue-500 to-blue-600" },
  { id: 4, name: "Qatar Airways", code: "QR", rating: 4.8, routes: "Global network", color: "from-purple-500 to-purple-600" },
];

const flightTips = [
  { id: 1, tip: "Book flights 6-8 weeks in advance for best prices", icon: Calendar },
  { id: 2, tip: "Fly on Tuesdays & Wednesdays to save up to 40%", icon: TrendingUp },
  { id: 3, tip: "Use incognito mode to avoid price hikes", icon: Shield },
  { id: 4, tip: "Set price alerts for your favorite routes", icon: Clock },
];

export default function FlightsPage() {
  const [activeDestination, setActiveDestination] = useState(1);
  const [searchCount, setSearchCount] = useState(1258437);

  // Animate search count
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchCount(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400">
      {/* Animated Background Elements - Enhanced for deeper blue theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-overlay filter blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, 80, 0],
            y: [0, -80, 0]
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-300/10 rounded-full mix-blend-overlay filter blur-3xl"
        />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Floating Stats Badge - Adjusted for better contrast */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 right-4 sm:right-8 z-40 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl shadow-2xl p-3 hidden lg:block"
        >
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Today's Searches</div>
            <div className="text-lg font-bold text-blue-700">
              {searchCount.toLocaleString()}
            </div>
            <div className="text-xs text-green-600 flex items-center justify-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2,347
            </div>
          </div>
        </motion.div>

        {/* Hero Section - Text remains readable on dark background */}
        <div className="mb-16 sm:mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            {/* Main Heading with Gradient - Adjusted for better contrast */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-cyan-200">
                Fly Smarter,
              </span>
              <span className="block mt-2 text-white">Pay Less!</span>
            </h1>
            
            {/* Animated Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-blue-100 max-w-2xl mx-auto mb-8"
            >
              Compare <span className="font-bold text-yellow-300">600+ airlines</span> instantly. 
              Find deals others miss!
            </motion.p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { value: "98%", label: "Satisfaction" },
                { value: "600+", label: "Airlines" },
                { value: "5000+", label: "Daily Deals" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
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
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-200 p-6 sm:p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-100 rounded-full translate-x-20 translate-y-20" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Find Your Perfect Flight
                  </h2>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="ml-auto"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-blue-200 border-t-blue-600" />
                  </motion.div>
                </div>
                
                <FlightSearchForm />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                icon: Shield, 
                label: "Secure Booking", 
                description: "SSL Encrypted",
                color: "from-green-500 to-emerald-500"
              },
              { 
                icon: CreditCard, 
                label: "No Hidden Fees", 
                description: "Price Guarantee",
                color: "from-amber-500 to-orange-500"
              },
              { 
                icon: Award, 
                label: "Best Price", 
                description: "We'll match it!",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Clock, 
                label: "Real-time Prices", 
                description: "Live Updates",
                color: "from-purple-500 to-pink-500"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 mx-auto`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-center text-sm mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-gray-500 text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium Airlines Showcase */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full mb-4 shadow-lg">
              <Star className="h-4 w-4" />
              <span className="text-sm font-semibold">✈️ PREMIUM PARTNERS ✈️</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Fly with the <span className="text-yellow-300">Best</span>
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto">
              Top-rated airlines with exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {airlines.map((airline, index) => (
              <motion.div
                key={airline.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${airline.color} flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                  <span className="text-white font-bold text-2xl">{airline.code}</span>
                </div>
                
                <h3 className="font-bold text-gray-900 text-center text-lg mb-2">
                  {airline.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(airline.rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {airline.rating}
                  </span>
                </div>
                
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {airline.routes}
                  </div>
                </div>
                
                <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                  View Flights
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Smart Flight Tips */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-blue-800 to-blue-600 rounded-3xl p-8 text-white shadow-2xl border border-blue-400/30">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                  <h2 className="text-2xl font-bold">
                    Smart Traveler <span className="text-yellow-300">Tips</span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {flightTips.map((tip) => {
                    const Icon = tip.icon;
                    return (
                      <motion.div
                        key={tip.id}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-yellow-300" />
                        </div>
                        <p className="text-blue-100">{tip.tip}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2 text-yellow-300">35%</div>
                  <p className="text-blue-100">Average savings for smart travelers</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "Early Birds", value: 85, color: "from-green-400 to-emerald-500" },
                    { label: "Flexible Dates", value: 70, color: "from-blue-400 to-cyan-500" },
                    { label: "Price Alerts", value: 92, color: "from-purple-400 to-pink-500" },
                  ].map((stat, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm text-white">
                        <span>{stat.label}</span>
                        <span className="font-bold text-yellow-300">{stat.value}% save more</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
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
          <div className="bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
            {/* Animated elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 left-4 opacity-20"
            >
              <Plane className="h-12 w-12 text-white rotate-45" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-4 right-4 opacity-20"
            >
              <Plane className="h-16 w-16 text-white -rotate-45" />
            </motion.div>
            
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-yellow-100 text-lg mb-6 max-w-2xl mx-auto">
                Millions of travelers trust us. Join them today and start saving!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Search Flights Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full text-lg border-2 border-white/30 hover:bg-white/30 transition-colors"
                >
                  View All Deals
                </motion.button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>No Booking Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Support</span>
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
          className="text-center pt-8 border-t border-white/20"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
            {["Trusted by 2M+ Travelers", "Award Winning Service", "Global Coverage", "Best Price Guarantee"].map((text, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-sm text-blue-100">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-200 mb-4">
            Prices are automatically updated. All bookings are processed directly through airline websites. 
            We compare prices across 600+ airlines to find you the best deal.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-blue-200/80">
            <span>© 2024 SkySearch Pro</span>
            <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
            <span>Secure Booking</span>
            <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
            <span>Privacy Policy</span>
            <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
            <span>Terms of Service</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}