
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl w-full mb-4 shadow-inner">
          <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-black transition-all uppercase tracking-widest ${gender === 'male' ? 'bg-white dark:bg-slate-800 shadow-xl text-brand-600 dark:text-brand-400' : 'text-slate-500'}`}>Male</button>
          <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-black transition-all uppercase tracking-widest ${gender === 'female' ? 'bg-white dark:bg-slate-800 shadow-xl text-brand-600 dark:text-brand-400' : 'text-slate-500'}`}>Female</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Weight (kg)</label>
            <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-brand-500 outline-none font-black text-xl dark:text-white transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Height (cm)</label>
            <input type="number" placeholder="Height" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-brand-500 outline-none font-black text-xl dark:text-white transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Age (Years)</label>
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-brand-500 outline-none font-black text-xl dark:text-white transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-brand-500 outline-none font-bold text-sm dark:text-white cursor-pointer transition-all">
            <option value={1.2}>Sedentary (No exercise)</option>
            <option value={1.375}>Lightly active (1-3 days)</option>
            <option value={1.55}>Moderately active (3-5 days)</option>
            <option value={1.725}>Very active (6-7 days)</option>
            <option value={1.9}>Extra active (Physical job)</option>
          </select>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/10 p-8 sm:p-12 rounded-3xl sm:rounded-[3rem] border-2 border-orange-100 dark:border-orange-900/20 text-center space-y-8 flex flex-col justify-center shadow-xl">
        <div className="space-y-2">
          <p className="text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">Your Basal Metabolic Rate</p>
          <p className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
            {bmr} <span className="text-xl sm:text-2xl text-orange-500/50">kcal</span>
          </p>
        </div>
        <div className="pt-8 border-t-2 border-orange-200 dark:border-orange-900/30 space-y-2">
          <p className="text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">Daily Maintenance Needs</p>
          <p className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            {Math.round(bmr * activity)} <span className="text-lg sm:text-xl text-orange-500/50">kcal/day</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculator;
