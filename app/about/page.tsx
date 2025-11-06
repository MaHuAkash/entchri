'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Plane, Globe, Zap, Shield } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    name: 'Innovation',
    description: 'We constantly evolve our technology to provide the best flight search experience.',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Excellence',
    description: 'We strive for excellence in every aspect of our service and user experience.',
    icon: Award,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Community',
    description: 'We believe in building a community of smart travelers who share and learn together.',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Passion',
    description: 'Our passion for travel drives us to create exceptional tools for fellow travelers.',
    icon: Heart,
    color: 'from-red-500 to-orange-500',
  },
];

const stats = [
  { number: '50M+', label: 'Travelers Served' },
  { number: '190+', label: 'Countries Covered' },
  { number: '24/7', label: 'Support' },
];

export default function About() {
  const containerRef = useRef(null);
  
  return (
    <div className="pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div ref={containerRef} className="relative z-10">

        {/* Section 1: Two Halves Split Layout */}
        <section className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Half - Animated Text Content */}
          <motion.div 
            className="flex-1 flex items-center justify-center p-8 lg:p-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Redefining
                  <motion.span 
                    className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Flight Search
                  </motion.span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We're revolutionizing the way people discover and book flights, 
                  making travel more accessible, affordable, and enjoyable for everyone.
                </p>
              </motion.div>

              {/* Animated Stats */}
              <motion.div 
                className="flex gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Half - Animated Visual */}
          <motion.div 
            className="flex-1 flex items-center justify-center p-8 lg:p-16"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Main Globe */}
              <motion.div
                className="relative w-96 h-96 mx-auto"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Globe className="w-full h-full text-blue-400 opacity-20" />
                
                {/* Floating Planes */}
                {[0, 120, 240].map((rotation, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: [rotation, rotation + 360],
                    }}
                    transition={{
                      duration: 15 + index * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="relative -left-4 -top-4"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Plane 
                        className="w-8 h-8 text-blue-500" 
                        style={{ 
                          transform: `rotate(${90}deg)`,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-1/4 left-1/4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                <div className="text-sm font-semibold text-gray-700">Smart Search</div>
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-1/4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <div className="text-sm font-semibold text-gray-700">Best Deals</div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Single Full-width Mission Section */}
        <section className="min-h-screen flex items-center justify-center p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20"
            >
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                "At FlightFinder, we believe that everyone should have access to the best flight deals 
                without compromising on experience or reliability."
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to empower travelers with cutting-edge technology that simplifies 
                the flight search process while delivering unparalleled value and transparency. 
                We're committed to making travel planning seamless, intuitive, and exciting.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Shield, title: 'Trusted', desc: 'Verified airlines and secure bookings' },
                { icon: Zap, title: 'Fast', desc: 'Lightning-fast search results' },
                { icon: Globe, title: 'Global', desc: 'Coverage across 190+ countries' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

     {/* Section 3: Four-part Values Section */}
<section className="min-h-[80vh] flex items-center justify-center p-6 lg:p-12">
  <div className="max-w-7xl mx-auto w-full">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Our Values
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {values.map((value, index) => (
        <motion.div
          key={value.name}
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          {/* Background Gradient on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full group-hover:shadow-xl transition-all duration-300">
            <motion.div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} text-white mb-4`}
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
              }}
            >
              <value.icon className="w-6 h-6" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {value.name}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              {value.description}
            </p>

            {/* Animated underline */}
            <motion.div
              className={`h-0.5 bg-gradient-to-r ${value.color} rounded-full mt-3`}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
        {/* Section 4: Single Full-width Story Section */}
        <section className="min-h-screen flex items-center justify-center p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto w-full"
          >
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 lg:p-16 text-white relative overflow-hidden">
              {/* Animated background elements */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              />
              
              <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Our Journey
                  </h2>
                  <div className="w-24 h-1 bg-white/50 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl font-bold mb-6">From Vision to Reality</h3>
                    <p className="text-lg leading-relaxed mb-6 opacity-90">
                      Founded in 2024, FlightFinder emerged from a simple observation: finding affordable 
                      flights shouldn't be complicated. Our team of travel enthusiasts and technology experts 
                      came together to create a platform that combines sophisticated search algorithms with 
                      an intuitive user interface.
                    </p>
                    <p className="text-lg leading-relaxed opacity-90">
                      Today, we serve millions of travelers worldwide, helping them discover amazing flight 
                      deals and create unforgettable travel experiences. Our commitment to innovation and 
                      customer satisfaction continues to drive us forward.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Timeline Visualization */}
                    <div className="space-y-8">
                      {[
                        { year: '2024', event: 'FlightFinder Founded' },
                        { year: '2025', event: '1M Users Milestone' },
                        { year: '2026', event: 'Global Expansion' },
                      ].map((milestone, index) => (
                        <motion.div
                          key={milestone.year}
                          className="flex items-center space-x-4"
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white border border-white/30">
                            {milestone.year}
                          </div>
                          <div className="text-white font-semibold">{milestone.event}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <motion.button
                    className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold shadow-lg"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Our Journey
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}