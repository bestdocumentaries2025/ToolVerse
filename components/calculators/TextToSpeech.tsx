
import React, { useState } from 'react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('Hello! Welcome to ToolVerse. This tool converts your text into spoken audio.');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text to speech.");
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="space-y-8">
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-48 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 font-medium text-lg leading-relaxed"
        placeholder="Enter text to speak..."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2">Speed: {rate}x</label>
            <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-brand-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2">Pitch: {pitch}</label>
            <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full accent-brand-500" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={speak} 
            className={`flex-1 p-6 rounded-2xl text-xl font-black transition-all ${speaking ? 'bg-brand-100 text-brand-600' : 'bg-brand-500 text-white shadow-xl shadow-brand-200'}`}
          >
            {speaking ? '🔊 SPEAKING...' : '▶️ PLAY AUDIO'}
          </button>
          <button onClick={stop} className="p-4 bg-red-50 text-red-600 rounded-xl font-bold text-sm">STOP</button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
