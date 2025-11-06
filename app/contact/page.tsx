'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Globe, Zap } from 'lucide-react';
import { useRef, useState } from 'react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch via email for detailed inquiries',
    value: 'hello@flightfinder.com',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our support team',
    value: '+1 (555) 123-4567',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come visit our headquarters',
    value: '123 Travel Street, Sky City',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    description: 'We\'re here to help you',
    value: 'Mon - Fri: 9AM - 6PM',
    color: 'from-orange-500 to-red-500',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Quick Response',
    description: 'Get answers within 24 hours',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant help during business hours',
  },
  {
    icon: Globe,
    title: 'Global Support',
    description: 'We support multiple languages',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-15"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">

        {/* Section 1: Two Halves - Contact Header & Visual */}
        <section className="min-h-[60vh] flex flex-col lg:flex-row items-center p-6 lg:p-12">
          {/* Left Half - Content */}
          <motion.div 
            className="flex-1 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Let's Start
                <motion.span 
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  A Conversation
                </motion.span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Ready to take your travel experience to the next level? 
                We're here to help you with any questions or concerns.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="flex gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { number: '24h', label: 'Avg Response' },
                { number: '98%', label: 'Satisfaction' },
                { number: '50+', label: 'Countries' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Half - Animated Visual */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              {/* Floating Message Icons */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <Mail className="w-8 h-8 text-purple-500" />
              </motion.div>

              {/* Main Contact Illustration */}
              <motion.div
                className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Send className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Get In Touch</h3>
                  <p className="text-blue-100 text-sm">
                    We're excited to hear from you and help with your travel needs
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Single Full-width Contact Form */}
        <section className="py-12 px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                <p className="text-gray-600">We'll get back to you as soon as possible</p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto gap-2"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Four-part Contact Methods */}
        <section className="py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Reach Us</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full group-hover:shadow-xl transition-all duration-300 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} text-white mb-4`}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: 5,
                      }}
                    >
                      <method.icon className="w-6 h-6" />
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {method.description}
                    </p>

                    <div className="text-gray-900 font-semibold text-sm">
                      {method.value}
                    </div>

                    <motion.div
                      className={`h-0.5 bg-gradient-to-r ${method.color} rounded-full mt-3`}
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

        {/* Section 4: Single Full-width Features */}
        <section className="py-12 px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white text-center relative overflow-hidden">
              {/* Background Elements */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"
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
                className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-20 translate-y-20"
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
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6"
                >
                  Why Choose Our Support?
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.2 }}
                      viewport={{ once: true }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    >
                      <feature.icon className="w-8 h-8 text-white mb-3 mx-auto" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-blue-100 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-blue-100 text-lg mb-6"
                >
                  We're committed to providing the best support experience in the travel industry
                </motion.p>

                <motion.button
                  className="px-6 py-3 bg-white text-blue-600 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Live Chat
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}