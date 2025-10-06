import { Clock, MapPin, Music, Gift } from 'lucide-react';
import Image from 'next/image';

export default function EventSchedule() {
  const scheduleItems = [
    {
      time: "05:00",
      title: "Fun Run",
      description: "Start dan finish di lokasi Pop Up Market. Setelah lari, peserta mendapatkan fasilitas tempat istirahat, sajian buah, dan minuman untuk pemulihan energi.",
      icon: <MapPin className="h-6 w-6 text-white" />
    },
    {
      time: "07:00",
      title: "Opening Trunk Market",
      description: "Area market dibuka untuk umum setelah kegiatan Fun Run. Pengunjung dapat langsung menjelajahi booth brand lokal dengan beragam penawaran menarik.",
      icon: <Clock className="h-6 w-6 text-white" />
    },
    {
      time: "08:00",
      title: "Launching 777.ltd",
      description: "Sebagai salah satu highlight acara, 777.ltd akan secara resmi diperkenalkan melalui sesi launching. Hadir 777.ltd di Pop Up Market ini sekaligus menandakan dukungan kuat terhadap ekosistem brand lokal",
      icon: <Gift className="h-6 w-6 text-white" />
    },
    {
      time: "08:30 - 21:00",
      title: "Music & Games",
      description: "Area Pop Up Market akan dimeriahkan dengan penampilan musik dari DJ untuk suasana yang lebih hidup. Games interaktif akan diselenggarakan dengan hadiah berupa voucher eksklusif dari brand yang berpartisipasi.",
      icon: <Music className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section id="event-schedule" className="relative py-12 overflow-hidden bg-[#1a1a1a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src="/images/bg-kotakhitam.png"
          alt="Background Pattern"
          fill
          className="object-cover mix-blend-overlay"
          quality={100}
        />
      </div>

      {/* Asap hitam di atas */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-0" />
      
      {/* Asap hitam di bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black z-0" />

      <div className="container relative z-10 px-4 mx-auto max-w-4xl py-10">
        {/* Header */}
        <div className="text-start mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-raleway mb-4">
            RANGKAIAN ACARA
          </h2>
          <div className="w-24 h-1 bg-white mr-auto rounded-full"></div>
        </div>

        {/* Schedule Container */}
        <div className="relative bg-white/95 rounded-2xl p-10 shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
          <div className="relative z-10">
            <div className="space-y-8">
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex items-start flex-col md:flex-row gap-4 group">
                  {/* Time Badge */}
                  <div className="bg-black text-white px-4 py-2 rounded-xl flex-shrink-0 shadow-lg font-ttchocolates font-bold text-lg min-w-[120px] text-center">
                    {item.time}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start flex-col md:flex-row">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-black font-raleway mb-2">
                          {item.title}
                        </h3>
                        <p className="text-black font-raleway text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative bg-white/95 rounded-2xl p-10 shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden mt-10">
          <div className="relative z-10">
            <p className="text-2xl font-bold text-black font-raleway mb-4">AKTIVASI:</p>
            <ul className="list-disc pl-6 space-y-2 text-black font-raleway text-base">
              <li>AREA ISTIRAHAT PASCA FUN RUN.</li>
              <li>PENYEDIAAN BUAH SEGAR DAN MINUMAN UNTUK SEMUA PESERTA LARI.</li>
              <li>BOOTH INTERAKTIF DARI BRAND LOKAL DENGAN BERBAGAI KONSEP KREATIF.</li>
              <li>MUSIK DARI DJ YANG MENGHADIRKAN VIBES ENERGIK SEPANJANG ACARA.</li>
              <li>GAMES BERHADIAH VOUCHER MENARIK DARI BRAND PARTISIPAN.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}