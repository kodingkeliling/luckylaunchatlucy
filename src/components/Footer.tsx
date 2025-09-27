import Image from 'next/image';
import Link from 'next/link';
import { eventData } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="mb-4">
              <Image 
                src="/images/LLL - Logo B&W-01.png"
                alt="Lucky Launch at Lucy Logo"
                width={120}
                height={120}
                className="mx-auto md:mx-0"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">LUCKY LAUNCH</h3>
            <p className="text-gray-300">
              Fun Run dan Pop Up Market di Lucy Curated Compound
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
            <div className="flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{eventData.contactPhone}</span>
            </div>
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{eventData.contactEmail}</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">MARI BERGABUNG!</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
              <Link href="/funrun" className="btn-primary text-center">
                FUN RUN
              </Link>
              <Link href="/popup-market" className="btn-secondary text-center">
                POP UP MARKET
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <div className="mb-4">
            <Image 
              src="/images/LOGO 777.LTD.png"
              alt="777 Ltd Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Triple Seven Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}