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

  const fetchSlotData = async () => {
    try {
      const response = await fetch('/api/funrun/slots', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
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
    fetchSlotData();
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
