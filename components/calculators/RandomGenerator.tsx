
import React, { useState } from 'react';

const RandomGenerator: React.FC = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const generate = () => {
    setIsRolling(true);
    setTimeout(() => {
      setResult(Math.floor(Math.random() * (max - min + 1)) + min);
      setIsRolling(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center gap-12 py-6">
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2">MIN</label>
          <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="w-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-center font-bold" />
        </div>
        <div className="h-1 bg-slate-200 dark:bg-slate-700 w-4 mb-6"></div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2">MAX</label>
          <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="w-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-center font-bold" />
        </div>
      </div>

      <div className={`w-48 h-48 rounded-full flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl transition-all duration-300 ${isRolling ? 'scale-90 opacity-50' : 'scale-100'}`}>
        <span className="text-7xl font-black">{result !== null ? result : '?'}</span>
      </div>

      <button onClick={generate} disabled={isRolling} className="px-12 py-5 rounded-2xl bg-brand-500 text-white font-black text-xl hover:bg-brand-600 active:scale-95 transition-all shadow-xl shadow-brand-200 dark:shadow-none">
        {isRolling ? 'ROLLING...' : 'GENERATE'}
      </button>
    </div>
  );
};

export default RandomGenerator;
