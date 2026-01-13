
/**
 * Common math utilities for ToolVerse
 */

export const calculateEMI = (principal: number, annualRate: number, tenureYears: number) => {
  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = tenureYears * 12;
  if (monthlyRate === 0) return principal / tenureMonths;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return emi;
};

export const formatCurrency = (value: number, currencyCode: string = 'USD') => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (e) {
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

export const getCurrencySymbol = (currencyCode: string) => {
  const currency = CURRENCIES.find(c => c.code === currencyCode);
  return currency ? currency.symbol : '$';
};

export const calculateCompoundInterest = (principal: number, rate: number, years: number, compoundsPerYear: number = 1) => {
  return principal * Math.pow(1 + (rate / 100) / compoundsPerYear, compoundsPerYear * years);
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
];

export interface TaxInfo {
  name: string;
  fullName: string;
  rates: number[];
  currency: string;
  country: string;
  hasBreakdown?: boolean; // e.g. CGST/SGST for India
}

export const TAX_DATA: Record<string, TaxInfo> = {
  'INR': { country: 'India', name: 'GST', fullName: 'Goods and Services Tax', rates: [5, 12, 18, 28], currency: 'INR', hasBreakdown: true },
  'GBP': { country: 'United Kingdom', name: 'VAT', fullName: 'Value Added Tax', rates: [5, 20], currency: 'GBP' },
  'EUR': { country: 'Eurozone', name: 'VAT', fullName: 'Value Added Tax', rates: [7, 19, 21], currency: 'EUR' },
  'USD': { country: 'United States', name: 'Sales Tax', fullName: 'State Sales Tax', rates: [5.5, 7, 8.5, 9], currency: 'USD' },
  'AUD': { country: 'Australia', name: 'GST', fullName: 'Goods and Services Tax', rates: [10], currency: 'AUD' },
  'CAD': { country: 'Canada', name: 'GST', fullName: 'Goods and Services Tax', rates: [5, 13, 15], currency: 'CAD' },
  'JPY': { country: 'Japan', name: 'Consumption Tax', fullName: 'Japanese Consumption Tax', rates: [8, 10], currency: 'JPY' },
  'ZAR': { country: 'South Africa', name: 'VAT', fullName: 'Value Added Tax', rates: [15], currency: 'ZAR' },
  'AED': { country: 'UAE', name: 'VAT', fullName: 'Value Added Tax', rates: [5], currency: 'AED' },
};
