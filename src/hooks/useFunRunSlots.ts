import { useState, useEffect, useRef } from 'react';

interface SlotData {
  maxSlots: number;
  currentSlots: number;
  availableSlots: number;
  isFull: boolean;
}

export function useFunRunSlots() {
  const [slotData, setSlotData] = useState<SlotData>({
    maxSlots: 200,
    currentSlots: 0,
    availableSlots: 200,
    isFull: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSlotData = async () => {
    try {
      const response = await fetch('/api/funrun/slots', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
          'If-Modified-Since': '0',
          'If-None-Match': '*',
        },
        cache: 'no-store' // Force no caching
      });
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSlotData(result.data);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch slot data');
      }
    } catch (error: any) {
      setError('Error fetching slot data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchSlotData();
    
    // Set up auto-refresh every 2 minutes (120 seconds) - slot data is more dynamic
    intervalRef.current = setInterval(() => {
      fetchSlotData();
    }, 120000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const refresh = async () => {
    setIsLoading(true);
    await fetchSlotData();
  };

  return {
    slotData,
    isLoading,
    error,
    refresh
  };
}
