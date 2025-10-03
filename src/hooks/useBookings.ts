import { useState, useEffect, useRef } from 'react';

export interface BookingData {
  'Nama Perusahaan/Brand': string;
  'Posisi Tenan': string;
  'Tanggal': string;
  'Durasi': string;
  'Status': string;
  'Booked': boolean;
  [key: string]: any;
}

export interface BookingsResponse {
  success: boolean;
  data?: {
    data: BookingData[];
  };
  error?: string;
}

// Global cache to prevent multiple fetches
let globalBookingsCache: BookingData[] | null = null;
let globalLoadingState = false;
let globalErrorState: string | null = null;
let fetchPromise: Promise<void> | null = null;

export function useBookings() {
  const [bookings, setBookings] = useState<BookingData[]>(globalBookingsCache || []);
  const [isLoading, setIsLoading] = useState(globalLoadingState);
  const [error, setError] = useState<string | null>(globalErrorState);
  const hasInitialized = useRef(false);

  const fetchBookings = async () => {
    // If already fetching, return the existing promise
    if (fetchPromise) {
      return fetchPromise;
    }

    // If we have cached data, use it
    if (globalBookingsCache) {
      setBookings(globalBookingsCache);
      setIsLoading(false);
      setError(null);
      return Promise.resolve();
    }

    // Start new fetch
    fetchPromise = (async () => {
      try {
        globalLoadingState = true;
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching bookings data...');
        const response = await fetch('/api/bookings');
        const result: BookingsResponse = await response.json();
        
        if (result.success && result.data) {
          globalBookingsCache = result.data.data;
          setBookings(result.data.data);
          globalErrorState = null;
          setError(null);
          console.log('Bookings data loaded:', result.data.data.length, 'records');
        } else {
          const errorMsg = result.error || 'Failed to fetch bookings';
          globalErrorState = errorMsg;
          setError(errorMsg);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        globalErrorState = errorMsg;
        setError(errorMsg);
        console.error('Error fetching bookings:', err);
      } finally {
        globalLoadingState = false;
        setIsLoading(false);
        fetchPromise = null;
      }
    })();

    return fetchPromise;
  };

  useEffect(() => {
    // Only fetch once per app lifecycle
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchBookings();
    }
  }, []);

  // Helper function to check if a spot is completely booked (all durations unavailable)
  const isSpotCompletelyBooked = (spotId: string): boolean => {
    const spotBookings = bookings.filter(booking => 
      booking['Posisi Tenan'] === spotId && 
      booking['Booked'] === true
    );
    
    // Get all possible dates for this spot
    const allPossibleDates = ['24 Oktober', '25 Oktober', '26 Oktober'];
    const bookedDates = spotBookings
      .map(booking => booking['Tanggal'])
      .flatMap(dates => dates.split(', '));
    
    // Check if all dates are booked
    return allPossibleDates.every(date => bookedDates.includes(date));
  };

  // Helper function to get booked dates for a specific spot
  const getBookedDatesForSpot = (spotId: string): string[] => {
    return bookings
      .filter(booking => 
        booking['Posisi Tenan'] === spotId && 
        booking['Booked'] === true
      )
      .map(booking => booking['Tanggal'])
      .flatMap(dates => dates.split(', '));
  };

  // Helper function to check if a specific date is booked for a spot
  const isDateBookedForSpot = (spotId: string, date: string): boolean => {
    const bookedDates = getBookedDatesForSpot(spotId);
    return bookedDates.includes(date);
  };

  // Helper function to get booked durations for a specific spot
  const getBookedDurationsForSpot = (spotId: string): string[] => {
    return bookings
      .filter(booking => 
        booking['Posisi Tenan'] === spotId && 
        booking['Booked'] === true
      )
      .map(booking => booking['Durasi']);
  };

  // Helper function to check if a specific duration is booked for a spot
  const isDurationBookedForSpot = (spotId: string, duration: string): boolean => {
    const bookedDurations = getBookedDurationsForSpot(spotId);
    return bookedDurations.includes(duration);
  };

  const refresh = async () => {
    // Clear cache and fetch fresh data
    globalBookingsCache = null;
    globalErrorState = null;
    fetchPromise = null;
    hasInitialized.current = false;
    await fetchBookings();
  };

  return {
    bookings,
    isLoading,
    error,
    refresh,
    isSpotCompletelyBooked,
    getBookedDatesForSpot,
    isDateBookedForSpot,
    getBookedDurationsForSpot,
    isDurationBookedForSpot
  };
}
