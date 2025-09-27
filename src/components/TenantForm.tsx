'use client';

import { useState } from 'react';
import { tenantSpots, trunkPackages, FormData, sampleFormData } from '@/data/mockData';

export default function TenantForm() {
  const [formData, setFormData] = useState<FormData>(sampleFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
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

  return (
    <section id="tenant-registration" className="py-20 bg-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">PENDAFTARAN TENAN</h2>
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
              <h3 className="text-2xl font-bold mb-4">Pendaftaran Berhasil!</h3>
              <p className="mb-6">
                Terima kasih telah mendaftar sebagai tenan di Lucky Launch at Lucy.
                Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk konfirmasi dan informasi pembayaran.
              </p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="btn-secondary"
              >
                Daftar Lagi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Brand/Usaha <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon <span className="text-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Produk <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="productType"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Makanan, Minuman, Fashion, Aksesoris, dll."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="packageType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe Paket <span className="text-accent">*</span>
                </label>
                <select
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Pilih Tipe Paket</option>
                  <option value="trunk">TRUNK PACKAGE</option>
                  <option value="popup">POP UP PACKAGE</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Durasi <span className="text-accent">*</span>
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Pilih Durasi</option>
                  {formData.packageType === 'trunk' ? (
                    <>
                      <option value="twoDay">2 Hari (24,25,26 SEPT)</option>
                      <option value="oneDay">1 Hari (26 SEPT)</option>
                    </>
                  ) : (
                    <>
                      <option value="threeDayFull">3 Hari (24,25,26 SEPT)</option>
                      <option value="threeDayPartial">3 Hari (25,26 SEPT)</option>
                      <option value="oneDay">1 Hari (26 SEPT)</option>
                    </>
                  )}
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="spotPreference" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferensi Lokasi Tenan <span className="text-accent">*</span>
                </label>
                <select
                  id="spotPreference"
                  name="spotPreference"
                  value={formData.spotPreference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Pilih Lokasi Tenan</option>
                  {formData.packageType === 'trunk' ? (
                    trunkPackages.filter(pkg => pkg.availability).map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.description} - Available: {pkg.date}
                      </option>
                    ))
                  ) : (
                    tenantSpots.filter(spot => spot.availability).map((spot) => (
                      <option key={spot.id} value={spot.id}>
                        {spot.name} ({spot.size}) - {spot.location}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {formData.spotPreference && formData.duration && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-bold text-lg mb-2">Ringkasan Pesanan:</h4>
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
                <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                  Kebutuhan Tambahan
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Kebutuhan khusus atau informasi tambahan yang perlu kami ketahui"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                  {submitError}
                </div>
              )}
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto"
                >
                  {isSubmitting ? 'Mengirim...' : 'Daftar Sekarang'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}