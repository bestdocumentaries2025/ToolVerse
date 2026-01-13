
import React, { useState } from 'react';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleProcess = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setError('Invalid input for ' + mode + 'ing.');
      setOutput('');
    }
  };

  React.useEffect(() => {
    if (input) handleProcess();
    else setOutput('');
  }, [input, mode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setMode('encode')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'encode' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500'}`}
        >
          Encode
        </button>
        <button 
          onClick={() => setMode('decode')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'decode' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500'}`}
        >
          Decode
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-500 outline-none resize-none font-mono text-sm dark:text-white"
            placeholder={mode === 'encode' ? "Enter plain text here..." : "Enter base64 string here..."}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Result</label>
            {output && (
              <button 
                onClick={copyToClipboard}
                className="text-xs text-brand-500 font-bold hover:underline"
              >
                Copy to Clipboard
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            className={`w-full h-48 p-4 rounded-xl border-2 border-transparent outline-none resize-none font-mono text-sm dark:text-white ${error ? 'bg-red-50 dark:bg-red-900/10 text-red-500' : 'bg-slate-50 dark:bg-slate-900'}`}
            placeholder="Result will appear here..."
          />
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
