import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '../components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlightFinder - Find Your Perfect Flight',
  description: 'Discover the best flight deals with our advanced search technology. Compare prices, find hidden gems, and book with confidence.',
  keywords: 'flights, travel, booking, airlines, cheap flights',
  viewport: 'width=device-width, initial-scale=1',
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
      </body>
    </html>
  );
}