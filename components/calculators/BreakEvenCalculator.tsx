
import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../App';
import { formatCurrency } from '../../utils/math';

const BreakEvenCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [fixedCosts, setFixedCosts] = useState(5000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(20);
  const [pricePerUnit, setPricePerUnit] = useState(50);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    if (contributionMargin > 0) {
      setResult(Math.ceil(fixedCosts / contributionMargin));
    } else {
      setResult(0);
    }
  }, [fixedCosts, variableCostPerUnit, pricePerUnit]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Fixed Costs ({currency})</label>
          <input 
            type="number" 
            value={fixedCosts} 
            onChange={e => setFixedCosts(Number(e.target.value))} 
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-xl font-bold dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Variable Cost per Unit ({currency})</label>
          <input 
            type="number" 
            value={variableCostPerUnit} 
            onChange={e => setVariableCostPerUnit(Number(e.target.value))} 
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-xl font-bold dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Sales Price per Unit ({currency})</label>
          <input 
            type="number" 
            value={pricePerUnit} 
            onChange={e => setPricePerUnit(Number(e.target.value))} 
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-xl font-bold dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" 
          />
        </div>
      </div>
      <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-2xl">
        <p className="text-slate-500 uppercase text-xs font-black tracking-widest mb-2">Break-Even Point</p>
        <p className="text-7xl font-black text-brand-400">{result}</p>
        <p className="mt-2 text-xs font-bold text-slate-500 uppercase">UNITS</p>
        <p className="mt-4 text-sm text-slate-400 leading-relaxed px-4">
          {result > 0 
            ? `At a contribution margin of ${formatCurrency(pricePerUnit - variableCostPerUnit, currency)} per unit, you need to sell ${result} units to cover your costs.` 
            : 'Pricing must be higher than variable costs to achieve break-even.'}
        </p>
      </div>
    </div>
  );
};

export default BreakEvenCalculator;
