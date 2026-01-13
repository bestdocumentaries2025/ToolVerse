
import React, { useState } from 'react';

const TextTools: React.FC = () => {
  const [input, setInput] = useState('');
  
  const toUpperCase = () => setInput(input.toUpperCase());
  const toLowerCase = () => setInput(input.toLowerCase());
  const toTitleCase = () => setInput(input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
  
  const generateLorem = (sentences = 3) => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
    setInput(lorem.repeat(sentences));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={toUpperCase} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold uppercase">UPPERCASE</button>
        <button onClick={toLowerCase} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold lowercase">lowercase</button>
        <button onClick={toTitleCase} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold capitalize">Title Case</button>
        <button onClick={() => generateLorem(3)} className="px-4 py-2 bg-brand-50 text-brand-600 rounded-lg text-xs font-bold ml-auto">Generate Lorem Ipsum</button>
      </div>

      <div className="relative">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 font-medium leading-relaxed resize-none"
          placeholder="Paste or type text here..."
        />
        <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400 bg-white/50 dark:bg-black/50 px-3 py-1 rounded-full">
          Characters: {input.length} | Words: {input.trim().split(/\s+/).filter(x => x).length}
        </div>
      </div>
    </div>
  );
};

export default TextTools;
