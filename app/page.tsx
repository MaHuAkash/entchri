'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Shield, Globe, TrendingUp, Plane, Car, Hotel, Star, CheckCircle } from 'lucide-react';
import { useState, useEffect } from "react";

// Modern Hero Container
const HeroHighlight = ({ children }: { children: React.ReactNode }) => (
<div className="relative w-full min-h-[100vh] bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 overflow-hidden pt-20">    {/* Premium Background Elements */}
    <div className="pt-9">
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




{/* Features Section - Modern & Clean */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Clean Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Why FlightFinder Stands Out
      </h2>
      <div className="w-16 h-1 bg-blue-500 mx-auto mb-6" />
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Smart features designed for modern travelers who value efficiency and reliability.
      </p>
    </motion.div>

    {/* Compact Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 h-full">
            {/* Simple Icon Container */}
            <motion.div
              className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </motion.div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {feature.name}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>

            {/* Simple Hover Indicator */}
            <motion.div
              className="w-6 h-0.5 bg-blue-500 mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>




{/* Services Section - Dope 4-Column Design */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Clean Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6"
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <span className="text-blue-600 font-medium text-sm">Our Services</span>
      </motion.div>

      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Everything You Need
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
      <p className="text-gray-600 max-w-2xl mx-auto">
        Complete travel solutions in one place
      </p>
    </motion.div>

    {/* 4-Column Services Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={service.type}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="group relative"
        >
          {/* Hover Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`} />
          
          {/* Main Card */}
          <div className="relative bg-white rounded-2xl p-6 border border-gray-200 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
            
            {/* Animated Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            
            {/* Floating Icon */}
            <motion.div
              className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl`}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
              }}
              transition={{ 
                scale: { duration: 0.2 },
                rotate: { duration: 0.5 }
              }}
            >
              <service.icon className="w-7 h-7 text-white" />
              
              {/* Icon Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.h3
                className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300"
                whileHover={{ x: 2 }}
              >
                {service.type}
              </motion.h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Animated Button */}
              <motion.div
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
                whileHover={{ x: 3 }}
              >
                <span>Explore</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>

            {/* Animated Border */}
            <motion.div
              className={`absolute bottom-0 left-1/2 h-1 bg-gradient-to-r ${service.gradient} rounded-full`}
              initial={{ width: 0, x: "-50%" }}
              whileInView={{ width: "60%" }}
              transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ width: "80%" }}
            />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Compact Stats with Hover Effects */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '5M+', label: 'Happy Travelers', icon: '👨‍👩‍👧‍👦' },
            { number: '150+', label: 'Countries', icon: '🌎' },
            { number: '24/7', label: 'Support', icon: '🛡️' },
            { number: '4.9★', label: 'Rating', icon: '⭐' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                className="text-2xl mb-2"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features with Cool Animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-blue-200"
        >
          {[
            "Best price guarantee",
            "Instant confirmation", 
            "No hidden fees",
            "Secure payments",
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 text-sm text-gray-700 group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
              </motion.div>
              <span className="group-hover:text-gray-900 transition-colors duration-300">
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>

    {/* CTA Button */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
      viewport={{ once: true }}
      className="text-center mt-12"
    >
      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          <span>Start Your Journey</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✈️
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  </div>
</section>
{/* Services Section */}

{/* Testimonials Section */}
<section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
        What Travelers Say
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
      <p className="text-xl text-purple-200 max-w-3xl mx-auto">
        Join thousands of satisfied travelers who have transformed their journey with FlightFinder.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Sarah Chen",
          role: "Frequent Traveler",
          content: "FlightFinder saved me over $500 on my last international trip. The price alerts are incredible!",
          rating: 5
        },
        {
          name: "Mike Rodriguez",
          role: "Business Traveler",
          content: "The all-in-one booking makes my business trips so much easier. Hotel + flight combos are unbeatable.",
          rating: 5
        },
        {
          name: "Emily Watson",
          role: "Family Traveler",
          content: "Planning family vacations used to be stressful. Now it's actually enjoyable thanks to FlightFinder!",
          rating: 5
        }
      ].map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 h-full group-hover:bg-white/15 transition-all duration-300">
            {/* Stars */}
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-lg text-purple-100 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>
            
            <div>
              <div className="font-semibold text-white">{testimonial.name}</div>
              <div className="text-purple-300 text-sm">{testimonial.role}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
}