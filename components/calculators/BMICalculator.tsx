
import React, { useState, useEffect } from 'react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>(70);
  const [height, setHeight] = useState<number | ''>(175);
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string>('text-slate-500');

  useEffect(() => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBmi.toFixed(1)));
      
      if (calculatedBmi < 18.5) {
        setCategory('Underweight');
        setColor('text-blue-500');
      } else if (calculatedBmi < 25) {
        setCategory('Normal weight');
        setColor('text-green-500');
      } else if (calculatedBmi < 30) {
        setCategory('Overweight');
        setColor('text-orange-500');
      } else {
        setCategory('Obese');
        setColor('text-red-500');
      }
    } else {
      setBmi(null);
      setCategory('');
    }
  }, [weight, height]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
      <div className="space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none transition-all text-xl sm:text-2xl font-black dark:text-white"
            placeholder="e.g. 70"
          />
          <input 
            type="range" 
            min="20" 
            max="200" 
            value={weight || 70} 
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full mt-4 accent-brand-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none transition-all text-xl sm:text-2xl font-black dark:text-white"
            placeholder="e.g. 175"
          />
          <input 
            type="range" 
            min="100" 
            max="250" 
            value={height || 175} 
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full mt-4 accent-brand-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center space-y-4 min-h-[250px] sm:min-h-[350px]">
        {bmi ? (
          <>
            <div className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Your Body Mass Index</div>
            <div className="text-6xl sm:text-8xl font-black text-brand-600 dark:text-brand-400 tracking-tighter">
              {bmi}
            </div>
            <div className={`text-xl sm:text-2xl font-black uppercase tracking-widest ${color}`}>
              {category}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 max-w-[200px] font-medium leading-relaxed">
              BMI is a general guideline for adults. For personalized health advice, please consult a physician.
            </p>
          </>
        ) : (
          <div className="text-slate-400 py-12 italic font-medium">
            Enter your metrics to calculate.
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
