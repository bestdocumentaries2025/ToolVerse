
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/math';
import { useCurrency } from '../../App';

const ClvCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [orderValue, setOrderValue] = useState(100);
  const [frequency, setFrequency] = useState(5); // orders per year
  const [lifespan, setLifespan] = useState(3); // years
  const [clv, setClv] = useState(0);

  useEffect(() => {
    setClv(parseFloat((orderValue * frequency * lifespan).toFixed(2)));
  }, [orderValue, frequency, lifespan]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Avg. Order Value</label>
          <input type="number" value={orderValue} onChange={e => setOrderValue(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 text-xl font-bold dark:text-white outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Orders Per Year</label>
          <input type="number" value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 text-xl font-bold dark:text-white outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Customer Lifespan (Years)</label>
          <input type="number" value={lifespan} onChange={e => setLifespan(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 text-xl font-bold dark:text-white outline-none" />
        </div>
      </div>
      <div className="bg-slate-900 text-brand-400 p-10 rounded-3xl text-center flex flex-col justify-center items-center shadow-2xl border-t-8 border-brand-500">
        <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-500">Total Customer Value</p>
        <p className="text-6xl font-black">{formatCurrency(clv, currency)}</p>
        <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-60">Revenue per Lifetime</p>
      </div>
    </div>
  );
};

export default ClvCalculator;
