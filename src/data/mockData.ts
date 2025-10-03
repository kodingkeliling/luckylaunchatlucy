import PopupMarketPage from "@/app/popup-market/page";

export interface EventData {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventDescription: string;
  organizer: string;
  contactPhone: string;
  contactEmail: string;
  eventSchedule: EventScheduleItem[];
  eventActivities: EventActivity[];
}

export interface EventScheduleItem {
  time: string;
  activity: string;
  description: string;
}

export interface EventActivity {
  title: string;
  description: string;
  icon?: string;
}

export interface TenantSpot {
  id: string;
  name: string;
  location: string;
  size: string;
  availability: boolean;
  description: string;
  highTraffic: boolean;
  imageUrl?: string;
  pricing: {
    threeDayFull: number; // 24,25,26 SEPT
    threeDayPartial: number; // 25,26 SEPT
    oneDay: number; // 26 SEPT
  };
}

export interface TrunkPackage {
  id: string;
  name: string;
  description: string;
  pricing: {
    twoDay: number;
    oneDay: number;
  };
  availability: boolean;
  date: string;
}

export interface FunRunData {
  maxSlots: number;
  currentSlots: number;
  availableSlots: number;
}

export interface FunRunFormData {
  participantName: string;
  gender: string;
  responsiblePerson: string; // If community
  communityQuantity: number; // Number of people in community (1-25)
  healthHistory: string;
  whatsappNumber: string;
  emergencyNumber: string;
  email: string;
  isCommunity: boolean;
  healthDeclaration: boolean;
  photoVideoConsent: boolean;
  liabilityWaiver: boolean;
}

export const eventData: EventData = {
  eventName: "Lucky Launch at Lucy",
  eventDate: "24-26 Oktober 2025",
  eventLocation: "Lucy Curated Compound",
  eventDescription: "Lucky Launch merupakan aktiviti event kolaborasi yang menggabungkan aktivitas olahraga, hiburan, serta dukungan terhadap brand lokal. Acara ini dirancang dengan tujuan untuk menggerakan perekonomian lokal dan mempromosikan gaya hidup sehat melalui lari 777 Ltd.",
  organizer: "Triple Seven Ltd.",
  contactPhone: "0851 5778 9981",
  contactEmail: "777admin@gmail.com",
  eventSchedule: [
    {
      time: "05:00",
      activity: "Fun Run",
      description: "Kegiatan lari santai berkelompok mengelilingi area Lucy Curated Compound"
    },
    {
      time: "07:00",
      activity: "Opening Pop Up Market",
      description: "Pembukaan area pop up market dengan berbagai tenant makanan, minuman, dan produk lokal"
    },
    {
      time: "08:00",
      activity: "Launching 777.Ltd",
      description: "Peluncuran brand 777.Ltd dengan pengenalan produk dan koleksi terbaru"
    },
    {
      time: "08:30 - 11:30",
      activity: "Music & Games",
      description: "Live musik dari band lokal yang menghadirkan energi positif dan berbagai games berhadiah voucher menarik"
    }
  ],
  eventActivities: [
    {
      title: "Area Istirahat Pasca Fun Run",
      description: "Tempat untuk beristirahat dan menyegarkan diri setelah kegiatan lari"
    },
    {
      title: "Penyediaan Buah Segar dan Minuman",
      description: "Untuk semua peserta lari"
    },
    {
      title: "Booth Interaktif dari Brand Lokal",
      description: "Dengan berbagai konsep kreatif"
    },
    {
      title: "Musik dan DJ yang Menghadirkan Vibes Energik",
      description: "Sepanjang acara"
    },
    {
      title: "Games Berhadiah Voucher Menarik",
      description: "Dari brand partisipan"
    }
  ]
};

export const funRunData: FunRunData = {
  maxSlots: 200,
  currentSlots: 45,
  availableSlots: 155
};

