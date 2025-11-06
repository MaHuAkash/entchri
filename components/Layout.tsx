'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Plane, Car, Hotel, BookOpen, User } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: User },
  { name: 'Flight', href: '/flights', icon: Plane },
  { name: 'Car', href: '/404', icon: Car },
  { name: 'Hotel', href: '/hotels', icon: Hotel },
  { name: 'Blogs', href: '/blogs', icon: BookOpen },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split navigation for desktop layout
  const leftNav = navigation.slice(0, 3); // Home, About, Contact
  const rightNav = navigation.slice(3); // Flight, Car, Hotel, Blogs

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Desktop Navigation */}
      <header className={`hidden lg:block fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200' 
          : 'bg-white/90 backdrop-blur-lg'
      }`}>
        <nav className="mx-auto flex items-center justify-between" style={{ width: '70%' }}>
          {/* Left Navigation - Home, About, Contact */}
          <div className="flex items-center space-x-8 py-4">
            {leftNav.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 text-sm font-semibold transition-all duration-300 group relative ${
                    isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopActive"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Centered Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center py-4"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Plane className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">Travelix</span>
                <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 to-transparent" />
              </div>
            </Link>
          </motion.div>

          {/* Right Navigation - Flight, Car, Hotel, Blogs */}
          <div className="flex items-center space-x-8 py-4">
            {rightNav.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 text-sm font-semibold transition-all duration-300 group relative ${
                    isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveRight"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Navigation - Keep exactly the same as before */}
      <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Travelix</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-gray-200"
              >
                <div className="py-4 space-y-4">
                  {navigation.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center space-x-3 text-base font-medium transition-colors hover:text-blue-600 ${
                          pathname === link.href ? 'text-blue-600' : 'text-gray-700'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{link.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActive"
                            className="ml-auto h-2 w-2 rounded-full bg-blue-500"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Spacer for fixed desktop header */}
      <div className="lg:hidden" /> {/* Mobile doesn't need spacer since it's sticky */}

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Travelix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}