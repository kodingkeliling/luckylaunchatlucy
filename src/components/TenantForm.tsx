'use client';

import { useState } from 'react';
import { tenantSpots, trunkPackages, FormData, sampleFormData } from '@/data/mockData';
import { validateTenantForm, ValidationErrors } from '@/lib/validation';
import Container from './ui/Container';
import Heading from './ui/Heading';
import Input from './ui/Input';
import PhoneInput from './ui/PhoneInput';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Alert from './ui/Alert';

export default function TenantForm() {
  const [formData, setFormData] = useState<FormData>(sampleFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <section id="tenant-registration" className="py-20 bg-light">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="mb-6">PENDAFTARAN TENAN</Heading>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Daftarkan brand Anda untuk berpartisipasi dalam Pop Up Market di Lucky Launch at Lucy.
            Pilih paket dan lokasi tenan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <Heading level={3} className="mb-4">Pendaftaran Berhasil!</Heading>
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
                <Input
                  label="Nama Lengkap"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  required
                />
                
                <Input
                  label="Nama Brand/Usaha"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  error={errors.businessName}
                  required
                />
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
                
                <PhoneInput
                  label="Nomor Telepon"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
              </div>
              
              <div className="mb-6">
                <Input
                  label="Jenis Produk"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  placeholder="Contoh: Makanan, Minuman, Fashion, Aksesoris, dll."
                  error={errors.productType}
                  required
                />
              </div>

              <div className="mb-6">
                <Select
                  label="Tipe Paket"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  options={packageTypeOptions}
                  placeholder="Pilih Tipe Paket"
                  error={errors.packageType}
                  required
                />
              </div>

              <div className="mb-6">
                <Select
                  label="Durasi"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  options={getDurationOptions()}
                  placeholder="Pilih Durasi"
                  error={errors.duration}
                  required
                />
              </div>
              
              <div className="mb-6">
                <Select
                  label="Preferensi Lokasi Tenan"
                  name="spotPreference"
                  value={formData.spotPreference}
                  onChange={handleChange}
                  options={getSpotOptions()}
                  placeholder="Pilih Lokasi Tenan"
                  error={errors.spotPreference}
                  required
                />
              </div>

              {formData.spotPreference && formData.duration && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                  <Heading level={4} className="mb-2">Ringkasan Pesanan:</Heading>
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
                <Textarea
                  label="Kebutuhan Tambahan"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Kebutuhan khusus atau informasi tambahan yang perlu kami ketahui"
                />
              </div>
              
              {submitError && (
                <div className="mb-6">
                  <Alert type="error">{submitError}</Alert>
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
        </div>
      </Container>
    </section>
  );
}