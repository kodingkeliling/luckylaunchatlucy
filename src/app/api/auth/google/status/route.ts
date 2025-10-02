import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if access token exists in cookies
    const accessToken = request.cookies.get('google_access_token')?.value;
    const refreshToken = request.cookies.get('google_refresh_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ authenticated: false });
    }

    // Verify token is still valid by making a test request to Google API
    const testResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (testResponse.ok) {
      return NextResponse.json({ 
        authenticated: true,
        hasRefreshToken: !!refreshToken
      });
    } else {
      // Token might be expired, try to refresh if we have refresh token
      if (refreshToken) {
        try {
          const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
              client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
              refresh_token: refreshToken,
              grant_type: 'refresh_token',
            }),
          });

          if (refreshResponse.ok) {
            const tokenData = await refreshResponse.json();
            
            // Update cookies with new access token
            const response = NextResponse.json({ 
              authenticated: true,
              hasRefreshToken: true
            });
            
            response.cookies.set('google_access_token', tokenData.access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 3600, // 1 hour
            });

            return response;
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }

      // If we get here, token is invalid and can't be refreshed
      return NextResponse.json({ authenticated: false });
    }
  } catch (error) {
    console.error('Auth status check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}
