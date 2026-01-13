
import React, { useState, useEffect } from 'react';

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [waist, setWaist] = useState(85);
  const [neck, setNeck] = useState(40);
  const [hip, setHip] = useState(90);
  const [height, setHeight] = useState(175);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let bf = 0;
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    setResult(Math.max(0, parseFloat(bf.toFixed(1))));
  }, [gender, waist, neck, hip, height]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mb-4">
          <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg font-bold ${gender === 'male' ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-500'}`}>Male</button>
          <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg font-bold ${gender === 'female' ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-500'}`}>Female</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Waist (cm)</label>
            <input type="number" value={waist} onChange={e => setWaist(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Neck (cm)</label>
            <input type="number" value={neck} onChange={e => setNeck(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none" />
          </div>
          {gender === 'female' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Hip (cm)</label>
              <input type="number" value={hip} onChange={e => setHip(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none" />
            </div>
          )}
        </div>
      </div>
      <div className="bg-indigo-600 text-white p-8 rounded-3xl flex flex-col items-center justify-center text-center">
        <p className="text-indigo-200 uppercase tracking-widest text-xs font-black mb-2">Estimated Body Fat</p>
        <p className="text-7xl font-black mb-4">{result}%</p>
        <div className="bg-indigo-500/30 px-6 py-2 rounded-full text-sm font-bold border border-indigo-400/50">
          US Navy Method
        </div>
      </div>
    </div>
  );
};

export default BodyFatCalculator;
