import { NextRequest, NextResponse } from 'next/server';
import { getBookingsFromSheet } from '@/lib/googleScript';

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const bookings = await getBookingsFromSheet();
    
    if (bookings.success) {
      const responseData = {
        success: true,
        data: bookings.data,
        timestamp: new Date().toISOString()
      };
      
      const jsonResponse = NextResponse.json(responseData);
      
      // Aggressive cache prevention
      jsonResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
      jsonResponse.headers.set('Pragma', 'no-cache');
      jsonResponse.headers.set('Expires', '0');
      jsonResponse.headers.set('Last-Modified', new Date().toUTCString());
      jsonResponse.headers.set('ETag', `"${Date.now()}"`);
      
      return jsonResponse;
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


