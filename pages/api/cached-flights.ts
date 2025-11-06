import type { NextApiRequest, NextApiResponse } from 'next';

// Define all possible endpoint types based on documentation
type ApiEndpointType = 
  | 'cheap'           // Cheapest tickets (v1)
  | 'direct'          // Non-stop tickets (v1)
  | 'calendar'        // Tickets for each day of a month (v1)
  | 'monthly'         // Cheapest tickets grouped by month (v1)
  | 'latest'          // Latest prices (v2)
  | 'week-matrix'     // Prices for a week (v2)
  | 'month-matrix'    // Prices for a month (v2)
  | 'nearest-places-matrix'  // Alternative directions (v2)
  | 'airline-directions' // Popular airline routes (v1)
  | 'city-directions';   // Popular directions from a city (v1)

interface CachedFlightSearchParams {
  type?: ApiEndpointType;
  origin: string;
  destination?: string;
  depart_date?: string;
  return_date?: string;
  currency?: string;
  limit?: number;
  page?: number;
  show_to_affiliates?: boolean;
  period_type?: string;
  calendar_type?: string;
  airline_code?: string;
  flexibility?: number;
  distance?: number;
  length?: number;
  trip_class?: number;
  one_way?: boolean;
  sorting?: string;
  trip_duration?: number;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  endpoint?: string;
  timestamp?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS
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
    type = 'cheap',
    origin, 
    destination, 
    depart_date, 
    return_date, 
    currency = 'USD',
    limit = 50,
    page,
    show_to_affiliates = true,
    period_type = 'year',
    calendar_type = 'departure_date',
    airline_code,
    flexibility,
    distance,
    length,
    trip_class = 0,
    one_way = false,
    sorting = 'price',
    trip_duration,
  }: CachedFlightSearchParams = req.body;

  try {
    const token = process.env.TRAVELPAYOUTS_API_TOKEN;
    
    if (!token) {
      console.error('Travelpayouts API token not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'API token not configured. Please set TRAVELPAYOUTS_API_TOKEN environment variable.' 
      });
    }

    // Validate required parameters
    if (!origin) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required parameter: origin' 
      });
    }

    // Validate IATA codes format when provided
    const iataRegex = /^[A-Za-z]{2,3}$/;
    if (origin && !iataRegex.test(origin)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Origin must be a valid 2-3 letter IATA code' 
      });
    }

    if (destination && !iataRegex.test(destination)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Destination must be a valid 2-3 letter IATA code' 
      });
    }

    if (airline_code && !iataRegex.test(airline_code)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Airline code must be a valid 2-3 letter IATA code' 
      });
    }

    // Construct the appropriate API URL
    const apiUrl = buildApiUrl(type, {
      origin,
      destination,
      depart_date,
      return_date,
      currency,
      limit,
      page,
      show_to_affiliates,
      period_type,
      calendar_type,
      airline_code,
      flexibility,
      distance,
      length,
      trip_class,
      one_way,
      sorting,
      trip_duration,
    }, token);

    console.log(`[Cached-Flights-API] Fetching ${type} data from:`, apiUrl);

    // Make request to Travelpayouts API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(apiUrl, {
      headers: {
        'X-Access-Token': token,
        'Accept-Encoding': 'gzip, deflate',
        'User-Agent': 'Travelpayouts-Cached-Flights-API/1.0'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Cached-Flights-API] Travelpayouts error ${response.status}:`, errorText);
      
      let errorMessage = `API responded with status ${response.status}`;
      if (response.status === 401) {
        errorMessage = 'Invalid API token. Please check your TRAVELPAYOUTS_API_TOKEN.';
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      } else if (response.status >= 500) {
        errorMessage = 'Travelpayouts API is currently unavailable. Please try again later.';
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Log successful request
    console.log(`[Cached-Flights-API] Successfully fetched ${type} data`, {
      origin,
      destination,
      dataCount: data.data ? (typeof data.data === 'object' ? Object.keys(data.data).length : data.data.length) : 0
    });

    // Return the data to the client
    res.status(200).json({
      success: true,
      data,
      endpoint: type,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[Cached-Flights-API] Error:', error);

    if (error.name === 'AbortError') {
      return res.status(408).json({ 
        success: false, 
        error: 'Request timeout. Please try again.' 
      });
    }

    res.status(500).json({ 
      success: false, 
      error: error.message || `Failed to fetch ${type} flight data from Travelpayouts API` 
    });
  }
}

// Helper function to build API URLs for different endpoints
function buildApiUrl(
  type: ApiEndpointType, 
  params: any,
  token: string
): string {
  
  let baseUrl = '';
  const urlParams = new URLSearchParams();

  // Add token (required for all endpoints)
  urlParams.append('token', token);

  // Determine base URL and add required parameters
  switch (type) {
    case 'cheap':
      baseUrl = 'https://api.travelpayouts.com/v1/prices/cheap';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.depart_date) urlParams.append('depart_date', params.depart_date);
      if (params.return_date) urlParams.append('return_date', params.return_date);
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      if (params.page) urlParams.append('page', params.page.toString());
      break;
    
    case 'direct':
      baseUrl = 'https://api.travelpayouts.com/v1/prices/direct';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.depart_date) urlParams.append('depart_date', params.depart_date);
      if (params.return_date) urlParams.append('return_date', params.return_date);
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      break;
    
    case 'calendar':
      baseUrl = 'https://api.travelpayouts.com/v1/prices/calendar';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.depart_date) urlParams.append('depart_date', params.depart_date);
      if (params.return_date) urlParams.append('return_date', params.return_date);
      if (params.calendar_type) urlParams.append('calendar_type', params.calendar_type);
      if (params.length) urlParams.append('length', params.length.toString());
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      break;
    
    case 'monthly':
      baseUrl = 'https://api.travelpayouts.com/v1/prices/monthly';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      break;
    
    case 'latest':
      baseUrl = 'https://api.travelpayouts.com/v2/prices/latest';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      if (params.period_type) urlParams.append('period_type', params.period_type);
      if (params.page) urlParams.append('page', params.page.toString());
      if (params.limit) urlParams.append('limit', params.limit.toString());
      if (params.show_to_affiliates !== undefined) {
        urlParams.append('show_to_affiliates', params.show_to_affiliates.toString());
      }
      if (params.one_way !== undefined) urlParams.append('one_way', params.one_way.toString());
      if (params.sorting) urlParams.append('sorting', params.sorting);
      if (params.trip_class !== undefined) urlParams.append('trip_class', params.trip_class.toString());
      break;
    
    case 'week-matrix':
      baseUrl = 'https://api.travelpayouts.com/v2/prices/week-matrix';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      if (params.show_to_affiliates !== undefined) {
        urlParams.append('show_to_affiliates', params.show_to_affiliates.toString());
      }
      if (params.depart_date) urlParams.append('depart_date', params.depart_date);
      if (params.return_date) urlParams.append('return_date', params.return_date);
      break;
    
    case 'month-matrix':
      baseUrl = 'https://api.travelpayouts.com/v2/prices/month-matrix';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      if (params.show_to_affiliates !== undefined) {
        urlParams.append('show_to_affiliates', params.show_to_affiliates.toString());
      }
      if (params.month) urlParams.append('month', params.month);
      break;
    
    case 'nearest-places-matrix':
      baseUrl = 'https://api.travelpayouts.com/v2/prices/nearest-places-matrix';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      if (params.limit) urlParams.append('limit', params.limit.toString());
      if (params.show_to_affiliates !== undefined) {
        urlParams.append('show_to_affiliates', params.show_to_affiliates.toString());
      }
      if (params.depart_date) urlParams.append('depart_date', params.depart_date);
      if (params.return_date) urlParams.append('return_date', params.return_date);
      if (params.flexibility) urlParams.append('flexibility', params.flexibility.toString());
      break;
    
    case 'airline-directions':
      baseUrl = 'https://api.travelpayouts.com/v1/airline-directions';
      if (params.airline_code) urlParams.append('airline_code', params.airline_code.toUpperCase());
      if (params.limit) urlParams.append('limit', params.limit.toString());
      break;
    
    case 'city-directions':
      baseUrl = 'https://api.travelpayouts.com/v1/city-directions';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
      break;
    
    default:
      baseUrl = 'https://api.travelpayouts.com/v1/prices/cheap';
      if (params.origin) urlParams.append('origin', params.origin.toUpperCase());
      if (params.destination) urlParams.append('destination', params.destination.toUpperCase());
      if (params.depart_date) urlParams.append('depart_date', params.depart_date);
      if (params.return_date) urlParams.append('return_date', params.return_date);
      if (params.currency) urlParams.append('currency', params.currency.toUpperCase());
  }

  return `${baseUrl}?${urlParams.toString()}`;
}