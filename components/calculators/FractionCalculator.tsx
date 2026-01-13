
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

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-2">
          <input type="number" value={n1} onChange={e => setN1(Number(e.target.value))} className="w-20 p-4 text-center bg-slate-50 rounded-xl border-2 border-slate-200 font-bold" />
          <div className="h-1 bg-slate-900 w-full rounded-full"></div>
          <input type="number" value={d1} onChange={e => setD1(Number(e.target.value))} className="w-20 p-4 text-center bg-slate-50 rounded-xl border-2 border-slate-200 font-bold" />
        </div>
        <select value={op} onChange={e => setOp(e.target.value)} className="p-4 bg-slate-900 text-white rounded-xl font-black text-2xl">
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <div className="flex flex-col gap-2">
          <input type="number" value={n2} onChange={e => setN2(Number(e.target.value))} className="w-20 p-4 text-center bg-slate-50 rounded-xl border-2 border-slate-200 font-bold" />
          <div className="h-1 bg-slate-900 w-full rounded-full"></div>
          <input type="number" value={d2} onChange={e => setD2(Number(e.target.value))} className="w-20 p-4 text-center bg-slate-50 rounded-xl border-2 border-slate-200 font-bold" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-slate-400 uppercase font-black text-xs tracking-widest mb-4">Simplified Result</p>
        <p className="text-6xl font-black text-brand-500">{result}</p>
      </div>
    </div>
  );
};

export default FractionCalculator;
