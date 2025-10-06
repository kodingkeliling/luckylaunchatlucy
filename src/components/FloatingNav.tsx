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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for fixed header
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { name: 'About', id: 'event-info' },
    { name: 'Place', id: 'location-map' },
    { name: 'Events', id: 'event-schedule' },
    { name: 'Layout', id: 'info-booth' },
    { name: 'JOIN!', id: 'join-us' }
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
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className={`${
                item.name === 'JOIN!' 
                  ? 'ml-4 bg-[#BE2625] hover:bg-[#a81f1e] text-white px-4 py-1.5 rounded-full font-semibold'
                  : 'text-white hover:text-gray-200 font-medium'
              } text-sm md:text-base transition-colors`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
