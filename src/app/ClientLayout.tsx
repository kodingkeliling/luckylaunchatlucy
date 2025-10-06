'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

// Komponen wrapper untuk menangani logika tampilan Navbar
export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hanya tampilkan Navbar di halaman beranda ('/')
  const showNavbar = pathname === '/';

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
