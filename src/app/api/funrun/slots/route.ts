import { NextResponse } from 'next/server';
import { fetchFromGoogleScript } from '@/lib/googleScript';

// GET /api/funrun/slots - Get current slot availability
export async function GET() {
  try {
    // Fetch current registrations from Google Sheets
    const response = await fetchFromGoogleScript('FunRun', 'GET');
    if (!response.success) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch slot data from Google Sheets', 
          details: response.error 
        },
        { status: 500 }
      );
    }

    // Calculate current slots used (including community quantity)
    const registrations = response.data?.data || [];
    let currentSlots = 0;
    
    if (Array.isArray(registrations)) {
      currentSlots = registrations.reduce<number>((total, registration: any) => {
        // If it's a community registration, count the quantity
        if (registration.isCommunity === true) {
          const quantity = registration.communityQuantity;
          // Handle empty string, null, undefined, or 0
          const parsedQuantity = (quantity && quantity !== '' && quantity !== '0') ? parseInt(quantity) : 1;
          return total + parsedQuantity;
        }
        
        // Individual registration counts as 1
        return total + 1;
      }, 0);
    }
    
    const maxSlots = 200; // Maximum slots as specified
    const availableSlots = Math.max(0, maxSlots - currentSlots);

    const jsonResponse = NextResponse.json({
      success: true,
      data: {
        maxSlots,
        currentSlots,
        availableSlots,
        isFull: availableSlots <= 0
      }
    });

    // Prevent caching
    jsonResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    jsonResponse.headers.set('Pragma', 'no-cache');
    jsonResponse.headers.set('Expires', '0');

    return jsonResponse;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}