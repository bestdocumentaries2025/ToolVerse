
import React, { useState, useEffect } from 'react';

const AirTravelCalculator: React.FC = () => {
  const [distance, setDistance] = useState(2500);
  const [airportBuffer, setAirportBuffer] = useState(45); // mins for takeoff/landing
  const [cruiseSpeed, setCruiseSpeed] = useState(850); // km/h
  const [result, setResult] = useState({ hours: 0, minutes: 0, totalMins: 0 });

  useEffect(() => {
    const flightTimeHours = distance / cruiseSpeed;
    const totalMinutes = Math.round(flightTimeHours * 60 + airportBuffer);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setResult({ hours, minutes, totalMins: totalMinutes });
  }, [distance, airportBuffer, cruiseSpeed]);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
            Flight Distance (km)
          </label>
          <input 
            type="number" 
            value={distance} 
            onChange={e => setDistance(Number(e.target.value))} 
            className="w-full p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none text-4xl font-black dark:text-white shadow-inner" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Cruise Speed (km/h)</label>
            <input 
              type="number" 
              value={cruiseSpeed} 
              onChange={e => setCruiseSpeed(Number(e.target.value))} 
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 font-bold dark:text-white border-none ring-1 ring-slate-100 dark:ring-slate-800 focus:ring-2 focus:ring-brand-500" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Overhead Buffer (min)</label>
            <input 
              type="number" 
              value={airportBuffer} 
              onChange={e => setAirportBuffer(Number(e.target.value))} 
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 font-bold dark:text-white border-none ring-1 ring-slate-100 dark:ring-slate-800 focus:ring-2 focus:ring-brand-500" 
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
           <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Industry Benchmarks</h4>
           <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500">
              <button onClick={() => { setDistance(5500); setCruiseSpeed(850); }} className="p-3 bg-white dark:bg-slate-800 rounded-xl hover:bg-brand-50 transition-colors text-left">
                London to NY (5500km)
              </button>
              <button onClick={() => { setDistance(1200); setCruiseSpeed(800); }} className="p-3 bg-white dark:bg-slate-800 rounded-xl hover:bg-brand-50 transition-colors text-left">
                Domestic (1200km)
              </button>
           </div>
        </div>
      </div>

      <div className="bg-brand-600 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col justify-center text-center">
        <div className="absolute top-0 right-0 p-12 opacity-10 text-[10rem] font-black select-none pointer-events-none italic">FLY</div>
        <p className="text-brand-100 uppercase text-[10px] font-black tracking-[0.4em] mb-6">Estimated Flight Duration</p>
        
        <div className="flex justify-center items-baseline gap-2 mb-8">
          <span className="text-8xl font-black tracking-tighter">{result.hours}</span>
          <span className="text-xl font-bold text-brand-300">HRS</span>
          <span className="text-8xl font-black tracking-tighter ml-4">{result.minutes}</span>
          <span className="text-xl font-bold text-brand-300">MIN</span>
        </div>

        <div className="bg-black/20 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-200 mb-1">Total Travel Units</p>
          <p className="text-2xl font-black">{result.totalMins} Minutes</p>
          <p className="text-[9px] font-bold opacity-60 uppercase mt-4 max-w-[200px] mx-auto">
            Includes cruise time + takeoff/landing/taxiing buffer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirTravelCalculator;
