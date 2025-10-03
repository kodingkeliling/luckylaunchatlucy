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
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const result = await response.json();
      
      console.log('📊 Slot data response:', result);
      
      if (response.ok && result.success) {
        setSlotData(result.data);
        setError(null);
        console.log('✅ Slot data updated:', result.data);
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
