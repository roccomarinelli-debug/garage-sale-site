'use client';

export default function PosterPage() {
  const categories = [
    'Electronics', 'Furniture', 'Appliances', 'Chairs',
    'Desks', 'Tables', 'Beds', 'Stools',
    'Washing Machine', 'Dryer', 'Drum Kit', 'Lounge Suite'
  ];

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

        {/* Purple Gradient Background with Gold Flecks */}
        <div className="absolute inset-0"
             style={{
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
             }}>
          {/* Gold Flecks */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-16 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute bottom-32 left-32 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute top-1/2 right-24 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
            <div className="absolute bottom-20 right-40 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute top-24 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-12">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-7xl font-black text-white mb-4 tracking-tight"
                style={{
                  fontFamily: '"Bebas Neue", "Impact", sans-serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.3), 0 0 40px rgba(255,215,0,0.3)',
                  letterSpacing: '0.05em'
                }}>
              SUPER<br/>GARAGE SALE
            </h1>
            <p className="text-3xl font-bold text-yellow-300"
               style={{
                 fontFamily: '"Montserrat", sans-serif',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
               }}>
              Great Stuff, Great Prices
            </p>
          </div>

          {/* Address Section */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 mb-8">
            <p className="text-center text-white text-2xl font-semibold"
               style={{fontFamily: '"Montserrat", sans-serif'}}>
              📍 <span className="font-bold">Address:</span><br/>
              <span className="text-3xl font-black text-yellow-300">
                5 Armstrong Street<br/>
                Suffolk Park
              </span>
            </p>
          </div>

          {/* Main QR Code Section with Word Cloud */}
          <div className="flex-1 flex items-center justify-center relative">

            {/* Word Cloud around QR */}
            <div className="absolute inset-0 flex items-center justify-center">
              {categories.map((word, index) => {
                const angle = (index / categories.length) * 2 * Math.PI;
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const size = 14 + Math.random() * 16;

                return (
                  <div
                    key={word}
                    className="absolute text-white/80 font-bold"
                    style={{
                      transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`,
                      fontSize: `${size}px`,
                      fontFamily: '"Montserrat", sans-serif',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      color: Math.random() > 0.3 ? '#fff' : '#ffd700'
                    }}
                  >
                    {word}
                  </div>
                );
              })}
            </div>

            {/* QR Code Container */}
            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl">
              <div className="mb-4">
                <img
                  src="/qr-code.svg"
                  alt="Scan to browse items"
                  className="w-64 h-64"
                />
              </div>
              <p className="text-center text-purple-900 font-bold text-lg"
                 style={{fontFamily: '"Montserrat", sans-serif'}}>
                👆 SCAN TO BROWSE
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-white text-xl font-bold"
               style={{
                 fontFamily: '"Montserrat", sans-serif',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
               }}>
              📞 Call Rocco: <span className="text-yellow-300">0490 038 888</span>
            </p>
            <p className="text-white/90 text-lg font-semibold">
              Mon-Fri 9AM-5PM • Cash & Bank Transfers
            </p>
            <p className="text-white/80 text-base">
              All prices negotiable • Call ahead or drop in
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
