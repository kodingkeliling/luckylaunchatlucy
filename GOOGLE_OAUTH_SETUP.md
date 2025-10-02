# Google OAuth Setup for Payment Proof Upload

## Environment Variables Required

Add these environment variables to your `.env.local` file:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXT_PUBLIC_OAUTH_REDIRECT_URL=http://localhost:3002/auth/google/callback
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Set authorized redirect URIs:
   - For development: `http://localhost:3002/auth/google/callback`
   - For production: `https://yourdomain.com/auth/google/callback`
6. Copy the Client ID and Client Secret to your environment variables

## Features Added

- **Payment Proof Upload**: Users can upload payment proof images via Google Drive
- **Google OAuth Integration**: Secure authentication with Google Drive
- **Payment Information Display**: Clear instructions on where to transfer payment
- **Form Validation**: Ensures payment proof is uploaded before submission
- **File Management**: Automatic file cleanup and preview functionality

## How It Works

1. User fills out the tenant registration form
2. User sees payment information (bank details, account number, etc.)
3. User connects their Google account for file upload
4. User uploads payment proof image
5. Form validates that payment proof is uploaded
6. Form can be submitted with all required information

The payment proof is securely stored in Google Drive and the URL is saved with the form data.
