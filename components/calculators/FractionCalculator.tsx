
import React, { useState, useEffect } from 'react';

const FractionCalculator: React.FC = () => {
  const [n1, setN1] = useState(1);
  const [d1, setD1] = useState(2);
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(3);
  const [op, setOp] = useState('+');
  const [result, setResult] = useState('');

  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

  useEffect(() => {
    let resN = 0, resD = 0;
    if (op === '+') { resN = n1 * d2 + n2 * d1; resD = d1 * d2; }
    if (op === '-') { resN = n1 * d2 - n2 * d1; resD = d1 * d2; }
    if (op === '*') { resN = n1 * n2; resD = d1 * d2; }
    if (op === '/') { resN = n1 * d2; resD = d1 * n2; }

    const common = Math.abs(gcd(resN, resD));
    setResult(`${resN / common} / ${resD / common}`);
  }, [n1, d1, n2, d2, op]);

  const FractionInput = ({ n, setN, d, setD }: any) => (
    <div className="flex flex-col gap-2 items-center">
      <input 
        type="number" 
        value={n} 
        onChange={e => setN(Number(e.target.value))} 
        className="w-16 sm:w-24 p-3 sm:p-5 text-center bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 font-black text-xl sm:text-2xl dark:text-white" 
      />
      <div className="h-1.5 bg-slate-900 dark:bg-slate-700 w-full rounded-full"></div>
      <input 
        type="number" 
        value={d} 
        onChange={e => setD(Number(e.target.value))} 
        className="w-16 sm:w-24 p-3 sm:p-5 text-center bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 font-black text-xl sm:text-2xl dark:text-white" 
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8 sm:gap-12 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <FractionInput n={n1} setN={setN1} d={d1} setD={setD1} />
        
        <div className="flex items-center justify-center">
          <select 
            value={op} 
            onChange={e => setOp(e.target.value)} 
            className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl font-black text-2xl sm:text-4xl shadow-xl hover:scale-105 transition-transform appearance-none cursor-pointer"
          >
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </div>

        <FractionInput n={n2} setN={setN2} d={d2} setD={setD2} />
      </div>

      <div className="w-full max-w-sm p-8 sm:p-12 bg-brand-50 dark:bg-brand-900/10 rounded-[3rem] border-2 border-brand-100 dark:border-brand-900/20 text-center shadow-inner relative overflow-hidden">
        <p className="text-brand-600 dark:text-brand-400 uppercase font-black text-[10px] sm:text-xs tracking-[0.4em] mb-4 sm:mb-6">Simplified Result</p>
        <div className="relative z-10">
           <p className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter break-words">
             {result}
           </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black pointer-events-none">½</div>
      </div>
    </div>
  );
};

export default FractionCalculator;
