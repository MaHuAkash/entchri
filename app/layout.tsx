import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Layout from '../components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travelike🅶 - Find the Best Flight Deals',
  description: 'Discover the best flight deals with our advanced search technology. Compare prices, find hidden gems, and book with confidence.',
  keywords: 'flights, travel, booking, airlines, cheap flights,travel deals, vacation, holiday, airfare, travellikeg, flight search, flight comparison, travel planning, travel tips, travel blog, travel guides, travel inspiration, travel discounts',
  // Removed viewport from here - it goes in separate export below
};

// ✅ FIX: Add separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Optional: prevents excessive zoom
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Layout>{children}</Layout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}