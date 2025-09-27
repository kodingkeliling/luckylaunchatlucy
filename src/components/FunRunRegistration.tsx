'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { funRunData, FunRunFormData, sampleFunRunFormData } from '@/data/mockData';
import { validateFunRunForm, ValidationErrors } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value?: string; checked?: boolean } }) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    // Filter out non-numeric characters for phone number fields
    if (name === 'whatsappNumber' || name === 'emergencyNumber') {
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
      <section id="fun-run-registration" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="mb-6 text-3xl font-bold">Terima Kasih!</h2>
              <p className="text-xl mb-8 text-muted-foreground">
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
                <p className="text-lg text-muted-foreground">
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
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fun-run-registration" className="py-12 bg-background">
      <div className="container mx-auto px-4">
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
          
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">DAFTAR SEKARANG</h2>
          <div className="w-24 h-1 bg-destructive mx-auto mb-6"></div>
          
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Slot Tersedia</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingSlots ? (
                <div className="text-center py-4">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Memuat data slot...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-primary number-font">
                      {slotData.availableSlots}
                    </span>
                    <span className="text-muted-foreground">
                      dari {slotData.maxSlots} slot
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        slotData.isFull ? 'bg-destructive' : 'bg-primary'
                      }`}
                      style={{ width: `${(slotData.currentSlots / slotData.maxSlots) * 100}%` }}
                    ></div>
                  </div>
                  {slotData.isFull && (
                    <p className="text-center text-destructive font-medium mt-2">
                      Slot sudah penuh!
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Data Diri */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold text-sm">1</span>
                </div>
                <h3 className="text-xl font-semibold">DATA DIRI</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="participantName">Nama Perorangan/Komunitas *</Label>
                  <Input
                    id="participantName"
                    name="participantName"
                    value={formData.participantName}
                    onChange={handleChange}
                    className={errors.participantName ? "border-destructive" : ""}
                  />
                  {errors.participantName && (
                    <p className="text-sm text-destructive">{errors.participantName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin *</Label>
                  <Select value={formData.gender} onValueChange={(value: string) => handleChange({ target: { name: 'gender', value } })}>
                    <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-destructive">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isCommunity"
                    checked={formData.isCommunity}
                    onCheckedChange={(checked: boolean) => handleChange({ target: { name: 'isCommunity', checked } })}
                  />
                  <Label htmlFor="isCommunity">Saya mendaftar sebagai komunitas</Label>
                </div>
              </div>

              {formData.isCommunity && (
                <div className="mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="responsiblePerson">Nama Penanggung Jawab *</Label>
                    <Input
                      id="responsiblePerson"
                      name="responsiblePerson"
                      value={formData.responsiblePerson}
                      onChange={handleChange}
                      className={errors.responsiblePerson ? "border-destructive" : ""}
                    />
                    {errors.responsiblePerson && (
                      <p className="text-sm text-destructive">{errors.responsiblePerson}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="healthHistory">Riwayat Kesehatan *</Label>
                  <Textarea
                    id="healthHistory"
                    name="healthHistory"
                    value={formData.healthHistory}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Jelaskan kondisi kesehatan Anda, alergi, atau kondisi medis yang perlu diketahui panitia"
                    className={errors.healthHistory ? "border-destructive" : ""}
                  />
                  {errors.healthHistory && (
                    <p className="text-sm text-destructive">{errors.healthHistory}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyNumber">Nomor Emergency *</Label>
                  <Input
                    id="emergencyNumber"
                    name="emergencyNumber"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.emergencyNumber}
                    onChange={handleChange}
                    className={errors.emergencyNumber ? "border-destructive" : ""}
                  />
                  {errors.emergencyNumber && (
                    <p className="text-sm text-destructive">{errors.emergencyNumber}</p>
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
              </div>
            </div>

            {/* Pernyataan & Persetujuan */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h3 className="text-xl font-semibold">PERNYATAAN & PERSETUJUAN</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="healthDeclaration"
                    checked={formData.healthDeclaration}
                    onCheckedChange={(checked: boolean) => handleChange({ target: { name: 'healthDeclaration', checked } })}
                    className={errors.healthDeclaration ? "border-destructive" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="healthDeclaration" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Saya menyatakan bahwa saya dalam kondisi sehat dan siap mengikuti Fun Run *
                    </Label>
                    {errors.healthDeclaration && (
                      <p className="text-sm text-destructive">{errors.healthDeclaration}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="photoVideoConsent"
                    checked={formData.photoVideoConsent}
                    onCheckedChange={(checked: boolean) => handleChange({ target: { name: 'photoVideoConsent', checked } })}
                    className={errors.photoVideoConsent ? "border-destructive" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="photoVideoConsent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Saya memberikan persetujuan penggunaan foto/video kegiatan untuk dokumentasi & publikasi *
                    </Label>
                    {errors.photoVideoConsent && (
                      <p className="text-sm text-destructive">{errors.photoVideoConsent}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="liabilityWaiver"
                    checked={formData.liabilityWaiver}
                    onCheckedChange={(checked: boolean) => handleChange({ target: { name: 'liabilityWaiver', checked } })}
                    className={errors.liabilityWaiver ? "border-destructive" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="liabilityWaiver" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Saya menyatakan bahwa saya dalam kondisi sehat dan sanggup mengikuti kegiatan Fun Run dengan penuh tanggung jawab. Panitia tidak bertanggung jawab atas resiko kesehatan yang timbul selama kegiatan berlangsung. *
                    </Label>
                    {errors.liabilityWaiver && (
                      <p className="text-sm text-destructive">{errors.liabilityWaiver}</p>
                    )}
                  </div>
                </div>
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
                disabled={isSubmitting || slotData.isFull || isLoadingSlots}
                className="w-full md:w-auto"
              >
                {isSubmitting ? 'Mengirim...' : slotData.isFull ? 'Slot Penuh' : 'Daftar Sekarang'}
              </Button>
              {slotData.isFull && (
                <p className="text-destructive font-medium mt-4">
                  Maaf, slot pendaftaran sudah penuh. Silakan coba lagi nanti.
                </p>
              )}
            </div>
          </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}