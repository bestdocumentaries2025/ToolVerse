
import React, { useState, useEffect } from 'react';

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#0ea5e9');
  const [rgb, setRgb] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 'Invalid Hex';
  };

  useEffect(() => {
    setRgb(hexToRgb(hex));
  }, [hex]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Hex Color Code</label>
          <div className="flex gap-4">
            <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer" />
            <input type="text" value={hex} onChange={e => setHex(e.target.value)} className="flex-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 font-mono text-xl uppercase ring-1 ring-slate-200 dark:ring-slate-700" />
          </div>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">RGB</span>
            <p className="font-mono text-lg font-bold dark:text-white">{rgb}</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl shadow-inner flex items-center justify-center min-h-[200px]" style={{ backgroundColor: hex }}>
        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-black text-white mix-blend-difference uppercase tracking-widest">{hex}</span>
      </div>
    </div>
  );
};

export default ColorConverter;
