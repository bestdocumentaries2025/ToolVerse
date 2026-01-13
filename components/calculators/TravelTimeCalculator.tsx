
import React, { useState, useEffect } from 'react';

type TravelMode = 'walking' | 'cycling' | 'car' | 'transit';

const SPEEDS: Record<TravelMode, number> = {
  walking: 5,   // km/h
  cycling: 18,  // km/h
  car: 80,      // km/h
  transit: 40,  // km/h
};

const TravelTimeCalculator: React.FC = () => {
  const [distance, setDistance] = useState(10);
  const [mode, setMode] = useState<TravelMode>('car');
  const [result, setResult] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const totalHours = distance / SPEEDS[mode];
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    setResult({ hours, minutes });
  }, [distance, mode]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(SPEEDS) as TravelMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`
              p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border-2
              ${mode === m 
                ? 'bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-500/20' 
                : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'}
            `}
          >
            <span className="text-2xl">
              {m === 'walking' ? '🚶' : m === 'cycling' ? '🚲' : m === 'car' ? '🚗' : '🚌'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">{m}</span>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
              Distance (Kilometers)
            </label>
            <input 
              type="number" 
              value={distance} 
              onChange={e => setDistance(Math.max(0, Number(e.target.value)))} 
              className="w-full p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-4xl font-black dark:text-white transition-all shadow-inner" 
            />
            <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1">
              Estimated Average Speed: {SPEEDS[mode]} km/h
            </p>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-black text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center text-center">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-black italic select-none">TIME</div>
          <p className="text-brand-500 uppercase text-[10px] font-black tracking-[0.4em] mb-4">Estimated Travel Duration</p>
          <div className="flex justify-center items-baseline gap-2">
            <span className="text-7xl font-black tracking-tighter">{result.hours}</span>
            <span className="text-xl font-bold text-slate-500">HRS</span>
            <span className="text-7xl font-black tracking-tighter ml-4">{result.minutes}</span>
            <span className="text-xl font-bold text-slate-500">MIN</span>
          </div>
          <p className="mt-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Based on {mode} speed standards
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelTimeCalculator;
