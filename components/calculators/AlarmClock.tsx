
import React, { useState, useEffect } from 'react';

interface Alarm {
  id: number;
  time: string;
  label: string;
  enabled: boolean;
}

const AlarmClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [newTime, setNewTime] = useState('07:00');
  const [newLabel, setNewLabel] = useState('Wake Up');
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;

      const triggered = alarms.find(a => a.enabled && a.time === timeStr && now.getSeconds() === 0);
      if (triggered) {
        setActiveAlarm(triggered);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [alarms]);

  const addAlarm = () => {
    const alarm: Alarm = { id: Date.now(), time: newTime, label: newLabel, enabled: true };
    setAlarms([...alarms, alarm]);
    setNewLabel('New Alarm');
  };

  const deleteAlarm = (id: number) => setAlarms(alarms.filter(a => a.id !== id));
  const toggleAlarm = (id: number) => setAlarms(alarms.map(a => a.id === id ? {...a, enabled: !a.enabled} : a));

  return (
    <div className="space-y-12">
      {/* Current Time Display */}
      <div className="text-center space-y-2">
        <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.4em]">Current System Time</p>
        <h2 className="text-6xl md:text-9xl font-black dark:text-white tracking-tighter">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </h2>
      </div>

      {/* Trigger Modal */}
      {activeAlarm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
          <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] text-center space-y-8 max-w-md w-full animate-bounce shadow-[0_0_100px_rgba(14,165,233,0.5)]">
            <div className="text-7xl">🔔</div>
            <h3 className="text-4xl font-black dark:text-white uppercase tracking-tighter">ALARM TRIGGERED</h3>
            <p className="text-brand-500 font-black text-2xl uppercase tracking-widest">{activeAlarm.label}</p>
            <p className="text-slate-500 font-bold">{activeAlarm.time}</p>
            <button 
              onClick={() => setActiveAlarm(null)}
              className="w-full py-6 bg-brand-500 text-white rounded-3xl font-black text-xl hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-12">
        {/* Creation Form */}
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 space-y-8">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Set New Alarm</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Alarm Time</label>
              <input 
                type="time" 
                value={newTime} 
                onChange={e => setNewTime(e.target.value)}
                className="w-full text-5xl font-black bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-transparent focus:border-brand-500 outline-none dark:text-white appearance-none text-center"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Label</label>
              <input 
                type="text" 
                value={newLabel} 
                onChange={e => setNewLabel(e.target.value)}
                className="w-full p-5 bg-white dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:border-brand-500 outline-none font-bold dark:text-white"
                placeholder="Work, Gym, Medicine..."
              />
            </div>
            <button 
              onClick={addAlarm}
              className="w-full py-5 bg-slate-900 dark:bg-brand-600 text-white rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
              CREATE ALARM
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest px-4">Active Alarms</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {alarms.length === 0 ? (
              <div className="py-20 text-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
                 <span className="text-4xl opacity-20 grayscale block mb-4">🔔</span>
                 <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No Alarms Configured</p>
              </div>
            ) : (
              alarms.map(alarm => (
                <div key={alarm.id} className={`flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 transition-all ${alarm.enabled ? 'border-brand-500 shadow-lg shadow-brand-500/5' : 'border-slate-100 dark:border-slate-700 opacity-60'}`}>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black dark:text-white tracking-tighter">{alarm.time}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{alarm.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleAlarm(alarm.id)}
                      className={`w-14 h-8 rounded-full relative transition-colors ${alarm.enabled ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-600'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all shadow-md ${alarm.enabled ? 'right-1' : 'left-1'}`}></div>
                    </button>
                    <button 
                      onClick={() => deleteAlarm(alarm.id)}
                      className="text-red-500 hover:text-red-700 font-black p-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmClock;
