
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { CURRENCIES } from '../utils/math';
import { useCurrency } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
        transform transition-transform duration-300 z-50 flex flex-col shadow-2xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-brand-500/30">T</div>
            <span className="text-2xl font-black tracking-tighter dark:text-white">ToolVerse</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 space-y-1 custom-scrollbar">
          <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-70">Categories</p>
          {CATEGORIES.map(category => (
            <Link
              key={category}
              to={`/?category=${category}`}
              onClick={() => setIsSidebarOpen(false)}
              className={`
                flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 border-transparent
                ${location.search.includes(category) 
                  ? 'bg-brand-50 border-brand-100 text-brand-700 dark:bg-brand-900/20 dark:border-brand-900/30 dark:text-brand-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}
              `}
            >
              {category}
            </Link>
          ))}
          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              Explore All Tools
            </Link>
          </div>
        </nav>

        {/* Dynamic Global Settings Section */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 m-4 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-5 shadow-inner">
          <p className="text-[10px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest px-1">Global Configuration</p>
          
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 px-1">Local Currency</label>
            <div className="relative">
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-sm font-black text-slate-900 dark:text-white outline-none border-2 border-slate-100 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 transition-all shadow-sm"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} — {c.name} ({c.symbol})</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <button 
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black transition-all hover:scale-[1.02] active:scale-95 border-2 border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <span className="uppercase tracking-tighter">{darkMode ? 'Appearance: DARK' : 'Appearance: LIGHT'}</span>
            <span className="text-lg">{darkMode ? '🌙' : '☀️'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
          <button onClick={toggleSidebar} className="p-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-600 rounded-lg flex items-center justify-center text-white font-black text-xs">T</div>
            <span className="font-black dark:text-white tracking-tighter text-lg uppercase">ToolVerse</span>
          </div>
          <div className="text-xs font-black px-2 py-1 bg-brand-100 text-brand-700 rounded-lg">{currency}</div>
        </header>

        <div className="flex-1 p-4 md:p-8 lg:p-16 max-w-7xl mx-auto w-full">
          {children}
        </div>

        <footer className="mt-auto p-12 text-center border-t border-slate-100 dark:border-slate-700">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-4">© {new Date().getFullYear()} ToolVerse Professional utility suite</p>
          <div className="flex justify-center gap-6 text-xs font-bold text-slate-400">
            <Link to="/privacy" className="hover:text-brand-500 transition-colors">PRIVACY</Link>
            <Link to="/terms" className="hover:text-brand-500 transition-colors">TERMS</Link>
            <Link to="/support" className="hover:text-brand-500 transition-colors">SUPPORT</Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
