
import React, { useState, useEffect } from 'react';

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [date, setDate] = useState('');

  useEffect(() => {
    try {
      setDate(new Date(timestamp * 1000).toUTCString());
    } catch {
      setDate('Invalid Timestamp');
    }
  }, [timestamp]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between">
        <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Current Timestamp</span>
        <code className="text-2xl text-brand-400 font-bold">{Math.floor(Date.now() / 1000)}</code>
      </div>
      <div className="space-y-4">
        <label className="text-sm font-bold text-slate-500">Unix Timestamp (seconds)</label>
        <input type="number" value={timestamp} onChange={(e) => setTimestamp(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-2 focus:ring-brand-500 text-2xl font-mono" />
      </div>
      <div className="p-8 rounded-2xl bg-brand-50 dark:bg-brand-900/10 border-2 border-brand-100 dark:border-brand-900/20 text-center">
        <p className="text-brand-600 dark:text-brand-400 font-bold text-xl">{date}</p>
        <p className="text-slate-400 text-xs mt-2 uppercase">UTC Standard Time</p>
      </div>
    </div>
  );
};

export default TimestampConverter;
