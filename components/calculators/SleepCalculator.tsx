
import React, { useState } from 'react';

const SleepCalculator: React.FC = () => {
  const [wakeUpTime, setWakeUpTime] = useState('07:00');

  const calculateTimes = () => {
    const [h, m] = wakeUpTime.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    
    // Sleep cycles are 90 mins. Usually takes 14 mins to fall asleep.
    const cycles = [6, 5, 4, 3]; // Number of cycles
    return cycles.map(c => {
      const d = new Date(date.getTime() - (c * 90 + 14) * 60000);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
  };

  const sleepTimes = calculateTimes();

  return (
    <div className="flex flex-col items-center gap-10 py-6">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-500 uppercase tracking-widest">I want to wake up at</h2>
        <input 
          type="time" 
          value={wakeUpTime} 
          onChange={e => setWakeUpTime(e.target.value)} 
          className="text-6xl font-black bg-transparent border-b-4 border-brand-500 outline-none text-brand-600 dark:text-brand-400 p-2"
        />
      </div>

      <div className="w-full max-w-md">
        <p className="text-center text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">You should go to sleep at one of these times:</p>
        <div className="grid grid-cols-2 gap-4">
          {sleepTimes.map((time, i) => (
            <div key={i} className={`p-6 rounded-2xl text-center border-2 transition-all cursor-pointer ${i === 0 ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10' : 'border-slate-100 dark:border-slate-700 opacity-60'}`}>
              <p className="text-2xl font-black dark:text-white">{time}</p>
              <p className="text-[10px] font-bold text-slate-500 mt-1">{6 - i} cycles ({9 - (i * 1.5)}h sleep)</p>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-slate-400 italic">Calculation includes the average 14 minutes it takes to fall asleep.</p>
    </div>
  );
};

export default SleepCalculator;
