'use client';

import { useState } from 'react';
import { tenantSpots, trunkPackages, FormData, sampleFormData } from '@/data/mockData';
import { validateTenantForm, ValidationErrors } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { FormField } from '@/components/ui/form-field';

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

  console.log(formData);

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
          <CardContent>
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
                <FormField
                  label="Nama Lengkap"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(value) => handleChange({ target: { name: 'fullName', value: value as string } })}
                  required
                  error={errors.fullName}
                />
                
                <FormField
                  label="Nama Brand/Usaha"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(value) => handleChange({ target: { name: 'businessName', value: value as string } })}
                  required
                  error={errors.businessName}
                />
                
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleChange({ target: { name: 'email', value: value as string } })}
                  required
                  error={errors.email}
                />
                
                <FormField
                  label="Nomor Telepon"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(value) => handleChange({ target: { name: 'phone', value: value as string } })}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*"
                  }}
                  required
                  error={errors.phone}
                />
              </div>
              
              <div className="mb-6">
                <FormField
                  label="Jenis Produk"
                  name="productType"
                  type="text"
                  value={formData.productType}
                  onChange={(value) => handleChange({ target: { name: 'productType', value: value as string } })}
                  placeholder="Contoh: Makanan, Minuman, Fashion, Aksesoris, dll."
                  required
                  error={errors.productType}
                />
              </div>

              <div className="mb-6">
                <FormField
                  label="Tipe Paket"
                  name="packageType"
                  type="select"
                  value={formData.packageType}
                  onChange={(value) => handleChange({ target: { name: 'packageType', value: value as string } })}
                  selectOptions={packageTypeOptions}
                  placeholder="Pilih Tipe Paket"
                  required
                  error={errors.packageType}
                />
              </div>

              <div className="mb-6">
                <FormField
                  label="Durasi"
                  name="duration"
                  type="select"
                  value={formData.duration}
                  onChange={(value) => handleChange({ target: { name: 'duration', value: value as string } })}
                  selectOptions={getDurationOptions()}
                  placeholder="Pilih Durasi"
                  required
                  error={errors.duration}
                />
              </div>
              
              <div className="mb-6">
                <FormField
                  label="Preferensi Lokasi Tenan"
                  name="spotPreference"
                  type="select"
                  value={formData.spotPreference}
                  onChange={(value) => handleChange({ target: { name: 'spotPreference', value: value as string } })}
                  selectOptions={getSpotOptions()}
                  placeholder="Pilih Lokasi Tenan"
                  required
                  error={errors.spotPreference}
                />
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
                <FormField
                  label="Kebutuhan Tambahan"
                  name="additionalRequirements"
                  type="textarea"
                  value={formData.additionalRequirements}
                  onChange={(value) => handleChange({ target: { name: 'additionalRequirements', value: value as string } })}
                  placeholder="Kebutuhan khusus atau informasi tambahan yang perlu kami ketahui"
                  rows={4}
                />
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