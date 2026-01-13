
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/math';
import { useCurrency } from '../../App';

const CapRateCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [income, setIncome] = useState(36000);
  const [expenses, setExpenses] = useState(12000);
  const [price, setPrice] = useState(500000);
  const [capRate, setCapRate] = useState(0);

  useEffect(() => {
    const noi = income - expenses;
    if (price > 0) {
      setCapRate(parseFloat(((noi / price) * 100).toFixed(2)));
    } else {
      setCapRate(0);
    }
  }, [income, expenses, price]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Gross Annual Income</label>
          <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 font-bold dark:text-white outline-none" />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Annual Operating Expenses</label>
          <input type="number" value={expenses} onChange={e => setExpenses(Number(e.target.value))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 font-bold dark:text-white outline-none" />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Purchase Price</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 font-bold dark:text-white outline-none" />
        </div>
      </div>
      <div className="bg-indigo-600 text-white p-10 rounded-3xl text-center flex flex-col justify-center shadow-xl border-b-8 border-indigo-800">
        <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-70">Cap Rate</p>
        <p className="text-7xl font-black">{capRate}%</p>
        <p className="mt-4 text-xs font-black uppercase tracking-widest opacity-80">NOI: {formatCurrency(income - expenses, currency)}</p>
      </div>
    </div>
  );
};

export default CapRateCalculator;
