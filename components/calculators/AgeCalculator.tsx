
import React, { useState, useEffect } from 'react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1995-01-01');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [next, setNext] = useState(0);

  useEffect(() => {
    const birth = new Date(birthDate);
    const now = new Date();
    
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += (months < 0) ? 12 : 0;
    }
    
    if (days < 0) {
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    setAge({ years, months, days });

    // Next birthday
    const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
    setNext(Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }, [birthDate]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <label className="block text-sm font-black text-slate-500 uppercase tracking-widest">Select Date of Birth</label>
        <input 
          type="date" 
          value={birthDate} 
          onChange={e => setBirthDate(e.target.value)} 
          className="w-full p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl ring-2 ring-slate-100 dark:ring-slate-700 outline-none text-2xl font-black text-brand-600 focus:ring-brand-500"
        />
      </div>
      <div className="space-y-4">
        <div className="p-8 bg-slate-900 text-white rounded-3xl text-center border-b-8 border-brand-500">
          <p className="text-4xl font-black">{age.years} <span className="text-xl opacity-50">years</span></p>
          <div className="mt-4 flex justify-center gap-4 text-xs font-bold text-slate-400">
            <span>{age.months} Months</span>
            <span>{age.days} Days</span>
          </div>
        </div>
        <div className="p-4 bg-brand-50 dark:bg-brand-900/10 rounded-2xl text-center border border-brand-100">
          <p className="text-[10px] font-black uppercase text-brand-600">Next Birthday in</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{next} Days</p>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
