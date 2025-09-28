import { NextResponse } from 'next/server';
import { fetchFromGoogleScript } from '@/lib/googleScript';

// GET /api/funrun/slots - Get current slot availability
export async function GET() {
  try {
    // Fetch current registrations from Google Sheets
    const response = await fetchFromGoogleScript('FunRun', 'GET');
    
    if (!response.success) {
      console.error('Failed to fetch Fun Run data:', response.error);
      return NextResponse.json(
        { 
          error: 'Failed to fetch slot data from Google Sheets', 
          details: response.error 
        },
        { status: 500 }
      );
    }

    // Calculate current slots used (including community quantity)
    const registrations = response.data || [];
    let currentSlots = 0;
    
    if (Array.isArray(registrations)) {
      currentSlots = registrations.reduce((total, registration) => {
        // If it's a community registration, count the quantity
        if (registration['Mendaftar sebagai komunitas'] === 'Ya' && registration['Jumlah Orang']) {
          return total + parseInt(registration['Jumlah Orang']) || 1;
        }
        // Individual registration counts as 1
        return total + 1;
      }, 0);
    }
    
    const maxSlots = 200; // Maximum slots as specified
    const availableSlots = Math.max(0, maxSlots - currentSlots);

    console.log(`✅ Fun Run slots fetched: ${currentSlots}/${maxSlots} used, ${availableSlots} available`);

    return NextResponse.json({
      success: true,
      data: {
        maxSlots,
        currentSlots,
        availableSlots,
        isFull: availableSlots <= 0
      }
    });
  } catch (error) {
    console.error('Error fetching Fun Run slots:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
