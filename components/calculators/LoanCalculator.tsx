
import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI } from '../../utils/math';
import { useCurrency } from '../../App';

const LoanCalculator: React.FC = () => {
  const { currency } = useCurrency();
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [results, setResults] = useState({ emi: 0, totalInterest: 0, totalPayment: 0 });

  useEffect(() => {
    const emi = calculateEMI(amount, rate, tenure);
    const totalPayment = emi * tenure * 12;
    const totalInterest = totalPayment - amount;
    setResults({ emi, totalInterest, totalPayment });
  }, [amount, rate, tenure]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Loan Amount</label>
          <div className="relative">
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none text-xl font-black dark:text-white" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Interest Rate (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none text-xl font-black dark:text-white" />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Tenure (Years)</label>
          <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none text-xl font-black dark:text-white" />
        </div>
      </div>

      <div className="bg-brand-500 text-white p-8 rounded-3xl space-y-6 flex flex-col justify-center shadow-xl shadow-brand-500/20">
        <div className="text-center">
          <p className="text-brand-100 text-[10px] font-black uppercase tracking-widest mb-1">Monthly EMI</p>
          <p className="text-5xl font-black">{formatCurrency(results.emi, currency)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
          <div>
            <p className="text-brand-100 text-[10px] font-black uppercase tracking-widest">Total Interest</p>
            <p className="text-xl font-black">{formatCurrency(results.totalInterest, currency)}</p>
          </div>
          <div>
            <p className="text-brand-100 text-[10px] font-black uppercase tracking-widest">Total Payment</p>
            <p className="text-xl font-black">{formatCurrency(results.totalPayment, currency)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
