
import React, { useEffect, useState } from 'react';

const Support: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Help & Support | ToolVerse Hub';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">Help & Support</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Need assistance or have a suggestion for a new tool? We're here to help.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Direct Assistance</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              For bug reports, partnership inquiries, or feature requests, please reach out via the official channels.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-500">📧</div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="font-bold dark:text-white">toolversefree@protonmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-500">🐦</div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bussiness & Advertisment</p>
                  <p className="font-bold dark:text-white">toolversefree@protonmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold dark:text-white">FAQ</h3>
            <details className="group p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <summary className="cursor-pointer font-bold text-sm list-none flex justify-between items-center dark:text-slate-300">
                Are these tools free to use?
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">Yes, 100% free. We don't even require an account.</p>
            </details>
            <details className="group p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <summary className="cursor-pointer font-bold text-sm list-none flex justify-between items-center dark:text-slate-300">
                Is my data secure?
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">Absolutely. All calculations happen in your browser. We never see your data.</p>
            </details>
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="text-6xl">📬</div>
              <h2 className="text-2xl font-black text-white">Message Sent!</h2>
              <p className="text-slate-400 text-sm">We'll get back to you within 24-48 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-brand-500 font-bold hover:underline uppercase text-xs tracking-widest">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Send a Message</h3>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  className="w-full p-4 bg-slate-800 rounded-2xl border border-slate-700 outline-none focus:border-brand-500 text-white font-medium" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  className="w-full p-4 bg-slate-800 rounded-2xl border border-slate-700 outline-none focus:border-brand-500 text-white font-medium" 
                />
              </div>
              <div>
                <textarea 
                  placeholder="How can we help?" 
                  required
                  rows={4}
                  className="w-full p-4 bg-slate-800 rounded-2xl border border-slate-700 outline-none focus:border-brand-500 text-white font-medium resize-none" 
                />
              </div>
              <button type="submit" className="w-full py-5 bg-brand-500 hover:bg-brand-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-brand-500/30">
                SEND REQUEST
              </button>
            </form>
          )}
          <div className="absolute -bottom-10 -right-10 opacity-5 text-9xl font-black italic pointer-events-none">CONTACT</div>
        </div>
      </div>
    </div>
  );
};

export default Support;
