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
      console.log('🔄 Fetching slot data...');
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
      
      console.log('📊 Slot data response:', result);
      console.log('🕐 Response timestamp:', result.timestamp);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok && result.success) {
        setSlotData(result.data);
        setError(null);
        console.log('✅ Slot data updated:', result.data);
        console.log('🕐 Data fetched at:', new Date().toISOString());
      } else {
        setError(result.error || 'Failed to fetch slot data');
        console.error('❌ Slot data error:', result.error);
      }
    } catch (error: any) {
      setError('Error fetching slot data');
      console.error('❌ Slot data fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchSlotData();
    
    // Set up auto-refresh every 30 seconds
    intervalRef.current = setInterval(() => {
      console.log('⏰ Auto-refreshing slot data...');
      fetchSlotData();
    }, 30000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const refresh = async () => {
    console.log('🔄 Manual refresh triggered');
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
