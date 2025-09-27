import Image from 'next/image';
import { tenantSpots, trunkPackages, packageInclusions } from '@/data/mockData';

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9968203562344!2d107.60822167411863!3d-6.891726667506532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0xdf0ed67b42c67fcf!2sLucy%20Curated%20Compound!5e0!3m2!1sen!2sid!4v1695862865261!5m2!1sen!2sid" 
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative h-[500px] w-full">
            <Image 
              src="/images/DENAH POP UP.png" 
              alt="Denah Pop Up Market"
              fill
              className="object-contain"
            />
          </div>
          
          <div className="space-y-8">
            {/* TRUNK PACKAGE */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-primary">TRUNK PACKAGE! (5 SLOT)</h3>
              <div className="space-y-3">
                {trunkPackages.map((pkg) => (
                  <div key={pkg.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{pkg.description}</p>
                      <p className="text-sm text-gray-300">Available: {pkg.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-xl number-font">
                        Rp {pkg.pricing.twoDay > 0 ? pkg.pricing.twoDay.toLocaleString('id-ID') : pkg.pricing.oneDay.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* POP UP PACKAGE */}
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">POP UP PACKAGE!</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2">PLACEMENT</th>
                      <th className="text-left py-2">SIZE</th>
                      <th className="text-center py-2">3 DAY<br/>(24,25,26 SEPT)</th>
                      <th className="text-center py-2">3 DAY<br/>(25,26 SEPT)</th>
                      <th className="text-center py-2">1 DAY<br/>(26 SEPT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenantSpots.map((spot) => (
                      <tr key={spot.id} className="border-b border-white/10">
                        <td className="py-2 font-medium">{spot.name}</td>
                        <td className="py-2">{spot.size}</td>
                        <td className="py-2 text-center">
                          {spot.pricing.threeDayFull > 0 ? `Rp ${spot.pricing.threeDayFull.toLocaleString('id-ID')}` : '-'}
                        </td>
                        <td className="py-2 text-center">
                          {spot.pricing.threeDayPartial > 0 ? `Rp ${spot.pricing.threeDayPartial.toLocaleString('id-ID')}` : '-'}
                        </td>
                        <td className="py-2 text-center">
                          {spot.pricing.oneDay > 0 ? `Rp ${spot.pricing.oneDay.toLocaleString('id-ID')}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Package Inclusions */}
            <div className="bg-white text-secondary p-6 rounded-lg">
              <h4 className="font-bold mb-3">{packageInclusions.title}</h4>
              <ul className="space-y-1 mb-4">
                {packageInclusions.items.map((item, index) => (
                  <li key={index} className="text-sm">• {item}</li>
                ))}
              </ul>
              
              <h4 className="font-bold mb-3">{packageInclusions.additionalCosts.title}</h4>
              <ul className="space-y-1">
                {packageInclusions.additionalCosts.items.map((item, index) => (
                  <li key={index} className="text-sm">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}