
import React, { useState, useEffect } from 'react';
import { formatCurrency, getCurrencySymbol } from '../../utils/math';
import { useCurrency } from '../../App';

const SalaryCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const symbol = getCurrencySymbol(currency);
  
  const [gross, setGross] = useState(50000);
  const [tax, setTax] = useState(15);
  const [other, setOther] = useState(5);
  const [net, setNet] = useState(0);

  useEffect(() => {
    const totalDeduction = (gross * (tax / 100)) + (gross * (other / 100));
    setNet(gross - totalDeduction);
  }, [gross, tax, other]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
            Gross Salary ({symbol})
          </label>
          <input 
            type="number" 
            value={gross} 
            onChange={e => setGross(Number(e.target.value))} 
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 outline-none text-2xl font-black dark:text-white focus:ring-2 focus:ring-brand-500" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tax (%)</label>
            <input type="number" value={tax} onChange={e => setTax(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 outline-none font-bold dark:text-white" />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Deductions (%)</label>
            <input type="number" value={other} onChange={e => setOther(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 outline-none font-bold dark:text-white" />
          </div>
        </div>
      </div>
      <div className="bg-slate-900 text-white p-10 rounded-3xl flex flex-col justify-center space-y-6 shadow-xl border-l-8 border-brand-500">
        <div>
          <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest mb-1">Net Take-Home</p>
          <p className="text-5xl font-black text-brand-400">{formatCurrency(net, currency)}</p>
        </div>
        <div className="border-t border-slate-800 pt-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Total Deductions</span>
            <span className="font-black text-red-400">{formatCurrency(gross - net, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
