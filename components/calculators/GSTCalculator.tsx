
import React, { useState, useEffect, useMemo } from 'react';
import { useCurrency } from '../../App';
import { formatCurrency, getCurrencySymbol, TAX_DATA, TaxInfo } from '../../utils/math';

const GSTCalculator: React.FC = () => {
  const { currency: globalCurrency } = useCurrency();
  
  // Local state for the specific region being calculated
  const [selectedRegion, setSelectedRegion] = useState(globalCurrency);
  const [amount, setAmount] = useState(1000);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  
  // Get tax info based on region, fallback to generic VAT if not found
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

  // Sync rate when region changes
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
    <div className="space-y-10">
      {/* Top Controls: Region and Mode Selection */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white text-xl">🌍</div>
          <div className="flex-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Region / System</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent font-black text-lg outline-none dark:text-white cursor-pointer"
            >
              {Object.keys(TAX_DATA).map(code => (
                <option key={code} value={code}>{TAX_DATA[code].country} ({TAX_DATA[code].name})</option>
              ))}
              <option value="GLOBAL">Other / Generic VAT</option>
            </select>
          </div>
        </div>

        <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 w-full md:w-auto">
          <button 
            onClick={() => setMode('add')}
            className={`flex-1 md:px-8 py-3 rounded-xl text-xs font-black transition-all ${mode === 'add' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            ADD {taxInfo.name}
          </button>
          <button 
            onClick={() => setMode('remove')}
            className={`flex-1 md:px-8 py-3 rounded-xl text-xs font-black transition-all ${mode === 'remove' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            REMOVE {taxInfo.name}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          {/* Input Field */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
              {mode === 'add' ? 'Net Amount (Excl. Tax)' : 'Gross Amount (Incl. Tax)'}
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl">{symbol}</span>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(Number(e.target.value))} 
                className="w-full pl-14 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-4xl font-black dark:text-white transition-all shadow-inner" 
              />
            </div>
          </div>

          {/* Rate Selectors */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Standard {taxInfo.name} Rates</label>
            <div className="grid grid-cols-4 gap-3">
              {taxInfo.rates.map(r => (
                <button 
                  key={r} 
                  onClick={() => setRate(r)} 
                  className={`py-5 rounded-2xl font-black transition-all border-2 flex flex-col items-center justify-center ${rate === r ? 'bg-slate-900 border-slate-900 text-white shadow-xl dark:bg-brand-600 dark:border-brand-600' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400'}`}
                >
                  <span className="text-xl">{r}%</span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Or Input Custom {taxInfo.name} Rate (%)</label>
              <input 
                type="number" 
                value={rate} 
                onChange={e => setRate(Number(e.target.value))} 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none font-bold dark:text-white shadow-sm" 
              />
            </div>
          </div>
        </div>

        {/* Professional Breakdown Card */}
        <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[3rem] p-8 sm:p-12 flex flex-col shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[10rem] font-black pointer-events-none select-none italic leading-none">{taxInfo.name}</div>
          
          <div className="mb-8 border-b border-slate-100 dark:border-slate-700 pb-8">
            <h3 className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-[0.4em] mb-4">Calculation Summary</h3>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-slate-400 text-sm font-bold uppercase">Total Gross Value</span>
              <span className="text-5xl font-black dark:text-white tracking-tighter">{formatCurrency(results.total, selectedRegion)}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
             <div className="flex justify-between py-2">
                <span className="text-slate-500 font-bold text-sm">Net Price</span>
                <span className="font-black dark:text-white">{formatCurrency(results.net, selectedRegion)}</span>
             </div>
             <div className="flex justify-between py-2 border-b border-dashed border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 font-bold text-sm">Total Tax ({rate}%)</span>
                <span className="font-black text-brand-600 dark:text-brand-400">{formatCurrency(results.tax, selectedRegion)}</span>
             </div>
          </div>

          {/* Conditional Breakdown (e.g. India GST Split) */}
          {taxInfo.hasBreakdown && (
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl mb-8 space-y-3 border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed {taxInfo.name} Split</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">CGST (Central) — {rate/2}%</span>
                <span className="text-xs font-black dark:text-white">{formatCurrency(results.tax / 2, selectedRegion)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">SGST (State) — {rate/2}%</span>
                <span className="text-xs font-black dark:text-white">{formatCurrency(results.tax / 2, selectedRegion)}</span>
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-3 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Compliant with {taxInfo.country} {taxInfo.name} Regulations</span>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20 text-center">
        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Professional Disclaimer</p>
        <p className="text-xs text-amber-700/70 dark:text-amber-400/70 leading-relaxed max-w-2xl mx-auto">
          This calculator provides estimates based on current standard rates for <strong>{taxInfo.fullName}</strong>. Actual tax liabilities may vary depending on local jurisdictions, product exemptions, and business status. Always consult with a tax professional.
        </p>
      </div>
    </div>
  );
};

export default GSTCalculator;
