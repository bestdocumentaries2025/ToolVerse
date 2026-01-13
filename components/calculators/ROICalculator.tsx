
import React, { useState, useEffect } from 'react';
import { formatCurrency, getCurrencySymbol } from '../../utils/math';
import { useCurrency } from '../../App';

const ROICalculator: React.FC = () => {
  const { currency } = useCurrency();
  const symbol = getCurrencySymbol(currency);
  
  const [initial, setInitial] = useState(1000);
  const [final, setFinal] = useState(1500);
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (initial !== 0) {
      const roi = ((final - initial) / initial) * 100;
      setResult(parseFloat(roi.toFixed(2)));
    } else {
      setResult(0);
    }
  }, [initial, final]);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-8">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
            Initial Investment ({symbol})
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">{symbol}</span>
            <input 
              type="number" 
              value={initial} 
              onChange={e => setInitial(Number(e.target.value))} 
              className="w-full pl-12 pr-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl font-black dark:text-white transition-all shadow-sm" 
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
            Final Market Value ({symbol})
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">{symbol}</span>
            <input 
              type="number" 
              value={final} 
              onChange={e => setFinal(Number(e.target.value))} 
              className="w-full pl-12 pr-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl font-black dark:text-white transition-all shadow-sm" 
            />
          </div>
        </div>
      </div>
      <div className={`p-12 rounded-[3rem] flex flex-col items-center justify-center text-center shadow-2xl border-b-[12px] transition-all duration-500 ${result >= 0 ? 'bg-green-600 text-white border-green-800' : 'bg-red-600 text-white border-red-800'}`}>
        <p className="uppercase text-[10px] font-black tracking-[0.5em] mb-4 opacity-80">ROI Statistics</p>
        <p className="text-8xl font-black mb-4 tracking-tighter">{result}%</p>
        <div className="bg-black/20 backdrop-blur-md px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/20">
          Net Gain: {formatCurrency(final - initial, currency)}
        </div>
        <p className="mt-6 text-[10px] font-bold opacity-60 uppercase tracking-widest underline decoration-2 underline-offset-4">Calculation using {currency}</p>
      </div>
    </div>
  );
};

export default ROICalculator;
