export interface ValidationErrors {
  [key: string]: string;
}

export function validateFunRunForm(formData: any): ValidationErrors {
  const errors: ValidationErrors = {};

  // Required text fields
  if (!formData.participantName?.trim()) {
    errors.participantName = 'Nama Perorangan/Komunitas harus diisi';
  }

  if (!formData.gender) {
    errors.gender = 'Jenis Kelamin harus dipilih';
  }

  if (formData.isCommunity && !formData.responsiblePerson?.trim()) {
    errors.responsiblePerson = 'Nama Penanggung Jawab harus diisi';
  }

  if (formData.isCommunity) {
    if (!formData.communityQuantity || formData.communityQuantity < 1) {
      errors.communityQuantity = 'Jumlah orang minimal 1';
    } else if (formData.communityQuantity > 25) {
      errors.communityQuantity = 'Jumlah orang maksimal 25';
    }
  }

  if (!formData.healthHistory?.trim()) {
    errors.healthHistory = 'Riwayat Kesehatan harus diisi';
  }

  // Phone number validation
  if (!formData.whatsappNumber?.trim()) {
    errors.whatsappNumber = 'Nomor WhatsApp harus diisi';
  } else if (formData.whatsappNumber.length < 10) {
    errors.whatsappNumber = 'Nomor WhatsApp minimal 10 digit';
  }

  if (!formData.emergencyNumber?.trim()) {
    errors.emergencyNumber = 'Nomor Emergency harus diisi';
  } else if (formData.emergencyNumber.length < 10) {
    errors.emergencyNumber = 'Nomor Emergency minimal 10 digit';
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.email = 'Email harus diisi';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Format email tidak valid';
  }

  // Checkbox validation
  if (!formData.healthDeclaration) {
    errors.healthDeclaration = 'Pernyataan kesehatan harus disetujui';
  }

  if (!formData.photoVideoConsent) {
    errors.photoVideoConsent = 'Persetujuan foto/video harus disetujui';
  }

  if (!formData.liabilityWaiver) {
    errors.liabilityWaiver = 'Pernyataan tanggung jawab harus disetujui';
  }

  return errors;
}

export function validateTenantForm(formData: any): ValidationErrors {
  const errors: ValidationErrors = {};

  // Required text fields
  if (!formData.fullName?.trim()) {
    errors.fullName = 'Nama Lengkap harus diisi';
  }

  if (!formData.businessName?.trim()) {
    errors.businessName = 'Nama Brand/Usaha harus diisi';
  }

  if (!formData.productType?.trim()) {
    errors.productType = 'Jenis Produk harus diisi';
  }

  if (!formData.packageType) {
    errors.packageType = 'Tipe Paket harus dipilih';
  }

  if (!formData.duration) {
    errors.duration = 'Durasi harus dipilih';
  }

  if (!formData.spotPreference) {
    errors.spotPreference = 'Lokasi Tenan harus dipilih';
  }

  // Phone number validation
  if (!formData.phone?.trim()) {
    errors.phone = 'Nomor Telepon harus diisi';
  } else if (formData.phone.length < 10) {
    errors.phone = 'Nomor Telepon minimal 10 digit';
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.email = 'Email harus diisi';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Format email tidak valid';
  }

  return errors;
}
