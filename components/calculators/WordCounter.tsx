
// import React, { useState } from 'react';

// const WordCounter: React.FC = () => {
//   const [text, setText] = useState('');
  
//   const words = text.trim().split(/\s+/).filter(x => x.length > 0).length;
//   const chars = text.length;
//   const charsNoSpace = text.replace(/\s/g, '').length;
//   const readingTime = Math.ceil(words / 200);

//   return (
//     <div className="space-y-6">
//       <textarea 
//         value={text} 
//         onChange={e => setText(e.target.value)}
//         className="w-full h-64 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-brand-500 text-lg leading-relaxed resize-none font-medium"
//         placeholder="Type or paste your text here..."
//       />
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {[
//           { label: 'Words', val: words },
//           { label: 'Characters', val: chars },
//           { label: 'No Spaces', val: charsNoSpace },
//           { label: 'Read Time', val: `${readingTime} min` }
//         ].map(stat => (
//           <div key={stat.label} className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl text-center">
//             <p className="text-xs font-black text-slate-500 uppercase">{stat.label}</p>
//             <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WordCounter;













import React, { useState, useRef } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const words = text.trim().split(/\s+/).filter(x => x.length > 0).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const readingTime = Math.ceil(words / 200); // Average 200 wpm

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    // Check if it's a text-based file
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setText(content);
      }
    };
    reader.readAsText(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 sm:flex-none px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-500/20 active:scale-95"
          >
            Upload File
          </button>
          <button 
            onClick={() => setText('')}
            className="flex-1 sm:flex-none px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
          >
            Clear All
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            className="hidden" 
            accept=".txt,.md,.rtf,.json,.csv,.js,.ts,.html,.css"
          />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Supports: TXT, MD, RTF, JSON, CSV
        </p>
      </div>

      {/* Input Area / Drop Zone */}
      <div 
        className={`relative transition-all duration-300 rounded-3xl overflow-hidden border-4 border-dashed ${
          isDragging 
            ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/20 scale-[1.01]' 
            : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/30'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-brand-500/10 backdrop-blur-sm pointer-events-none">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-full shadow-2xl animate-bounce">
              <span className="text-4xl">📥</span>
            </div>
          </div>
        )}
        
        <textarea 
          value={text} 
          onChange={e => setText(e.target.value)}
          className="w-full h-64 sm:h-96 p-6 sm:p-10 bg-transparent outline-none focus:ring-0 text-base sm:text-lg leading-relaxed resize-none font-medium dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-700"
          placeholder="Paste your text here or drag a file to analyze..."
        />
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Words', val: words, icon: '📝' },
          { label: 'Characters', val: chars, icon: '🔤' },
          { label: 'No Spaces', val: charsNoSpace, icon: '✂️' },
          { label: 'Reading Time', val: `${readingTime} min`, icon: '🕒' }
        ].map((stat, idx) => (
          <div 
            key={stat.label} 
            className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group hover:border-brand-500/30 transition-colors"
          >
            <span className="text-2xl sm:text-3xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{stat.icon}</span>
            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">{stat.label}</p>
            <p className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              {stat.val}
            </p>
          </div>
        ))}
      </div>

      {/* Contextual Tip */}
      <div className="p-6 bg-brand-50 dark:bg-brand-900/10 rounded-2xl border border-brand-100 dark:border-brand-900/20 flex gap-4 items-start">
        <span className="text-xl">💡</span>
        <p className="text-xs text-brand-800 dark:text-brand-300 font-medium leading-relaxed">
          <strong>Tip:</strong> Drag any text file from your computer directly into the text area above to instantly calculate the metrics. For Word documents, copy and paste the text into the analyzer for the best results.
        </p>
      </div>
    </div>
  );
};

export default WordCounter;
