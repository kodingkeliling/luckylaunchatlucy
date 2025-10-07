import { create } from 'zustand';

export interface BookingData {
  'Nama Perusahaan/Brand': string;
  'Posisi Tenan': string;
  'Tanggal': string;
  'Durasi': string;
  'Status': string;
  'Booked': boolean;
  [key: string]: any;
}

interface BookingStore {
  bookings: BookingData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  
  // Actions
  setBookings: (bookings: BookingData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateLastUpdated: () => void;
  
  // Helper functions
  isDurationBookedForSpot: (spotId: string, duration: string) => boolean;
  getBookedDurationsForSpot: (spotId: string) => string[];
  isSpotCompletelyBooked: (spotId: string) => boolean;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
  
  setBookings: (bookings) => set({ 
    bookings, 
    error: null,
    lastUpdated: Date.now()
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  updateLastUpdated: () => set({ lastUpdated: Date.now() }),
  
  // Helper function to check if a specific duration is booked for a spot
  isDurationBookedForSpot: (spotId: string, duration: string) => {
    const { bookings } = get();
    return bookings.some(booking => 
      booking['Posisi Tenan'] === spotId && 
      booking['Durasi'] === duration &&
      booking['Booked'] === true
    );
  },
  
  // Helper function to get booked durations for a specific spot
  getBookedDurationsForSpot: (spotId: string) => {
    const { bookings } = get();
    return bookings
      .filter(booking => 
        booking['Posisi Tenan'] === spotId && 
        booking['Booked'] === true
      )
      .map(booking => booking['Durasi']);
  },
  
  // Helper function to check if a spot is completely booked
  isSpotCompletelyBooked: (spotId: string) => {
    const { bookings } = get();
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
  }
}));

