
import React, { useEffect } from 'react';

const Privacy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | ToolVerse';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Learn how ToolVerse protects your privacy. We prioritize data security and ensure your calculations remain local.');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Last updated: May 20, 2024</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">1. Data Sovereignty</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            At ToolVerse, we believe your data belongs to you. All calculations performed on our platform are processed locally within your web browser. We do not transmit your input values (such as income, BMI, or loan amounts) to our servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">2. Cookies and Local Storage</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use browser <code>localStorage</code> to store your preferences, such as your selected theme (Light/Dark mode) and preferred currency. This data stays on your device and is never shared with third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">3. Analytics</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may use privacy-preserving analytics tools to understand aggregate usage patterns. This helps us decide which tools to improve or add next. This data is anonymized and cannot be used to identify you personally.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">4. Third-Party Links</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our tools may contain links to external sites (e.g., for official tax documents). We are not responsible for the privacy practices of these external websites.
          </p>
        </section>

        <div className="p-8 bg-brand-50 dark:bg-brand-900/10 rounded-3xl border border-brand-100 dark:border-brand-900/20">
          <h3 className="font-black text-brand-600 dark:text-brand-400 mb-2 uppercase tracking-widest text-sm">Security Commitment</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            ToolVerse is built with a security-first mindset. By keeping processing client-side, we eliminate the risk of server-side data breaches affecting your private utility usage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
