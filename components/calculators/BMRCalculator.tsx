
import React, { useState, useEffect } from 'react';

const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState(1.2);
  const [bmr, setBmr] = useState(0);

  useEffect(() => {
    let baseBmr = 0;
    if (gender === 'male') {
      baseBmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      baseBmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    setBmr(Math.round(baseBmr));
  }, [weight, height, age, gender]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-full mb-4">
          <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'male' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-500'}`}>Male</button>
          <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${gender === 'female' ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-500'}`}>Female</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none font-bold" />
          <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none font-bold" />
        </div>
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none font-bold" />
        <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-brand-500 outline-none font-bold">
          <option value={1.2}>Sedentary (little or no exercise)</option>
          <option value={1.375}>Lightly active (1-3 days/week)</option>
          <option value={1.55}>Moderately active (3-5 days/week)</option>
          <option value={1.725}>Very active (6-7 days/week)</option>
          <option value={1.9}>Extra active (Physical job)</option>
        </select>
      </div>
      <div className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-3xl border border-orange-100 dark:border-orange-900/20 text-center space-y-4">
        <div>
          <p className="text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest">Your BMR</p>
          <p className="text-5xl font-black text-slate-900 dark:text-white">{bmr} <span className="text-lg">kcal</span></p>
        </div>
        <div className="pt-4 border-t border-orange-200 dark:border-orange-900/30">
          <p className="text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest">Maintenance Calories</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{Math.round(bmr * activity)} <span className="text-sm">kcal/day</span></p>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculator;
