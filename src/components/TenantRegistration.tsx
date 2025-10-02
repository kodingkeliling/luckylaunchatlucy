'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  TenantFormData, 
  sampleTenantFormData, 
  tenantSpots, 
  trunkPackages,
  purposeOptions,
  productTypeOptions,
  dateOptions,
  packageTypeOptions,
  durationOptions,
  paymentInfo,
  packageInclusions
} from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import LayoutMap from './LayoutMap';

interface ValidationErrors {
  [key: string]: string;
}

export default function TenantRegistration() {
  const [formData, setFormData] = useState<TenantFormData>(sampleTenantFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [isMobileSummaryExpanded, setIsMobileSummaryExpanded] = useState(false);

  const handleFieldChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleDateSelection = (date: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedDates: checked 
        ? [...prev.selectedDates, date]
        : prev.selectedDates.filter(d => d !== date)
    }));
  };

  const calculateAdditionalCosts = () => {
    const chairCost = (formData.chairCount || 0) * 10000;
    const tableCost = (formData.tableCount || 0) * 25000;
    return chairCost + tableCost;
  };

  const calculateTotalPayment = () => {
    if (!formData.selectedSpot || !formData.duration) return 0;
    
    // Import spots data from LayoutMap
    const spots = [
      // PARKING AREA - berdasarkan gambar
      { id: 'spot-1', number: 1, x: 30, y: 62, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-2', number: 2, x: 30, y: 57, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      
      // TRUNK AREA & SEATING AREA
      { id: 'spot-4', number: 4, x: 60.5, y: 58.5, size: '2x2m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      
      // HALLWAY & TOILET AREA
      { id: 'spot-3', number: 3, x: 59.3, y: 62.5, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-5', number: 5, x: 58.2, y: 50.4, size: '2x2m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-6', number: 6, x: 60.4, y: 50.4, size: '2x2m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-7', number: 7, x: 62.6, y: 50.4, size: '2x2m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      
      // EXTRA BAR AREA (atas)
      { id: 'spot-8', number: 8, x: 58, y: 43.5, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-9', number: 9, x: 61.2, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-10', number: 10, x: 64.7, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-11', number: 11, x: 67.9, y: 42.4, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      
      // BAR AREA
      { id: 'spot-12', number: 12, x: 70.4, y: 52, size: '1x1m', area: 'Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-13', number: 13, x: 79.8, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
      { id: 'spot-14', number: 14, x: 82.6, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
      { id: 'spot-15', number: 15, x: 85.4, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
      { id: 'spot-16', number: 16, x: 90.8, y: 52.9, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 250000, twoDay: 200000, oneDay: 150000 } },
      
      // AREA BELAKANG (bawah)
      { id: 'spot-17', number: 17, x: 79.4, y: 62.7, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-18', number: 18, x: 83.4, y: 62.7, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
    ];
    
    const selectedSpot = spots.find(spot => spot.id === formData.selectedSpot);
    if (!selectedSpot) return 0;

    let basePrice = 0;
    switch (formData.duration) {
      case 'threeDayFull':
        basePrice = selectedSpot.price.threeDay;
        break;
      case 'threeDayPartial':
        basePrice = selectedSpot.price.twoDay;
        break;
      case 'oneDay':
        basePrice = selectedSpot.price.oneDay;
        break;
    }

    // Add additional costs
    return basePrice + calculateAdditionalCosts();
  };

  const getSelectedSpotInfo = () => {
    const spots = [
      // PARKING AREA - berdasarkan gambar
      { id: 'spot-1', number: 1, x: 30, y: 62, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-2', number: 2, x: 30, y: 57, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      
      // TRUNK AREA & SEATING AREA
      { id: 'spot-4', number: 4, x: 60.5, y: 58.5, size: '2x2m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      
      // HALLWAY & TOILET AREA
      { id: 'spot-3', number: 3, x: 59.3, y: 62.5, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-5', number: 5, x: 58.2, y: 50.4, size: '2x2m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-6', number: 6, x: 60.4, y: 50.4, size: '2x2m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-7', number: 7, x: 62.6, y: 50.4, size: '2x2m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      
      // EXTRA BAR AREA (atas)
      { id: 'spot-8', number: 8, x: 58, y: 43.5, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-9', number: 9, x: 61.2, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-10', number: 10, x: 64.7, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-11', number: 11, x: 67.9, y: 42.4, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      
      // BAR AREA
      { id: 'spot-12', number: 12, x: 70.4, y: 52, size: '1x1m', area: 'Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
      { id: 'spot-13', number: 13, x: 79.8, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
      { id: 'spot-14', number: 14, x: 82.6, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
      { id: 'spot-15', number: 15, x: 85.4, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
      { id: 'spot-16', number: 16, x: 90.8, y: 52.9, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 250000, twoDay: 200000, oneDay: 150000 } },
      
      // AREA BELAKANG (bawah)
      { id: 'spot-17', number: 17, x: 79.4, y: 62.7, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
      { id: 'spot-18', number: 18, x: 83.4, y: 62.7, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
    ];
    
    const spot = spots.find(spot => spot.id === formData.selectedSpot);
    if (!spot) return null;
    
    // Convert to format expected by summary
    return {
      name: `${spot.area} - Spot ${spot.number}`,
      size: spot.size,
      area: spot.area
    };
  };

  const getDurationLabel = () => {
    const duration = durationOptions.find(opt => opt.value === formData.duration);
    return duration ? duration.label : '';
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Bagian 1: DATA KLIEN
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Nama Perusahaan/Brand harus diisi';
    }
    if (!formData.picName.trim()) {
      newErrors.picName = 'Nama PIC/Penanggung Jawab harus diisi';
    }
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Nomor WhatsApp harus diisi';
    } else if (!/^[0-9]+$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Nomor WhatsApp hanya boleh berisi angka';
    }

    // Bagian 2: DETAIL POP UP MARKET
    if (!formData.purpose) {
      newErrors.purpose = 'Tujuan Pemesan harus dipilih';
    }
    if (!formData.productType) {
      newErrors.productType = 'Jenis Product harus dipilih';
    }
    if (!formData.productDetail.trim()) {
      newErrors.productDetail = 'Detail Produk harus diisi';
    }
    if (!formData.selectedSpot) {
      newErrors.selectedSpot = 'Posisi Tenan harus dipilih';
    }
    if (formData.selectedDates.length === 0) {
      newErrors.selectedDates = 'Minimal pilih satu tanggal';
    }
    if (!formData.duration) {
      newErrors.duration = 'Durasi harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const totalPayment = calculateTotalPayment();
      const formDataWithTotal = {
        ...formData,
        totalPayment
      };

      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithTotal),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData(sampleTenantFormData);
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || 'Terjadi kesalahan saat mengirim data');
      }
    } catch (error) {
      setSubmitError('Terjadi kesalahan saat mengirim data');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <section className="min-h-screen bg-[#f5f5f5] relative overflow-hidden">
        {/* Grid Texture Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, transparent 58px, rgba(0, 0, 0, 0.05) 58px, rgba(0, 0, 0, 0.05) 62px, transparent 62px),
            linear-gradient(to bottom, transparent 58px, rgba(0, 0, 0, 0.05) 58px, rgba(0, 0, 0, 0.05) 62px, transparent 62px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        
        <div className="container mx-au to md:px-4 py-16 relative z-10">
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-xl">
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Pendaftaran Berhasil!</h2>
                <p className="text-muted-foreground">
                  Terima kasih telah mendaftar sebagai tenan. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi dan detail pembayaran.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Informasi Pembayaran:</h3>
                <p className="text-sm">
                  <strong>Bank:</strong> {paymentInfo.bank}<br/>
                  <strong>No. Rekening:</strong> {paymentInfo.accountNumber}<br/>
                  <strong>Atas Nama:</strong> {paymentInfo.accountName}
                </p>
              </div>

              <Button 
                onClick={() => setSubmitSuccess(false)}
                className="w-full"
              >
                Daftar Lagi
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
      <section className="min-h-screen relative bg-[#f5f5f5]">
        {/* Grid Texture Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, transparent 58px, rgba(0, 0, 0, 0.05) 58px, rgba(0, 0, 0, 0.05) 62px, transparent 62px),
            linear-gradient(to bottom, transparent 58px, rgba(0, 0, 0, 0.05) 58px, rgba(0, 0, 0, 0.05) 62px, transparent 62px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      
        {/* Form Section */}
        <div className="md:container px-1 mx-auto md:px-4 py-16 pb-32 lg:pb-16 z-10 flex flex-col lg:flex-row gap-4">
            {/* Main Form */}
            <div className="flex-1">
              <Card className="max-w-7xl shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-xl">
                <CardContent>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                REGISTRASI TENAN
              </h1>
              <p className="text-muted-foreground">Lucky Launch at Lucy</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Bagian 1: DATA KLIEN */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-foreground font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">DATA KLIEN</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Nama Perusahaan/Brand"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(value) => handleFieldChange('companyName', value)}
                    required
                    error={errors.companyName}
                  />
                  
                  <FormField
                    label="Nama PIC / Penanggung Jawab"
                    name="picName"
                    type="text"
                    value={formData.picName}
                    onChange={(value) => handleFieldChange('picName', value)}
                    required
                    error={errors.picName}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    label="Nomor WhatsApp"
                    name="whatsappNumber"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(value) => handleFieldChange('whatsappNumber', value)}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*"
                    }}
                    required
                    error={errors.whatsappNumber}
                  />
                </div>
              </div>

              {/* Bagian 2: DETAIL POP UP MARKET */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">DETAIL POP UP MARKET</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    label="Tujuan Pemesan"
                    name="purpose"
                    type="select"
                    value={formData.purpose}
                    onChange={(value) => handleFieldChange('purpose', value)}
                    placeholder="Pilih Tujuan"
                    required
                    error={errors.purpose}
                    selectOptions={purposeOptions}
                  />

                  <FormField
                    label="Jenis Product"
                    name="productType"
                    type="select"
                    value={formData.productType}
                    onChange={(value) => handleFieldChange('productType', value)}
                    placeholder="Pilih Jenis Product"
                    required
                    error={errors.productType}
                    selectOptions={productTypeOptions}
                  />
                </div>

                <div className="mb-6">
                  <FormField
                    label="Detail Produk"
                    name="productDetail"
                    type="text"
                    value={formData.productDetail}
                    onChange={(value) => handleFieldChange('productDetail', value)}
                    placeholder="Contoh: Kopi, Makanan Tradisional, Merchandise, dll"
                    required
                    error={errors.productDetail}
                  />
                </div>

                {/* Posisi Tenan */}
                <div className="mb-6">
                  <Label htmlFor="selectedSpot">Posisi Tenan *</Label>
                  
                  {/* Layout Map */}
                  <div className="mt-4 mb-6">
                    <LayoutMap 
                      selectedSpot={formData.selectedSpot}
                      onSpotSelect={(spotId) => handleFieldChange('selectedSpot', spotId)}
                    />
                  </div>
                  {errors.selectedSpot && (
                    <p className="text-sm text-destructive mt-2">{errors.selectedSpot}</p>
                  )}
                </div>

                {/* Temporarily hide date selection until confirmed
                <div className="mb-6">
                  <Label>Tanggal *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {dateOptions.map((date) => (
                      <div key={date.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={date.value}
                          checked={formData.selectedDates.includes(date.value)}
                          onCheckedChange={(checked: boolean) => handleDateSelection(date.value, checked)}
                        />
                        <Label htmlFor={date.value} className="text-sm cursor-pointer">
                          {date.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedDates && (
                    <p className="text-sm text-destructive mt-2">{errors.selectedDates}</p>
                  )}
                </div>
                */}

                {/* Durasi */}
                <div className="mb-6">
                  <FormField
                    label="Durasi"
                    name="duration"
                    type="select"
                    value={formData.duration}
                    onChange={(value) => handleFieldChange('duration', value)}
                    placeholder="Pilih Durasi"
                    required
                    error={errors.duration}
                    selectOptions={durationOptions}
                  />
                </div>

                {/* Tambahan Kebutuhan */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mr-3">
                      <span className="text-muted-foreground font-bold text-sm">+</span>
                    </div>
                    <h3 className="text-xl font-semibold">TAMBAHAN KEBUTUHAN</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Kursi (Rp 10.000/unit)"
                      name="chairCount"
                      type="number"
                      value={formData.chairCount || 0}
                      onChange={(value) => handleFieldChange('chairCount', Number(value))}
                      min={0}
                      inputProps={{
                        min: 0,
                        placeholder: "0"
                      }}
                    />
                    
                    <FormField
                      label="Meja (Rp 25.000/unit)"
                      name="tableCount"
                      type="number"
                      value={formData.tableCount || 0}
                      onChange={(value) => handleFieldChange('tableCount', Number(value))}
                      min={0}
                      inputProps={{
                        min: 0,
                        placeholder: "0"
                      }}
                    />
                  </div>

                  {(formData.chairCount > 0 || formData.tableCount > 0) && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Biaya Tambahan:</h4>
                      <div className="space-y-1 text-sm">
                        {formData.chairCount > 0 && (
                          <div className="flex justify-between">
                            <span>Kursi ({formData.chairCount} x Rp 10.000)</span>
                            <span>Rp {(formData.chairCount * 10000).toLocaleString()}</span>
                          </div>
                        )}
                        {formData.tableCount > 0 && (
                          <div className="flex justify-between">
                            <span>Meja ({formData.tableCount} x Rp 25.000)</span>
                            <span>Rp {(formData.tableCount * 25000).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium pt-2 border-t border-border mt-2">
                          <span>Total Biaya Tambahan</span>
                          <span>Rp {((formData.chairCount * 10000) + (formData.tableCount * 25000)).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Informasi Paket */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{packageInclusions.title}</h4>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {packageInclusions.items.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{item}</li>
                  ))}
                </ul>
                
                <h5 className="font-semibold mb-2">{packageInclusions.additionalCosts.title}</h5>
                <ul className="list-disc list-inside space-y-1">
                  {packageInclusions.additionalCosts.items.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>

              {submitError && (
                <div className="mb-6">
                  <Alert>
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Mengirim...' : 'Daftar Sekarang'}
                </Button>
              </div>
            </form>
                </CardContent>
              </Card>
            </div>

             {/* Desktop Summary Card */}
             <div className="hidden lg:block w-80">
               <div 
                 className="sticky top-4"
               >
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="bg-secondary text-white rounded-lg">
                    <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {formData.selectedSpot && formData.duration ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground">Spot Terpilih</h4>
                          <p className="font-medium">{getSelectedSpotInfo()?.name}</p>
                          <p className="text-sm text-muted-foreground">{getSelectedSpotInfo()?.size}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground">Durasi</h4>
                          <p className="font-medium">{getDurationLabel()}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground">Tanggal</h4>
                          <div className="space-y-1">
                            {formData.selectedDates.map((date) => {
                              const dateOption = dateOptions.find(opt => opt.value === date);
                              return (
                                <p key={date} className="text-sm">{dateOption?.label}</p>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-sm text-muted-foreground">Biaya Spot</h4>
                              <p className="font-medium">
                                Rp {(calculateTotalPayment() - calculateAdditionalCosts()).toLocaleString()}
                              </p>
                            </div>
                            {(formData.chairCount > 0 || formData.tableCount > 0) && (
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-sm text-muted-foreground">Biaya Tambahan</h4>
                                <p className="font-medium">
                                  Rp {calculateAdditionalCosts().toLocaleString()}
                                </p>
                              </div>
                            )}
                            <div className="flex justify-between items-center pt-2 border-t">
                              <h4 className="font-semibold">Total Pembayaran</h4>
                              <p className="text-xl font-bold text-destructive">
                                Rp {calculateTotalPayment().toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p className="text-sm">Pilih spot dan durasi untuk melihat ringkasan</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
        </div>
      </div>

      {/* Mobile Summary - Sticky Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white border-t shadow-lg">
          <div 
            className="p-4 cursor-pointer"
            onClick={() => setIsMobileSummaryExpanded(!isMobileSummaryExpanded)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Total Pembayaran</h4>
                <p className="text-lg font-bold text-destructive">
                  {formData.selectedSpot && formData.duration 
                    ? `Rp ${calculateTotalPayment().toLocaleString()}`
                    : 'Pilih spot dan durasi'
                  }
                </p>
              </div>
              <div className="flex items-center">
                <svg 
                  className={`w-5 h-5 transition-transform ${isMobileSummaryExpanded ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {isMobileSummaryExpanded && (
            <div className="px-4 pb-4 border-t bg-gray-50">
              {formData.selectedSpot && formData.duration ? (
                <div className="space-y-3 pt-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Spot Terpilih</h4>
                    <p className="font-medium">{getSelectedSpotInfo()?.name}</p>
                    <p className="text-sm text-muted-foreground">{getSelectedSpotInfo()?.size}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Durasi</h4>
                    <p className="font-medium">{getDurationLabel()}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Tanggal</h4>
                    <div className="space-y-1">
                      {formData.selectedDates.map((date) => {
                        const dateOption = dateOptions.find(opt => opt.value === date);
                        return (
                          <p key={date} className="text-sm">{dateOption?.label}</p>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm text-muted-foreground">Biaya Spot</h4>
                        <p className="font-medium">
                          Rp {(calculateTotalPayment() - calculateAdditionalCosts()).toLocaleString()}
                        </p>
                      </div>
                      {(formData.chairCount > 0 || formData.tableCount > 0) && (
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-sm text-muted-foreground">Biaya Tambahan</h4>
                          <p className="font-medium">
                            Rp {calculateAdditionalCosts().toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground pt-4">
                  <p className="text-sm">Pilih spot dan durasi untuk melihat detail</p>
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </section>
  );
}
