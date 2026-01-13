
import React, { useState, useEffect } from 'react';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [chars, setChars] = useState({ uppercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');

  const generate = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (chars.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chars.numbers) charset += "0123456789";
    if (chars.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let res = "";
    for (let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(res);
  };

  useEffect(generate, []);

  const copy = () => navigator.clipboard.writeText(password);

  return (
    <div className="space-y-8">
      <div className="relative group">
        <input 
          readOnly 
          value={password} 
          className="w-full p-6 bg-slate-900 text-brand-400 font-mono text-2xl rounded-2xl text-center border-2 border-slate-800 focus:border-brand-500 transition-all outline-none"
        />
        <button onClick={copy} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
          📋 Copy
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-bold text-slate-500">Length: {length}</label>
          </div>
          <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => setChars(p => ({...p, uppercase: !p.uppercase}))} className={`p-4 rounded-xl border-2 transition-all font-bold ${chars.uppercase ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-slate-100 text-slate-400'}`}>Uppercase (A-Z)</button>
          <button onClick={() => setChars(p => ({...p, numbers: !p.numbers}))} className={`p-4 rounded-xl border-2 transition-all font-bold ${chars.numbers ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-slate-100 text-slate-400'}`}>Numbers (0-9)</button>
          <button onClick={() => setChars(p => ({...p, symbols: !p.symbols}))} className={`p-4 rounded-xl border-2 transition-all font-bold ${chars.symbols ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-slate-100 text-slate-400'}`}>Symbols (!@#)</button>
        </div>

        <button onClick={generate} className="w-full p-4 bg-brand-500 text-white rounded-xl font-black text-xl hover:bg-brand-600 active:scale-95 transition-all">GENERATE NEW</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
