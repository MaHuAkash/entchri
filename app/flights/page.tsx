'use client';

import { motion } from 'framer-motion';
import { Plane, Sparkles, Shield, Zap, TrendingUp, Globe, CheckCircle, Star, Award, CreditCard, Clock, Cloud, Navigation, Wind, Users } from 'lucide-react';
import FlightSearchForm from '@/components/FlightSearchForm';

export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 py-18">
        
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-4">
              <Plane className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Fly Anywhere, Anytime</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Find 
              <span className="block text-blue-600 mt-1">Amazing Flight Deals</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Compare prices across 600+ airlines. Book your perfect flight in seconds.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-10"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <FlightSearchForm />
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { icon: Shield, label: "Secure Booking", color: "text-green-600", bg: "bg-green-50" },
                { icon: CreditCard, label: "No Hidden Fees", color: "text-amber-600", bg: "bg-amber-50" },
                { icon: Award, label: "Best Price Guarantee", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Clock, label: "Real-time Prices", color: "text-purple-600", bg: "bg-purple-50" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <div className={`p-1.5 rounded-md ${item.bg}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-3">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Why Book With Us</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Smarter Flight Search
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Advanced features to help you find the perfect flight
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Search 600+ airlines in milliseconds",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: TrendingUp,
                title: "Price Alerts",
                description: "Get notified when prices drop",
                color: "bg-green-50 text-green-600"
              },
              {
                icon: Navigation,
                title: "Flexible Dates",
                description: "Find cheapest days to fly",
                color: "bg-purple-50 text-purple-600"
              },
              {
                icon: Users,
                title: "Group Discounts",
                description: "Special rates for groups",
                color: "bg-amber-50 text-amber-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full mb-3">
              <Globe className="h-3.5 w-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">Top Destinations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Explore the World
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Popular routes with amazing deals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { from: "New York", to: "London", price: "$499", code: "JFK → LHR" },
              { from: "Los Angeles", to: "Tokyo", price: "$789", code: "LAX → HND" },
              { from: "Dubai", to: "Singapore", price: "$349", code: "DXB → SIN" },
              { from: "Sydney", to: "Auckland", price: "$229", code: "SYD → AKL" },
            ].map((route, index) => (
              <motion.div
                key={route.code}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">{route.from}</div>
                    <div className="text-xs text-gray-500">{route.code.split('→')[0]}</div>
                  </div>
                  <div className="text-center">
                    <Plane className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-sm">{route.to}</div>
                    <div className="text-xs text-gray-500">{route.code.split('→')[1]}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-blue-600">{route.price}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Round trip</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Airlines Section */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-3">
              <Star className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Our Airlines</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              600+ Airlines Worldwide
            </h2>
          </motion.div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              {[
                { name: "Delta", code: "DL", routes: "300+ destinations" },
                { name: "Emirates", code: "EK", routes: "150+ countries" },
                { name: "Singapore Airlines", code: "SQ", routes: "World's best" },
                { name: "Qatar Airways", code: "QR", routes: "Global network" },
              ].map((airline, index) => (
                <div key={airline.code} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow">
                    <span className="text-white font-bold text-lg">{airline.code}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{airline.name}</h4>
                  <div className="px-2 py-1 bg-gray-100 rounded-full inline-block">
                    <span className="text-xs text-gray-700">{airline.routes}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-900 text-sm mb-1">All Major Airlines</h3>
                <p className="text-xs text-gray-600">Including budget and premium carriers</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">✓ Best Price</span>
                <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">✓ No Fees</span>
                <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded">✓ Direct Links</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works & Tips */}
        <div className="mb-12 sm:mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-3">
                  <span className="text-xs font-medium text-blue-700">How It Works</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Book in 3 Simple Steps
                </h2>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Search Flights",
                    description: "Enter your route and dates to see all options"
                  },
                  {
                    step: "2",
                    title: "Compare Prices",
                    description: "View prices from all airlines and booking sites"
                  },
                  {
                    step: "3",
                    title: "Book Directly",
                    description: "Choose your flight and book on airline's website"
                  }
                ].map((step, index) => (
                  <div key={step.step} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-700">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Flight Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="h-5 w-5 text-white" />
                    <h3 className="text-lg font-bold text-white">Flight Tips</h3>
                  </div>
                  <p className="text-blue-100 text-sm">Save money with smart booking strategies</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    "Book 6-8 weeks in advance for best prices",
                    "Fly mid-week (Tue-Wed) for cheaper fares",
                    "Use flexible dates to save up to 40%",
                    "Clear browser cookies before searching"
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Wind className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-sm text-blue-100">{tip}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-xs text-blue-200 italic">
                    "Smart travelers save an average of 35% by booking at the right time"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-2">
                Ready to Take Off?
              </h2>
              <p className="text-blue-100 text-sm max-w-md mx-auto">
                Start your flight search now and find the perfect journey
              </p>
            </div>
            
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center text-white"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                <Plane className="h-4 w-4 rotate-45" />
              </div>
              <p className="text-xs">Find your flight above</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500 mb-4">
            All flight bookings are processed directly through airline websites or authorized partners. 
            We compare prices but do not handle payments or reservations.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-gray-400">
            <span>© 2024 Flight Search</span>
            <span>•</span>
            <span>Secure Booking</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms</span>
            <span>•</span>
            <span>Airline Partners</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}