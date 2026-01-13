
import React, { useState, useEffect, useCallback } from 'react';
import { formatCurrency, CURRENCIES, getCurrencySymbol } from '../../utils/math';

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState<number>(1);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async (base: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      const data = await response.json();
      
      if (data.result === 'success') {
        setRates(data.rates);
        setLastUpdated(new Date(data.time_last_update_utc).toLocaleString());
        setError(null);
      } else {
        throw new Error('Failed to fetch exchange rates.');
      }
    } catch (err) {
      console.error(err);
      setError('Market connection failed. Using cached/approximate rates.');
      // Keep existing rates or wait for retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency, fetchRates]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const convertedAmount = rates[toCurrency] ? amount * rates[toCurrency] : 0;
  const currentRate = rates[toCurrency] || 0;

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-8">
          {/* FROM SECTION */}
          <div className="group">
            <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
              <span>Sell / From</span>
              <span className="text-brand-500 font-black">{fromCurrency}</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  {getCurrencySymbol(fromCurrency)}
                </span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(Number(e.target.value))} 
                  className="w-full pl-12 pr-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl font-black dark:text-white transition-all shadow-sm" 
                  placeholder="0.00"
                />
              </div>
              <select 
                value={fromCurrency} 
                onChange={e => setFromCurrency(e.target.value)}
                className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-sm outline-none border-2 border-transparent focus:border-brand-500 min-w-[100px]"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
             <button 
               onClick={swapCurrencies}
               className="bg-brand-500 text-white p-4 rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl shadow-brand-500/20 group"
             >
               <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
             </button>
          </div>

          {/* TO SECTION */}
          <div className="group">
            <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
              <span>Buy / To</span>
              <span className="text-brand-500 font-black">{toCurrency}</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  {getCurrencySymbol(toCurrency)}
                </span>
                <input 
                  type="number" 
                  readOnly
                  value={parseFloat(convertedAmount.toFixed(4))} 
                  className="w-full pl-12 pr-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent text-2xl font-black dark:text-white transition-all shadow-sm cursor-default" 
                />
              </div>
              <select 
                value={toCurrency} 
                onChange={e => setToCurrency(e.target.value)}
                className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-sm outline-none border-2 border-transparent focus:border-brand-500 min-w-[100px]"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-slate-900 dark:bg-black text-white p-10 rounded-[3rem] text-center shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[400px]">
          {loading && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
               <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-xs font-black tracking-widest text-brand-500">REFRESHING MARKET DATA...</p>
             </div>
          )}
          
          <div className="absolute top-0 right-0 p-10 opacity-5 text-9xl font-black pointer-events-none select-none uppercase">{toCurrency}</div>
          
          <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-brand-500">Live Market Status</p>
          <div className="space-y-1">
            <p className="text-6xl font-black tracking-tighter">
              1 <span className="text-2xl text-slate-500">{fromCurrency}</span>
            </p>
            <p className="text-2xl font-bold text-slate-500 mb-2">IS EQUAL TO</p>
            <p className="text-6xl font-black text-white tracking-tighter">
              {currentRate.toFixed(4)} <span className="text-2xl text-brand-400">{toCurrency}</span>
            </p>
          </div>
          
          <div className="mt-10 space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Base Value</span>
              <span className="font-black text-slate-300">{formatCurrency(amount, fromCurrency)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Global Result</span>
              <span className="font-black text-brand-400 text-xl">{formatCurrency(convertedAmount, toCurrency)}</span>
            </div>
          </div>

          <div className="mt-8">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Last Updated</p>
             <p className="text-xs font-black text-slate-400">{lastUpdated || 'Offline'}</p>
          </div>

          {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-red-500 uppercase">{error}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* QUICK COMPARISON SECTION */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-1">Market Benchmark Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 10, 100, 1000].map(val => (
            <div key={val} className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform">
              <p className="text-[10px] font-black text-brand-500 mb-2 uppercase tracking-widest">Buy {val} {fromCurrency}</p>
              <p className="text-2xl font-black dark:text-white">
                <span className="text-xs text-slate-400 font-bold mr-1">{getCurrencySymbol(toCurrency)}</span>
                {(val * currentRate).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
