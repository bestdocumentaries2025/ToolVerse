
import React, { useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  
  const words = text.trim().split(/\s+/).filter(x => x.length > 0).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="space-y-6">
      <textarea 
        value={text} 
        onChange={e => setText(e.target.value)}
        className="w-full h-64 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-brand-500 text-lg leading-relaxed resize-none font-medium"
        placeholder="Type or paste your text here..."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Words', val: words },
          { label: 'Characters', val: chars },
          { label: 'No Spaces', val: charsNoSpace },
          { label: 'Read Time', val: `${readingTime} min` }
        ].map(stat => (
          <div key={stat.label} className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl text-center">
            <p className="text-xs font-black text-slate-500 uppercase">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordCounter;
