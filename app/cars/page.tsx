'use client';

import CarSearchForm from '@/components/CarSearchForm';
import { Shield, DollarSign, ThumbsUp, Car } from 'lucide-react';

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Car size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find the Perfect Rental Car
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Compare prices from 500+ rental companies worldwide. Save up to 40% on your car rental.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Rental Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">160+</div>
                <div className="text-sm text-blue-200">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">50,000+</div>
                <div className="text-sm text-blue-200">Pick-up Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">24/7</div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Form Section */}
          <div className="relative -mt-8 md:-mt-12 mb-12">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-200">
              <CarSearchForm />
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
              Why Book With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <DollarSign size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Best Price Guarantee</h3>
                </div>
                <p className="text-gray-600">
                  We compare prices from all major car rental companies to ensure you get the best deal.
                  Find prices up to 40% lower than booking directly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Shield size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Full Insurance Coverage</h3>
                </div>
                <p className="text-gray-600">
                  All rentals include comprehensive insurance with no hidden fees.
                  Additional coverage options available for complete peace of mind.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <ThumbsUp size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Customer Support</h3>
                </div>
                <p className="text-gray-600">
                  24/7 customer support in multiple languages. Free amendments and cancellations
                  on most bookings.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Search</h3>
                <p className="text-gray-600 text-sm">
                  Enter your location, dates, and requirements
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Compare</h3>
                <p className="text-gray-600 text-sm">
                  View prices from all available rental companies
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Book</h3>
                <p className="text-gray-600 text-sm">
                  Choose your preferred car and complete booking
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Enjoy</h3>
                <p className="text-gray-600 text-sm">
                  Pick up your car and start your journey
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  question: "Do I need an international driver's license?",
                  answer: "Requirements vary by country. In most cases, a valid driver's license from your home country is sufficient for up to 90 days. However, some countries require an International Driving Permit (IDP). We recommend checking the specific requirements for your destination."
                },
                {
                  question: "What insurance is included?",
                  answer: "All rentals include basic third-party liability insurance. You can add Collision Damage Waiver (CDW), Theft Protection, and additional coverage during the booking process for complete protection."
                },
                {
                  question: "Can I cancel or modify my booking?",
                  answer: "Most bookings can be cancelled or modified free of charge up to 48 hours before pick-up. Some special offers may have different conditions, which will be clearly displayed during booking."
                },
                {
                  question: "What payment methods are accepted?",
                  answer: "We accept all major credit cards (Visa, MasterCard, American Express) and debit cards. Some locations may accept cash, but a credit card is usually required for the security deposit."
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white mb-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Find Your Perfect Car?
              </h2>
              <p className="text-lg mb-6 text-blue-100">
                Start your search now and get the best prices from top rental companies worldwide.
              </p>
              <button
                onClick={() => {
                  document.getElementById('car-search-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
              >
                Search Cars Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            <strong>Note:</strong> You will be redirected to DiscoverCars.com where you can complete your booking.
          </p>
          <p className="text-sm text-gray-500">
            We partner with DiscoverCars to bring you the best car rental deals. All bookings are processed through their secure platform.
          </p>
        </div>
      </div>
    </div>
  );
}