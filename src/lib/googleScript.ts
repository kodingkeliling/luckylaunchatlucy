const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzgybWGY4713i3P7np8PUL-XEb8MAxoo7TYbxP3qxBHUHCfdsApAD18bFWf64QkFCk/exec';

export interface ApiResponse<T> {
  success?: boolean;
  data?: {
    data: T[];
  };
  error?: string;
  message?: string;
}

export async function fetchFromGoogleScript<T>(
  sheetName: string,
  method: 'GET' | 'POST' = 'GET',
  data?: any
): Promise<ApiResponse<T>> {
  try {
    // Add timestamp to prevent caching
    const timestamp = Date.now();
    const url = `${GOOGLE_SCRIPT_URL}?sheet=${sheetName}&t=${timestamp}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      redirect: 'follow', // Follow redirects
    };

    if (method === 'POST' && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }
    
    const text = await response.text();
    try {
      const result = JSON.parse(text);
      
      // Google Script returns data in { data: [...] } format
      if (result.data) {
        return {
          success: true,
          data: result
        };
      }
      
      return {
        success: false,
        error: 'Invalid response format from Google Script'
      };
    } catch (parseError) {
      return {
        success: false,
        error: 'Invalid JSON response from Google Script'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function submitTenantForm(data: any) {
  return fetchFromGoogleScript('tenants', 'POST', {
    action: 'create',
    data
  });
}

export async function submitFunRunRegistration(data: any) {
  return fetchFromGoogleScript('FunRun', 'POST', {
    action: 'create',
    data
  });
}