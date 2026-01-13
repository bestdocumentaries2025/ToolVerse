
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/math';
import { useCurrency } from '../../App';

const PropertyTaxCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [value, setValue] = useState(400000);
  const [rate, setRate] = useState(1.2);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setTax(parseFloat(((value * rate) / 100).toFixed(2)));
  }, [value, rate]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Property Value</label>
          <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-xl font-black dark:text-white outline-none" />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Annual Tax Rate (%)</label>
          <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-xl font-black dark:text-white outline-none" />
        </div>
      </div>
      <div className="bg-slate-900 text-white p-10 rounded-3xl flex flex-col justify-center items-center text-center shadow-xl border-t-8 border-brand-500">
        <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest mb-1">Estimated Annual Tax</p>
        <p className="text-5xl font-black text-brand-400">{formatCurrency(tax, currency)}</p>
        <p className="mt-4 text-xs text-slate-500 font-black uppercase tracking-widest opacity-60">{formatCurrency(tax/12, currency)} / Month</p>
      </div>
    </div>
  );
};

export default PropertyTaxCalculator;
