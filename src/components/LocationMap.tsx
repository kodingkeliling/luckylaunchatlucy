import Image from 'next/image';
import { tenantSpots, trunkPackages, packageInclusions } from '@/data/mockData';

export default function LocationMap() {
  return (
    <section id="location-map" className="py-20 text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/runing-picture.jpg)' }}
      >
        {/* Black and White Texture Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)
            `,
            backgroundSize: '20px 20px, 15px 15px, 25px 25px, 10px 10px, 10px 10px, 10px 10px, 10px 10px',
            backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 5px, 5px -5px, -5px 0px'
          }}
        ></div>
        {/* Shadow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>
      <div className="container relative z-10">
        <div className="text-start mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">TEMPAT</h2>
          <p className="text-xl max-w-3xl">
            Lucy Curated Compound
            <br />
            Jl. Ir. H. Juanda No.171, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132
          </p>
        </div>
        
        <div className="mb-12">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.1353550130048!2d107.60926351563035!3d-6.88656153361365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e77b43dd28d5%3A0x91deb645cd5eb198!2sLucy%20Curated%20Compound%20Bandung!5e0!3m2!1sen!2sid!4v1759677683580!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
      </div>
    </section>
  );
}