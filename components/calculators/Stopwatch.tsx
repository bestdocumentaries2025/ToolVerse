
import React, { useState, useEffect, useRef } from 'react';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      const startTime = Date.now() - time;
      timerRef.current = window.setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return {
      h: hours.toString().padStart(2, '0'),
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0'),
      cs: centiseconds.toString().padStart(2, '0'),
    };
  };

  const t = formatTime(time);

  return (
    <div className="flex flex-col items-center py-6">
      {/* Display */}
      <div className="bg-slate-900 dark:bg-black p-10 md:p-16 rounded-[4rem] shadow-2xl w-full max-w-2xl text-center relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-[12rem] font-black italic select-none">RUN</div>
        <div className="relative z-10 font-mono flex items-center justify-center gap-1 md:gap-4 text-white">
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-8xl font-black">{t.m}</span>
            <span className="text-[10px] font-black text-slate-500">MIN</span>
          </div>
          <span className="text-4xl md:text-7xl font-black text-brand-500 mt-[-1rem]">:</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-8xl font-black">{t.s}</span>
            <span className="text-[10px] font-black text-slate-500">SEC</span>
          </div>
          <span className="text-4xl md:text-7xl font-black text-brand-500 mt-[-1rem]">.</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black text-brand-400 mt-2">{t.cs}</span>
            <span className="text-[10px] font-black text-slate-500">MS</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 w-full mb-12">
        <button 
          onClick={() => setRunning(!running)}
          className={`px-12 py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-90 ${running ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20'}`}
        >
          {running ? 'STOP' : 'START'}
        </button>
        <button 
          onClick={() => setLaps([time, ...laps])}
          disabled={!running}
          className="px-12 py-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xl disabled:opacity-50 active:scale-90"
        >
          LAP
        </button>
        <button 
          onClick={() => { setRunning(false); setTime(0); setLaps([]); }}
          className="px-8 py-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-black text-lg active:scale-90"
        >
          RESET
        </button>
      </div>

      {/* Laps List */}
      {laps.length > 0 && (
        <div className="w-full max-w-xl space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 px-4">Recorded Laps</h3>
          <div className="max-h-64 overflow-y-auto space-y-2 px-2 custom-scrollbar">
            {laps.map((lap, i) => {
              const lt = formatTime(lap);
              return (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-black text-slate-400">LAP {laps.length - i}</span>
                  <span className="font-mono font-black dark:text-white">
                    {lt.m}:{lt.s}.<span className="text-brand-500">{lt.cs}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
