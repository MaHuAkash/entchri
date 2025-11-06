'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-7">
      <div className="text-center max-w-md mx-auto">
        {/* Animated Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.h1 
              className="text-8xl md:text-9xl font-black text-blue-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              404
            </motion.h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur-xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page not found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved or doesn't exist.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg w-full max-w-xs mx-auto shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
            >
              Return to homepage
            </motion.button>
          </Link>
        </motion.div>

        {/* Secondary Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            Or go back
          </button>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Floating Circles */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}