export const trunkPackages: TrunkPackage[] = [
  {
    id: "trunk-2day",
    name: "TRUNK PACKAGE! (5 SLOT)",
    description: "2 HARI (500K) : TRUNK",
    pricing: {
      twoDay: 500000,
      oneDay: 0
    },
    availability: true,
    date: "26 SEPT"
  },
  {
    id: "trunk-1day",
    name: "TRUNK PACKAGE! (5 SLOT)",
    description: "1 HARI (350K) : TRUNK",
    pricing: {
      twoDay: 0,
      oneDay: 350000
    },
    availability: true,
    date: "26 SEPT"
  }
];

export const tenantSpots: TenantSpot[] = [
  {
    id: "area-extra-bar-4slot",
    name: "AREA EXTRA BAR (4 SLOT)",
    location: "Area Extra Bar",
    size: "3X3M",
    availability: true,
    description: "Lokasi strategis di area bar dengan lalu lintas pengunjung tinggi",
    highTraffic: true,
    pricing: {
      threeDayFull: 400000,    // 24,25,26 SEPT
      threeDayPartial: 325000, // 25,26 SEPT
      oneDay: 225000           // 26 SEPT
    }
  },
  {
    id: "area-bar-1slot",
    name: "AREA BAR (1 SLOT)",
    location: "Area Bar",
    size: "3X3M",
    availability: true,
    description: "Lokasi di area bar dengan visibilitas tinggi",
    highTraffic: true,
    pricing: {
      threeDayFull: 400000,
      threeDayPartial: 325000,
      oneDay: 225000
    }
  },
  {
    id: "area-bar-4slot",
    name: "AREA BAR (4 SLOT)",
    location: "Area Bar",
    size: "2X2M",
    availability: true,
    description: "Lokasi di area bar dengan ukuran 2x2 meter",
    highTraffic: true,
    pricing: {
      threeDayFull: 300000,
      threeDayPartial: 250000,
      oneDay: 175000
    }
  },
  {
    id: "area-bar-1slot-small",
    name: "AREA BAR (1 SLOT)",
    location: "Area Bar",
    size: "1X1M",
    availability: true,
    description: "Lokasi di area bar dengan ukuran 1x1 meter",
    highTraffic: true,
    pricing: {
      threeDayFull: 250000,
      threeDayPartial: 200000,
      oneDay: 150000
    }
  },
  {
    id: "area-extra-belakang-2slot",
    name: "AREA EXTRA BELAKANG (2 SLOT)",
    location: "Area Extra Belakang",
    size: "3X3M",
    availability: true,
    description: "Lokasi di area belakang dengan akses mudah",
    highTraffic: false,
    pricing: {
      threeDayFull: 300000,
      threeDayPartial: 250000,
      oneDay: 200000
    }
  },
  {
    id: "area-belakang-4slot",
    name: "AREA BELAKANG (4 SLOT)",
    location: "Area Belakang",
    size: "3X3M",
    availability: true,
    description: "Lokasi di area belakang dengan lalu lintas pengunjung sedang",
    highTraffic: false,
    pricing: {
      threeDayFull: 300000,
      threeDayPartial: 250000,
      oneDay: 200000
    }
  },
  {
    id: "area-outdoor-2slot",
    name: "AREA OUTDOOR (2 SLOT)",
    location: "Area Outdoor",
    size: "3X3M",
    availability: true,
    description: "Lokasi outdoor dengan akses ke area parkir",
    highTraffic: false,
    pricing: {
      threeDayFull: 0,      // Tidak tersedia
      threeDayPartial: 0,   // Tidak tersedia
      oneDay: 300000        // Hanya tersedia 1 hari
    }
  }
];

export interface TenantFormData {
  // Bagian 1: DATA KLIEN
  companyName: string;
  picName: string;
  whatsappNumber: string;
  
