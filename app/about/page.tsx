'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Plane, Globe, Zap, Shield, Eye, Search, Scale, Sparkles, Star } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    name: 'Transparency',
    description: 'We believe in clear, upfront pricing with no hidden fees or surprises.',
    icon: Eye,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Simple Search',
    description: 'Our platform is designed to make finding flights quick and effortless.',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Fair Deals',
    description: 'We work to bring you the best value without compromising on quality.',
    icon: Scale,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Travelers First',
    description: 'Every decision we make puts your travel experience and needs at the center.',
    icon: Heart,
    color: 'from-red-500 to-orange-500',
  },
];

const stats = [
  { number: '10K+', label: 'Happy Travelers' },
  { number: '100+', label: 'Destinations' },
  { number: '24/7', label: 'Support' },
];

export default function About() {
  const containerRef = useRef(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 overflow-hidden">
      {/* Animated Background Elements - Deep blue theme */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-overlay blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-300/10 rounded-full mix-blend-overlay blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
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
                  className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mb-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  About
                  <motion.span 
                    className="block bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Travelikeg
                  </motion.span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  At Travelikeg, we are a team of independent individuals who believe that everyone deserves access to better travel deals.
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
                    <div className="text-2xl font-bold text-yellow-300">{stat.number}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
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
                <Globe className="w-full h-full text-white/20" />
                
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
                        className="w-8 h-8 text-yellow-300" 
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
                className="absolute top-1/4 left-1/4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                <div className="text-sm font-semibold text-gray-800">Better Deals</div>
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-1/4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <div className="text-sm font-semibold text-gray-800">Travel Smarter</div>
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
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mb-8 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/30"
            >
              <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8">
                "We created this platform to help people find affordable flights quickly, easily, and without stress."
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We know how frustrating it can be to search multiple websites just to compare prices. That’s why we work to simplify the process and bring the best available options together in one place. We are not a large corporation. We are independent people who genuinely want to help others save money on travel. Whether you’re visiting family, going on vacation, or traveling for business, our goal is to help you book smarter and pay less.
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
                { icon: Shield, title: 'Independent', desc: 'We work for you, not big corporations' },
                { icon: Zap, title: 'Fast & Easy', desc: 'Quick searches with no hassle' },
                { icon: Globe, title: 'Global Reach', desc: 'Deals to destinations worldwide' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                What We Believe In
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full" />
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 h-full group-hover:shadow-xl transition-all duration-300">
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
                    
                    <p className="text-gray-700 text-sm leading-relaxed">
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

        {/* Section 4: Single Full-width Vision Section */}
        <section className="min-h-screen flex items-center justify-center p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto w-full"
          >
            <div className="bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-8 lg:p-16 text-white relative overflow-hidden">
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
                    Our Vision
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
                    <h3 className="text-3xl font-bold mb-6">Looking Ahead</h3>
                    <p className="text-lg leading-relaxed mb-6 opacity-90">
                      We aim to grow Travelikeg into a trusted platform for budget-conscious travelers who want reliable options and better value.
                    </p>
                    <p className="text-lg leading-relaxed opacity-90">
                      Travel should be exciting — not stressful. We’re here to help you start your journey the right way.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Vision Highlights */}
                    <div className="space-y-8">
                      {[
                        { icon: Users, text: 'Built by independent people, for travelers' },
                        { icon: Award, text: 'Committed to transparency and fairness' },
                        { icon: Heart, text: 'Putting your travel needs first' },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4"
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div className="text-white font-semibold">{item.text}</div>
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
                    className="px-8 py-4 bg-white text-blue-700 rounded-2xl font-semibold shadow-lg"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Journey
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer (optional - could add similar to flights page if needed) */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center py-8 border-t border-white/20 mt-8"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
            {["Trusted by 2M+ Travelers", "Award Winning Service", "Global Coverage", "Best Price Guarantee"].map((text, index) => (
              <div key={index} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-sm text-blue-100">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-200 mb-4">
            We're here to make travel accessible for everyone. Independent, transparent, and traveler-first.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-blue-200/80">
            <span>© 2024 Travelikeg</span>
            <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
            <span>Privacy</span>
            <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
            <span>Terms</span>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}