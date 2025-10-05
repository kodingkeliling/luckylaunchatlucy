'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBookingData } from '@/hooks/useBookingData';

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

export const spots: SpotInfo[] = [
  // PARKING AREA - berdasarkan gambar
  { id: 'spot-1', number: 1, x: 30, y: 62, size: '2x2m', area: 'Parking Area', available: true, price: { threeDay: 375000, twoDay: 350000, oneDay: 275000 } },
  { id: 'spot-2', number: 2, x: 30, y: 57, size: '3x3m', area: 'Parking Area', available: true, price: { threeDay: 450000, twoDay: 325000, oneDay: 300000 } },
  
  // TRUNK AREA & SEATING AREA
  { id: 'spot-4', number: 4, x: 60.5, y: 58.5, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  
  // HALLWAY & TOILET AREA
  { id: 'spot-3', number: 3, x: 59.2, y: 62.8, size: '3x3m', area: 'Hallway', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-5', number: 5, x: 58.2, y: 50.4, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-6', number: 6, x: 60.4, y: 50.4, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-7', number: 7, x: 62.6, y: 50.4, size: '2x2m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  
  // EXTRA BAR AREA (atas)
  { id: 'spot-8', number: 8, x: 58, y: 43.5, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-9', number: 9, x: 61.2, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-10', number: 10, x: 64.7, y: 42, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-11', number: 11, x: 67.9, y: 42.4, size: '3x3m', area: 'Extra Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  
  // BAR AREA
  { id: 'spot-12', number: 12, x: 70.4, y: 52, size: '1x1m', area: 'Bar', available: true, price: { threeDay: 250000, twoDay: 200000, oneDay: 150000 } },
  { id: 'spot-13', number: 13, x: 79.8, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 400000, twoDay: 325000, oneDay: 225000 } },
  { id: 'spot-14', number: 14, x: 82.6, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  { id: 'spot-15', number: 15, x: 85.4, y: 47.6, size: '3x3m', area: 'Bar', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 175000 } },
  // OUTDOOR (2 slot → diganti 1 slot 3x3m, 1 slot 2x2m sesuai permintaan)
  { id: 'spot-16', number: 16, x: 90.8, y: 52.9, size: '3x3m', area: 'Outdoor', available: true, price: { threeDay: 450000, twoDay: 350000, oneDay: 300000 } },
  
  // AREA BELAKANG (bawah)
  { id: 'spot-17', number: 17, x: 79.4, y: 62.7, size: '3x3m', area: 'Area Belakang', available: true, price: { threeDay: 300000, twoDay: 250000, oneDay: 200000 } },
  { id: 'spot-18', number: 18, x: 83.4, y: 62.7, size: '2x2m', area: 'Outdoor', available: true, price: { threeDay: 375000, twoDay: 325000, oneDay: 275000 } },

  { id: 'spot-19', number: 19, x: 7.4, y: 46.7, size: 'Trunk-Package', area: 'Trunk Area', available: true, price: { threeDay: 0, twoDay: 500000, oneDay: 350000 } },
  { id: 'spot-20', number: 20, x: 13.4, y: 46.7, size: 'Trunk-Package', area: 'Trunk Area', available: true, price: { threeDay: 0, twoDay: 500000, oneDay: 350000 } },
  { id: 'spot-21', number: 21, x: 19.4, y: 46.7, size: 'Trunk-Package', area: 'Trunk Area', available: true, price: { threeDay: 0, twoDay: 500000, oneDay: 350000 } },
  { id: 'spot-22', number: 22, x: 13, y: 58, size: 'Trunk-Package', area: 'Trunk Area', available: true, price: { threeDay: 0, twoDay: 500000, oneDay: 350000 } },
  { id: 'spot-23', number: 23, x: 18.4, y: 57.7, size: 'Trunk-Package', area: 'Trunk Area', available: true, price: { threeDay: 0, twoDay: 500000, oneDay: 350000 } },
];

interface LayoutMapProps {
  selectedSpot?: string;
  onSpotSelect?: (spotId: string) => void;
}

export default function LayoutMap({ selectedSpot: selectedSpotId, onSpotSelect }: LayoutMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<SpotInfo | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [containerHeight, setContainerHeight] = useState(600);
  const mapRef = useRef<HTMLDivElement>(null);
  const { isSpotCompletelyBooked, getBookedDurationsForSpot, isLoading: isLoadingBookings } = useBookingData();

  // Sync selectedSpot with props
  useEffect(() => {
    if (selectedSpotId) {
      const spot = spots.find(s => s.id === selectedSpotId);
      if (spot) {
        setSelectedSpot(spot);
      }
    } else {
      setSelectedSpot(null);
    }
  }, [selectedSpotId]);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        setContainerHeight(400);
      } else {
        setContainerHeight(600);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CardTitle className="text-center md:text-left">PILIH LAYOUT TRUNK & POP UP</CardTitle>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                type="button"
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
              >
                -
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                type="button"
                onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
              >
                +
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                type="button"
                onClick={resetView}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='overflow-scroll w-full relative'>    
          {/* Loading Overlay */}
          {isLoadingBookings && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-gray-600 font-medium">Loading data...</p>
              </div>
            </div>
          )}
          
          <div 
            ref={mapRef}
            className={`relative overflow-hidden rounded-lg border-2 border-gray-300 mx-auto transition-all duration-300 ${
              isLoadingBookings ? 'blur-sm pointer-events-none' : ''
            }`}
            style={{ 
              height: `596px`,
              width: '782px',
              cursor: isDragging ? 'grabbing' : 'grab'
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
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                minWidth: '100%',
                minHeight: '100%',
                width: 'max-content',
                height: 'max-content'
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
              {spots.map((spot) => {
                // Tentukan warna berdasarkan ukuran booth
                const getBoothColor = (size: string) => {
                  if (size === '3x3m') return 'bg-red-600 hover:bg-red-700'; // BOOTH 3X3 - Merah
                  if (size === '2x2m') return 'bg-blue-900 hover:bg-blue-800'; // BOOTH 2X2 - Biru gelap
                  if (size === '1x1m') return 'bg-[#FFECA1] !text-black hover:bg-[#FFECA1]/60'; // BOOTH 1X1 - Hijau lime
                  if (size === 'Trunk-Package') return 'bg-black hover:bg-black/80'; // TRUNK PACKAGE - Ungu
                  return 'bg-gray-500 hover:bg-gray-500/80'; // Default
                };

                const isCompletelyBooked = isSpotCompletelyBooked(spot.id);
                const isAvailable = spot.available && !isCompletelyBooked;

                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedSpot(spot);
                        onSpotSelect?.(spot.id);
                      }
                    }}
                    type="button"
                    className={`absolute w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-110 shadow-lg border-2 ${
                      selectedSpot?.id === spot.id
                        ? 'border-white ring-2 ring-secondary ring-offset-2 scale-125' // Selected state
                        : 'border-transparent'
                    } ${
                      isCompletelyBooked
                        ? 'bg-gray-400 cursor-not-allowed' // Completely Booked - Orange
                        : isAvailable 
                          ? getBoothColor(spot.size)
                          : 'bg-gray-400 cursor-not-allowed' // Not available
                    }`}
                    style={{ 
                      left: `${spot.x}%`, 
                      top: `${spot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    disabled={!isAvailable}
                    title={isCompletelyBooked ? 'Completely Booked' : !spot.available ? 'Not Available' : `Spot ${spot.number}`}
                  >
                    {spot.number}
                  </button>
                );
              })}
            </div>
            </div>
          </div>

          {/* Spot Information */}
          {selectedSpot && (
            <div className={`mt-4 p-3 md:p-4 bg-muted rounded-lg sticky left-0 transition-all duration-300 ${
              isLoadingBookings ? 'opacity-50' : ''
            }`}>
              <h3 className="font-semibold mb-2 text-sm md:text-base">Spot {selectedSpot.number}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                <div>
                  <span className="font-medium">Area:</span> {selectedSpot.area}
                </div>
                <div>
                  <span className="font-medium">Ukuran:</span> {selectedSpot.size}
                </div>
                {selectedSpot.price.threeDay > 0 && (
                <div>
                  <span className="font-medium">3 Hari:</span> Rp {selectedSpot.price.threeDay.toLocaleString()}
                </div>
                )}
                <div>
                  <span className="font-medium">2 Hari:</span> Rp {selectedSpot.price.twoDay.toLocaleString()}
                  {selectedSpot.area === 'Trunk Area' && (
                    <>
                    <br />
                    <span className="text-xs text-gray-500">+1 HARI INDOR UK 3x3 24 OKTOBER</span>
                    </>
                  )}
                </div>
                <div>
                  <span className="font-medium">1 Hari:</span> Rp {selectedSpot.price.oneDay.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 ${
                    isSpotCompletelyBooked(selectedSpot.id) 
                      ? 'text-orange-600' 
                      : selectedSpot.available 
                        ? 'text-green-600' 
                        : 'text-red-600'
                  }`}>
                    {isSpotCompletelyBooked(selectedSpot.id) 
                      ? 'Completely Booked' 
                      : selectedSpot.available 
                        ? 'Available' 
                        : 'Not Available'
                    }
                  </span>
                </div>
                {getBookedDurationsForSpot(selectedSpot.id).length > 0 && (
                  <div className="md:col-span-2">
                    <span className="font-medium">Durasi yang Sudah Dibooking:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {getBookedDurationsForSpot(selectedSpot.id).map((duration, index) => {
                        // Convert duration value to readable label
                        const getDurationLabel = (durationValue: string) => {
                          switch (durationValue) {
                            case 'threeDayFull':
                              return '3 Hari (24,25,26 Oktober)';
                            case 'threeDayPartial':
                              return '2 Hari (25,26 Oktober)';
                            case 'twoDay':
                              return '2 Hari (24,26 Oktober)';
                            case 'oneDay':
                              return '1 Hari (26 Oktober)';
                            default:
                              return durationValue;
                          }
                        };
                        
                        return (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium"
                          >
                            {getDurationLabel(duration)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className={`mt-4 flex flex-wrap gap-4 text-xs md:text-sm justify-center md:justify-start sticky left-0 transition-all duration-300 ${
            isLoadingBookings ? 'opacity-50' : ''
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span>BOOTH 3X3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-900 rounded-full"></div>
              <span>BOOTH 2X2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#FFECA1] rounded-full"></div>
              <span>BOOTH 1X1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black rounded-full"></div>
              <span>TRUNK PACKAGE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <span>BOOKED</span>
            </div>
          </div>
          
          {/* Instructions */}
          <div className={`mt-4 p-3 bg-blue-50 rounded-lg text-xs md:text-sm text-blue-800 sticky left-0 transition-all duration-300 ${
            isLoadingBookings ? 'opacity-50' : ''
          }`}>
            <p><strong>Cara menggunakan:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Scroll mouse untuk zoom in/out</li>
              <li>Drag untuk menggeser peta</li>
              <li>Klik spot untuk melihat detail</li>
              <li>Gunakan tombol +, -, Reset untuk kontrol zoom</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
