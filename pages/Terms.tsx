
import React, { useEffect } from 'react';

const Terms: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Service | ToolVerse';
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Agreement effective as of May 20, 2024</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">1. Acceptance of Terms</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            By accessing and using ToolVerse, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our utility suite.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">2. Accuracy of Calculations</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            ToolVerse provides tools for informational and educational purposes only. While we strive for 100% accuracy, we do not guarantee the results. Calculations should not be used as the sole basis for critical financial, medical, or legal decisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">3. Use License</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Permission is granted to use our tools for personal or professional purposes. You may not scrape our content, reverse-engineer our tools, or use the service for any illegal activity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">4. Disclaimer of Liability</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            ToolVerse shall not be held liable for any damages arising from the use or inability to use the tools provided on this website. All services are provided "as is" without warranty of any kind.
          </p>
        </section>

        <div className="p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-sm text-center">Important Notice</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-center italic">
            "The numbers never lie, but their interpretation requires human wisdom."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
