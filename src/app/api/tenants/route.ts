import { NextRequest, NextResponse } from 'next/server';
import { submitTenantForm } from '@/lib/googleScript';

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      'Tanggal': (() => {
        // For Trunk Package, filter out 25 Oktober if it exists
        if (formData.selectedSpot && formData.selectedSpot.includes('spot-19') || 
            formData.selectedSpot.includes('spot-20') || 
            formData.selectedSpot.includes('spot-21') || 
            formData.selectedSpot.includes('spot-22') || 
            formData.selectedSpot.includes('spot-23')) {
          // Trunk Package spots - only 24 and 26 Oktober
          return formData.selectedDates.filter((date: string) => date !== '25 Oktober').join(', ');
        }
        return formData.selectedDates.join(', ');
      })(),
      'Durasi': formData.duration,
      
      // Tambahan Kebutuhan - format: "Kursi: X, Meja: Y"
      'Tambahan Kebutuhan': (() => {
        const additions = [];
        if (formData.chairCount > 0) {
          additions.push(`Kursi: ${formData.chairCount} (Rp ${(formData.chairCount * 10000).toLocaleString()})`);
        }
        if (formData.tableCount > 0) {
          additions.push(`Meja: ${formData.tableCount} (Rp ${(formData.tableCount * 25000).toLocaleString()})`);
        }
        return additions.length > 0 ? additions.join(', ') : 'Tidak ada';
      })(),
      
      'Total Pembayaran': formData.totalPayment,
      'Metode Pembayaran': formData.paymentMethod || 'Transfer Bank',
      
      // Timestamp
      'Tanggal Pendaftaran': new Date().toLocaleString('id-ID'),
      'Status': 'Pending',
      
      // Bukti Pembayaran
      'Bukti Pembayaran URL': formData.paymentProofUrl || '',
    };

    // Submit to Google Sheets
    const result = await submitTenantForm(sheetData);

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