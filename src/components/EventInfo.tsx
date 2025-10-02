import { eventData } from '@/data/mockData';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';

export default function EventInfo() {
  return (
    <section id="event-info" className="relative py-12 pb-28 overflow-hidden bg-[#1a1a1a]">
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

      {/* Asap hitam di bawah */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black z-0" />

      <div className="container relative z-10 px-4 mx-auto">
        {/* New Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-4 py-8">
          {/* Left: Event Title */}
          <div className="text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-raleway">
              LUCKY LAUNCH AT LUCY
            </h2>
          </div>
          
          {/* Right: Date */}
          <div className="text-right">
            <p className="text-xl md:text-2xl font-bold text-white font-raleway">
              OCTOBER 24-26, 2025
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description */}
          <div className="lg:col-span-2 relative bg-white/95 rounded-2xl p-10 h-full shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <Image
                src="/images/LLL-putih.png"
                alt="LLL Logo"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="relative z-10">
              <div className="flex flex-col h-full justify-center">
                <div className="space-y-8 text-black font-raleway text-xl leading-relaxed">
                  <p className="text-justify">
                    Lucky Launch merupakan sebuah event kolaboratif yang menggabungkan aktivitas olahraga, hiburan, serta dukungan terhadap brand lokal. Acara ini diawali dengan kegiatan Fun Run yang berlangsung pada dini hari, dengan titik start dan finish berada di area utama Pop Up Market.
                  </p>
                  <p className="text-justify">
                    Setelah Fun Run, para peserta akan disambut dengan berbagai rangkaian kegiatan yang memadukan pengalaman belanja, kuliner, hiburan, hingga launching 777.ltd.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Event Info */}
          <div className="relative bg-white/95 rounded-2xl p-10 h-full shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl text-black mb-8 font-ttchocolates tracking-tight border-b border-black/20 pb-4">
                INFORMASI ACARA
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-black p-3 rounded-xl mr-4 flex-shrink-0 shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-black mb-1 font-raleway text-sm uppercase tracking-wider">Tanggal</h4>
                    <p className="text-black font-raleway text-lg">{eventData.eventDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black p-3 rounded-xl mr-4 flex-shrink-0 shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-black mb-1 font-raleway text-sm uppercase tracking-wider">Lokasi</h4>
                    <p className="text-black font-raleway text-lg">{eventData.eventLocation}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black p-3 rounded-xl mr-4 flex-shrink-0 shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-black mb-1 font-raleway text-sm uppercase tracking-wider">Penyelenggara</h4>
                    <p className="text-black font-raleway text-lg">{eventData.organizer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
