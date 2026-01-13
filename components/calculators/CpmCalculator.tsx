
import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../App';
import { formatCurrency, getCurrencySymbol } from '../../utils/math';

const CpmCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const symbol = getCurrencySymbol(currency);
  
  const [cost, setCost] = useState(1000);
  const [impressions, setImpressions] = useState(100000);
  const [cpm, setCpm] = useState(0);

  useEffect(() => {
    if (impressions > 0) {
      setCpm(parseFloat(((cost / impressions) * 1000).toFixed(2)));
    } else {
      setCpm(0);
    }
  }, [cost, impressions]);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">
            Total Ad Spend ({symbol})
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{symbol}</span>
            <input 
              type="number" 
              value={cost} 
              onChange={e => setCost(Number(e.target.value))} 
              className="w-full pl-12 pr-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-2xl font-black outline-none transition-all dark:text-white" 
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Total Impressions</label>
          <input 
            type="number" 
            value={impressions} 
            onChange={e => setImpressions(Number(e.target.value))} 
            className="w-full px-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-2xl font-black outline-none transition-all dark:text-white" 
          />
        </div>
      </div>
      <div className="bg-brand-600 text-white p-12 rounded-[3rem] text-center shadow-2xl flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl font-black pointer-events-none select-none italic">CPM</div>
        <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-70">Calculated CPM</p>
        <p className="text-7xl font-black tracking-tighter mb-2">{formatCurrency(cpm, currency)}</p>
        <p className="mt-4 text-sm font-bold opacity-80 leading-relaxed max-w-xs">
          Your cost for every 1,000 impressions based on a total budget of {formatCurrency(cost, currency)}.
        </p>
        <div className="mt-8 px-6 py-2 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest border border-white/30 backdrop-blur-md">
          DYNAMIC CURRENCY: {currency}
        </div>
      </div>
    </div>
  );
};

export default CpmCalculator;
