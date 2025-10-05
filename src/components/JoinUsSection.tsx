'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const JoinUsSection: React.FC = () => {
  return (
    <section id="join-us" className="relative py-24 text-white">
      {/* Background like EventInfo */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src="/images/bg-kotakhitam.png"
          alt="Background Pattern"
          fill
          className="object-cover mix-blend-overlay"
          quality={100}
        />
      </div>

      <div className="container relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">LET'S JOIN US!</h2>
        <p className="text-lg md:text-2xl opacity-95 leading-tight mb-10">
          LAKUKAN PENDAFTARAN POP UP, TRUNK & FUNRUN<br />DIBAWAH INI
        </p>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
          <Link href="#popup-market" className="block w-full md:w-1/2" prefetch={false}>
            <Image
              src="/images/card-popup.png"
              alt="Pop Up & Trunk"
              width={1200}
              height={560}
              className="w-full h-auto mx-auto transition-transform duration-200 hover:scale-[1.02]"
              priority
            />
          </Link>
          <Link href="#funrun" className="block w-full md:w-1/2" prefetch={false}>
            <Image
              src="/images/card-funrun.png"
              alt="Fun Run"
              width={1200}
              height={540}
              className="w-full h-auto mx-auto transition-transform duration-200 hover:scale-[1.02]"
              priority
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;


