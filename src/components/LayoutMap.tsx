'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SpotInfo {
  id: string;
  number: number;
  x: number;
  y: number;
  size: string;
  area: string;
  available: boolean;
  price: {
    threeDay: number;
    twoDay: number;
    oneDay: number;
  };
}

const spots: SpotInfo[] = [
  // PARKING AREA
  { id: 'spot-1', number: 1, x: 15, y: 70, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-2', number: 2, x: 15, y: 50, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  
  // HALLWAY
  { id: 'spot-3', number: 3, x: 35, y: 60, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-4', number: 4, x: 35, y: 40, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-5', number: 5, x: 45, y: 70, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-6', number: 6, x: 45, y: 50, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-7', number: 7, x: 45, y: 30, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  
  // INDOOR - EXTRA BAR
  { id: 'spot-8', number: 8, x: 65, y: 20, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-9', number: 9, x: 70, y: 20, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-10', number: 10, x: 75, y: 20, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-11', number: 11, x: 80, y: 20, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  
  // INDOOR - BAR
  { id: 'spot-12', number: 12, x: 65, y: 50, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-13', number: 13, x: 70, y: 50, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-14', number: 14, x: 75, y: 50, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-15', number: 15, x: 80, y: 50, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-16', number: 16, x: 85, y: 50, size: '1x1m', area: 'Bar', available: true, price: { threeDay: 250000, twoDay: 200000, oneDay: 150000 } },
  
  // INDOOR - AREA BELAKANG
  { id: 'spot-17', number: 17, x: 65, y: 80, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-18', number: 18, x: 70, y: 80, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-19', number: 19, x: 75, y: 80, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-20', number: 20, x: 80, y: 80, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  
  // OUTDOOR
  { id: 'spot-21', number: 21, x: 10, y: 90, size: '3x3m', area: 'Outdoor', available: true, price: { threeDay: 0, twoDay: 0, oneDay: 300000 } },
  { id: 'spot-22', number: 22, x: 20, y: 90, size: '3x3m', area: 'Outdoor', available: true, price: { threeDay: 0, twoDay: 0, oneDay: 300000 } },
];

export default function LayoutMap() {
  const [selectedSpot, setSelectedSpot] = useState<SpotInfo | null>(null);

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">LAYOUT TRUNK & POP UP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg p-4" style={{ height: '500px' }}>
            {/* Area Labels */}
            <div className="absolute top-4 left-4 text-sm font-semibold text-gray-600">PARKING AREA</div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600">HALLWAY</div>
            <div className="absolute top-4 right-4 text-sm font-semibold text-gray-600">INDOOR</div>
            
            {/* DJ SET */}
            <div className="absolute bg-gray-300 rounded px-2 py-1 text-xs" style={{ left: '15%', top: '75%' }}>
              DJ SET
            </div>
            
            {/* Seating Areas */}
            <div className="absolute bg-yellow-200 rounded px-2 py-1 text-xs" style={{ left: '25%', top: '60%' }}>
              SEATING AREA
            </div>
            <div className="absolute bg-yellow-200 rounded px-2 py-1 text-xs" style={{ left: '25%', top: '40%' }}>
              SEATING AREA
            </div>
            <div className="absolute bg-yellow-200 rounded px-2 py-1 text-xs" style={{ left: '85%', top: '70%' }}>
              SEATING AREA
            </div>
            
            {/* Toilet & Musholla */}
            <div className="absolute bg-gray-300 rounded px-2 py-1 text-xs" style={{ left: '40%', top: '20%' }}>
              TOILET & MUSHOLLA
            </div>
            <div className="absolute bg-gray-300 rounded px-2 py-1 text-xs" style={{ left: '90%', top: '10%' }}>
              TOILET
            </div>
            
            {/* Bars */}
            <div className="absolute bg-gray-400 rounded px-2 py-1 text-xs" style={{ left: '65%', top: '15%' }}>
              EXTRA BAR
            </div>
            <div className="absolute bg-gray-400 rounded px-2 py-1 text-xs" style={{ left: '65%', top: '45%' }}>
              BAR
            </div>
            
            {/* Area Belakang */}
            <div className="absolute bg-gray-300 rounded px-2 py-1 text-xs" style={{ left: '65%', top: '75%' }}>
              AREA BELAKANG
            </div>
            
            {/* Spots */}
            {spots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-110 ${
                  spot.available 
                    ? 'bg-primary hover:bg-primary/80' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                style={{ 
                  left: `${spot.x}%`, 
                  top: `${spot.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                disabled={!spot.available}
              >
                {spot.number}
              </button>
            ))}
          </div>
          
          {/* Spot Information */}
          {selectedSpot && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Spot {selectedSpot.number}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Area:</span> {selectedSpot.area}
                </div>
                <div>
                  <span className="font-medium">Ukuran:</span> {spot.size}
                </div>
                <div>
                  <span className="font-medium">3 Hari:</span> Rp {selectedSpot.price.threeDay.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">2 Hari:</span> Rp {selectedSpot.price.twoDay.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">1 Hari:</span> Rp {selectedSpot.price.oneDay.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 ${selectedSpot.available ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedSpot.available ? 'Tersedia' : 'Terisi'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span>Tersedia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <span>Terisi</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
