'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { funRunData, FunRunFormData, sampleFunRunFormData } from '@/data/mockData';
import { validateFunRunForm, ValidationErrors } from '@/lib/validation';
import Container from './ui/Container';
import Heading from './ui/Heading';
import Input from './ui/Input';
import PhoneInput from './ui/PhoneInput';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import Checkbox from './ui/Checkbox';
import Button from './ui/Button';
import Alert from './ui/Alert';

interface SlotData {
  maxSlots: number;
  currentSlots: number;
  availableSlots: number;
  isFull: boolean;
}

export default function FunRunRegistration() {
  const [formData, setFormData] = useState<FunRunFormData>(sampleFunRunFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [slotData, setSlotData] = useState<SlotData>({
    maxSlots: 200,
    currentSlots: 0,
    availableSlots: 200,
    isFull: false
  });
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  // Fetch slot data on component mount
  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const response = await fetch('/api/funrun/slots');
        const result = await response.json();
        
        if (response.ok && result.success) {
          setSlotData(result.data);
        } else {
          console.error('Failed to fetch slot data:', result.error);
        }
      } catch (error) {
        console.error('Error fetching slot data:', error);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchSlotData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    const validationErrors = validateFunRunForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/funrun', {
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
      
      console.log('Fun Run form submitted successfully:', result);
      setSubmitSuccess(true);
      setFormData(sampleFunRunFormData); // Reset form
      
      // Refresh slot data after successful submission
      const slotResponse = await fetch('/api/funrun/slots');
      const slotResult = await slotResponse.json();
      if (slotResponse.ok && slotResult.success) {
        setSlotData(slotResult.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const genderOptions = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' }
  ];

  if (submitSuccess) {
    return (
      <section id="fun-run-registration" className="py-20 bg-light">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-12">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <Heading level={2} className="mb-6">Terima Kasih!</Heading>
              <p className="text-xl mb-8 text-gray-700">
                Terima kasih telah bergabung pada FUN RUN dengan LUCKY LAUNCH at LUCY. 
                Semoga keberuntungan hadir di setiap langkahmu!
              </p>
              
              <div className="mb-8">
                <div className="relative h-64 w-full max-w-md mx-auto mb-6">
                  <Image 
                    src="/images/LLL - Logo B&W-01.png"
                    alt="Invitation Card"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-lg text-gray-600">
                  Unduh kartu ini dan posting di instagram mu! dan mention 
                  <span className="font-bold text-primary"> @777.ltd</span> dan 
                  <span className="font-bold text-primary"> @lucycuratedcompund.bdg</span>
                </p>
              </div>
              
              <Button 
                variant="secondary"
                onClick={() => setSubmitSuccess(false)}
              >
                Daftar Lagi
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="fun-run-registration" className="py-12 bg-light">
      <Container>
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="relative w-20 h-20">
              <Image 
                src="/images/LLL - Logo B&W-01.png"
                alt="Lucky Launch at Lucy Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-20 h-20">
              <Image 
                src="/images/LCC BANDUNG_Main Logo-Green (11).png"
                alt="Lucy Curated Compound Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <Heading level={2} className="mb-4 text-3xl md:text-4xl">DAFTAR SEKARANG</Heading>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mb-8">
            <Heading level={3} className="mb-4 text-xl">Slot Tersedia</Heading>
            {isLoadingSlots ? (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600">Memuat data slot...</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-primary number-font">
                    {slotData.availableSlots}
                  </span>
                  <span className="text-gray-600">
                    dari {slotData.maxSlots} slot
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      slotData.isFull ? 'bg-accent' : 'bg-primary'
                    }`}
                    style={{ width: `${(slotData.currentSlots / slotData.maxSlots) * 100}%` }}
                  ></div>
                </div>
                {slotData.isFull && (
                  <p className="text-center text-accent font-medium mt-2">
                    Slot sudah penuh!
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Data Diri */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                  <span className="text-secondary font-bold text-sm">1</span>
                </div>
                <Heading level={3} className="text-xl">DATA DIRI</Heading>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Nama Perorangan/Komunitas"
                  name="participantName"
                  value={formData.participantName}
                  onChange={handleChange}
                  error={errors.participantName}
                  required
                />
                
                <Select
                  label="Jenis Kelamin"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={genderOptions}
                  placeholder="Pilih Jenis Kelamin"
                  error={errors.gender}
                  required
                />
              </div>

              <div className="mb-6">
                <Checkbox
                  label="Saya mendaftar sebagai komunitas"
                  name="isCommunity"
                  checked={formData.isCommunity}
                  onChange={handleChange}
                />
              </div>

              {formData.isCommunity && (
                <div className="mb-6">
                  <Input
                    label="Nama Penanggung Jawab"
                    name="responsiblePerson"
                    value={formData.responsiblePerson}
                    onChange={handleChange}
                    error={errors.responsiblePerson}
                    required
                  />
                </div>
              )}

              <div className="mb-6">
                <Textarea
                  label="Riwayat Kesehatan"
                  name="healthHistory"
                  value={formData.healthHistory}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Jelaskan kondisi kesehatan Anda, alergi, atau kondisi medis yang perlu diketahui panitia"
                  error={errors.healthHistory}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PhoneInput
                  label="Nomor WhatsApp"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  error={errors.whatsappNumber}
                  required
                />
                
                <PhoneInput
                  label="Nomor Emergency"
                  name="emergencyNumber"
                  value={formData.emergencyNumber}
                  onChange={handleChange}
                  error={errors.emergencyNumber}
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
              </div>
            </div>

            {/* Pernyataan & Persetujuan */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <Heading level={3} className="text-xl">PERNYATAAN & PERSETUJUAN</Heading>
              </div>
              
              <div className="space-y-4">
                <Checkbox
                  label="Saya menyatakan bahwa saya dalam kondisi sehat dan siap mengikuti Fun Run"
                  name="healthDeclaration"
                  checked={formData.healthDeclaration}
                  onChange={handleChange}
                  error={errors.healthDeclaration}
                  required
                />

                <Checkbox
                  label="Saya memberikan persetujuan penggunaan foto/video kegiatan untuk dokumentasi & publikasi"
                  name="photoVideoConsent"
                  checked={formData.photoVideoConsent}
                  onChange={handleChange}
                  error={errors.photoVideoConsent}
                  required
                />

                <Checkbox
                  label="Saya menyatakan bahwa saya dalam kondisi sehat dan sanggup mengikuti kegiatan Fun Run dengan penuh tanggung jawab. Panitia tidak bertanggung jawab atas resiko kesehatan yang timbul selama kegiatan berlangsung."
                  name="liabilityWaiver"
                  checked={formData.liabilityWaiver}
                  onChange={handleChange}
                  error={errors.liabilityWaiver}
                  required
                />
              </div>
            </div>

            {submitError && (
              <div className="mb-6">
                <Alert type="error">{submitError}</Alert>
              </div>
            )}

            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting || slotData.isFull || isLoadingSlots}
                className="w-full md:w-auto"
              >
                {isSubmitting ? 'Mengirim...' : slotData.isFull ? 'Slot Penuh' : 'Daftar Sekarang'}
              </Button>
              {slotData.isFull && (
                <p className="text-accent font-medium mt-4">
                  Maaf, slot pendaftaran sudah penuh. Silakan coba lagi nanti.
                </p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}