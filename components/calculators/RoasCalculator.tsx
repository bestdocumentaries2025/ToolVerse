
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/math';
import { useCurrency } from '../../App';

const RoasCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [revenue, setRevenue] = useState(5000);
  const [cost, setCost] = useState(1000);
  const [roas, setRoas] = useState(0);

  useEffect(() => {
    if (cost > 0) {
      setRoas(parseFloat((revenue / cost).toFixed(2)));
    } else {
      setRoas(0);
    }
  }, [revenue, cost]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Total Revenue from Ads</label>
          <input type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 text-xl font-bold dark:text-white outline-none" />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Total Ad Spend</label>
          <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 text-xl font-bold dark:text-white outline-none" />
        </div>
      </div>
      <div className="bg-brand-600 text-white p-10 rounded-3xl text-center flex flex-col justify-center shadow-xl">
        <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">ROAS</p>
        <p className="text-7xl font-black">{roas}x</p>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest opacity-80">Revenue Earned: {formatCurrency(revenue, currency)}</p>
      </div>
    </div>
  );
};

export default RoasCalculator;
