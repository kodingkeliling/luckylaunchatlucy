import { NextRequest, NextResponse } from 'next/server';
import { getBookingsFromSheet } from '@/lib/googleScript';

export async function GET(request: NextRequest) {
  try {
    const bookings = await getBookingsFromSheet();
    
    if (bookings.success) {
      return NextResponse.json({
        success: true,
        data: bookings.data
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

