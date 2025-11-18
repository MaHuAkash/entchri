// app/api/cached-hotels/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TRAVELPAYOUTS_TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

// Define types for the API responses
interface LookupLocation {
  id: string;
  cityName: string;
  fullName: string;
  countryCode: string;
  countryName: string;
  iata: string[];
  hotelsCount: string;
  location: {
    lat: string;
    lon: string;
  };
  _score: number;
}

interface LookupHotel {
  label: string;
  locationName: string;
  locationId: string;
  id: string;
  fullName: string;
  location: {
    lat: string;
    lon: string;
  };
}

interface LookupResponse {
  results: {
    locations?: LookupLocation[];
    hotels?: LookupHotel[];
  };
  status: string;
}

interface HotelSelection {
  hotel_id: number;
  distance: number;
  name: string;
  stars: number;
  rating: number;
  property_type: string;
  hotel_type: string[];
  last_price_info?: {
    price: number;
    old_price: number;
    discount: number;
    insertion_time: number;
    nights: number;
    search_params: {
      adults: number;
      children: number[];
      checkIn: string;
      checkOut: string;
    };
    price_pn: number;
    old_price_pn: number;
  };
  has_wifi: boolean;
}

interface CacheResponse {
  stars: number;
  locationId: number;
  priceFrom: number;
  priceAvg: number;
  pricePercentile: Record<string, number>;
  hotelName: string;
  location: {
    country: string;
    geo: {
      lon: number;
      lat: number;
    };
    state: string | null;
    name: string;
  };
  hotelId: number;
}

export async function POST(request: NextRequest) {
  if (!TRAVELPAYOUTS_TOKEN) {
    return NextResponse.json(
      { success: false, error: 'TravelPayouts token not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { type, query, checkIn, checkOut, adults = 2, children = 0, currency = 'USD' } = body;

    // Step 1: Lookup location or hotel
    const lookupParams = new URLSearchParams({
      query: query,
      lang: 'en',
      lookFor: type === 'hotel' ? 'hotel' : 'both',
      limit: '10',
      token: TRAVELPAYOUTS_TOKEN
    });

    const lookupResponse = await fetch(
      `http://engine.hotellook.com/api/v2/lookup.json?${lookupParams}`
    );
    
    if (!lookupResponse.ok) {
      throw new Error(`Lookup API failed with status: ${lookupResponse.status}`);
    }

    const lookupData: LookupResponse = await lookupResponse.json();

    if (!lookupData.results || (!lookupData.results.locations && !lookupData.results.hotels)) {
      return NextResponse.json({
        success: true,
        data: [] // No results found
      });
    }

    let hotelsData: any[] = [];

    // If searching by location, get hotels from that location
    if (type === 'location' && lookupData.results.locations && lookupData.results.locations.length > 0) {
      const locationId = lookupData.results.locations[0].id;
      
      // Get hotel selections for this location
      const selectionsParams = new URLSearchParams({
        currency: currency.toLowerCase(),
        language: 'en',
        limit: '8',
        id: locationId,
        type: 'popularity',
        check_in: checkIn,
        check_out: checkOut,
        token: TRAVELPAYOUTS_TOKEN
      });

      const selectionsResponse = await fetch(
        `http://yasen.hotellook.com/tp/public/widget_location_dump.json?${selectionsParams}`
      );

      if (selectionsResponse.ok) {
        const selectionsData: { popularity?: HotelSelection[] } = await selectionsResponse.json();
        if (selectionsData.popularity) {
          hotelsData = selectionsData.popularity.slice(0, 8);
        }
      }
    } 
    // If searching by hotel name
    else if (type === 'hotel' && lookupData.results.hotels && lookupData.results.hotels.length > 0) {
      const hotel = lookupData.results.hotels[0];
      
      // Get cached prices for this specific hotel
      const cacheParams = new URLSearchParams({
        locationId: hotel.locationId,
        hotelId: hotel.id,
        checkIn: checkIn,
        checkOut: checkOut,
        adults: adults.toString(),
        children: children.toString(),
        currency: currency.toLowerCase(),
        limit: '1',
        token: TRAVELPAYOUTS_TOKEN
      });

      const cacheResponse = await fetch(
        `http://engine.hotellook.com/api/v2/cache.json?${cacheParams}`
      );

      if (cacheResponse.ok) {
        const cacheData: CacheResponse = await cacheResponse.json();
        if (cacheData) {
          hotelsData = [{
            ...hotel,
            priceInfo: cacheData
          }];
        }
      }
    }

    // Transform the API response to match your frontend format
    const transformedData = hotelsData.map((hotel: any, index: number) => {
      const baseHotel = {
        id: hotel.hotel_id?.toString() || hotel.id?.toString() || `hotel-${index}`,
        name: hotel.name || hotel.label || `Hotel ${index + 1}`,
        location: hotel.locationName || lookupData.results?.locations?.[0]?.fullName || query,
        stars: hotel.stars || 3,
        rating: hotel.rating || 70,
        distance: hotel.distance || 5,
        amenities: hotel.has_wifi ? ['Free WiFi'] : [],
        description: `${hotel.name || hotel.label} located in ${hotel.locationName || query}.`,
        contact: 'Contact information available on booking'
      };

      // Calculate price - handle both selection and cache formats
      let price: number | undefined;
      if (hotel.last_price_info?.price) {
        price = hotel.last_price_info.price;
      } else if (hotel.priceInfo?.priceFrom) {
        price = hotel.priceInfo.priceFrom;
      } else {
        // Fallback price
        price = Math.floor(Math.random() * 200) + 50;
      }

      return {
        ...baseHotel,
        price: price
      };
    });

    return NextResponse.json({
      success: true,
      data: transformedData,
      rawData: hotelsData // Include raw data for debugging
    });

  } catch (error: any) {
    console.error('Hotel search error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search hotels',
        details: error.message 
      },
      { status: 500 }
    );
  }
}