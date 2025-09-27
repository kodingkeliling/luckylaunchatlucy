import { NextRequest, NextResponse } from 'next/server';
import { submitTenantForm } from '@/lib/googleScript';

// POST /api/tenants - Create new tenant registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.businessName || !body.email || !body.phone || !body.productType || !body.spotPreference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets
    const tenantData = {
      id: Date.now().toString(),
      fullName: body.fullName,
      businessName: body.businessName,
      email: body.email,
      phone: body.phone,
      productType: body.productType,
      spotPreference: body.spotPreference,
      additionalRequirements: body.additionalRequirements || '',
      created_at: new Date().toISOString(),
    };

    // Save directly to Google Sheets
    const response = await submitTenantForm(tenantData);
    
    if (!response.success) {
      return NextResponse.json(
        { 
          error: 'Failed to save tenant data to Google Sheets', 
          details: response.error 
        },
        { status: 500 }
      );
    }

    console.log('✅ Tenant data saved to Google Sheets successfully');
    return NextResponse.json({
      success: true,
      data: tenantData,
      message: 'Tenant data saved successfully to Google Sheets'
    });
  } catch (error) {
    console.error('Error creating tenant registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
