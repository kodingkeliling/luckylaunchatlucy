# Upload API Troubleshooting Guide

## Error: "Authentication required. Please connect your Google account."

### Possible Causes:

1. **Missing Environment Variables**
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` not set
   - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET` not set
   - `NEXT_PUBLIC_OAUTH_REDIRECT_URL` not set

2. **Port Mismatch**
   - App running on port 3000 but OAuth configured for port 3002
   - Check your `.env.local` file for correct port

3. **OAuth Not Completed**
   - User hasn't completed Google OAuth flow
   - Access token expired or invalid

### Solutions:

#### 1. Check Environment Variables
Create `.env.local` file in project root:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXT_PUBLIC_OAUTH_REDIRECT_URL=http://localhost:3002/auth/google/callback
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your_script_id/exec
```

#### 2. Verify Port Configuration
- Make sure your app is running on the same port as configured in OAuth redirect URL
- Default: `http://localhost:3002`

#### 3. Complete OAuth Flow
1. Click "Connect Google Account" button
2. Complete Google OAuth in popup
3. Wait for "Authentication successful" message
4. Try upload again

#### 4. Debug Steps
1. Open browser Developer Tools (F12)
2. Check Console for debug logs:
   - "Local token found: true/false"
   - "Checking server-side auth status..."
   - "Auth status response: 200"
   - "Upload - Access token found: true/false"

#### 5. Manual Token Check
Check if token exists in localStorage:
```javascript
// In browser console
console.log(localStorage.getItem('google_access_token'));
```

### API Endpoints:

- **Auth Status**: `GET /api/auth/google/status`
- **Upload**: `POST /api/upload`
- **OAuth Callback**: `GET /auth/google/callback`

### Common Issues:

1. **Popup Blocked**: Allow popups for the site
2. **Invalid Redirect URI**: Check Google Console OAuth settings
3. **Expired Token**: Re-authenticate with Google
4. **CORS Issues**: Make sure running on correct port

### Testing Upload API:

```bash
# Test with curl (replace with actual token)
curl -X POST http://localhost:3002/api/upload \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@test-image.jpg"
```

### File Requirements:
- **Max Size**: 5MB
- **Allowed Types**: JPEG, JPG, PNG, GIF, WebP
- **Required**: Valid Google OAuth access token
