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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | string[] | boolean } }) => {
    const { name, value } = e.target;
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

  const calculateTotalPayment = () => {
    if (!formData.selectedSpot || !formData.duration) return 0;
    
    const selectedSpot = tenantSpots.find(spot => spot.id === formData.selectedSpot);
    if (!selectedSpot) return 0;

    switch (formData.duration) {
      case 'threeDayFull':
        return selectedSpot.pricing.threeDayFull;
      case 'threeDayPartial':
        return selectedSpot.pricing.threeDayPartial;
      case 'oneDay':
        return selectedSpot.pricing.oneDay;
      default:
        return 0;
    }
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
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-xl">
            <CardContent className="p-8 text-center">
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
    <section className="min-h-screen bg-[#f5f5f5] relative overflow-hidden">
      {/* Grid Texture Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, transparent 58px, rgba(0, 0, 0, 0.05) 58px, rgba(0, 0, 0, 0.05) 62px, transparent 62px),
          linear-gradient(to bottom, transparent 58px, rgba(0, 0, 0, 0.05) 58px, rgba(0, 0, 0, 0.05) 62px, transparent 62px)
        `,
        backgroundSize: '60px 60px'
      }}></div>
      
      {/* Form Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-xl">
          <CardContent className="p-8">
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
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nama Perusahaan/Brand *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={errors.companyName ? "border-destructive" : ""}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive">{errors.companyName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="picName">Nama PIC / Penanggung Jawab *</Label>
                    <Input
                      id="picName"
                      name="picName"
                      value={formData.picName}
                      onChange={handleChange}
                      className={errors.picName ? "border-destructive" : ""}
                    />
                    {errors.picName && (
                      <p className="text-sm text-destructive">{errors.picName}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">Nomor WhatsApp *</Label>
                    <Input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className={errors.whatsappNumber ? "border-destructive" : ""}
                    />
                    {errors.whatsappNumber && (
                      <p className="text-sm text-destructive">{errors.whatsappNumber}</p>
                    )}
                  </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Tujuan Pemesan *</Label>
                    <Select value={formData.purpose} onValueChange={(value: string) => handleChange({ target: { name: 'purpose', value } })}>
                      <SelectTrigger className={errors.purpose ? "border-destructive" : ""}>
                        <SelectValue placeholder="Pilih Tujuan" />
                      </SelectTrigger>
                      <SelectContent>
                        {purposeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.purpose && (
                      <p className="text-sm text-destructive">{errors.purpose}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productType">Jenis Product *</Label>
                    <Select value={formData.productType} onValueChange={(value: string) => handleChange({ target: { name: 'productType', value } })}>
                      <SelectTrigger className={errors.productType ? "border-destructive" : ""}>
                        <SelectValue placeholder="Pilih Jenis Product" />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.productType && (
                      <p className="text-sm text-destructive">{errors.productType}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="productDetail">Detail Produk *</Label>
                    <Input
                      id="productDetail"
                      name="productDetail"
                      value={formData.productDetail}
                      onChange={handleChange}
                      placeholder="Contoh: Kopi, Makanan Tradisional, Merchandise, dll"
                      className={errors.productDetail ? "border-destructive" : ""}
                    />
                    {errors.productDetail && (
                      <p className="text-sm text-destructive">{errors.productDetail}</p>
                    )}
                  </div>
                </div>

                {/* Posisi Tenan */}
                <div className="mb-6">
                  <Label htmlFor="selectedSpot">Posisi Tenan *</Label>
                  
                  {/* Layout Map */}
                  <div className="mt-4 mb-6">
                    <LayoutMap />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {tenantSpots.map((spot) => (
                      <div key={spot.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-center space-x-2 mb-2">
                          <input
                            type="radio"
                            id={spot.id}
                            name="selectedSpot"
                            value={spot.id}
                            checked={formData.selectedSpot === spot.id}
                            onChange={handleChange}
                            className="text-primary"
                          />
                          <Label htmlFor={spot.id} className="font-medium cursor-pointer">
                            {spot.name}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{spot.description}</p>
                        <p className="text-sm font-medium">Ukuran: {spot.size}</p>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>3 Hari: Rp {spot.pricing.threeDayFull.toLocaleString()}</p>
                          <p>2 Hari: Rp {spot.pricing.threeDayPartial.toLocaleString()}</p>
                          <p>1 Hari: Rp {spot.pricing.oneDay.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.selectedSpot && (
                    <p className="text-sm text-destructive mt-2">{errors.selectedSpot}</p>
                  )}
                </div>

                {/* Tanggal */}
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

                {/* Durasi */}
                <div className="mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durasi *</Label>
                    <Select value={formData.duration} onValueChange={(value: string) => handleChange({ target: { name: 'duration', value } })}>
                      <SelectTrigger className={errors.duration ? "border-destructive" : ""}>
                        <SelectValue placeholder="Pilih Durasi" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.duration && (
                      <p className="text-sm text-destructive">{errors.duration}</p>
                    )}
                  </div>
                </div>

                {/* Tambahan Kebutuhan */}
                <div className="mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="additionalNeeds">Tambahan Kebutuhan</Label>
                    <Textarea
                      id="additionalNeeds"
                      name="additionalNeeds"
                      value={formData.additionalNeeds}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Jelaskan kebutuhan tambahan seperti meja, kursi, atau fasilitas lainnya"
                    />
                  </div>
                </div>

                {/* Total Pembayaran */}
                {formData.selectedSpot && formData.duration && (
                  <div className="mb-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Total Pembayaran:</h4>
                      <p className="text-2xl font-bold text-primary">
                        Rp {calculateTotalPayment().toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
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
    </section>
  );
}
