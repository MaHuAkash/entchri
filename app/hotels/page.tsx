// app/hotels/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Hotel, Sparkles, Shield, Zap, Star } from 'lucide-react';
import HotelSearchForm from '@/components/HotelSearchForm';

export default function HotelsPage() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
       
        {/* Search Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <HotelSearchForm />
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Why Book With Us?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We bring you the best of both worlds - compare prices and find your ideal hotel effortlessly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Instant search results from top booking platforms in real-time",
                color: "from-yellow-400 to-orange-500",
                bgColor: "bg-orange-50",
                delay: 0.1
              },
              {
                icon: Shield,
                title: "Trusted Partners",
                description: "Direct access to Booking.com & Expedia - the most reliable platforms",
                color: "from-green-400 to-blue-500",
                bgColor: "bg-blue-50",
                delay: 0.2
              },
              {
                icon: Star,
                title: "Best Prices",
                description: "Compare prices across platforms to ensure you get the best deal",
                color: "from-purple-400 to-pink-500",
                bgColor: "bg-purple-50",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className={`${feature.bgColor} p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:shadow-2xl transition-all duration-300 h-full`}>
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-300"
                      style={{ background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partner Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Our Trusted Partners</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We work directly with the world's leading hotel booking platforms
            </p>
          </motion.div>

          <div className="flex justify-center items-center gap-12 flex-wrap">
            {[
              { name: "Booking.com", color: "blue", logo: "B" },
              { name: "Expedia", color: "orange", logo: "E" }
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className={`w-20 h-20 bg-gradient-to-br from-${partner.color}-500 to-${partner.color}-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-3 transition-transform duration-300`}>
                  <span className="text-white text-2xl font-bold">{partner.logo}</span>
                </div>
                <span className="font-semibold text-gray-700">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Find Your Perfect Hotel?
            </h3>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Start your search above and discover amazing deals from our trusted partners
            </p>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white"
            >
              <span className="text-lg">↑</span>
              <p className="text-sm mt-2">Start searching above</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}