
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';

interface CurrencyContextType {
  currency: string;
  setCurrency: (code: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
});

export const useCurrency = () => useContext(CurrencyContext);

/**
 * AnalyticsTracker component to handle SPA page views for Google Analytics.
 * It detects route changes and pings the global 'gtag' function.
 */
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available (set in index.html)
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-NECT50ZSXQ', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    setDarkMode(savedDarkMode);
    setCurrency(savedCurrency);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <Router>
        <AnalyticsTracker />
        <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculators/:slug" element={<ToolPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </CurrencyContext.Provider>
  );
};

export default App;

// Standard declaration for gtag to avoid TS errors
declare global {
  interface Window {
    gtag: (command: string, id: string, config?: any) => void;
    dataLayer: any[];
  }
}
