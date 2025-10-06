'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Raleway } from 'next/font/google';
import FloatingNav from './FloatingNav';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0 pt-6 pb-2 bg-transparent'
        } ${raleway.className}`}
      >
      <div className="w-full flex justify-between items-center px-4 md:px-8">
        <div className="relative h-9 w-auto md:h-10 mt-1">
          <Image
            src="/images/logo-777-putih.png"
            alt="Lucky Launch at Lucy"
            width={144}
            height={40}
            className="h-full w-auto object-contain"
            priority
          />
        </div>
        <div className="font-ttchocolates text-white text-sm md:text-base font-medium pr-2">
          24-26 OCT 2025
        </div>
      </div>
      </nav>
      <FloatingNav />
    </>
  );
}
