
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
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none transition-all text-xl font-bold dark:text-white"
            placeholder="e.g. 70"
          />
          <input 
            type="range" 
            min="20" 
            max="200" 
            value={weight || 70} 
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full mt-4 accent-brand-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none transition-all text-xl font-bold dark:text-white"
            placeholder="e.g. 175"
          />
          <input 
            type="range" 
            min="100" 
            max="250" 
            value={height || 175} 
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full mt-4 accent-brand-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center space-y-4">
        {bmi ? (
          <>
            <div className="text-slate-500 dark:text-slate-400 font-medium">Your Body Mass Index is</div>
            <div className="text-6xl md:text-7xl font-black text-brand-600 dark:text-brand-400">
              {bmi}
            </div>
            <div className={`text-2xl font-bold ${color}`}>
              {category}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 max-w-xs">
              BMI is a general guideline. For a personalized health plan, consult with a medical professional.
            </p>
          </>
        ) : (
          <div className="text-slate-400 py-12 italic">
            Please enter your details to see the calculation.
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
