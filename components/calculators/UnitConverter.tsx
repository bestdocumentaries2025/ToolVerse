
import React, { useState, useEffect } from 'react';

const units = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    feet: 3.28084,
    inches: 39.3701,
    miles: 0.000621371
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274
  }
};

const UnitConverter: React.FC = () => {
  const [type, setType] = useState<'length' | 'weight' | 'temp'>('length');
  const [val1, setVal1] = useState<number>(1);
  const [val2, setVal2] = useState<number>(0);
  const [unit1, setUnit1] = useState('meters');
  const [unit2, setUnit2] = useState('feet');

  useEffect(() => {
    if (type === 'temp') {
      if (unit1 === 'c' && unit2 === 'f') setVal2((val1 * 9/5) + 32);
      else if (unit1 === 'f' && unit2 === 'c') setVal2((val1 - 32) * 5/9);
      else setVal2(val1);
    } else {
      const base = val1 / units[type][unit1];
      setVal2(base * units[type][unit2]);
    }
  }, [val1, unit1, unit2, type]);

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        {['length', 'weight', 'temp'].map(t => (
          <button key={t} onClick={() => { setType(t as any); setUnit1(t === 'temp' ? 'c' : Object.keys(units[t])[0]); setUnit2(t === 'temp' ? 'f' : Object.keys(units[t])[1]); }} className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all ${type === t ? 'bg-brand-500 text-white shadow-lg shadow-brand-200' : 'bg-slate-100 dark:bg-slate-900 text-slate-500'}`}>{t}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <input type="number" value={val1} onChange={(e) => setVal1(Number(e.target.value))} className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 text-3xl font-black outline-none focus:ring-2 focus:ring-brand-500" />
          <select value={unit1} onChange={(e) => setUnit1(e.target.value)} className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 font-bold outline-none">
            {type === 'temp' ? [<option key="c" value="c">Celsius</option>, <option key="f" value="f">Fahrenheit</option>] : Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="flex justify-center text-slate-300 dark:text-slate-600"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></div>
        <div className="space-y-4">
          <div className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 text-3xl font-black text-brand-600">{val2.toFixed(4)}</div>
          <select value={unit2} onChange={(e) => setUnit2(e.target.value)} className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 font-bold outline-none">
            {type === 'temp' ? [<option key="c" value="c">Celsius</option>, <option key="f" value="f">Fahrenheit</option>] : Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
