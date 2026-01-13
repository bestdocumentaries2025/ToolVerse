
import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = useState(10);
  const [val2, setVal2] = useState(100);
  
  const [change1, setChange1] = useState(100);
  const [change2, setChange2] = useState(120);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Basic Percentage</h3>
        <div className="flex flex-wrap items-center gap-4 text-xl font-bold">
          <span>What is</span>
          <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-24 p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-center ring-1 ring-slate-200 dark:ring-slate-700" />
          <span>% of</span>
          <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-32 p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-center ring-1 ring-slate-200 dark:ring-slate-700" />
          <span>?</span>
          <div className="bg-brand-500 text-white px-4 py-2 rounded-lg ml-auto">{(val1/100 * val2).toFixed(2)}</div>
        </div>
      </div>

      <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-700">
        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Percentage Increase/Decrease</h3>
        <div className="flex flex-wrap items-center gap-4 text-xl font-bold">
          <span>From</span>
          <input type="number" value={change1} onChange={e => setChange1(Number(e.target.value))} className="w-32 p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-center ring-1 ring-slate-200 dark:ring-slate-700" />
          <span>to</span>
          <input type="number" value={change2} onChange={e => setChange2(Number(e.target.value))} className="w-32 p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-center ring-1 ring-slate-200 dark:ring-slate-700" />
          <span>is</span>
          <div className={`px-4 py-2 rounded-lg ml-auto text-white ${change2 >= change1 ? 'bg-green-500' : 'bg-red-500'}`}>
            {(((change2 - change1) / Math.abs(change1)) * 100).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;
