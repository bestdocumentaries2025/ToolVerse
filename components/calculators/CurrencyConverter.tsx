
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
        setLastUpdated(new Date(data.time_last_update_utc).toLocaleString([], { hour: '2-digit', minute: '2-digit' }));
        setError(null);
      } else {
        throw new Error('Market unavailable');
      }
    } catch (err) {
      console.error(err);
      setError('Market connection failed.');
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

  const currentRate = rates[toCurrency] || 0;
  const convertedAmount = amount * currentRate;

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
        <div className="space-y-6 sm:space-y-8">
          <div className="group">
            <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
              <span>Sell / From</span>
              <span className="text-brand-500 font-black">{fromCurrency}</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-xl">{getCurrencySymbol(fromCurrency)}</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(Number(e.target.value))} 
                  className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl font-black dark:text-white transition-all shadow-inner" 
                />
              </div>
              <select 
                value={fromCurrency} 
                onChange={e => setFromCurrency(e.target.value)}
                className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-sm outline-none border-2 border-transparent focus:border-brand-500 min-w-[120px]"
              >
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
             <button onClick={swapCurrencies} className="bg-brand-500 text-white p-5 rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl shadow-brand-500/20 group">
               <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
             </button>
          </div>

          <div className="group">
            <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
              <span>Buy / To</span>
              <span className="text-brand-500 font-black">{toCurrency}</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-xl">{getCurrencySymbol(toCurrency)}</span>
                <div className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border-2 border-transparent text-2xl font-black dark:text-white truncate">
                  {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
              </div>
              <select 
                value={toCurrency} 
                onChange={e => setToCurrency(e.target.value)}
                className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-sm outline-none border-2 border-transparent focus:border-brand-500 min-w-[120px]"
              >
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-black text-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[350px] sm:min-h-[450px]">
          {loading && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
               <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-[10px] font-black tracking-widest text-brand-500">REFRESHING...</p>
             </div>
          )}
          
          <div className="absolute top-0 right-0 p-8 opacity-5 text-7xl sm:text-9xl font-black pointer-events-none uppercase">{toCurrency}</div>
          
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-brand-500 text-center">Live Market Exchange</p>
          <div className="text-center space-y-2 mb-10">
            <p className="text-4xl xs:text-5xl sm:text-6xl font-black tracking-tighter">1 <span className="text-lg sm:text-2xl text-slate-600">{fromCurrency}</span></p>
            <p className="text-xl sm:text-2xl font-bold text-slate-600">IS EQUAL TO</p>
            <p className="text-4xl xs:text-5xl sm:text-6xl font-black text-white tracking-tighter">{currentRate.toFixed(4)} <span className="text-lg sm:text-2xl text-brand-400">{toCurrency}</span></p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-8 text-left">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Base Value</p>
              <p className="text-base sm:text-lg font-black text-slate-300 truncate">{formatCurrency(amount, fromCurrency)}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Result</p>
              <p className="text-base sm:text-lg font-black text-brand-400 truncate">{formatCurrency(convertedAmount, toCurrency)}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
             <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Market Refresh: {lastUpdated || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
