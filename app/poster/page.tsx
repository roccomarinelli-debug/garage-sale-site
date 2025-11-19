'use client';

import { useState, useEffect } from 'react';

export default function PosterPage() {
  const [mounted, setMounted] = useState(false);

  const categories = [
    'Electronics', 'Furniture', 'Appliances', 'Chairs',
    'Desks', 'Tables', 'Beds', 'Stools',
    'Washing Machine', 'Dryer', 'Drum Kit', 'Lounge Suite'
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

        {/* Purple Gradient Background */}
        <div className="absolute inset-0"
             style={{
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
             }}>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-6xl font-black text-white mb-3 tracking-tight"
                style={{
                  fontFamily: '"Bebas Neue", "Impact", sans-serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '0.05em'
                }}>
              SUPER GARAGE SALE
            </h1>
            <p className="text-2xl font-bold text-white"
               style={{
                 fontFamily: '"Montserrat", sans-serif',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
               }}>
              Moving Overseas Sale - Great Stuff!
            </p>
          </div>

          {/* Address Section */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-5 mb-6">
            <p className="text-center text-white text-xl font-semibold"
               style={{fontFamily: '"Montserrat", sans-serif'}}>
              📍 <span className="font-bold">Address:</span><br/>
              <span className="text-3xl font-black text-white">
                5 Armstrong Street<br/>
                Suffolk Park
              </span>
            </p>
          </div>

          {/* Main QR Code Section with Word Cloud */}
          <div className="flex-1 flex items-center justify-center relative">

            {/* Word Cloud around QR */}
            {mounted && (
              <>
                {categories.map((word, index) => {
                  const angle = (index / categories.length) * 2 * Math.PI;
                  const radius = 380;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const size = 20 + Math.random() * 22;

                  return (
                    <div
                      key={word}
                      className="absolute text-white font-bold"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${Math.random() * 20 - 10}deg)`,
                        fontSize: `${size}px`,
                        fontFamily: '"Montserrat", sans-serif',
                        textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                        color: '#fff',
                        zIndex: 1
                      }}
                    >
                      {word}
                    </div>
                  );
                })}
              </>
            )}

            {/* QR Code Container */}
            <div className="relative z-20 bg-white p-6 rounded-3xl shadow-2xl">
              <h2 className="text-center text-purple-900 font-black text-xl mb-4"
                  style={{fontFamily: '"Montserrat", sans-serif', letterSpacing: '0.05em'}}>
                SCAN TO SEE ALL THE<br/>GREAT STUFF FOR SALE
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
              📞 Call Rocco: <span className="text-white">0490 038 888</span>
            </p>
            <p className="text-white/90 text-lg font-semibold">
              Mon-Fri 9am-5pm • Sat 9am-12pm
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
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-colors"
        >
          🖨️ Print Poster (A4)
        </button>
        <p className="mt-4 text-gray-600">
          Or press Cmd+P (Mac) / Ctrl+P (Windows) to print
        </p>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;900&display=swap');

        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
