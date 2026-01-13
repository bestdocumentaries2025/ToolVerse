
import React, { useState, useEffect } from 'react';
import { formatCurrency, getCurrencySymbol } from '../../utils/math';
import { useCurrency } from '../../App';

const ProfitMarginCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const symbol = getCurrencySymbol(currency);
  
  const [cost, setCost] = useState(50);
  const [price, setPrice] = useState(100);
  const [results, setResults] = useState({ profit: 0, margin: 0, markup: 0 });

  useEffect(() => {
    const profit = price - cost;
    const margin = price !== 0 ? (profit / price) * 100 : 0;
    const markup = cost !== 0 ? (profit / cost) * 100 : 0;
    setResults({ 
      profit: parseFloat(profit.toFixed(2)), 
      margin: parseFloat(margin.toFixed(2)), 
      markup: parseFloat(markup.toFixed(2)) 
    });
  }, [cost, price]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
            Unit Cost ({symbol})
          </label>
          <input 
            type="number" 
            value={cost} 
            onChange={e => setCost(Number(e.target.value))} 
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-xl font-bold dark:text-white outline-none focus:ring-2 focus:ring-brand-500" 
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
            Selling Price ({symbol})
          </label>
          <input 
            type="number" 
            value={price} 
            onChange={e => setPrice(Number(e.target.value))} 
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-xl font-bold dark:text-white outline-none focus:ring-2 focus:ring-brand-500" 
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-6 bg-brand-500 text-white rounded-2xl text-center shadow-lg shadow-brand-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Profit Margin</p>
          <p className="text-6xl font-black">{results.margin}%</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl text-center">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Gross Profit</p>
            <p className="text-xl font-black dark:text-white">{formatCurrency(results.profit, currency)}</p>
          </div>
          <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl text-center">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Markup</p>
            <p className="text-xl font-black dark:text-white">{results.markup}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitMarginCalculator;
