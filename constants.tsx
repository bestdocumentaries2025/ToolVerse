
import { Tool, Category } from './types';

export const CATEGORIES: Category[] = [
  'Finance', 'Real Estate', 'Business', 'Marketing', 'Health', 'Math', 'Converters', 'Developer', 'Daily'
];

export const TOOLS: Tool[] = [
  // Finance (5)
  { id: 'loan-calculator', name: 'Loan EMI Calc', category: 'Finance', description: 'Monthly loan repayments and total interest.', slug: 'loan-calculator', keywords: ['loan', 'emi'], icon: '💰' },
  { id: 'currency-converter', name: 'Currency Converter', category: 'Finance', description: 'Real-time accurate global currency converter with live market exchange rates for all major world currencies.', slug: 'currency-converter', keywords: ['money', 'exchange', 'forex', 'rupee', 'dollar', 'euro', 'yen', 'convert'], icon: '💱' },
  { id: 'compound-interest', name: 'Compound Interest', category: 'Finance', description: 'Calculate investment growth over time.', slug: 'compound-interest', keywords: ['interest', 'savings'], icon: '📈' },
  { id: 'gst-calculator', name: 'GST/VAT Calc', category: 'Finance', description: 'Add or subtract GST from any amount.', slug: 'gst-calculator', keywords: ['tax', 'gst', 'vat'], icon: '🧾' },
  { id: 'roi-calculator', name: 'Investment ROI', category: 'Finance', description: 'Return on Investment percentage.', slug: 'roi-calculator', keywords: ['roi', 'profit'], icon: '💎' },

  // Real Estate (4)
  { id: 'mortgage-calc', name: 'Mortgage Calc', category: 'Real Estate', description: 'Advanced home loan calculator with taxes and insurance.', slug: 'mortgage-calculator', keywords: ['house', 'loan', 'mortgage'], icon: '🏠' },
  { id: 'rent-vs-buy', name: 'Rent vs Buy', category: 'Real Estate', description: 'Analyze if buying or renting a home is better for you.', slug: 'rent-vs-buy', keywords: ['real estate', 'home'], icon: '🏘️' },
  { id: 'property-tax', name: 'Property Tax', category: 'Real Estate', description: 'Estimate annual property taxes based on value.', slug: 'property-tax-calc', keywords: ['tax', 'home'], icon: '🏢' },
  { id: 'cap-rate', name: 'Cap Rate', category: 'Real Estate', description: 'Calculate Capitalization Rate for investment properties.', slug: 'cap-rate-calc', keywords: ['investment', 'real estate'], icon: '📊' },

  // Business & Marketing (6)
  { id: 'profit-margin', name: 'Profit Margin', category: 'Business', description: 'Calculate gross profit, markup, and net margin.', slug: 'profit-margin-calc', keywords: ['business', 'money'], icon: '📈' },
  { id: 'break-even', name: 'Break-Even', category: 'Business', description: 'Find the sales volume needed to cover all costs.', slug: 'break-even-calc', keywords: ['business', 'startup'], icon: '📉' },
  { id: 'cpm-calc', name: 'CPM Calculator', category: 'Marketing', description: 'Calculate Cost Per Mille for advertising campaigns.', slug: 'cpm-calc', keywords: ['ads', 'marketing'], icon: '📢' },
  { id: 'engagement-rate', name: 'Engagement Rate', category: 'Marketing', description: 'Social media engagement metrics for posts.', slug: 'engagement-calc', keywords: ['social', 'instagram', 'tiktok'], icon: '❤️' },
  { id: 'roas-calc', name: 'ROAS Calc', category: 'Marketing', description: 'Return on Ad Spend calculator for marketing ROI.', slug: 'roas-calc', keywords: ['ads', 'roi'], icon: '🎯' },
  { id: 'clv-calc', name: 'Customer Lifetime', category: 'Business', description: 'Estimate the total value of a customer (CLV).', slug: 'clv-calc', keywords: ['business', 'sales'], icon: '🤝' },

  // Health (5)
  { id: 'bmi-calculator', name: 'BMI Calculator', category: 'Health', description: 'Body Mass Index based on height and weight.', slug: 'bmi-calculator', keywords: ['health', 'bmi'], icon: '⚖️' },
  { id: 'bmr-calculator', name: 'BMR & Calories', category: 'Health', description: 'Basal Metabolic Rate and daily needs.', slug: 'bmr-calculator', keywords: ['calories', 'bmr'], icon: '🔥' },
  { id: 'body-fat-calc', name: 'Body Fat %', category: 'Health', description: 'Body fat percentage using Navy Method.', slug: 'body-fat-calc', keywords: ['fat', 'fitness'], icon: '🧬' },
  { id: 'ideal-weight', name: 'Ideal Weight', category: 'Health', description: 'Ideal weight using the Devine formula.', slug: 'ideal-weight', keywords: ['weight', 'goal'], icon: '📏' },
  { id: 'water-intake', name: 'Water Intake', category: 'Health', description: 'Hydration needs based on weight/activity.', slug: 'water-intake', keywords: ['water', 'hydration'], icon: '💧' },
  
  // Math (4)
  { id: 'scientific-calc', name: 'Scientific Calc', category: 'Math', description: 'Advanced mathematical operations.', slug: 'scientific-calc', keywords: ['math', 'calc'], icon: '🧪' },
  { id: 'percentage-calculator', name: 'Percentage Calc', category: 'Math', description: 'Quickly calculate various percentages.', slug: 'percentage-calculator', keywords: ['math', 'percent'], icon: '🔢' },
  { id: 'fraction-calc', name: 'Fraction Calc', category: 'Math', description: 'Operations on fractions with simplification.', slug: 'fraction-calc', keywords: ['math', 'fraction'], icon: '🍰' },
  { id: 'area-volume', name: 'Area & Volume', category: 'Math', description: 'Geometry metrics for various shapes.', slug: 'area-volume', keywords: ['shape', 'geometry'], icon: '📐' },

  // Converters & Dev (8)
  { id: 'unit-converter', name: 'Unit Converter', category: 'Converters', description: 'Length, Weight, and Temp conversion.', slug: 'unit-converter', keywords: ['convert', 'units'], icon: '🔄' },
  { id: 'image-converter', name: 'Image Converter', category: 'Converters', description: 'Convert images to PNG, JPEG, or WebP.', slug: 'image-converter', keywords: ['image', 'convert'], icon: '🖼️' },
  { id: 'qr-generator', name: 'QR Generator', category: 'Developer', description: 'Reliable QR codes for URLs and text.', slug: 'qr-generator', keywords: ['qr', 'dev'], icon: '📱' },
  { id: 'password-generator', name: 'Secure Password', category: 'Developer', description: 'Strong, secure random passwords.', slug: 'password-generator', keywords: ['secure', 'pass'], icon: '🔑' },
  { id: 'base64-converter', name: 'Base64 Tool', category: 'Developer', description: 'Encode/Decode text to/from Base64.', slug: 'base64-converter', keywords: ['dev', 'base64'], icon: '🔐' },
  { id: 'timestamp-converter', name: 'Unix Timestamp', category: 'Developer', description: 'Epoch time to readable date.', slug: 'timestamp-converter', keywords: ['dev', 'time'], icon: '🕒' },
  { id: 'json-to-csv', name: 'JSON to CSV', category: 'Developer', description: 'Transform JSON data into CSV format.', slug: 'json-to-csv', keywords: ['json', 'csv'], icon: '📊' },
  { id: 'color-converter', name: 'Color Converter', category: 'Developer', description: 'HEX, RGB, and HSL conversion.', slug: 'color-converter', keywords: ['ui', 'color'], icon: '🎨' },

  // Daily Utility (8)
  { id: 'travel-time', name: 'Travel Time', category: 'Daily', description: 'Land travel duration for walking, cycling, or driving.', slug: 'travel-time-calc', keywords: ['travel', 'distance', 'time', 'car', 'bike'], icon: '🚗' },
  { id: 'air-travel', name: 'Air Travel', category: 'Daily', description: 'Estimated flight duration based on air distance.', slug: 'air-travel-calc', keywords: ['flight', 'air', 'travel', 'plane'], icon: '✈️' },
  { id: 'stopwatch-tool', name: 'Stopwatch', category: 'Daily', description: 'Precision stopwatch with lap timing capabilities.', slug: 'stopwatch', keywords: ['timer', 'stopwatch', 'time'], icon: '⏱️' },
  { id: 'alarm-clock', name: 'Alarm System', category: 'Daily', description: 'Set professional alerts and wake-up notifications.', slug: 'alarm-clock', keywords: ['alarm', 'clock', 'wake'], icon: '🔔' },
  { id: 'age-calc', name: 'Age Calculator', category: 'Daily', description: 'Find your exact age in years, months, and days.', slug: 'age-calc', keywords: ['age', 'birthday'], icon: '🎂' },
  { id: 'sleep-calc', name: 'Sleep Cycle', category: 'Daily', description: 'Wake up refreshed by timing sleep cycles.', slug: 'sleep-calc', keywords: ['health', 'sleep'], icon: '😴' },
  { id: 'word-counter', name: 'Word Counter', category: 'Converters', description: 'Text stats and reading time.', slug: 'word-counter', keywords: ['text', 'stats'], icon: '🖊️' },
  { id: 'random-generator', name: 'Random Generator', category: 'Math', description: 'Numbers or list shuffles.', slug: 'random-generator', keywords: ['random', 'dice'], icon: '🎲' }
];
