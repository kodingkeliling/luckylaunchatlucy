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

        {/* Cards: 3 per row on desktop */}
        <div className="flex flex-col gap-8">
          {/* TRUNK PACKAGE */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">TRUNK PACKAGE! (5 SLOT)</h3>
            <div className="space-y-4">
              {trunkPackages.map((pkg) => (
                <div key={pkg.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white text-lg">{pkg.description}</p>
                      <p className="text-sm text-gray-300 mt-1">Available: {pkg.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-400 text-2xl number-font">
                        Rp {pkg.pricing.twoDay > 0 ? pkg.pricing.twoDay.toLocaleString('id-ID') : pkg.pricing.oneDay.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* POP UP PACKAGE */}
          <div className="bg-red-600 p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">POP UP PACKAGE!</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-red-700">
                    <th className="text-left py-4 px-3 font-semibold text-white border-b-2 border-red-500">PLACEMENT</th>
                    <th className="text-left py-4 px-3 font-semibold text-white border-b-2 border-red-500">SIZE</th>
                    <th className="text-center py-4 px-3 font-semibold text-white border-b-2 border-red-500">3 DAY<br/><span className="text-xs text-red-200">(24,25,26 SEPT)</span></th>
                    <th className="text-center py-4 px-3 font-semibold text-white border-b-2 border-red-500">3 DAY<br/><span className="text-xs text-red-200">(25,26 SEPT)</span></th>
                    <th className="text-center py-4 px-3 font-semibold text-white border-b-2 border-red-500">1 DAY<br/><span className="text-xs text-red-200">(26 SEPT)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {tenantSpots.map((spot, index) => (
                    <tr key={spot.id} className={`${index % 2 === 0 ? 'bg-red-600' : 'bg-red-500'} hover:bg-red-400 transition-colors`}>
                      <td className="py-4 px-3 font-medium text-white border-b border-red-400">{spot.name}</td>
                      <td className="py-4 px-3 text-red-100 border-b border-red-400">{spot.size}</td>
                      <td className="py-4 px-3 text-center border-b border-red-400">
                        {spot.pricing.threeDayFull > 0 ? (
                          <span className="font-semibold text-white">Rp {spot.pricing.threeDayFull.toLocaleString('id-ID')}</span>
                        ) : (
                          <span className="text-red-200">-</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center border-b border-red-400">
                        {spot.pricing.threeDayPartial > 0 ? (
                          <span className="font-semibold text-white">Rp {spot.pricing.threeDayPartial.toLocaleString('id-ID')}</span>
                        ) : (
                          <span className="text-red-200">-</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center border-b border-red-400">
                        {spot.pricing.oneDay > 0 ? (
                          <span className="font-semibold text-white">Rp {spot.pricing.oneDay.toLocaleString('id-ID')}</span>
                        ) : (
                          <span className="text-red-200">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Package Inclusions */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h4 className="font-bold mb-6 text-gray-800 text-xl text-center">{packageInclusions.title}</h4>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3">
                {packageInclusions.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <h4 className="font-bold mb-4 text-gray-800 text-lg">{packageInclusions.additionalCosts.title}</h4>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <ul className="space-y-2">
                {packageInclusions.additionalCosts.items.map((item, index) => (
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