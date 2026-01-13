
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
      <div className="space-y-6 sm:space-y-8">
        <div className="group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
            Initial Investment ({symbol})
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-2xl">{symbol}</span>
            <input 
              type="number" 
              value={initial} 
              onChange={e => setInitial(Number(e.target.value))} 
              className="w-full pl-12 pr-6 py-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl sm:text-3xl font-black dark:text-white transition-all shadow-inner" 
            />
          </div>
        </div>
        <div className="group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
            Final Market Value ({symbol})
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-2xl">{symbol}</span>
            <input 
              type="number" 
              value={final} 
              onChange={e => setFinal(Number(e.target.value))} 
              className="w-full pl-12 pr-6 py-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl sm:text-3xl font-black dark:text-white transition-all shadow-inner" 
            />
          </div>
        </div>
      </div>

      <div className={`p-8 sm:p-12 rounded-3xl sm:rounded-[4rem] flex flex-col items-center justify-center text-center shadow-2xl border-b-[12px] transition-all duration-500 ${result >= 0 ? 'bg-green-600 text-white border-green-800' : 'bg-red-600 text-white border-red-800'}`}>
        <p className="uppercase text-[10px] font-black tracking-[0.5em] mb-4 opacity-80">Return on Investment</p>
        <p className="text-6xl xs:text-7xl sm:text-8xl font-black mb-6 tracking-tighter break-all">
          {result}%
        </p>
        <div className="bg-black/20 backdrop-blur-md px-6 sm:px-8 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest border border-white/20 mb-6">
          Net Gain: {formatCurrency(final - initial, currency)}
        </div>
        <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Calculated in {currency}</p>
      </div>
    </div>
  );
};

export default ROICalculator;
