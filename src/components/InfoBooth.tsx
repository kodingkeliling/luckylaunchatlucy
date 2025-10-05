'use client';

import React from 'react';
import Image from 'next/image';
import { tenantSpots, trunkPackages, packageInclusions } from '@/data/mockData';

const InfoBooth: React.FC = () => {
  return (
    <section id="info-booth" className="relative py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-kotakputih.jpg"
          alt="Background Pattern"
          fill
          quality={100}
        />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">LLL LAYOUT TRUNK & POP UP</h2>
          <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
        </div>
        
        {/* Layout Image on Top */}
        <div className="mb-12">
          <Image 
            src="/images/DENAH POP UP.png" 
            alt="Denah Pop Up Market"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8">
          {/* TRUNK PACKAGE */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">TRUNK PACKAGE! (5 SLOT)</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-3 text-white">
                  <div className="col-span-2 font-semibold">2 HARI (500k) : Trunk</div>
                  <div className="text-right">26 oct</div>
                  <div className="col-span-2 text-sm text-gray-300 pl-4">+ 1 hari indoor uk 3x3M</div>
                  <div className="text-right text-sm text-gray-300">24 oct</div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-3 text-white">
                  <div className="col-span-2 font-semibold">1 HARI (350k) : Trunk</div>
                  <div className="text-right">26 oct</div>
                </div>
              </div>
            </div>
          </div>

          {/* POP UP PACKAGE */}
          <div className="bg-red-600 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">POP UP PACKAGE!</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-red-700">
                    <th className="text-left py-3 px-3 font-semibold text-white border-b-2 border-red-500">PLACEMENT</th>
                    <th className="text-left py-3 px-3 font-semibold text-white border-b-2 border-red-500">SIZE</th>
                    <th className="text-center py-3 px-3 font-semibold text-white border-b-2 border-red-500">3 DAY</th>
                    <th className="text-center py-3 px-3 font-semibold text-white border-b-2 border-red-500">2 DAY</th>
                    <th className="text-center py-3 px-3 font-semibold text-white border-b-2 border-red-500">1 DAY</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Area Extra Bar (4 slot)','3x3m','400k','325k','225k'],
                    ['Area Bar (1 slot)','3x3m','400k','325k','225k'],
                    ['Area Bar (4 slot)','2x2m','300k','250k','175k'],
                    ['Area Bar (1 slot)','1x1m','250k','200k','150k'],
                    ['Area Extra Belakang (2 slot)','3x3m','300k','250k','200k'],
                    ['Area Belakang (4 slot)','3x3m','300k','250k','200k'],
                    ['Area outdoor (1 slot)','3x3m','450k','350k','300k'],
                    ['Area outdoor (1 slot)','2x2m','375k','325k','275k'],
                  ].map((row, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-red-600' : 'bg-red-500'}`}>
                      <td className="py-3 px-3 font-medium text-white border-b border-red-400">{row[0]}</td>
                      <td className="py-3 px-3 text-red-100 border-b border-red-400">{row[1]}</td>
                      <td className="py-3 px-3 text-center border-b border-red-400 text-white">{row[2]}</td>
                      <td className="py-3 px-3 text-center border-b border-red-400 text-white">{row[3]}</td>
                      <td className="py-3 px-3 text-center border-b border-red-400 text-white">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Package Inclusions */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h4 className="font-bold mb-6 text-gray-800 text-xl text-center">Semua paket akan mendapatkan:</h4>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3">
                {[
                  'ELECTRICAL TERMINAL 2 LUBANG',
                  'MEJA 1 (JIKA MEMBUTUHKAN)',
                  'KURSI 1 (JIKA MEMBUTUHKAN)'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <h4 className="font-bold mb-4 text-gray-800 text-lg">Jika ada penambahan kursi dan meja akan dikenakan biaya:</h4>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <ul className="space-y-2">
                {['Meja : 50k','Kursi : 25k'].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBooth;