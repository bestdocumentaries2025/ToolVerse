
import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateCompoundInterest } from '../../utils/math';
import { useCurrency } from '../../App';

const CompoundInterestCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12);
  const [result, setResult] = useState(0);

  useEffect(() => {
    setResult(calculateCompoundInterest(principal, rate, years, frequency));
  }, [principal, rate, years, frequency]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Initial Deposit</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none text-xl font-bold dark:text-white" />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none text-xl font-bold dark:text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Years</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none text-xl font-bold dark:text-white" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Compounding</label>
            <select value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none font-bold dark:text-white">
              <option value={1}>Annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
              <option value={365}>Daily</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-2xl border-b-8 border-brand-500">
        <p className="text-slate-400 uppercase tracking-widest text-[10px] font-black mb-1">Future Value</p>
        <p className="text-5xl font-black text-brand-400">{formatCurrency(result, currency)}</p>
        <div className="mt-8 pt-8 border-t border-slate-800 w-full space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-bold uppercase tracking-tighter text-xs">Interest Earned</span>
            <span className="font-black text-green-400">{formatCurrency(result - principal, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
