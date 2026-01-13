
import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');

  const handleClick = (val: string) => {
    if (display === '0') setDisplay(val);
    else if (display === 'Error') setDisplay(val);
    else setDisplay(display + val);
  };

  const calculate = () => {
    try {
      // Basic safety: replace symbols for JS eval
      const expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(');
      
      const result = eval(expression);
      setDisplay(String(Number(result.toFixed(8))));
    } catch {
      setDisplay('Error');
    }
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', 'π'],
    ['(', ')', '^', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'AC', '=']
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 dark:bg-black p-4 sm:p-6 rounded-[2.5rem] shadow-2xl">
      {/* Display */}
      <div className="bg-slate-800/50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-2xl mb-6 text-right overflow-hidden border border-slate-700/50">
        <span className="text-3xl sm:text-5xl font-black text-white truncate block tracking-tighter">
          {display}
        </span>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {buttons.flat().map(btn => (
          <button 
            key={btn}
            onClick={() => {
              if (btn === '=') calculate();
              else if (btn === 'AC') setDisplay('0');
              else handleClick(btn);
            }}
            className={`
              p-3 sm:p-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg transition-all duration-200 active:scale-95
              ${btn === '=' 
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                : btn === 'AC' 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                : isNaN(Number(btn)) && btn !== '.' 
                ? 'bg-slate-800 text-brand-400 hover:bg-slate-700' 
                : 'bg-slate-700/50 text-white hover:bg-slate-700'}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScientificCalculator;
