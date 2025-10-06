'use client';

import { useEffect, useState } from 'react';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (show !== isScrolled) {
        setIsScrolled(show);
      }
      
      // Show/hide based on scroll direction
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Place', href: '#place' },
    { name: 'Events', href: '#events' },
    { name: 'Layout', href: '#layout' },
  ];

  if (!isScrolled) return null;

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className={`backdrop-blur-sm bg-black/60 rounded-full px-6 py-2 shadow-lg ${raleway.className}`}>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-white hover:text-gray-200 text-sm md:text-base font-medium transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#join" 
            className="ml-4 bg-[#BE2625] hover:bg-[#a81f1e] text-white px-4 py-1.5 rounded-full text-sm md:text-base font-semibold transition-colors"
          >
            JOIN!
          </a>
        </div>
      </div>
    </nav>
  );
}
