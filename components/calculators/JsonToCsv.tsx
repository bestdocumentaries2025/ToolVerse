
import React, { useState } from 'react';

const JsonToCsv: React.FC = () => {
  const [json, setJson] = useState('[\n  {"name": "John", "age": 30, "city": "New York"},\n  {"name": "Jane", "age": 25, "city": "London"}\n]');
  const [csv, setCsv] = useState('');
  const [error, setError] = useState('');

  const transform = () => {
    setError('');
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) throw new Error("Input must be a JSON Array");
      
      const keys = Object.keys(parsed[0]);
      const csvContent = [
        keys.join(','),
        ...parsed.map(row => keys.map(k => JSON.stringify(row[k])).join(','))
      ].join('\n');
      
      setCsv(csvContent);
    } catch (e: any) {
      setError(e.message);
      setCsv('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Input JSON Array</label>
          <textarea 
            value={json} 
            onChange={(e) => setJson(e.target.value)}
            className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-sm rounded-xl outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Output CSV</label>
          <textarea 
            readOnly 
            value={csv} 
            className="w-full h-64 p-4 bg-slate-100 dark:bg-slate-900 font-mono text-sm rounded-xl outline-none"
          />
        </div>
      </div>
      
      {error && <p className="text-red-500 text-xs font-bold">Error: {error}</p>}

      <div className="flex gap-4">
        <button onClick={transform} className="flex-1 p-4 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-colors">CONVERT TO CSV</button>
        {csv && (
          <button 
            onClick={() => {
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'toolverse-data.csv';
              a.click();
            }}
            className="px-8 p-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
          >
            DOWNLOAD
          </button>
        )}
      </div>
    </div>
  );
};

export default JsonToCsv;
