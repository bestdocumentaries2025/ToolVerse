
import React, { useState } from 'react';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleProcess = () => {
    setError('');
    if (!input) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setError('Invalid input for ' + mode + 'ing. Base64 strings must be valid.');
      setOutput('');
    }
  };

  React.useEffect(() => {
    handleProcess();
  }, [input, mode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Mode Switcher */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-full sm:w-fit shadow-inner">
        <button 
          onClick={() => setMode('encode')}
          className={`flex-1 sm:px-10 py-3 rounded-xl text-xs sm:text-sm font-black transition-all uppercase tracking-widest ${mode === 'encode' ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-xl' : 'text-slate-500'}`}
        >
          Encode
        </button>
        <button 
          onClick={() => setMode('decode')}
          className={`flex-1 sm:px-10 py-3 rounded-xl text-xs sm:text-sm font-black transition-all uppercase tracking-widest ${mode === 'decode' ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-xl' : 'text-slate-500'}`}
        >
          Decode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Input Textarea */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Source Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 sm:h-72 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none resize-none font-mono text-sm dark:text-white shadow-inner transition-all"
            placeholder={mode === 'encode' ? "Paste plain text here..." : "Paste Base64 string here..."}
          />
        </div>

        {/* Result Textarea */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Processed Result</label>
            {output && (
              <button 
                onClick={copyToClipboard}
                className="text-[10px] text-brand-500 font-black uppercase tracking-widest hover:underline active:scale-95 transition-all"
              >
                Copy Text
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              className={`w-full h-48 sm:h-72 p-5 rounded-2xl border-2 border-transparent outline-none resize-none font-mono text-sm dark:text-white transition-all ${error ? 'bg-red-50 dark:bg-red-900/10 text-red-500 border-red-500/20' : 'bg-slate-50 dark:bg-slate-900 shadow-inner'}`}
              placeholder="Result will appear here..."
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