  // Bagian 2: DETAIL POP UP MARKET
  purpose: string; // 'Penjualan Product' or 'Pameran'
  productType: string; // 'Makanan', 'Minuman', 'Merch', 'Lainnya'
  productDetail: string;
  spotNumber: string;
  selectedDates: string[]; // ['24 Oktober', '25 Oktober', '26 Oktober']
  packageType: string; // 'trunk' or 'popup'
  selectedSpot: string;
  duration: string; // 'threeDayFull', 'threeDayPartial', 'oneDay'
  chairCount: number;
  tableCount: number;
  totalPayment: number;
  paymentMethod: string;
  
  // Payment Proof
  paymentProofUrl: string;
  paymentProofFileName: string;
}

export const sampleTenantFormData: TenantFormData = {
  companyName: "",
  picName: "",
  whatsappNumber: "",
  purpose: "",
  productType: "",
  productDetail: "",
  spotNumber: "",
  selectedDates: [],
  packageType: "",
  selectedSpot: "",
  duration: "",
  chairCount: 0,
  tableCount: 0,
  totalPayment: 0,
  paymentMethod: "",
  paymentProofUrl: "",
  paymentProofFileName: ""
};

// Legacy interface for backward compatibility
export interface FormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  productType: string;
  spotPreference: string;
  packageType: string;
  duration: string;
  additionalRequirements: string;
}

export const sampleFormData: FormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  productType: "",
  spotPreference: "",
  packageType: "",
  duration: "",
  additionalRequirements: ""
};

export const sampleFunRunFormData: FunRunFormData = {
  participantName: "",
  gender: "",
  responsiblePerson: "",
  communityQuantity: 1,
  healthHistory: "",
  whatsappNumber: "",
  emergencyNumber: "",
  email: "",
  isCommunity: false,
  healthDeclaration: false,
  photoVideoConsent: false,
  liabilityWaiver: false
};

export const packageInclusions = {
  title: "SEMUA PAKET AKAN MENDAPATKAN:",
  items: [
    "ELECTRICAL TERMINAL 4 LUBANG",
    "MEJA 1 (JIKA MEMBUTUHKAN)",
    "KURSI 1 (JIKA MEMBUTUHKAN)"
  ],
  additionalCosts: {
    title: "JIKA ADA PENAMBAHAN KURSI DAN MEJA AKAN DIKENAKAN BIAYA:",
    items: [
      "MEJA: 50K",
      "KURSI: 25K"
    ]
  }
};

// Opsi untuk form registrasi tenan
export const purposeOptions = [
  { value: "Penjualan Product", label: "Penjualan Product" },
  { value: "Pameran", label: "Pameran" }
];

export const productTypeOptions = [
  { value: "Makanan", label: "Makanan" },
  { value: "Minuman", label: "Minuman" },
  { value: "Merch", label: "Merch" },
  { value: "Lainnya", label: "Lainnya" }
];

export const dateOptions = [
  { value: "24 Oktober", label: "Jumat, 24 Oktober" },
  { value: "25 Oktober", label: "Sabtu, 25 Oktober" },
  { value: "26 Oktober", label: "Minggu, 26 Oktober" }
];

export const packageTypeOptions = [
  { value: "trunk", label: "TRUNK PACKAGE" },
  { value: "popup", label: "POP UP PACKAGE" }
];

export const durationOptions = {
  PopupMarketPage:[
  { value: "threeDayFull", label: "3 Hari (24,25,26 Oktober)" },
  { value: "threeDayPartial", label: "2 Hari (25,26 Oktober)" },
  { value: "oneDay", label: "1 Hari (26 Oktober)" }
],
TrunkPackage: [
  { value: "twoDay", label: "2 Hari (24, 26 Oktober)" },
  { value: "oneDay", label: "1 Hari (26 Oktober)" }
]
};


// Informasi pembayaran
export const paymentInfo = {
  accountNumber: "0093 8422 5386",
  accountName: "An Boby Ilham Wiguna Sunarya Putra",
  bank: "BCA/BCA Digital"
};