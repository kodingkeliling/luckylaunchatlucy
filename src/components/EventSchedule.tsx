import { eventData } from '@/data/mockData';
import Image from 'next/image';

export default function EventSchedule() {
  return (
    <section id="event-schedule" className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-kotakputih.jpg"
          alt="Background Pattern"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      {/* Asap hitam di atas */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-black z-0" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#DECDC3] mb-4 font-ttchocolates tracking-tight">
            RANGKAIAN ACARA
          </h2>
          <div className="w-24 h-1 bg-[#BE2625] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {eventData.eventSchedule.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 p-6 rounded-xl shadow-lg flex items-start hover:shadow-xl transition-all duration-300"
            >
              <div className="mr-4 flex-shrink-0">
                <div className="w-16 h-16 bg-[#2C4059] rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-[#DECDC3] font-ttchocolates">{item.time}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2C4059] mb-2 font-raleway">{item.activity}</h3>
                <p className="text-[#2C4059] font-raleway">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
