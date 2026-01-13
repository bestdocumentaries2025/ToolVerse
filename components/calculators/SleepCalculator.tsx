
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
    <div className="flex flex-col items-center gap-8 md:gap-12 py-4 md:py-6 w-full">
      {/* Input Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 w-full">
        <h2 className="text-xs md:text-lg font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">I want to wake up at</h2>
        
        {/* Strictly Centered Time Container */}
        <div className="relative flex justify-center w-full">
          <div className="relative group w-full max-w-[280px] md:max-w-[400px]">
            <input 
              type="time" 
              value={wakeUpTime} 
              onChange={e => setWakeUpTime(e.target.value)} 
              className="w-full text-5xl md:text-8xl font-black bg-transparent border-b-8 border-brand-500 outline-none text-brand-600 dark:text-brand-400 pb-4 text-center transition-all focus:border-brand-600 cursor-pointer appearance-none block"
              style={{ 
                textAlign: 'center',
                justifyContent: 'center',
                display: 'flex'
              }}
            />
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-500/20 blur-sm pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-2xl px-2">
        <p className="text-center text-[10px] md:text-xs font-black text-slate-400 dark:text-slate-500 mb-10 uppercase tracking-[0.4em] leading-relaxed">
          Optimal sleep times to wake up refreshed:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sleepTimes.map((time, i) => (
            <div 
              key={i} 
              className={`
                group p-8 rounded-[3rem] text-center border-2 transition-all duration-500 relative overflow-hidden
                ${i === 0 
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10 shadow-2xl shadow-brand-500/10' 
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 opacity-90 hover:opacity-100 hover:border-brand-500/40 hover:shadow-xl'}
              `}
            >
              {i === 0 && (
                <div className="absolute top-0 right-0 bg-brand-500 text-white text-[8px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                  Optimal
                </div>
              )}
              
              <div className="flex flex-col items-center">
                <span className={`text-[10px] font-black uppercase tracking-widest mb-4 ${i === 0 ? 'text-brand-600' : 'text-slate-400'}`}>
                  {i === 0 ? 'Best Choice' : `Option ${i + 1}`}
                </span>
                
                <p className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter mb-4">
                  {time}
                </p>
                
                <div className={`h-1.5 w-16 rounded-full mb-6 ${i === 0 ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                
                <div className="space-y-1">
                   <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                     {6 - i} Sleep Cycles
                   </p>
                   <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest opacity-70">
                     {9 - (i * 1.5)} Hours Total
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Knowledge Base */}
      <div className="max-w-lg w-full p-8 bg-slate-100/50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-start gap-4">
           <div className="text-2xl">💡</div>
           <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest dark:text-white">How it works</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Calculations account for the standard <strong>14 minutes</strong> needed to fall asleep. 
                Waking up between 90-minute sleep cycles prevents <em>Sleep Inertia</em> (that heavy, groggy feeling).
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SleepCalculator;
