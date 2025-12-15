'use client';

import { motion } from 'framer-motion';
import { Hotel, Sparkles, Shield, Zap, TrendingUp, Globe, CheckCircle, Star, Award, CreditCard, Clock } from 'lucide-react';
import HotelSearchForm from '@/components/HotelSearchForm';

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Main Container with Proper Margins */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 py-18">
        
        {/* Hero Section - Compact and Prominent */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-4">
              <Hotel className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Find Your Perfect Stay</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Hotels for 
              <span className="block text-blue-600 mt-1">Good Vibes & Good Times</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Discover amazing hotels at the best prices. Compare deals from top platforms in seconds.
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
              <HotelSearchForm />
            </div>
          </motion.div>

          {/* Trust Badges - Compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { icon: Shield, label: "Secure Booking", color: "text-green-600", bg: "bg-green-50" },
                { icon: CreditCard, label: "No Booking Fees", color: "text-amber-600", bg: "bg-amber-50" },
                { icon: Award, label: "Best Price Guarantee", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Clock, label: "24/7 Support", color: "text-purple-600", bg: "bg-purple-50" },
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
              <span className="text-xs font-medium text-blue-700">Why Choose Us</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Everything You Need
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              We've simplified hotel booking with features designed for modern travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Zap,
                title: "Fast Search",
                description: "Real-time results from all major platforms",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: TrendingUp,
                title: "Price Compare",
                description: "Always find the best deal available",
                color: "bg-green-50 text-green-600"
              },
              {
                icon: Globe,
                title: "Global Hotels",
                description: "Millions of hotels worldwide",
                color: "bg-purple-50 text-purple-600"
              },
              {
                icon: Shield,
                title: "Secure Booking",
                description: "Direct links to trusted partners",
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

        {/* Partners Section */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full mb-3">
              <Star className="h-3.5 w-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">Our Partners</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Trusted Worldwide
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              We partner with the world's leading hotel platforms
            </p>
          </motion.div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Booking.com", short: "B", stats: "28M+ properties" },
                { name: "Expedia", short: "E", stats: "3M+ properties" },
                { name: "Agoda", short: "A", stats: "2.4M+ properties" },
                { name: "Hotels.com", short: "H", stats: "1.8M+ properties" },
              ].map((partner, index) => (
                <div key={partner.name} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow">
                    <span className="text-white font-bold text-lg">{partner.short}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{partner.name}</h4>
                  <div className="px-2 py-1 bg-gray-100 rounded-full inline-block">
                    <span className="text-xs text-gray-700">{partner.stats}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">All in One Place</h3>
                  <p className="text-xs text-gray-600">Compare prices across all major platforms</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">✓ Best Price</span>
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">✓ No Fees</span>
                </div>
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
                    title: "Search & Compare",
                    description: "Enter destination and dates to see real-time prices"
                  },
                  {
                    step: "2",
                    title: "Choose Hotel",
                    description: "Browse verified hotels with photos and reviews"
                  },
                  {
                    step: "3",
                    title: "Book Directly",
                    description: "Click through to partners' sites for secure booking"
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

            {/* Travel Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-white" />
                    <h3 className="text-lg font-bold text-white">Travel Tips</h3>
                  </div>
                  <p className="text-blue-100 text-sm">Maximize your savings with these tips</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    "Book 3-6 months early for best prices",
                    "Mid-week stays can save up to 30%",
                    "Compare prices across multiple platforms",
                    "Check cancellation policies before booking"
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-sm text-blue-100">{tip}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-xs text-blue-200 italic">
                    "Smart travelers save an average of 25% by comparing prices"
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
                Ready to Find Your Hotel?
              </h2>
              <p className="text-blue-100 text-sm max-w-md mx-auto">
                Start your search now and find the perfect hotel for your trip
              </p>
            </div>
            
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center text-white"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                <span className="text-sm">↑</span>
              </div>
              <p className="text-xs">Scroll up to search</p>
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
            All bookings are processed directly through our trusted partners. 
            We compare prices but do not handle payments or reservations.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-gray-400">
            <span>© 2024 Hotel Search</span>
            <span>•</span>
            <span>Secure Booking</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}