import { NextRequest, NextResponse } from 'next/server';
import { submitFunRunRegistration } from '@/lib/googleScript';

// POST /api/funrun - Create new fun run registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.participantName || !body.gender || !body.healthHistory || !body.whatsappNumber || !body.emergencyNumber || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate checkboxes
    if (!body.healthDeclaration || !body.photoVideoConsent || !body.liabilityWaiver) {
      return NextResponse.json(
        { error: 'All declarations must be accepted' },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets
    const funRunData = {
      id: Date.now().toString(),
      participantName: body.participantName,
      gender: body.gender,
      responsiblePerson: body.responsiblePerson || '',
      communityQuantity: body.communityQuantity || 1,
      healthHistory: body.healthHistory,
      whatsappNumber: body.whatsappNumber,
      emergencyNumber: body.emergencyNumber,
      email: body.email,
      isCommunity: body.isCommunity || false,
      healthDeclaration: body.healthDeclaration,
      photoVideoConsent: body.photoVideoConsent,
      liabilityWaiver: body.liabilityWaiver,
      created_at: new Date().toISOString(),
    };

    console.log('Submitting Fun Run data to Google Sheets:', funRunData);

    // Save directly to Google Sheets with sheet name "FunRun"
    const response = await submitFunRunRegistration(funRunData);
    
    if (!response.success) {
      console.error('Google Sheets submission failed:', response.error);
      return NextResponse.json(
        { 
          error: 'Failed to save fun run data to Google Sheets', 
          details: response.error 
        },
        { status: 500 }
      );
    }

    console.log('✅ Fun Run data saved to Google Sheets successfully');
    return NextResponse.json({
      success: true,
      data: funRunData,
      message: 'Fun Run registration saved successfully to Google Sheets'
    });
  } catch (error) {
    console.error('Error creating fun run registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}