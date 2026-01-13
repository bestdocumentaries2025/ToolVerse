
import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency, getCurrencySymbol, CURRENCIES } from '../../utils/math';
import { useCurrency } from '../../App';

const ClvCalculator: React.FC = () => {
  const { currency: globalCurrency } = useCurrency();
  
  // Local state for the specific currency being calculated
  const [selectedCurrency, setSelectedCurrency] = useState(globalCurrency);
  
  // Inputs
  const [orderValue, setOrderValue] = useState(120);
  const [frequency, setFrequency] = useState(4); // Purchases per year
  const [lifespan, setLifespan] = useState(5);   // Years
  
  // Results
  const [totalClv, setTotalClv] = useState(0);
  const [annualValue, setAnnualValue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Sync with global currency on mount
  useEffect(() => {
    setSelectedCurrency(globalCurrency);
  }, [globalCurrency]);

  const symbol = useMemo(() => getCurrencySymbol(selectedCurrency), [selectedCurrency]);

  useEffect(() => {
    const annual = orderValue * frequency;
    const total = annual * lifespan;
    const orders = frequency * lifespan;
    
    setAnnualValue(annual);
    setTotalClv(total);
    setTotalOrders(orders);
  }, [orderValue, frequency, lifespan]);

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Top Controls: Local Currency Selection for High Precision */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-10 h-10 bg-brand-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl">💵</div>
          <div className="flex-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Valuation Currency</label>
            <select 
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent font-black text-base sm:text-lg outline-none dark:text-white cursor-pointer w-full"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>
        </div>
        <div className="hidden sm:block px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model Type</p>
           <p className="text-xs font-bold dark:text-brand-400">Standard Retrospective CLV</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
        <div className="space-y-6 sm:space-y-8">
          {/* Purchase Value Input */}
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2 sm:mb-3 px-1">
              Average Purchase Value
            </label>
            <div className="relative">
              <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-xl sm:text-2xl">{symbol}</span>
              <input 
                type="number" 
                value={orderValue} 
                onChange={e => setOrderValue(Number(e.target.value))} 
                className="w-full pl-10 sm:pl-14 pr-6 sm:pr-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl sm:text-3xl font-black dark:text-white transition-all shadow-inner" 
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Purchase Frequency Input */}
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2 sm:mb-3 px-1">
              Purchases Per Year
            </label>
            <div className="relative">
              <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-xl sm:text-2xl">🔄</span>
              <input 
                type="number" 
                value={frequency} 
                onChange={e => setFrequency(Number(e.target.value))} 
                className="w-full pl-10 sm:pl-14 pr-6 sm:pr-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl sm:text-3xl font-black dark:text-white transition-all shadow-inner" 
                placeholder="0"
              />
            </div>
          </div>

          {/* Lifespan Input */}
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2 sm:mb-3 px-1">
              Customer Lifespan
            </label>
            <div className="relative">
              <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-xl sm:text-2xl">⏳</span>
              <input 
                type="number" 
                value={lifespan} 
                onChange={e => setLifespan(Number(e.target.value))} 
                className="w-full pl-10 sm:pl-14 pr-20 sm:pr-24 py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl sm:text-3xl font-black dark:text-white transition-all shadow-inner" 
                placeholder="0"
              />
              <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 font-black text-slate-400 text-[10px] sm:text-xs uppercase tracking-widest">Years</span>
            </div>
          </div>
        </div>

        {/* Primary Result Box */}
        <div className="bg-slate-900 dark:bg-black text-white p-8 sm:p-10 md:p-14 rounded-3xl sm:rounded-[3.5rem] shadow-2xl flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-[0.03] text-7xl sm:text-[10rem] font-black pointer-events-none select-none italic leading-none">CLV</div>
          
          <div className="text-center relative z-10 w-full">
            <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.4em] mb-4 sm:mb-6">Projected Lifetime Revenue</h3>
            
            <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-10">
              <p className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white break-words">
                {formatCurrency(totalClv, selectedCurrency)}
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Gross Valuation ({selectedCurrency})</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-10 border-t border-white/10 text-left">
              <div className="space-y-1">
                <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Annual Yield</p>
                <p className="text-lg sm:text-xl font-black text-brand-300">
                  {formatCurrency(annualValue, selectedCurrency)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">Lifetime Span</p>
                <p className="text-lg sm:text-xl font-black text-white">
                  {lifespan} <span className="text-[10px] sm:text-xs text-slate-500">Years</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 flex items-center gap-2 sm:gap-3 text-slate-500 relative z-10 bg-white/5 px-4 sm:px-6 py-2 rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-500"></div>
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">Based on {totalOrders} transactions</span>
          </div>
        </div>
      </div>

      {/* Concept Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center flex sm:flex-col items-center sm:justify-center gap-4 sm:gap-0">
          <div className="text-3xl sm:mb-4">💰</div>
          <div className="text-left sm:text-center">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monetary Value</h4>
            <p className="text-xs sm:text-sm font-bold dark:text-white">Revenue potential of a single relationship.</p>
          </div>
        </div>
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center flex sm:flex-col items-center sm:justify-center gap-4 sm:gap-0">
          <div className="text-3xl sm:mb-4">📅</div>
          <div className="text-left sm:text-center">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Loyalty</h4>
            <p className="text-xs sm:text-sm font-bold dark:text-white">Expected duration of active engagement.</p>
          </div>
        </div>
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center flex sm:flex-col items-center sm:justify-center gap-4 sm:gap-0 sm:col-span-2 lg:col-span-1">
          <div className="text-3xl sm:mb-4">📈</div>
          <div className="text-left sm:text-center">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Business Scale</h4>
            <p className="text-xs sm:text-sm font-bold dark:text-white">Multiply value by span for total worth.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClvCalculator;
