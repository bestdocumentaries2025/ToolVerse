
import React, { useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TOOLS } from '../constants';

// Basic Utilities
import BMICalculator from '../components/calculators/BMICalculator';
import BMRCalculator from '../components/calculators/BMRCalculator';
import LoanCalculator from '../components/calculators/LoanCalculator';
import CompoundInterestCalculator from '../components/calculators/CompoundInterestCalculator';
import PercentageCalculator from '../components/calculators/PercentageCalculator';
import UnitConverter from '../components/calculators/UnitConverter';
import Base64Converter from '../components/calculators/Base64Converter';
import TimestampConverter from '../components/calculators/TimestampConverter';
import ColorConverter from '../components/calculators/ColorConverter';
import RandomGenerator from '../components/calculators/RandomGenerator';
import ImageConverter from '../components/calculators/ImageConverter';
import PasswordGenerator from '../components/calculators/PasswordGenerator';
import QRCodeGenerator from '../components/calculators/QRCodeGenerator';
import JsonToCsv from '../components/calculators/JsonToCsv';
import TextToSpeech from '../components/calculators/TextToSpeech';
import GSTCalculator from '../components/calculators/GSTCalculator';
import ROICalculator from '../components/calculators/ROICalculator';
import SalaryCalculator from '../components/calculators/SalaryCalculator';
import BodyFatCalculator from '../components/calculators/BodyFatCalculator';
import IdealWeightCalculator from '../components/calculators/IdealWeightCalculator';
import WaterIntakeCalculator from '../components/calculators/WaterIntakeCalculator';
import ScientificCalculator from '../components/calculators/ScientificCalculator';
import FractionCalculator from '../components/calculators/FractionCalculator';
import AreaVolumeCalculator from '../components/calculators/AreaVolumeCalculator';
import CaseConverter from '../components/calculators/CaseConverter';
import WordCounter from '../components/calculators/WordCounter';
import CurrencyConverter from '../components/calculators/CurrencyConverter';

// Advanced Business & Real Estate
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import ProfitMarginCalculator from '../components/calculators/ProfitMarginCalculator';
import BreakEvenCalculator from '../components/calculators/BreakEvenCalculator';
import CpmCalculator from '../components/calculators/CpmCalculator';
import EngagementCalculator from '../components/calculators/EngagementCalculator';
import SleepCalculator from '../components/calculators/SleepCalculator';
import AgeCalculator from '../components/calculators/AgeCalculator';
import RentVsBuyCalculator from '../components/calculators/RentVsBuyCalculator';
import PropertyTaxCalculator from '../components/calculators/PropertyTaxCalculator';
import CapRateCalculator from '../components/calculators/CapRateCalculator';
import RoasCalculator from '../components/calculators/RoasCalculator';
import ClvCalculator from '../components/calculators/ClvCalculator';

const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = useMemo(() => TOOLS.find(t => t.slug === slug), [slug]);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.name} | ToolVerse Free Professional Utility`;
    }
  }, [tool]);

  if (!tool) return <Navigate to="/" replace />;

  const renderCalculator = () => {
    switch (tool.id) {
      case 'bmi-calculator': return <BMICalculator />;
      case 'bmr-calculator': return <BMRCalculator />;
      case 'body-fat-calc': return <BodyFatCalculator />;
      case 'ideal-weight': return <IdealWeightCalculator />;
      case 'water-intake': return <WaterIntakeCalculator />;
      case 'loan-calculator': return <LoanCalculator />;
      case 'currency-converter': return <CurrencyConverter />;
      case 'compound-interest': return <CompoundInterestCalculator />;
      case 'gst-calculator': return <GSTCalculator />;
      case 'roi-calculator': return <ROICalculator />;
      case 'salary-calculator': return <SalaryCalculator />;
      case 'percentage-calculator': return <PercentageCalculator />;
      case 'scientific-calc': return <ScientificCalculator />;
      case 'fraction-calc': return <FractionCalculator />;
      case 'area-volume': return <AreaVolumeCalculator />;
      case 'random-generator': return <RandomGenerator />;
      case 'unit-converter': return <UnitConverter />;
      case 'image-converter': return <ImageConverter />;
      case 'text-to-speech': return <TextToSpeech />;
      case 'case-converter': return <CaseConverter />;
      case 'word-counter': return <WordCounter />;
      case 'qr-generator': return <QRCodeGenerator />;
      case 'password-generator': return <PasswordGenerator />;
      case 'base64-converter': return <Base64Converter />;
      case 'timestamp-converter': return <TimestampConverter />;
      case 'json-to-csv': return <JsonToCsv />;
      case 'color-converter': return <ColorConverter />;
      case 'mortgage-calc': return <MortgageCalculator />;
      case 'profit-margin': return <ProfitMarginCalculator />;
      case 'break-even': return <BreakEvenCalculator />;
      case 'cpm-calc': return <CpmCalculator />;
      case 'engagement-rate': return <EngagementCalculator />;
      case 'sleep-calc': return <SleepCalculator />;
      case 'age-calc': return <AgeCalculator />;
      case 'rent-vs-buy': return <RentVsBuyCalculator />;
      case 'property-tax': return <PropertyTaxCalculator />;
      case 'cap-rate': return <CapRateCalculator />;
      case 'roas-calc': return <RoasCalculator />;
      case 'clv-calc': return <ClvCalculator />;
      default:
        return <div className="py-20 text-center italic text-slate-400">This tool is coming soon.</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 transition-all">
      <Link to="/" className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-500 hover:text-brand-500 font-bold mb-6 group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        BACK TO HUB
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-brand-500 text-white text-[10px] font-black rounded-sm uppercase tracking-tighter">{tool.category}</span>
          <span className="text-xl sm:text-2xl">{tool.icon}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-2">{tool.name}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">{tool.description}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        {renderCalculator()}
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-70">
        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-xs uppercase mb-2">Privacy Note</h3>
          <p className="text-xs text-slate-500 leading-relaxed">All calculations are performed locally in your browser session. Your data is never transmitted to our servers.</p>
        </div>
        <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-xs uppercase mb-2">Accuracy Guarantee</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Our algorithms are verified against industry standards. For critical financial decisions, consult with a professional.</p>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
