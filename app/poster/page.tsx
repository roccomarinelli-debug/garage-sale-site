'use client';

import { useState, useEffect } from 'react';

export default function PosterPage() {
  const [mounted, setMounted] = useState(false);

  // Categories with popularity scores (1-5, higher = more popular)
  const categories = [
    { word: 'Coffee Tables', popularity: 5 },
    { word: 'Gym Equipment', popularity: 5 },
    { word: 'Bunk Bed', popularity: 5 },
    { word: 'Table', popularity: 4 },
    { word: 'Sit/Stand Desks', popularity: 4 },
    { word: 'Washing Machine', popularity: 4 },
    { word: 'Day Bed', popularity: 3 },
    { word: 'Wicker Lounge', popularity: 3 },
    { word: 'Dryer', popularity: 3 },
    { word: 'Furniture', popularity: 3 },
    { word: 'Lamp', popularity: 2 },
    { word: 'Dehydrator', popularity: 2 },
    { word: 'Drum Kit', popularity: 2 },
    { word: 'Electronics', popularity: 2 }
  ];

  // Only render word cloud on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 print:p-0">
      {/* A4 Print Container */}
      <div className="mx-auto bg-white shadow-2xl print:shadow-none"
           style={{
             width: '210mm',
             height: '297mm',
             position: 'relative',
             overflow: 'hidden'
           }}>

        {/* Christmas Gradient Background */}
        <div className="absolute inset-0"
             style={{
               background: 'linear-gradient(135deg, #dc2626 0%, #16a34a 50%, #dc2626 100%)',
             }}>
          {/* Snowflake pattern overlay */}
          <div className="absolute inset-0 opacity-10"
               style={{
                 backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-6xl font-black text-white mb-3 tracking-tight flex items-center justify-center gap-4"
                style={{
                  fontFamily: '"Bebas Neue", "Impact", sans-serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '0.05em'
                }}>
              <span className="text-7xl">🎄</span>
              XMAS GARAGE SALE
              <span className="text-7xl">🎁</span>
            </h1>
            <p className="text-2xl font-bold text-white"
               style={{
                 fontFamily: '"Montserrat", sans-serif',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
               }}>
              Stuff for sale. Stuff for free. All good stuff.
            </p>
          </div>

          {/* Address Section */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-5 mb-6">
            <p className="text-center text-white font-semibold flex items-center justify-center gap-3"
               style={{fontFamily: '"Montserrat", sans-serif'}}>
              <span className="text-4xl">📌</span>
              <span className="text-3xl font-black text-white">
                5 Armstrong, Suffolk
              </span>
            </p>
          </div>

          {/* Main QR Code Section with Word Cloud */}
          <div className="flex-1 flex items-center justify-center relative">

            {/* Word Cloud around QR */}
            {mounted && (
              <>
                {categories.map((item, index) => {
                  const angle = (index / categories.length) * 2 * Math.PI;
                  const radius = 310;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  // Size based on popularity: 14-38px range
                  const baseSize = 14 + (item.popularity * 4.8);
                  const size = baseSize + Math.random() * 6;

                  return (
                    <div
                      key={item.word}
                      className="absolute text-white font-black"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${Math.random() * 20 - 10}deg)`,
                        fontSize: `${size}px`,
                        fontFamily: '"Bebas Neue", "Impact", sans-serif',
                        textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                        color: '#fff',
                        zIndex: 1,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.word}
                    </div>
                  );
                })}
              </>
            )}

            {/* QR Code Container */}
            <div className="relative z-20 bg-white p-6 rounded-3xl shadow-2xl border-4 border-red-600">
              <h2 className="text-center text-red-700 font-black text-xl mb-4"
                  style={{fontFamily: '"Montserrat", sans-serif', letterSpacing: '0.05em'}}>
                SCAN FOR<br/>CHRISTMAS BARGAINS!
              </h2>
              <div>
                <img
                  src="/qr-code.svg"
                  alt="Scan to browse items"
                  className="w-64 h-64"
                />
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-white text-xl font-bold"
               style={{
                 fontFamily: '"Montserrat", sans-serif',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
               }}>
              📱 <span className="font-semibold">When:</span> Text <span className="text-white font-black">0490 038 888</span><br/>
              <span className="text-lg">to arrange drop in time</span>
            </p>
            <p className="text-white/80 text-base">
              All prices negotiable • Cash & Bank Transfers
            </p>
          </div>
        </div>
      </div>

      {/* Print Instructions */}
      <div className="text-center mt-8 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-red-600 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-colors"
        >
          🎄 Print Christmas Poster (A4)
        </button>
        <p className="mt-4 text-gray-600">
          Or press Cmd+P (Mac) / Ctrl+P (Windows) to print
        </p>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;900&display=swap');

        /* Force background colors to print */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0;
          }

          /* Ensure backgrounds print */
          div, section {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
