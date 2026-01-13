import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface IPInfo {
  ip: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
  hostname: string;
  isp: string;
  is_vpn: boolean;
  is_proxy: boolean;
  is_tor: boolean;
  is_residential: boolean;
}

interface LookupHistory {
  ip: string;
  timestamp: string;
  location: string;
}

const IPAddressLookup: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [lookupHistory, setLookupHistory] = useState<LookupHistory[]>([]);
  const [copiedField, setCopiedField] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'location' | 'security'>('details');
  const [isMyIp, setIsMyIp] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch user's own IP on component mount
  useEffect(() => {
    fetchMyIP();
  }, []);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ipLookupHistory');
    if (savedHistory) {
      setLookupHistory(JSON.parse(savedHistory));
    }
  }, []);

  const fetchMyIP = async () => {
    try {
      setLoading(true);
      setError('');
      setIsMyIp(true);
      const response = await axios.get('https://api.ipify.org?format=json');
      const ip = response.data.ip;
      setIpAddress(ip);
      await lookupIP(ip);
    } catch (err) {
      console.error('Failed to fetch IP:', err);
      // Fallback to a different service
      try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        const ip = response.data.ip;
        setIpAddress(ip);
        await lookupIP(ip);
      } catch (fallbackErr) {
        setError('Unable to fetch your IP address. Please try entering it manually.');
      }
    } finally {
      setLoading(false);
    }
  };

  const lookupIP = async (ip: string) => {
    if (!ip) {
      setError('Please enter a valid IP address');
      return;
    }

    // Validate IP format
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    
    if (!ipv4Regex.test(ip) && !ipv6Regex.test(ip)) {
      setError('Please enter a valid IPv4 or IPv6 address');
      return;
    }

    setLoading(true);
    setError('');
    setIsMyIp(false);

    try {
      // Try ipapi.co first
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      
      if (response.data.error) {
        throw new Error(response.data.reason || 'IP lookup failed');
      }

      const data: IPInfo = {
        ip: response.data.ip,
        version: response.data.version || (ip.includes(':') ? 'IPv6' : 'IPv4'),
        city: response.data.city || 'Unknown',
        region: response.data.region || 'Unknown',
        region_code: response.data.region_code || '',
        country: response.data.country || 'Unknown',
        country_name: response.data.country_name || 'Unknown',
        country_code: response.data.country_code || '',
        country_code_iso3: response.data.country_code_iso3 || '',
        country_capital: response.data.country_capital || 'Unknown',
        country_tld: response.data.country_tld || '',
        continent_code: response.data.continent_code || '',
        in_eu: response.data.in_eu || false,
        postal: response.data.postal || 'Unknown',
        latitude: response.data.latitude || 0,
        longitude: response.data.longitude || 0,
        timezone: response.data.timezone || 'Unknown',
        utc_offset: response.data.utc_offset || '',
        country_calling_code: response.data.country_calling_code || '',
        currency: response.data.currency || 'Unknown',
        currency_name: response.data.currency_name || 'Unknown',
        languages: response.data.languages || 'Unknown',
        country_area: response.data.country_area || 0,
        country_population: response.data.country_population || 0,
        asn: response.data.asn || 'Unknown',
        org: response.data.org || 'Unknown',
        hostname: response.data.hostname || 'Unknown',
        isp: response.data.org || 'Unknown',
        is_vpn: false,
        is_proxy: false,
        is_tor: false,
        is_residential: false
      };

      // Try to get security info from ipqualityscore (free tier)
      try {
        const securityResponse = await axios.get(
          `https://ipqualityscore.com/api/json/ip/1s9r8P9vVvVW9R6V1V9V9V9V9V9V9V9V/${ip}`
        );
        if (securityResponse.data.success) {
          data.is_vpn = securityResponse.data.vpn || false;
          data.is_proxy = securityResponse.data.proxy || false;
          data.is_tor = securityResponse.data.tor || false;
          data.is_residential = securityResponse.data.is_crawler || false;
        }
      } catch (securityErr) {
        console.log('Security check skipped');
      }

      setIpInfo(data);

      // Add to history
      const historyItem: LookupHistory = {
        ip: data.ip,
        timestamp: new Date().toLocaleString(),
        location: `${data.city}, ${data.country_name}`
      };

      const newHistory = [historyItem, ...lookupHistory.slice(0, 9)];
      setLookupHistory(newHistory);
      localStorage.setItem('ipLookupHistory', JSON.stringify(newHistory));

    } catch (err) {
      console.error('Lookup error:', err);
      setError('Failed to lookup IP address. Please try again or use a different IP.');
      
      // Fallback: Use ip-api.com
      try {
        const fallbackResponse = await axios.get(`http://ip-api.com/json/${ip}`);
        if (fallbackResponse.data.status === 'success') {
          const fallbackData = fallbackResponse.data;
          const data: IPInfo = {
            ip: ip,
            version: ip.includes(':') ? 'IPv6' : 'IPv4',
            city: fallbackData.city || 'Unknown',
            region: fallbackData.regionName || 'Unknown',
            region_code: fallbackData.region || '',
            country: fallbackData.country || 'Unknown',
            country_name: fallbackData.country || 'Unknown',
            country_code: fallbackData.countryCode || '',
            country_code_iso3: '',
            country_capital: 'Unknown',
            country_tld: '',
            continent_code: fallbackData.continent || '',
            in_eu: false,
            postal: fallbackData.zip || 'Unknown',
            latitude: fallbackData.lat || 0,
            longitude: fallbackData.lon || 0,
            timezone: fallbackData.timezone || 'Unknown',
            utc_offset: '',
            country_calling_code: '',
            currency: fallbackData.currency || 'Unknown',
            currency_name: 'Unknown',
            languages: 'Unknown',
            country_area: 0,
            country_population: 0,
            asn: fallbackData.as || 'Unknown',
            org: fallbackData.org || 'Unknown',
            hostname: fallbackData.query || 'Unknown',
            isp: fallbackData.isp || 'Unknown',
            is_vpn: false,
            is_proxy: false,
            is_tor: false,
            is_residential: false
          };
          setIpInfo(data);
          setError('');
        } else {
          throw new Error('Fallback also failed');
        }
      } catch (fallbackErr) {
        console.error('Fallback failed:', fallbackErr);
        setError('All lookup services failed. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupIP(ipAddress);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  const clearHistory = () => {
    setLookupHistory([]);
    localStorage.removeItem('ipLookupHistory');
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '🏴';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const getSecurityColor = (value: boolean) => {
    return value ? 'text-red-500' : 'text-green-500';
  };

  const getSecurityIcon = (value: boolean) => {
    return value ? '🔴' : '🟢';
  };

  // Icon components
  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const LocationIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const GlobeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const CopyIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  const HistoryIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const MyIpIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
            <GlobeIcon />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
            IP Address Lookup
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Get detailed information about any IP address including location, ISP, security status, and more
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 md:mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 text-red-500 mt-0.5">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-800 dark:text-red-300 text-sm md:text-base">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Search & History */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            {/* Search Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
                  Lookup IP Address
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Enter IP Address
                    </label>
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="e.g., 8.8.8.8 or 2001:4860:4860::8888"
                        className="w-full px-4 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {ipAddress.includes(':') ? 'IPv6' : 'IPv4'}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Leave empty to lookup your own IP
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                        loading
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 active:scale-95 shadow-lg shadow-blue-500/25'
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Looking up...</span>
                        </>
                      ) : (
                        <>
                          <SearchIcon />
                          <span>Lookup IP</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={fetchMyIP}
                      disabled={loading}
                      className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all active:scale-95 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                    >
                      <MyIpIcon />
                      <span>My IP</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIpAddress('8.8.8.8')}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm"
                    >
                      Google DNS
                    </button>
                    <button
                      type="button"
                      onClick={() => setIpAddress('1.1.1.1')}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm"
                    >
                      Cloudflare
                    </button>
                    <button
                      type="button"
                      onClick={() => setIpAddress('208.67.222.222')}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm"
                    >
                      OpenDNS
                    </button>
                    <button
                      type="button"
                      onClick={() => setIpAddress('')}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* History Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <HistoryIcon />
                    Lookup History
                  </h2>
                  {lookupHistory.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-lg transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {lookupHistory.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <HistoryIcon />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No lookup history yet
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Lookup IPs will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {lookupHistory.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setIpAddress(item.ip);
                          lookupIP(item.ip);
                        }}
                        className="group p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer transition-all border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-800"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-mono text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-500">
                            {item.ip}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.timestamp}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <MapPinIcon />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {ipInfo ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 md:p-6 lg:p-8">
                  {/* IP Header */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                            ipInfo.version === 'IPv6' 
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}>
                            {ipInfo.version}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getFlagEmoji(ipInfo.country_code)}</span>
                            <span className="text-lg font-bold text-gray-800 dark:text-white">
                              {ipInfo.country_name}
                            </span>
                          </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-mono">
                          {ipInfo.ip}
                        </h2>
                        {isMyIp && (
                          <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
                            <MyIpIcon />
                            <span>Your Public IP Address</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => copyToClipboard(ipInfo.ip, 'ip')}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-medium transition-colors flex items-center gap-2"
                      >
                        <CopyIcon />
                        {copiedField === 'ip' ? 'Copied!' : 'Copy IP'}
                      </button>
                    </div>

                    {/* Location Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 md:p-4 rounded-xl">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">City</div>
                        <div className="font-bold text-gray-800 dark:text-white">{ipInfo.city}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 md:p-4 rounded-xl">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Region</div>
                        <div className="font-bold text-gray-800 dark:text-white">{ipInfo.region}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 md:p-4 rounded-xl">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Timezone</div>
                        <div className="font-bold text-gray-800 dark:text-white">{ipInfo.timezone}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 md:p-4 rounded-xl">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">ISP</div>
                        <div className="font-bold text-gray-800 dark:text-white truncate">{ipInfo.isp}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`flex-1 px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors ${
                          activeTab === 'details'
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <GlobeIcon className="inline-block w-4 h-4 mr-2" />
                        Details
                      </button>
                      <button
                        onClick={() => setActiveTab('location')}
                        className={`flex-1 px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors ${
                          activeTab === 'location'
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <LocationIcon className="inline-block w-4 h-4 mr-2" />
                        Location
                      </button>
                      <button
                        onClick={() => setActiveTab('security')}
                        className={`flex-1 px-4 py-3 text-sm md:text-base font-medium border-b-2 transition-colors ${
                          activeTab === 'security'
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <ShieldIcon className="inline-block w-4 h-4 mr-2" />
                        Security
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'details' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Network Information</h3>
                          <div className="space-y-3">
                            <InfoRow label="Hostname" value={ipInfo.hostname} field="hostname" />
                            <InfoRow label="ASN" value={ipInfo.asn} field="asn" />
                            <InfoRow label="Organization" value={ipInfo.org} field="org" />
                            <InfoRow label="ISP" value={ipInfo.isp} field="isp" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Country Information</h3>
                          <div className="space-y-3">
                            <InfoRow label="Capital" value={ipInfo.country_capital} field="capital" />
                            <InfoRow label="Currency" value={`${ipInfo.currency} (${ipInfo.currency_name})`} field="currency" />
                            <InfoRow label="Languages" value={ipInfo.languages} field="languages" />
                            <InfoRow label="Population" value={formatNumber(ipInfo.country_population)} field="population" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Geographic Details</h3>
                          <div className="space-y-3">
                            <InfoRow label="Latitude" value={ipInfo.latitude.toString()} field="lat" />
                            <InfoRow label="Longitude" value={ipInfo.longitude.toString()} field="long" />
                            <InfoRow label="Postal Code" value={ipInfo.postal} field="postal" />
                            <InfoRow label="Continent" value={ipInfo.continent_code} field="continent" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Time & Location</h3>
                          <div className="space-y-3">
                            <InfoRow label="Timezone" value={ipInfo.timezone} field="timezone" />
                            <InfoRow label="UTC Offset" value={ipInfo.utc_offset} field="utc" />
                            <InfoRow label="Country Code" value={ipInfo.country_code} field="country_code" />
                            <InfoRow label="Calling Code" value={`+${ipInfo.country_calling_code}`} field="calling_code" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Map Link */}
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-blue-800 dark:text-blue-300">View on Map</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              Open this location in Google Maps
                            </p>
                          </div>
                          <a
                            href={`https://maps.google.com/?q=${ipInfo.latitude},${ipInfo.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                          >
                            Open Map
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <SecurityStatus
                          label="VPN"
                          value={ipInfo.is_vpn}
                          icon={getSecurityIcon(ipInfo.is_vpn)}
                          color={getSecurityColor(ipInfo.is_vpn)}
                        />
                        <SecurityStatus
                          label="Proxy"
                          value={ipInfo.is_proxy}
                          icon={getSecurityIcon(ipInfo.is_proxy)}
                          color={getSecurityColor(ipInfo.is_proxy)}
                        />
                        <SecurityStatus
                          label="TOR"
                          value={ipInfo.is_tor}
                          icon={getSecurityIcon(ipInfo.is_tor)}
                          color={getSecurityColor(ipInfo.is_tor)}
                        />
                        <SecurityStatus
                          label="Residential"
                          value={ipInfo.is_residential}
                          icon={getSecurityIcon(!ipInfo.is_residential)}
                          color={getSecurityColor(!ipInfo.is_residential)}
                        />
                      </div>

                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldIcon />
                          </div>
                          <div>
                            <h4 className="font-bold text-green-800 dark:text-green-300 mb-1">
                              Security Assessment
                            </h4>
                            <p className="text-green-600 dark:text-green-400">
                              {ipInfo.is_vpn || ipInfo.is_proxy || ipInfo.is_tor
                                ? '⚠️ This IP shows characteristics of VPN/Proxy/TOR usage. Exercise caution.'
                                : '✅ This IP appears to be a standard residential/business connection.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-8 md:p-12 lg:p-16 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                    <GlobeIcon />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    No IP Information Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                    Enter an IP address above to get detailed information about its location, ISP, security status, and more.
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    <button
                      onClick={() => setIpAddress('8.8.8.8')}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-medium transition-colors"
                    >
                      Try Google DNS
                    </button>
                    <button
                      onClick={fetchMyIP}
                      className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all"
                    >
                      Check My IP
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 md:p-6 border border-blue-100 dark:border-blue-800/30">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 md:mb-4">
              <LocationIcon />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">Precise Geolocation</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Accurate city, region, and country information with coordinates and timezone.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-800/30">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-3 md:mb-4">
              <ShieldIcon />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">Security Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Detect VPN, Proxy, and TOR usage with detailed security assessment.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 md:p-6 border border-green-100 dark:border-green-800/30">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3 md:mb-4">
              <HistoryIcon />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">History & Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Keep track of previous lookups with timestamp and location details.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 md:mt-12 text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
          <p>Supports both IPv4 and IPv6 addresses. Data is sourced from multiple reliable IP geolocation services.</p>
        </div>
      </div>
    </div>
  );

  // Helper component for info rows
  function InfoRow({ label, value, field }: { label: string; value: string; field: string }) {
    return (
      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-gray-800 dark:text-white">{value}</span>
          <button
            onClick={() => copyToClipboard(value, field)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Copy"
          >
            <CopyIcon />
          </button>
        </div>
      </div>
    );
  }

  // Helper component for security status
  function SecurityStatus({ label, value, icon, color }: { 
    label: string; 
    value: boolean; 
    icon: string; 
    color: string 
  }) {
    return (
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="font-bold text-gray-800 dark:text-white mb-1">{label}</div>
        <div className={`text-sm font-bold ${color}`}>
          {value ? 'Detected' : 'Not Detected'}
        </div>
      </div>
    );
  }
};

export default IPAddressLookup;