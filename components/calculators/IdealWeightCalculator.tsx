
import React, { useState, useEffect } from 'react';

const IdealWeightCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState(175);
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Devine Formula
    const heightInInches = height / 2.54;
    const baseHeight = 60; // 5 feet
    const additionalInches = Math.max(0, heightInInches - baseHeight);
    
    if (gender === 'male') {
      setResult(parseFloat((50 + (2.3 * additionalInches)).toFixed(1)));
    } else {
      setResult(parseFloat((45.5 + (2.3 * additionalInches)).toFixed(1)));
    }
  }, [gender, height]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-lg font-bold ${gender === 'male' ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-500'}`}>Male</button>
          <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-lg font-bold ${gender === 'female' ? 'bg-white text-brand-500 shadow-sm' : 'text-slate-500'}`}>Female</button>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 ring-1 ring-slate-200 outline-none text-2xl font-bold" />
        </div>
      </div>
      <div className="bg-slate-900 text-white p-12 rounded-3xl text-center">
        <p className="text-slate-500 uppercase text-xs font-black mb-2">Ideal Body Weight</p>
        <p className="text-7xl font-black text-brand-400">{result} <span className="text-xl">kg</span></p>
        <p className="mt-4 text-xs opacity-50 font-medium italic">Based on the Devine Formula</p>
      </div>
    </div>
  );
};

export default IdealWeightCalculator;
