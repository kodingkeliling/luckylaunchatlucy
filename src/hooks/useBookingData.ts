import { useEffect, useRef } from 'react';
import { useBookingStore } from '@/lib/bookingStore';

export interface BookingsResponse {
  success: boolean;
  data?: {
    data: any[];
  };
  error?: string;
  timestamp?: string;
}

export function useBookingData() {
  const {
    bookings,
    isLoading,
    error,
    lastUpdated,
    setBookings,
    setLoading,
    setError,
    updateLastUpdated,
    isDurationBookedForSpot,
    getBookedDurationsForSpot,
    isSpotCompletelyBooked
  } = useBookingStore();
  
  const hasInitialized = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/bookings', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
          'If-Modified-Since': '0',
          'If-None-Match': '*',
        },
        cache: 'no-store'
      });
      
      const result: BookingsResponse = await response.json();
      
      if (result.success && result.data) {
        setBookings(result.data.data);
      } else {
        const errorMsg = result.error || 'Failed to fetch bookings';
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await fetchBookings();
  };

  useEffect(() => {
    // Initial fetch
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchBookings();
    }
    
    // Set up auto-refresh every 30 seconds
    intervalRef.current = setInterval(() => {
      fetchBookings();
    }, 30000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    bookings,
    isLoading,
    error,
    lastUpdated,
    refresh,
    isDurationBookedForSpot,
    getBookedDurationsForSpot,
    isSpotCompletelyBooked
  };
}
