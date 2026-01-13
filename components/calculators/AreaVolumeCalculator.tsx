
import React, { useState, useEffect } from 'react';

const AreaVolumeCalculator: React.FC = () => {
  const [shape, setShape] = useState<'circle' | 'rectangle' | 'cube' | 'sphere'>('circle');
  const [val1, setVal1] = useState(10);
  const [val2, setVal2] = useState(5);
  const [result, setResult] = useState({ area: 0, volume: 0 });

  useEffect(() => {
    let a = 0, v = 0;
    if (shape === 'circle') a = Math.PI * val1 * val1;
    if (shape === 'rectangle') a = val1 * val2;
    if (shape === 'cube') { a = 6 * val1 * val1; v = val1 * val1 * val1; }
    if (shape === 'sphere') { a = 4 * Math.PI * val1 * val1; v = (4/3) * Math.PI * Math.pow(val1, 3); }
    setResult({ area: a, volume: v });
  }, [shape, val1, val2]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          {['circle', 'rectangle', 'cube', 'sphere'].map(s => (
            <button key={s} onClick={() => setShape(s as any)} className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg ${shape === s ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-500'}`}>{s}</button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">{shape === 'rectangle' ? 'Width' : 'Radius / Side'}</label>
            <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none font-bold" />
          </div>
          {shape === 'rectangle' && (
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Height</label>
              <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none font-bold" />
            </div>
          )}
        </div>
      </div>
      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 flex flex-col justify-center">
        <div>
          <p className="text-slate-500 uppercase text-xs font-black tracking-widest">Surface Area</p>
          <p className="text-4xl font-black">{result.area.toFixed(2)} <span className="text-sm">sq units</span></p>
        </div>
        {result.volume > 0 && (
          <div>
            <p className="text-slate-500 uppercase text-xs font-black tracking-widest">Volume</p>
            <p className="text-4xl font-black">{result.volume.toFixed(2)} <span className="text-sm">cu units</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaVolumeCalculator;
