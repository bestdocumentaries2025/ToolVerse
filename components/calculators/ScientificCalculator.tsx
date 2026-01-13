
import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');

  const handleClick = (val: string) => {
    if (display === '0') setDisplay(val);
    else setDisplay(display + val);
  };

  const calculate = () => {
    try {
      // Basic safety: replace symbols for JS eval
      const expression = display.replace('×', '*').replace('÷', '/').replace('^', '**').replace('π', 'Math.PI').replace('e', 'Math.E');
      setDisplay(String(eval(expression)));
    } catch {
      setDisplay('Error');
    }
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'π'],
    ['(', ')', '^', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'AC', '=']
  ];

  return (
    <div className="max-w-md mx-auto bg-slate-900 p-6 rounded-3xl shadow-2xl">
      <div className="bg-slate-800 p-6 rounded-2xl mb-6 text-right overflow-hidden">
        <span className="text-4xl font-mono text-white truncate block">{display}</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map(btn => (
          <button 
            key={btn}
            onClick={() => {
              if (btn === '=') calculate();
              else if (btn === 'AC') setDisplay('0');
              else handleClick(btn);
            }}
            className={`p-4 rounded-xl font-bold text-lg transition-all ${
              btn === '=' ? 'bg-brand-500 text-white col-span-1' : 
              btn === 'AC' ? 'bg-red-500 text-white' : 
              isNaN(Number(btn)) ? 'bg-slate-700 text-brand-400' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScientificCalculator;
