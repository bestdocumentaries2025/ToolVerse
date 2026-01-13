
import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../App';
import { formatCurrency } from '../../utils/math';

const RentVsBuyCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [rent, setRent] = useState(1500);
  const [buyPrice, setBuyPrice] = useState(300000);
  const [years, setYears] = useState(7);
  const [result, setResult] = useState<'buy' | 'rent'>('buy');

  useEffect(() => {
    const totalRent = rent * 12 * years;
    const mortgagePayment = (buyPrice * 0.006 * Math.pow(1.006, 360)) / (Math.pow(1.006, 360) - 1);
    const totalBuy = (mortgagePayment * 12 * years) + (buyPrice * 0.05); // including buying costs
    
    setResult(totalBuy < (totalRent + buyPrice * 0.15) ? 'buy' : 'rent'); // Rough appreciation logic
  }, [rent, buyPrice, years]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase mb-2">Monthly Rent Cost</label>
          <div className="relative">
            <input 
              type="number" 
              value={rent} 
              onChange={e => setRent(Number(e.target.value))} 
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 font-bold dark:text-white outline-none focus:ring-2 focus:ring-brand-500" 
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase mb-2">Home Purchase Price</label>
          <div className="relative">
            <input 
              type="number" 
              value={buyPrice} 
              onChange={e => setBuyPrice(Number(e.target.value))} 
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 font-bold dark:text-white outline-none focus:ring-2 focus:ring-brand-500" 
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase mb-2">Time Horizon ({years} Years)</label>
          <input type="range" min="1" max="30" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>
      </div>
      <div className={`p-10 rounded-3xl text-center shadow-xl transition-all duration-500 ${result === 'buy' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Our Verdict</p>
        <p className="text-7xl font-black">{result === 'buy' ? 'BUY' : 'RENT'}</p>
        <p className="mt-4 font-bold opacity-90">
          {result === 'buy' 
            ? `Buying is likely to build more wealth over ${years} years with ${currency} inputs.` 
            : `Renting keeps you more liquid and saves costs in this timeframe.`}
        </p>
        <div className="mt-6 pt-4 border-t border-white/20 text-xs font-bold uppercase tracking-wider opacity-70">
          Comparing {formatCurrency(rent, currency)} rent vs {formatCurrency(buyPrice, currency)} purchase
        </div>
      </div>
    </div>
  );
};

export default RentVsBuyCalculator;
