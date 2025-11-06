import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  timestamp?: string;
}

interface HotelSearchParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  currency?: string;
}

// Mock hotel data for demonstration
const mockHotels = [
  {
    id: 1,
    name: "Grand Hotel Vancouver",
    location: "Vancouver, BC",
    price: 199,
    rating: 4.5,
    stars: 4,
    image: "/hotels/hotel1.jpg",
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"]
  },
  {
    id: 2,
    name: "Coast Plaza Hotel & Suites",
    location: "Vancouver, BC",
    price: 159,
    rating: 4.2,
    stars: 3,
    image: "/hotels/hotel2.jpg",
    amenities: ["Free WiFi", "Fitness Center", "Business Center"]
  },
  {
    id: 3,
    name: "The Sutton Place Hotel",
    location: "Vancouver, BC",
    price: 289,
    rating: 4.7,
    stars: 5,
    image: "/hotels/hotel3.jpg",
    amenities: ["Free WiFi", "Pool", "Spa", "Fine Dining", "Concierge"]
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  const { 
    location = 'vancouver',
    checkIn,
    checkOut,
    adults = 2,
    currency = 'USD'
  }: HotelSearchParams = req.body;

  try {
    console.log(`[Hotels-API] Searching hotels in: ${location}`);

    // Since TravelPayouts hotel API is not working, we have several options:
    
    // Option 1: Return mock data for development
    const mockData = {
      location,
      checkIn,
      checkOut,
      adults,
      currency,
      hotels: mockHotels.map(hotel => ({
        ...hotel,
        // Add dynamic pricing based on dates
        finalPrice: calculateDynamicPrice(hotel.price, checkIn, checkOut),
        available: true
      }))
    };

    console.log(`[Hotels-API] Returning mock data for ${location}`);

    // Return mock data
    res.status(200).json({
      success: true,
      data: mockData,
      message: 'Using mock hotel data - TravelPayouts API unavailable',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[Hotels-API] Error:', error);

    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch hotel data' 
    });
  }
}

// Helper function to calculate dynamic pricing
function calculateDynamicPrice(basePrice: number, checkIn?: string, checkOut?: string): number {
  if (!checkIn || !checkOut) return basePrice;
  
  // Simple algorithm: weekend and peak season pricing
  const checkInDate = new Date(checkIn);
  const dayOfWeek = checkInDate.getDay();
  const month = checkInDate.getMonth();
  
  let multiplier = 1.0;
  
  // Weekend premium
  if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday or Saturday
    multiplier *= 1.2;
  }
  
  // Peak season (summer months)
  if (month >= 5 && month <= 8) { // June to September
    multiplier *= 1.3;
  }
  
  return Math.round(basePrice * multiplier);
}