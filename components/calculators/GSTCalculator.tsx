
import React, { useState, useEffect, useMemo } from 'react';
import { useCurrency } from '../../App';
import { formatCurrency, getCurrencySymbol, TAX_DATA, TaxInfo } from '../../utils/math';

const GSTCalculator: React.FC = () => {
  const { currency: globalCurrency } = useCurrency();
  const [selectedRegion, setSelectedRegion] = useState(globalCurrency);
  const [amount, setAmount] = useState(1000);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  
  const taxInfo: TaxInfo = useMemo(() => {
    return TAX_DATA[selectedRegion] || { 
      country: 'Global', 
      name: 'VAT', 
      fullName: 'Value Added Tax', 
      rates: [5, 10, 15, 20], 
      currency: selectedRegion 
    };
  }, [selectedRegion]);

  const [rate, setRate] = useState(taxInfo.rates[0]);

  useEffect(() => {
    setRate(taxInfo.rates[0] || 18);
  }, [taxInfo]);

  const symbol = getCurrencySymbol(selectedRegion);

  const results = useMemo(() => {
    let net = 0;
    let tax = 0;
    let total = 0;

    if (mode === 'add') {
      net = amount;
      tax = amount * (rate / 100);
      total = net + tax;
    } else {
      total = amount;
      net = total / (1 + rate / 100);
      tax = total - net;
    }

    return { net, tax, total };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-10 h-10 bg-brand-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl">🌍</div>
          <div className="flex-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tax System</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent font-black text-base sm:text-lg outline-none dark:text-white cursor-pointer w-full"
            >
              {Object.keys(TAX_DATA).map(code => (
                <option key={code} value={code} className="dark:bg-slate-800">{TAX_DATA[code].country} ({TAX_DATA[code].name})</option>
              ))}
              <option value="GLOBAL" className="dark:bg-slate-800">Generic VAT</option>
            </select>
          </div>
        </div>

        <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 w-full md:w-auto">
          <button 
            onClick={() => setMode('add')}
            className={`flex-1 md:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all uppercase tracking-tighter ${mode === 'add' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400'}`}
          >
            Add {taxInfo.name}
          </button>
          <button 
            onClick={() => setMode('remove')}
            className={`flex-1 md:px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all uppercase tracking-tighter ${mode === 'remove' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400'}`}
          >
            Remove {taxInfo.name}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
        <div className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
              {mode === 'add' ? 'Amount (Excl. Tax)' : 'Amount (Incl. Tax)'}
            </label>
            <div className="relative">
              <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 dark:text-slate-600 text-xl sm:text-2xl">{symbol}</span>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(Number(e.target.value))} 
                className="w-full pl-10 sm:pl-14 pr-6 sm:pr-8 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-2xl sm:text-4xl font-black dark:text-white transition-all shadow-inner" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Standard {taxInfo.name} Rates</label>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {taxInfo.rates.map(r => (
                <button 
                  key={r} 
                  onClick={() => setRate(r)} 
                  className={`py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black transition-all border-2 flex flex-col items-center justify-center ${rate === r ? 'bg-slate-900 border-slate-900 text-white shadow-xl dark:bg-brand-600 dark:border-brand-600' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'}`}
                >
                  <span className="text-sm sm:text-xl">{r}%</span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Or Input Custom Rate (%)</label>
              <input 
                type="number" 
                value={rate} 
                onChange={e => setRate(Number(e.target.value))} 
                className="w-full px-6 py-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none font-bold dark:text-white shadow-sm" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 lg:p-12 flex flex-col shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-[0.03] text-7xl sm:text-[10rem] font-black pointer-events-none select-none italic leading-none">{taxInfo.name}</div>
          
          <div className="mb-6 sm:mb-8 border-b border-slate-100 dark:border-slate-700 pb-6 sm:pb-8">
            <h3 className="text-[10px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-[0.4em] mb-4">Summary</h3>
            <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1">
              <span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase">Final Gross Value</span>
              <span className="text-3xl xs:text-4xl sm:text-5xl font-black dark:text-white tracking-tighter break-all">{formatCurrency(results.total, selectedRegion)}</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
             <div className="flex justify-between items-center py-1 sm:py-2">
                <span className="text-slate-500 font-bold text-xs sm:text-sm">Net Price</span>
                <span className="font-black dark:text-white text-sm sm:text-base">{formatCurrency(results.net, selectedRegion)}</span>
             </div>
             <div className="flex justify-between items-center py-1 sm:py-2 border-b border-dashed border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 font-bold text-xs sm:text-sm">Total {taxInfo.name} ({rate}%)</span>
                <span className="font-black text-brand-600 dark:text-brand-400 text-sm sm:text-base">{formatCurrency(results.tax, selectedRegion)}</span>
             </div>
          </div>

          {taxInfo.hasBreakdown && (
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 space-y-2 sm:space-y-3 border border-slate-100 dark:border-slate-800">
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Breakdown</p>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400">CGST — {rate/2}%</span>
                <span className="text-[10px] sm:text-xs font-black dark:text-white">{formatCurrency(results.tax / 2, selectedRegion)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400">SGST — {rate/2}%</span>
                <span className="text-[10px] sm:text-xs font-black dark:text-white">{formatCurrency(results.tax / 2, selectedRegion)}</span>
              </div>
            </div>
          )}

          <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-2 sm:gap-3 text-slate-400">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Compliant {taxInfo.country} Rules</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;
