'use client';

import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function Navbar() {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-8 lg:px-2 ${raleway.className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg md:text-xl font-semibold">
          Lucky Launch at Lucy
        </div>
        <div className="text-white text-sm md:text-base font-medium">
          24-26 OCT 2025
        </div>
      </div>
    </nav>
  );
}
