
import React, { useState, useEffect } from 'react';
import { formatCurrency, getCurrencySymbol } from '../../utils/math';
import { useCurrency } from '../../App';

const MortgageCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const symbol = getCurrencySymbol(currency);
  
  const [price, setPrice] = useState(350000);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [taxes, setTaxes] = useState(250); 
  const [insurance, setInsurance] = useState(100); 
  const [result, setResult] = useState({ pAndI: 0, total: 0, principal: 0 });

  useEffect(() => {
    const principal = price * (1 - downPercent / 100);
    const r = (rate / 100) / 12;
    const n = term * 12;
    
    let pAndI = 0;
    if (r > 0) {
      pAndI = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      pAndI = principal / n;
    }
    
    const total = pAndI + taxes + insurance;
    
    setResult({ 
      pAndI: parseFloat(pAndI.toFixed(2)), 
      total: parseFloat(total.toFixed(2)),
      principal: parseFloat(principal.toFixed(2))
    });
  }, [price, downPercent, rate, term, taxes, insurance]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
      <div className="space-y-6 sm:space-y-8">
        {/* Home Price Input */}
        <div className="group">
          <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
            <span>Home Price</span>
            <span className="text-brand-500 font-black">{symbol}</span>
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xl pointer-events-none">{symbol}</div>
            <input 
              type="number" 
              value={price} 
              onChange={e => setPrice(Number(e.target.value))} 
              className="w-full pl-12 pr-6 py-4 sm:py-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 dark:focus:border-brand-500 transition-all text-2xl sm:text-3xl font-black dark:text-white outline-none shadow-inner" 
            />
          </div>
        </div>

        {/* Down Payment & Interest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Down Payment %</label>
            <input 
              type="number" 
              value={downPercent} 
              onChange={e => setDownPercent(Number(e.target.value))} 
              className="w-full p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-xl font-black dark:text-white outline-none shadow-inner" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Interest Rate %</label>
            <input 
              type="number" 
              step="0.1" 
              value={rate} 
              onChange={e => setRate(Number(e.target.value))} 
              className="w-full p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-xl font-black dark:text-white outline-none shadow-inner" 
            />
          </div>
        </div>

        {/* Taxes & Insurance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Monthly Tax ({symbol})</label>
            <input 
              type="number" 
              value={taxes} 
              onChange={e => setTaxes(Number(e.target.value))} 
              className="w-full p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-xl font-black dark:text-white outline-none shadow-inner" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Monthly Ins. ({symbol})</label>
            <input 
              type="number" 
              value={insurance} 
              onChange={e => setInsurance(Number(e.target.value))} 
              className="w-full p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-xl font-black dark:text-white outline-none shadow-inner" 
            />
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-slate-900 dark:bg-black text-white p-8 sm:p-14 rounded-3xl sm:rounded-[4rem] flex flex-col justify-center space-y-8 sm:space-y-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-[0.03] text-[8rem] sm:text-[12rem] font-black pointer-events-none select-none italic leading-none">
          {symbol}
        </div>
        
        <div className="text-center relative z-10">
          <p className="text-brand-500 uppercase text-[10px] sm:text-xs font-black tracking-[0.4em] mb-4 sm:mb-6">Total Monthly Cost</p>
          <p className="text-5xl xs:text-6xl sm:text-8xl font-black text-white tracking-tighter break-words px-2">
            {formatCurrency(result.total, currency)}
          </p>
          <div className="mt-8 inline-block px-6 py-2 rounded-full bg-brand-500/10 text-brand-400 text-[10px] font-black tracking-widest border border-brand-500/20 uppercase">
            All Costs Included
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-10 pt-8 sm:pt-12 border-t border-white/10 relative z-10">
          <div className="text-center">
            <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">P & I Only</p>
            <p className="text-lg sm:text-2xl font-black text-brand-200">{formatCurrency(result.pAndI, currency)}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Loan Principal</p>
            <p className="text-lg sm:text-2xl font-black text-brand-200">{formatCurrency(result.principal, currency)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
