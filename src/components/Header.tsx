import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="relative w-full min-h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/elements/Elemen.png"
          alt="Lucky Launch at Lucy"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center min-h-screen px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-10">
            <Image 
              src="/images/LLL - Logo B&W-01.png"
              alt="Lucky Launch at Lucy Logo"
              width={250}
              height={250}
              className="mx-auto w-auto h-auto max-w-[200px] md:max-w-[300px]"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4 font-ttchocolates">
            LUCKY LAUNCH
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-medium mb-6 md:mb-8">
            by tripleseven
          </h2>
                    
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link href="/funrun" className="btn-primary px-6 py-3 text-sm sm:text-base">
              FUN RUN
            </Link>
            <Link href="/popup-market" className="btn-secondary px-6 py-3 text-sm sm:text-base">
              POP UP MARKET
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
