
// import React, { useState, useEffect } from 'react';
// import { useCurrency } from '../../App';
// import { formatCurrency, getCurrencySymbol } from '../../utils/math';

// const CpmCalculator: React.FC = () => {
//   const { currency } = useCurrency();
//   const symbol = getCurrencySymbol(currency);
  
//   const [cost, setCost] = useState(1000);
//   const [impressions, setImpressions] = useState(100000);
//   const [cpm, setCpm] = useState(0);

//   useEffect(() => {
//     if (impressions > 0) {
//       setCpm(parseFloat(((cost / impressions) * 1000).toFixed(2)));
//     } else {
//       setCpm(0);
//     }
//   }, [cost, impressions]);

//   return (
//     <div className="grid md:grid-cols-2 gap-10">
//       <div className="space-y-6">
//         <div>
//           <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">
//             Total Ad Spend ({symbol})
//           </label>
//           <div className="relative">
//             <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{symbol}</span>
//             <input 
//               type="number" 
//               value={cost} 
//               onChange={e => setCost(Number(e.target.value))} 
//               className="w-full pl-12 pr-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-2xl font-black outline-none transition-all dark:text-white" 
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Total Impressions</label>
//           <input 
//             type="number" 
//             value={impressions} 
//             onChange={e => setImpressions(Number(e.target.value))} 
//             className="w-full px-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 text-2xl font-black outline-none transition-all dark:text-white" 
//           />
//         </div>
//       </div>
//       <div className="bg-brand-600 text-white p-12 rounded-[3rem] text-center shadow-2xl flex flex-col justify-center items-center relative overflow-hidden">
//         <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl font-black pointer-events-none select-none italic">CPM</div>
//         <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-70">Calculated CPM</p>
//         <p className="text-7xl font-black tracking-tighter mb-2">{formatCurrency(cpm, currency)}</p>
//         <p className="mt-4 text-sm font-bold opacity-80 leading-relaxed max-w-xs">
//           Your cost for every 1,000 impressions based on a total budget of {formatCurrency(cost, currency)}.
//         </p>
//         <div className="mt-8 px-6 py-2 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest border border-white/30 backdrop-blur-md">
//           DYNAMIC CURRENCY: {currency}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CpmCalculator;






import React, { useState, useEffect, useMemo } from 'react';
import { useCurrency } from '../../App';
import { formatCurrency, getCurrencySymbol, CURRENCIES } from '../../utils/math';

const CpmCalculator: React.FC = () => {
  const { currency: globalCurrency } = useCurrency();
  
  // Local state for the specific currency being calculated
  const [selectedCurrency, setSelectedCurrency] = useState(globalCurrency);
  const [cost, setCost] = useState(1000);
  const [impressions, setImpressions] = useState(100000);
  const [cpm, setCpm] = useState(0);

  // Sync with global currency on mount
  useEffect(() => {
    setSelectedCurrency(globalCurrency);
  }, [globalCurrency]);

  const symbol = useMemo(() => getCurrencySymbol(selectedCurrency), [selectedCurrency]);

  useEffect(() => {
    if (impressions > 0) {
      setCpm(parseFloat(((cost / impressions) * 1000).toFixed(2)));
    } else {
      setCpm(0);
    }
  }, [cost, impressions]);

  return (
    <div className="space-y-10">
      {/* Top Controls: Local Currency Selection */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white text-xl">💹</div>
          <div className="flex-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Campaign Currency</label>
            <select 
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent font-black text-lg outline-none dark:text-white cursor-pointer w-full"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>
        </div>
        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Rate</p>
           <p className="text-xs font-bold dark:text-brand-400">Standard Advertising Unit (1,000 Impressions)</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          {/* Cost Input */}
          <div className="group">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">
              Total Ad Spend / Budget
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl">{symbol}</span>
              <input 
                type="number" 
                value={cost} 
                onChange={e => setCost(Number(e.target.value))} 
                className="w-full pl-14 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-4xl font-black dark:text-white transition-all shadow-inner" 
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Impressions Input */}
          <div className="group">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">
              Total Impressions Delivered
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl">👁️</span>
              <input 
                type="number" 
                value={impressions} 
                onChange={e => setImpressions(Number(e.target.value))} 
                className="w-full pl-14 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-4xl font-black dark:text-white transition-all shadow-inner" 
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-900 dark:bg-black text-white p-12 rounded-[3.5rem] shadow-2xl flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[10rem] font-black pointer-events-none select-none italic leading-none">CPM</div>
          
          <div className="text-center relative z-10 w-full">
            <h3 className="text-xs font-black text-brand-500 uppercase tracking-[0.4em] mb-6">Campaign Performance Result</h3>
            
            <div className="space-y-2 mb-10">
              <p className="text-8xl font-black tracking-tighter text-white">
                {formatCurrency(cpm, selectedCurrency)}
              </p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Cost Per 1,000 Impressions</p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 text-left">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cost Per View</p>
                <p className="text-lg font-black text-brand-200">
                  {formatCurrency(cost / (impressions || 1), selectedCurrency)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency Rating</p>
                <p className={`text-lg font-black ${cpm < 10 ? 'text-green-400' : cpm < 30 ? 'text-amber-400' : 'text-red-400'}`}>
                  {cpm < 10 ? 'High' : cpm < 30 ? 'Moderate' : 'Low'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-3 text-slate-500 relative z-10">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Live CPM Calculation — {selectedCurrency} Market</span>
          </div>
        </div>
      </div>

      {/* Benchmark Footer */}
      <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="text-4xl">📊</div>
          <div>
            <h4 className="font-black text-blue-900 dark:text-blue-300 uppercase tracking-widest text-sm mb-1">Ad Operations Note</h4>
            <p className="text-sm text-blue-800/70 dark:text-blue-400/70 leading-relaxed">
              CPM (Cost Per Mille) is the standard metric for buying and selling ad inventory. A "Mille" represents 1,000 units of impressions. Your campaign in <strong>{selectedCurrency}</strong> shows a delivery efficiency of {formatCurrency(cpm, selectedCurrency)} per unit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CpmCalculator;
