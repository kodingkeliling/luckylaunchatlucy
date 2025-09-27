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
  price: number;
  size: string;
  availability: boolean;
  description: string;
  highTraffic: boolean;
  imageUrl?: string;
}

export const eventData: EventData = {
  eventName: "Lucky Launch at Lucy",
  eventDate: "Sabtu, 14 Oktober 2025",
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

export const tenantSpots: TenantSpot[] = [
  {
    id: "spot-a1",
    name: "Premium Spot A1",
    location: "Entrance Area",
    price: 2500000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi strategis di pintu masuk utama dengan lalu lintas pengunjung tertinggi",
    highTraffic: true,
    imageUrl: "/images/DENAH POP UP.png"
  },
  {
    id: "spot-a2",
    name: "Premium Spot A2",
    location: "Entrance Area",
    price: 2300000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi di dekat pintu masuk dengan visibilitas tinggi",
    highTraffic: true
  },
  {
    id: "spot-b1",
    name: "Central Spot B1",
    location: "Central Area",
    price: 2000000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi di pusat area event dengan lalu lintas pengunjung tinggi",
    highTraffic: true
  },
  {
    id: "spot-b2",
    name: "Central Spot B2",
    location: "Central Area",
    price: 1800000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi di area tengah dengan akses mudah dari berbagai arah",
    highTraffic: true
  },
  {
    id: "spot-c1",
    name: "Standard Spot C1",
    location: "Side Area",
    price: 1500000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi di area samping dengan lalu lintas pengunjung sedang",
    highTraffic: false
  },
  {
    id: "spot-c2",
    name: "Standard Spot C2",
    location: "Side Area",
    price: 1300000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi di area samping dengan akses ke area istirahat",
    highTraffic: false
  },
  {
    id: "spot-d1",
    name: "Basic Spot D1",
    location: "Back Area",
    price: 1000000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi di area belakang dengan lalu lintas pengunjung rendah",
    highTraffic: false
  },
  {
    id: "spot-d2",
    name: "Basic Spot D2",
    location: "Back Area",
    price: 800000,
    size: "3x3 meter",
    availability: true,
    description: "Lokasi di area belakang dengan akses ke area parkir",
    highTraffic: false
  }
];

export interface FormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  productType: string;
  spotPreference: string;
  additionalRequirements: string;
}

export const sampleFormData: FormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  productType: "",
  spotPreference: "",
  additionalRequirements: ""
};

