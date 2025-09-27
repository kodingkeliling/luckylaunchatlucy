'use client';

import { useState } from 'react';
import { tenantSpots, trunkPackages, FormData, sampleFormData } from '@/data/mockData';
import { validateTenantForm, ValidationErrors } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Label } from '@/components/ui/label';

export default function TenantForm() {
  const [formData, setFormData] = useState<FormData>(sampleFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value?: string; checked?: boolean } }) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    // Filter out non-numeric characters for phone number fields
    if (name === 'phone') {
      const numericValue = (value || '').replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else if (type === 'checkbox' || checked !== undefined) {
      setFormData(prev => ({ ...prev, [name]: checked || false }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value || '' }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Validate form
    const validationErrors = validateTenantForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      console.log('Form submitted successfully:', result);
      setSubmitSuccess(true);
      setFormData(sampleFormData); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedSpot = () => {
    if (formData.packageType === 'trunk') {
      return trunkPackages.find(pkg => pkg.id === formData.spotPreference);
    }
    return tenantSpots.find(spot => spot.id === formData.spotPreference);
  };

  const getPrice = () => {
    const selected = getSelectedSpot();
    if (!selected) return 0;

    if (formData.packageType === 'trunk') {
      const pkg = selected as any;
      return formData.duration === 'twoDay' ? pkg.pricing.twoDay : pkg.pricing.oneDay;
    } else {
      const spot = selected as any;
      return spot.pricing[formData.duration] || 0;
    }
  };

  const packageTypeOptions = [
    { value: 'trunk', label: 'TRUNK PACKAGE' },
    { value: 'popup', label: 'POP UP PACKAGE' }
  ];

  const getDurationOptions = () => {
    if (formData.packageType === 'trunk') {
      return [
        { value: 'twoDay', label: '2 Hari (24,25,26 SEPT)' },
        { value: 'oneDay', label: '1 Hari (26 SEPT)' }
      ];
    } else {
      return [
        { value: 'threeDayFull', label: '3 Hari (24,25,26 SEPT)' },
        { value: 'threeDayPartial', label: '3 Hari (25,26 SEPT)' },
        { value: 'oneDay', label: '1 Hari (26 SEPT)' }
      ];
    }
  };

  const getSpotOptions = () => {
    if (formData.packageType === 'trunk') {
      return trunkPackages.filter(pkg => pkg.availability).map((pkg) => ({
        value: pkg.id,
        label: `${pkg.description} - Available: ${pkg.date}`
      }));
    } else {
      return tenantSpots.filter(spot => spot.availability).map((spot) => ({
        value: spot.id,
        label: `${spot.name} (${spot.size}) - ${spot.location}`
      }));
    }
  };

  return (
    <section id="tenant-registration" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-6 text-3xl font-bold">PENDAFTARAN TENAN</h2>
          <div className="w-24 h-1 bg-destructive mx-auto mb-6"></div>
          <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
            Daftarkan brand Anda untuk berpartisipasi dalam Pop Up Market di Lucky Launch at Lucy.
            Pilih paket dan lokasi tenan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-semibold">Pendaftaran Berhasil!</h3>
              <p className="mb-6">
                Terima kasih telah mendaftar sebagai tenan di Lucky Launch at Lucy.
                Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk konfirmasi dan informasi pembayaran.
              </p>
              <Button 
                variant="secondary"
                onClick={() => setSubmitSuccess(false)}
              >
                Daftar Lagi
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nama Brand/Usaha *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={errors.businessName ? "border-destructive" : ""}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-destructive">{errors.businessName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="productType">Jenis Produk *</Label>
                  <Input
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    placeholder="Contoh: Makanan, Minuman, Fashion, Aksesoris, dll."
                    className={errors.productType ? "border-destructive" : ""}
                  />
                  {errors.productType && (
                    <p className="text-sm text-destructive">{errors.productType}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="packageType">Tipe Paket *</Label>
                  <Select value={formData.packageType} onValueChange={(value: string) => handleChange({ target: { name: 'packageType', value } })}>
                    <SelectTrigger className={errors.packageType ? "border-destructive" : ""}>
                      <SelectValue placeholder="Pilih Tipe Paket" />
                    </SelectTrigger>
                    <SelectContent>
                      {packageTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.packageType && (
                    <p className="text-sm text-destructive">{errors.packageType}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Durasi *</Label>
                  <Select value={formData.duration} onValueChange={(value: string) => handleChange({ target: { name: 'duration', value } })}>
                    <SelectTrigger className={errors.duration ? "border-destructive" : ""}>
                      <SelectValue placeholder="Pilih Durasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {getDurationOptions().map((option) => (
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
              
              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="spotPreference">Preferensi Lokasi Tenan *</Label>
                  <Select value={formData.spotPreference} onValueChange={(value: string) => handleChange({ target: { name: 'spotPreference', value } })}>
                    <SelectTrigger className={errors.spotPreference ? "border-destructive" : ""}>
                      <SelectValue placeholder="Pilih Lokasi Tenan" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSpotOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.spotPreference && (
                    <p className="text-sm text-destructive">{errors.spotPreference}</p>
                  )}
                </div>
              </div>

              {formData.spotPreference && formData.duration && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                  <h4 className="mb-2 text-lg font-semibold">Ringkasan Pesanan:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Paket:</strong> {formData.packageType === 'trunk' ? 'TRUNK PACKAGE' : 'POP UP PACKAGE'}</p>
                      <p><strong>Lokasi:</strong> {getSelectedSpot()?.name}</p>
                      <p><strong>Durasi:</strong> {
                        formData.duration === 'threeDayFull' ? '3 Hari (24,25,26 SEPT)' :
                        formData.duration === 'threeDayPartial' ? '3 Hari (25,26 SEPT)' :
                        formData.duration === 'twoDay' ? '2 Hari (24,25,26 SEPT)' :
                        '1 Hari (26 SEPT)'
                      }</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent number-font">
                        Rp {getPrice().toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="additionalRequirements">Kebutuhan Tambahan</Label>
                  <Textarea
                    id="additionalRequirements"
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Kebutuhan khusus atau informasi tambahan yang perlu kami ketahui"
                  />
                </div>
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
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? 'Mengirim...' : 'Daftar Sekarang'}
                </Button>
              </div>
            </form>
          )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}