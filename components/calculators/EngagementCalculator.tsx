
import React, { useState, useEffect } from 'react';

const EngagementCalculator: React.FC = () => {
  const [likes, setLikes] = useState(1200);
  const [comments, setComments] = useState(45);
  const [shares, setShares] = useState(12);
  const [followers, setFollowers] = useState(15000);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const rate = ((likes + comments + shares) / followers) * 100;
    setResult(parseFloat(rate.toFixed(2)));
  }, [likes, comments, shares, followers]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Likes</label>
          <input type="number" value={likes} onChange={e => setLikes(Number(e.target.value))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 font-bold" />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Comments</label>
          <input type="number" value={comments} onChange={e => setComments(Number(e.target.value))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 font-bold" />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Shares/Saves</label>
          <input type="number" value={shares} onChange={e => setShares(Number(e.target.value))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 font-bold" />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Total Followers</label>
          <input type="number" value={followers} onChange={e => setFollowers(Number(e.target.value))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 font-bold" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white p-10 rounded-3xl text-center shadow-xl">
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Engagement Rate</p>
        <p className="text-7xl font-black">{result}%</p>
        <div className="mt-6 flex justify-center gap-2">
          {result < 1 ? '😴 Poor' : result < 3 ? '👌 Good' : '🚀 Excellent!'}
        </div>
      </div>
    </div>
  );
};

export default EngagementCalculator;
