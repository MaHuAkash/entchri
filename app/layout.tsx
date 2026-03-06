import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Layout from '../components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travelike🅶 - Find the Best Flight Deals',
  description: 'Discover the best flight deals with our advanced search technology. Compare prices, find hidden gems, and book with confidence.',
  keywords: 'flights, travel, booking, airlines, cheap flights, travel deals, vacation, holiday, airfare, travellikeg, flight search, flight comparison, travel planning, travel tips, travel blog, travel guides, travel inspiration, travel discounts',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Travelpayouts Drive tracking script */}
        <script
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = 'https://emrld.cc/NTA0ODU2.js?t=504856';
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}