import { NextRequest, NextResponse } from 'next/server';
import { submitToGoogleSheets } from '@/lib/googleScript';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'companyName',
      'picName', 
      'whatsappNumber',
      'purpose',
      'productType',
      'productDetail',
      'selectedSpot',
      'selectedDates',
      'duration',
      'totalPayment'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { message: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    // Prepare data for Google Sheets
    const sheetData = {
      // Data Klien
      'Nama Perusahaan/Brand': formData.companyName,
      'Nama PIC/Penanggung Jawab': formData.picName,
      'Nomor WhatsApp': formData.whatsappNumber,
      
      // Detail Pop Up Market
      'Tujuan Pemesan': formData.purpose,
      'Jenis Product': formData.productType,
      'Detail Produk': formData.productDetail,
      'Posisi Tenan': formData.selectedSpot,
      'Tanggal': formData.selectedDates.join(', '),
      'Durasi': formData.duration,
      'Tambahan Kebutuhan': formData.additionalNeeds || '',
      'Total Pembayaran': formData.totalPayment,
      'Metode Pembayaran': formData.paymentMethod || 'Transfer Bank',
      
      // Timestamp
      'Tanggal Pendaftaran': new Date().toLocaleString('id-ID'),
      'Status': 'Pending'
    };

    // Submit to Google Sheets
    const result = await submitToGoogleSheets(sheetData, 'tenants');

    if (result.success) {
      return NextResponse.json(
        { message: 'Data berhasil dikirim' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Gagal mengirim data ke Google Sheets' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing tenant registration:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}