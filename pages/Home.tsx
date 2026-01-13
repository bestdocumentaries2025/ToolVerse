
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../constants';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    // Dynamic SEO Management
    document.title = 'ToolVerse | Professional All-in-One Online Utility Hub';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore ToolVerse: The ultimate suite of 35+ professional-grade online calculators for Finance, Real Estate, Health, Math, and Developer tools. Free, fast, and privacy-focused.');
    }
  }, []);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Tools for <span className="text-brand-500">Everyone</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
          The most comprehensive collection of professional-grade online calculators. 
          Privacy-focused, lightning-fast, and 100% free to use globally.
        </p>
      </section>

      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter">
            {selectedCategory ? `${selectedCategory} Tools` : 'Popular Utility Suite'}
          </h2>
          {selectedCategory && (
            <Link to="/" className="text-sm text-brand-500 font-bold hover:underline transition-all">
              View All Hub Tools →
            </Link>
          )}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <Link 
                key={tool.id} 
                to={`/calculators/${tool.slug}`}
                className="group p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div className="text-4xl bg-slate-50 dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-inner">
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed font-medium">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
            <div className="text-6xl mb-4 grayscale opacity-50">🔍</div>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-bold">No results found for your query.</p>
            <button 
              onClick={() => {setSearchQuery('');}} 
              className="mt-6 px-8 py-3 bg-brand-500 text-white rounded-xl font-black shadow-lg shadow-brand-500/20 hover:scale-105 transition-transform"
            >
              Clear Search & Try Again
            </button>
          </div>
        )}
      </div>

      <section className="bg-slate-900 dark:bg-black rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black leading-tight tracking-tighter">Professional Logic. <br/><span className="text-brand-500">Global Accessibility.</span></h2>
            <p className="text-slate-400 text-lg font-medium max-w-lg">
              ToolVerse is engineered for speed and precision. Whether you're calculating ROI in Tokyo or GST in Mumbai, our global context engine ensures you get accurate results every time.
            </p>
            <div className="flex gap-4">
               <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-brand-400">⚡ Real Time Processing</div>
               <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-brand-400">🛡️ No Data Tracking</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-4xl font-black mb-1">35+</p>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Tools</p>
             </div>
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-4xl font-black mb-1">100%</p>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Privacy Guarantee</p>
             </div>
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-4xl font-black mb-1">0.1s</p>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Instant Result</p>
             </div>
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-4xl font-black mb-1">13+</p>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Currencies</p>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-500 rounded-full blur-[120px] opacity-20"></div>
      </section>
    </div>
  );
};

export default Home;
