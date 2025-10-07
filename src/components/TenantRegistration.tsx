'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  TenantFormData, 
  sampleTenantFormData, 
  purposeOptions,
  productTypeOptions,
  dateOptions,
  durationOptions,
  paymentInfo,
  packageInclusions
} from '@/data/mockData';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';
import FileUpload from '@/components/ui/FileUpload';
import PhoneInput from '@/components/ui/PhoneInput';
import LayoutMap from './LayoutMap';
import { spots } from './LayoutMap';
import { useBookingData } from '@/hooks/useBookingData';

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
  const [selectedPaymentFile, setSelectedPaymentFile] = useState<File | null>(null);
  const [uploadedPaymentUrl, setUploadedPaymentUrl] = useState<string | null>(null);
  const [paymentPreviewUrl, setPaymentPreviewUrl] = useState<string | null>(null);
  const [isUploadingPayment, setIsUploadingPayment] = useState(false);
  const { isDurationBookedForSpot, isLoading: isLoadingBookings, refresh: refreshBookings } = useBookingData();

  // Cleanup blob URL when component unmounts (like wisuda)
  useEffect(() => {
    return () => {
      if (paymentPreviewUrl) {
        URL.revokeObjectURL(paymentPreviewUrl);
      }
    };
  }, [paymentPreviewUrl]);

  // Cleanup all states on component unmount
  useEffect(() => {
    return () => {
      setSelectedPaymentFile(null);
      setUploadedPaymentUrl(null);
      setPaymentPreviewUrl(null);
      setIsUploadingPayment(false);
      setSubmitError('');
      setSubmitSuccess(false);
    };
  }, []);

  // Create preview when upload is successful (like wisuda)
  useEffect(() => {
    if (uploadedPaymentUrl && selectedPaymentFile && !paymentPreviewUrl) {
      const blobUrl = URL.createObjectURL(selectedPaymentFile);
      setPaymentPreviewUrl(blobUrl);
    }
  }, [uploadedPaymentUrl, selectedPaymentFile, paymentPreviewUrl]);

  const handleFieldChange = (name: string, value: string | number | boolean) => {
    // Prevent setting disabled value
    if (value === 'disabled') return;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Clear duration when spot selection changes to avoid invalid combinations
      if (name === 'selectedSpot') {
        newData.duration = '';
        // Also clear duration error if it exists
        if (errors.duration) {
          setErrors(prev => ({
            ...prev,
            duration: ''
          }));
        }
        // Clear selectedDates when spot changes
        newData.selectedDates = [];
      }
      
      // Set selectedDates based on duration selection
      if (name === 'duration') {
        const selectedSpot = spots.find(spot => spot.id === prev.selectedSpot);
        if (selectedSpot) {
          let availableOptions = [];
          if (selectedSpot.size === 'Trunk-Package') {
            availableOptions = durationOptions.TrunkPackage;
          } else {
            availableOptions = durationOptions.PopupMarketPage;
          }
          
          const selectedDuration = availableOptions.find(opt => opt.value === value);
          if (selectedDuration && selectedDuration.date) {
            newData.selectedDates = selectedDuration.date;
          }
        }
      }
      
      return newData;
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Effect to clear duration if it becomes unavailable due to booking
  useEffect(() => {
    if (formData.selectedSpot && formData.duration && !isLoadingBookings) {
      const isCurrentlyBooked = isDurationBookedForSpot(formData.selectedSpot, formData.duration);
      if (isCurrentlyBooked) {
        setFormData(prev => ({
          ...prev,
          duration: ''
        }));
        // Clear duration error if it exists
        if (errors.duration) {
          setErrors(prev => ({
            ...prev,
            duration: ''
          }));
        }
      }
    }
  }, [formData.selectedSpot, formData.duration, isLoadingBookings, isDurationBookedForSpot]);


  const handlePaymentUploadSuccess = (fileUrl: string, fileName: string) => {
    setUploadedPaymentUrl(fileUrl);
    setFormData(prev => ({
      ...prev,
      paymentProofUrl: fileUrl,
      paymentProofFileName: fileName
    }));
    
    // Create preview from local file for smooth display (like wisuda)
    if (selectedPaymentFile && !paymentPreviewUrl) {
      const blobUrl = URL.createObjectURL(selectedPaymentFile);
      setPaymentPreviewUrl(blobUrl);
    }
  };

  const handlePaymentUploadError = (error: string) => {
    setSubmitError(error);
  };

  const handlePaymentFileSelect = (file: File) => {
    setSelectedPaymentFile(file);
  };

  const handleRemovePaymentFile = () => {
    setSelectedPaymentFile(null);
    setUploadedPaymentUrl(null);
    setFormData(prev => ({
      ...prev,
      paymentProofUrl: '',
      paymentProofFileName: ''
    }));
    // Clean up blob URL properly
    if (paymentPreviewUrl) {
      URL.revokeObjectURL(paymentPreviewUrl);
      setPaymentPreviewUrl(null);
    }
  };

  const calculateAdditionalCosts = () => {
    const chairCost = (formData.chairCount || 0) * 10000;
    const tableCost = (formData.tableCount || 0) * 25000;
    return chairCost + tableCost;
  };

  const calculateTotalPayment = () => {
    if (!formData.selectedSpot || !formData.duration) return 0;
    
    const selectedSpot = spots.find(spot => spot.id === formData.selectedSpot);
    if (!selectedSpot) return 0;

    let basePrice = 0;
    
    // Handle TrunkPackage pricing
    if (selectedSpot.size === 'Trunk-Package') {
      switch (formData.duration) {
        case 'twoDay':
          basePrice = selectedSpot.price.twoDay;
          break;
        case 'oneDay':
          basePrice = selectedSpot.price.oneDay;
          break;
      }
    } else {
      // Handle regular PopupMarketPage pricing
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
    }

    // Add additional costs
    return basePrice + calculateAdditionalCosts();
  };

  const getSelectedSpotInfo = () => {
    
    const spot = spots.find(spot => spot.id === formData.selectedSpot);
    if (!spot) return null;
    
    // Convert to format expected by summary
    return {
      name: `${spot.area} - Spot ${spot.number}`,
      size: spot.size,
      area: spot.area
    };
  };

  const getDurationOptions = () => {
    if (!formData.selectedSpot) {
      return [{ value: 'disabled', label: 'Pilih spot terlebih dahulu' }];
    }
    
    const selectedSpot = spots.find(spot => spot.id === formData.selectedSpot);
    if (!selectedSpot) return [{ value: 'disabled', label: 'Spot tidak ditemukan' }];
    
    let availableOptions = [];
    
    if (selectedSpot.size === 'Trunk-Package') {
      availableOptions = durationOptions.TrunkPackage;
    } else {
      availableOptions = durationOptions.PopupMarketPage;
    }
    
    // Always filter out options where duration is already booked, regardless of loading state
    // This ensures immediate filtering without waiting for loading to complete
    return availableOptions.filter(option => {
      // Check if this specific duration is already booked for this spot
      return !isDurationBookedForSpot(formData.selectedSpot, option.value);
    });
  };

  const getDurationLabel = () => {
    const options = getDurationOptions();
    const duration = options.find(opt => opt.value === formData.duration);
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
    if (!formData.duration || formData.duration === 'disabled') {
      newErrors.duration = 'Durasi harus dipilih';
    } else if (formData.selectedSpot && isDurationBookedForSpot(formData.selectedSpot, formData.duration)) {
      newErrors.duration = 'Durasi yang dipilih sudah dibooking, silakan pilih durasi lain';
    }
    // if (!formData.paymentProofUrl.trim()) {
    //   newErrors.paymentProof = 'Bukti pembayaran harus diupload';
    // }

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
      
      // Ensure selectedDates has correct values based on spot type and duration
      const getCorrectDates = () => {
        if (formData.selectedDates.length > 0) {
          return formData.selectedDates;
        }
        
        // Get selected spot info
        const selectedSpot = spots.find(spot => spot.id === formData.selectedSpot);
        if (!selectedSpot) {
          return ['24 Oktober', '25 Oktober', '26 Oktober']; // Fallback
        }
        
        // For Trunk Package, only 24 and 26 Oktober are available
        if (selectedSpot.size === 'Trunk-Package') {
          return ['24 Oktober', '26 Oktober'];
        }
        
        // For regular spots, return all dates
        return ['24 Oktober', '25 Oktober', '26 Oktober'];
      };

      const formDataWithDefaults = {
        ...formData,
        selectedDates: getCorrectDates(),
        totalPayment
      };

      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithDefaults),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData(sampleTenantFormData);
        // Refresh booking data after successful submission
        await refreshBookings();
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
      <>
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
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Pendaftaran Berhasil!</h2>
                <p className="text-muted-foreground">
                  Terima kasih telah mendaftar sebagai tenan. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi dan detail pembayaran.
                </p>
              </div>
              
              {/* <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Informasi Pembayaran:</h3>
                <p className="text-sm">
                  <strong>Bank:</strong> {paymentInfo.bank}<br/>
                  <strong>No. Rekening:</strong> {paymentInfo.accountNumber}<br/>
                  <strong>Atas Nama:</strong> {paymentInfo.accountName}
                </p>
              </div> */}

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
      <Footer />
      </>
    );
  }

  return (
      <>
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
            <Button variant="destructive" size="sm" type="button" onClick={() => window.history.back()} className="flex items-center gap-2 mb-2">
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <div className="w-[280px]">
                <img
                  src="/images/card-popup.png"
                  alt="Pop Up & Trunk"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Bagian 1: DATA KLIEN */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">1</span>
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
                  <PhoneInput
                    label="Nomor WhatsApp"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(value) => handleFieldChange('whatsappNumber', value)}
                    required
                    error={errors.whatsappNumber}
                    placeholder="Contoh: 08123456789"
                  />
                </div>
              </div>

              {/* Bagian 2: DETAIL POP UP MARKET */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center mr-3">
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

                {/* Date selection is handled automatically based on duration selection */}

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
                    selectOptions={getDurationOptions()}
                    disabled={!formData.selectedSpot}
                  />
                  {isLoadingBookings && formData.selectedSpot && (
                    <p className="text-sm text-blue-600 mt-2">
                      🔄 Memuat data booking... Durasi yang sudah dibooking akan otomatis tersembunyi
                    </p>
                  )}
                  {!isLoadingBookings && formData.selectedSpot && formData.duration && isDurationBookedForSpot(formData.selectedSpot, formData.duration) && (
                    <p className="text-sm text-orange-600 mt-2">
                      ⚠️ Durasi yang dipilih sudah dibooking, silakan pilih durasi lain
                    </p>
                  )}
                  {!isLoadingBookings && !formData.selectedSpot && (
                    <p className="text-sm text-red-500 mt-2">
                      Silakan pilih posisi tenan terlebih dahulu untuk memilih durasi
                    </p>
                  )}
                  {!isLoadingBookings && formData.selectedSpot && getDurationOptions().length === 0 && (
                    <p className="text-sm text-orange-600 mt-2">
                      Semua durasi untuk spot ini sudah dibooking
                    </p>
                  )}
                  {!isLoadingBookings && formData.selectedSpot && getDurationOptions().length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Durasi yang sudah dibooking tidak akan muncul dalam pilihan
                    </p>
                  )}
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
                      label="Kursi (Rp 25.000/unit)"
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
                      label="Meja (Rp 50.000/unit)"
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
                            <span>Kursi ({formData.chairCount} x Rp 25.000)</span>
                            <span>Rp {(formData.chairCount * 25000).toLocaleString()}</span>
                          </div>
                        )}
                        {formData.tableCount > 0 && (
                          <div className="flex justify-between">
                            <span>Meja ({formData.tableCount} x Rp 50.000)</span>
                            <span>Rp {(formData.tableCount * 50000).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium pt-2 border-t border-border mt-2">
                          <span>Total Biaya Tambahan</span>
                          <span>Rp {((formData.chairCount * 25000) + (formData.tableCount * 50000)).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Payment Information and Proof */}
              {/* <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">INFORMASI PEMBAYARAN</h3>
                </div>
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Transfer ke:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">Bank:</span>
                      <span className="text-blue-700">{paymentInfo.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">No. Rekening:</span>
                      <span className="text-blue-700 font-mono">{paymentInfo.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">Atas Nama:</span>
                      <span className="text-blue-700">{paymentInfo.accountName}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Catatan:</strong> Silakan transfer sesuai dengan total pembayaran yang tertera di ringkasan pesanan, kemudian upload bukti transfer di bawah ini.
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="paymentProof">Bukti Pembayaran *</Label>
                  <div className="mt-2">
                    <FileUpload
                      onUploadSuccess={handlePaymentUploadSuccess}
                      onUploadError={handlePaymentUploadError}
                      disabled={isUploadingPayment}
                      onFileSelect={handlePaymentFileSelect}
                      selectedFile={selectedPaymentFile}
                      uploadedFileUrl={uploadedPaymentUrl}
                      previewUrl={paymentPreviewUrl}
                      isUploading={isUploadingPayment}
                      onRemoveFile={handleRemovePaymentFile}
                    />
                  </div>
                  {errors.paymentProof && (
                    <p className="text-sm text-destructive mt-2">{errors.paymentProof}</p>
                  )}
                </div>
              </div> */}

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
      <Footer />
      </>
  );
}
