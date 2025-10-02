import { eventData } from '@/data/mockData';
import Image from 'next/image';

export default function EventSchedule() {
  return (
    <section id="event-schedule" className="relative py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-kotakhitam.png"
          alt="Background Pattern"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      {/* Asap hitam di atas */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-black z-0" />

      <div className="container relative z-10 px-2 mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-2">
          {/* Baris 1 */}
          <div className="h-[60vh] flex items-center justify-center">
            <Image
              src="/images/card-24-25.png"
              alt="Pop Up Market"
              width={600}
              height={900}
              className="w-auto h-full object-contain"
              quality={100}
              priority
            />
          </div>
          <div className="h-[60vh] flex items-center justify-center">
            <Image
              src="/images/card-26.png"
              alt="24-25 Event"
              width={600}
              height={900}
              className="w-auto h-full object-contain"
              quality={100}
            />
          </div>

          {/* Baris 2 */}
          <div className="h-[30vh] flex items-center justify-center">
            <Image
              src="/images/card-funrun.png"
              alt="26 Event"
              width={600}
              height={900}
              className="w-auto h-full object-contain"
              quality={100}
            />
          </div>
          <div className="h-[30vh] flex items-center justify-center">
            <Image
              src="/images/card-popup.png"
              alt="Fun Run"
              width={600}
              height={900}
              className="w-auto h-full object-contain"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
