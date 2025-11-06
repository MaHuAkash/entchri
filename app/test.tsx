'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Shield, Globe, TrendingUp, Plane, Car, Hotel, Star, CheckCircle } from 'lucide-react';
import { useState, useEffect } from "react";

// Modern Hero Container
const HeroHighlight = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full min-h-[85vh] bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 overflow-hidden">
    {/* Premium Background Elements */}
    <div className="absolute inset-0">
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/15 rounded-full blur-2xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>

    {/* Content Container */}
    <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

const features = [
  {
    name: 'Smart Search',
    description: 'Find the best flight deals across multiple airlines and booking platforms.',
    icon: Search,
  },
  {
    name: 'Safe & Secure',
    description: 'Your data is protected with industry-standard security measures.',
    icon: Shield,
  },
  {
    name: 'Global Coverage',
    description: 'Access flight data from thousands of destinations worldwide.',
    icon: Globe,
  },
  {
    name: 'Real-time Prices',
    description: 'Get up-to-date pricing information from reliable sources.',
    icon: TrendingUp,
  },
];

export default function Home() {
  const [currentText, setCurrentText] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  const services = [
    { 
      type: "Flights", 
      icon: Plane, 
      gradient: "from-blue-500 to-cyan-500",
      description: "Best deals on domestic & international flights"
    },
    { 
      type: "Hotels", 
      icon: Hotel, 
      gradient: "from-emerald-500 to-teal-500",
      description: "Luxury stays at unbeatable prices"
    },
    { 
      type: "Car Rentals", 
      icon: Car, 
      gradient: "from-orange-500 to-red-500",
      description: "Premium vehicles for every journey"
    },
    { 
      type: "All-in-One", 
      icon: Star, 
      gradient: "from-purple-500 to-pink-500",
      description: "Complete travel packages"
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <div className="relative">
      <HeroHighlight>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
              >
                Your Perfect
                <br />
                <div className="h-20 lg:h-24 flex items-center my-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentText}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`bg-gradient-to-r ${services[currentText].gradient} bg-clip-text text-transparent`}
                    >
                      {services[currentText].type}
                    </motion.span>
                  </AnimatePresence>
                </div>
                Experience Awaits
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg"
              >
                Discover the world with confidence. All your travel needs in one place - 
                seamless, secure, and unforgettable.
              </motion.p>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {[
                  "No hidden fees",
                  "24/7 customer support",
                  "Best price guarantee",
                  "Instant confirmation"
                ].map((feature, index) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Main Service Card */}
              <motion.div
                key={currentText}
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50"
              >
                {/* Service Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${services[currentText].gradient} flex items-center justify-center shadow-lg mb-6`}
                >
                  {(() => {
                    const IconComponent = services[currentText].icon;
                    return <IconComponent className="w-10 h-10 text-white" />;
                  })()}
                </motion.div>

                {/* Service Content */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {services[currentText].type}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {services[currentText].description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                  {[
                    { value: "2M+", label: "Options" },
                    { value: "150+", label: "Countries" },
                    { value: "4.9★", label: "Rating" }
                  ].map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-500/20"
              />
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-500/10 rounded-2xl backdrop-blur-sm border border-purple-500/20"
              />
            </motion.div>
          </div>
        </div>
      </HeroHighlight>

    {/* Features Section */}
         <section className="py-20 bg-white">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
             <div className="text-center">
               <motion.h2
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
               >
                 Why Choose FlightFinder?
               </motion.h2>
               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.1 }}
                 className="mt-4 text-lg text-gray-600"
               >
                 We combine cutting-edge technology with user-friendly design to make flight searching effortless.
               </motion.p>
             </div>
   
             <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
               {features.map((feature, index) => (
                 <motion.div
                   key={feature.name}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: index * 0.1 }}
                   className="text-center"
                 >
                   <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
                     <feature.icon className="h-6 w-6" />
                   </div>
                   <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.name}</h3>
                   <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of travelers who trust FlightFinder for their flight search needs.
            </p>
            <Link
              href="/flights"
              className="mt-8 inline-flex items-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Search Flights Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}