'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
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
  // PARKING AREA - berdasarkan gambar
  { id: 'spot-1', number: 1, x: 30, y: 62, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-2', number: 2, x: 30, y: 57, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  
  // TRUNK AREA & SEATING AREA
  { id: 'spot-4', number: 4, x: 60.5, y: 58.5, size: '3x3m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  
  // HALLWAY & TOILET AREA
  { id: 'spot-3', number: 3, x: 59.3, y: 62.5, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-5', number: 5, x: 58.2, y: 50.4, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-6', number: 6, x: 60.4, y: 50.4, size: '3x3m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-7', number: 7, x: 62.6, y: 50.4, size: '3x3m', area: 'Seating Area', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  
  // EXTRA BAR AREA (atas)
  { id: 'spot-8', number: 8, x: 58, y: 43.5, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-9', number: 9, x: 61.2, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-10', number: 10, x: 64.7, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-11', number: 11, x: 67.9, y: 42.4, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  
  // BAR AREA
  { id: 'spot-12', number: 12, x: 70.4, y: 52, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-13', number: 13, x: 79.8, y: 47.6, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-14', number: 14, x: 82.6, y: 47.6, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-15', number: 15, x: 85.4, y: 47.6, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-16', number: 16, x: 90.8, y: 52.9, size: '1x1m', area: 'Bar', available: true, price: { threeDay: 250000, twoDay: 200000, oneDay: 150000 } },
  
  // AREA BELAKANG (bawah)
  { id: 'spot-17', number: 17, x: 79.4, y: 62.7, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-18', number: 18, x: 83.4, y: 62.7, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
];

export default function LayoutMap() {
  const [selectedSpot, setSelectedSpot] = useState<SpotInfo | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [debugMode, setDebugMode] = useState(false);
  const [clickedCoords, setClickedCoords] = useState<{ x: number; y: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (debugMode) {
      // Calculate coordinates relative to the image
      const rect = mapRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setClickedCoords({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
      }
      return;
    }
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanX(e.clientX - dragStart.x);
      setPanY(e.clientY - dragStart.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-center">LAYOUT TRUNK & POP UP</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
              >
                -
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
              >
                +
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetView}
              >
                Reset
              </Button>
              <Button 
                variant={debugMode ? "default" : "outline"} 
                size="sm" 
                onClick={() => setDebugMode(!debugMode)}
              >
                {debugMode ? "Exit Debug" : "Debug Mode"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapRef}
            className="relative overflow-hidden rounded-lg border-2 border-gray-300"
            style={{ 
              height: '600px',
              cursor: debugMode ? 'crosshair' : (isDragging ? 'grabbing' : 'grab')
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative w-full h-full"
              style={{
                transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            >
              {/* Background Image */}
              <Image
                src="/images/DENAH POP UP.png"
                alt="Layout Trunk & Pop Up"
                fill
                className="object-contain"
                priority
              />
              
              {/* Interactive Spots */}
              {spots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-110 shadow-lg border-2 ${
                    selectedSpot?.id === spot.id
                      ? 'border-white ring-2 ring-primary ring-offset-2 scale-125' // Selected state
                      : 'border-transparent'
                  } ${
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
                  <span className="font-medium">Ukuran:</span> {selectedSpot.size}
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
          
          {/* Debug Mode Info */}
          {debugMode && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
              <p><strong>Debug Mode Aktif:</strong></p>
              <p>Klik di mana saja pada peta untuk melihat koordinat</p>
              {clickedCoords && (
                <div className="mt-2 p-2 bg-yellow-100 rounded border">
                  <p><strong>Koordinat terakhir diklik:</strong></p>
                  <p>X: {clickedCoords.x}%, Y: {clickedCoords.y}%</p>
                  <p className="text-xs mt-1">Copy koordinat ini untuk mengupdate posisi spot</p>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
            <p><strong>Cara menggunakan:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Scroll mouse untuk zoom in/out</li>
              <li>Drag untuk menggeser peta</li>
              <li>Klik spot untuk melihat detail</li>
              <li>Gunakan tombol +, -, Reset untuk kontrol zoom</li>
              <li>Gunakan Debug Mode untuk menghitung koordinat spot baru</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
