import Image from 'next/image';
import { tenantSpots } from '@/data/mockData';

export default function LocationMap() {
  return (
    <section id="location-map" className="py-20 bg-secondary text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">TEMPAT</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Lucy Curated Compound
            <br />
            Jl. Kebon Bibit Utara No.7, Tamansari, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40132
          </p>
        </div>
        
        <div className="mb-12">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1578.638078574629!2d107.60580883178534!3d-6.896608539752828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e65ad8542d3b%3A0xd841ac67c9f453cf!2sJl.%20Kb.%20Bibit%20Utara%20No.7%2C%20Tamansari%2C%20Kec.%20Bandung%20Wetan%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040116!5e0!3m2!1sen!2sid!4v1758950475901!5m2!1sen!2sid"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">DENAH POP UP MARKET</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] w-full">
            <Image 
              src="/images/DENAH POP UP.png" 
              alt="Denah Pop Up Market"
              fill
              className="object-contain"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Informasi Harga Tenan</h3>
            <div className="space-y-4">
              {tenantSpots.map((spot, index) => (
                <div key={index} className={`p-4 rounded-lg ${spot.highTraffic ? 'bg-primary/20' : 'bg-white/10'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">{spot.name}</h4>
                      <p className="text-sm opacity-80">{spot.location} • {spot.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-xl number-font">
                        Rp {spot.price.toLocaleString('id-ID')}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded ${spot.availability ? 'bg-green-500' : 'bg-red-500'}`}>
                        {spot.availability ? 'Available' : 'Booked'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
