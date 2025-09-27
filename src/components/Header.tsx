import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Background image of runners */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/elements/Elemen.png"
          alt="Lucky Launch at Lucy"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* Logo and title container */}
      <div className="relative z-20 text-center">
        <div className="mb-8">
          <Image 
            src="/images/LLL - Logo B&W-01.png"
            alt="Lucky Launch at Lucy Logo"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-ttchocolates">
          LUCKY LAUNCH
        </h1>
        <h2 className="text-2xl md:text-3xl text-primary font-medium mb-8">
          by tripleseven
        </h2>
        
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Lucky Launch merupakan aktiviti event kolaborasi yang menggabungkan aktivitas olahraga, hiburan, 
          serta dukungan terhadap brand lokal. Acara ini dirancang dengan tujuan untuk menggerakan 
          perekonomian lokal dan mempromosikan gaya hidup sehat melalui lari 777 Ltd.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/funrun" className="btn-primary">
            FUN RUN
          </Link>
          <Link href="/tenants" className="btn-secondary">
            POP UP MARKET
          </Link>
        </div>
      </div>
    </header>
  );
}