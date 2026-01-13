
import React, { useState, useEffect } from 'react';

const WaterIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState(70);
  const [exercise, setExercise] = useState(30); // minutes
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Basic formula: weight (kg) * 0.033 + (minutes of exercise / 30) * 0.35
    const intake = (weight * 0.033) + (exercise / 30) * 0.35;
    setResult(parseFloat(intake.toFixed(2)));
  }, [weight, exercise]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Your Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none text-2xl font-bold" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Daily Exercise (minutes)</label>
          <input type="number" value={exercise} onChange={e => setExercise(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 outline-none text-2xl font-bold" />
        </div>
      </div>
      <div className="bg-blue-500 text-white p-10 rounded-3xl text-center space-y-4 shadow-xl shadow-blue-200">
        <div className="text-6xl mb-4">🥤</div>
        <p className="text-blue-100 uppercase tracking-widest text-xs font-black">Recommended Daily Intake</p>
        <p className="text-6xl font-black">{result} <span className="text-xl">Liters</span></p>
        <p className="text-sm opacity-80">That's roughly {Math.round(result / 0.25)} glasses (250ml each).</p>
      </div>
    </div>
  );
};

export default WaterIntakeCalculator;
