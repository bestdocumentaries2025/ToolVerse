
import React, { useState } from 'react';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');

  const transform = (mode: string) => {
    if (mode === 'upper') setText(text.toUpperCase());
    if (mode === 'lower') setText(text.toLowerCase());
    if (mode === 'title') setText(text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
    if (mode === 'sentence') setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button onClick={() => transform('upper')} className="p-3 bg-slate-100 rounded-lg text-xs font-bold uppercase hover:bg-slate-200">UPPERCASE</button>
        <button onClick={() => transform('lower')} className="p-3 bg-slate-100 rounded-lg text-xs font-bold lowercase hover:bg-slate-200">lowercase</button>
        <button onClick={() => transform('title')} className="p-3 bg-slate-100 rounded-lg text-xs font-bold capitalize hover:bg-slate-200">Title Case</button>
        <button onClick={() => transform('sentence')} className="p-3 bg-slate-100 rounded-lg text-xs font-bold hover:bg-slate-200">Sentence Case</button>
      </div>
      <textarea 
        value={text} 
        onChange={e => setText(e.target.value)}
        className="w-full h-64 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-brand-500 text-lg leading-relaxed font-medium"
        placeholder="Input text to change case..."
      />
      <button onClick={() => navigator.clipboard.writeText(text)} className="w-full p-4 bg-slate-900 text-white rounded-xl font-bold">COPY TO CLIPBOARD</button>
    </div>
  );
};

export default CaseConverter;
