
import React, { useState } from 'react';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://tool-verse-free.vercel.app');
  const [size, setSize] = useState(300);
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Content (URL, Text, or VCard)</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-2 focus:ring-brand-500 font-medium resize-none"
            placeholder="Type anything here..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Size: {size}px</label>
          <input 
            type="range" 
            min="100" 
            max="1000" 
            value={size} 
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-brand-500" 
          />
        </div>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-6 border border-slate-100">
        <div className="bg-slate-50 p-4 rounded-xl">
          <img 
            src={qrUrl} 
            alt="QR Code" 
            className="max-w-full h-auto transition-all duration-300" 
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        <div className="flex gap-2 w-full">
          <a 
            href={qrUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors"
          >
            OPEN IMAGE
          </a>
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = qrUrl;
              link.download = 'qrcode.png';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex-1 py-3 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-colors"
          >
            DOWNLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
