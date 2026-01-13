
export type Category = 'Finance' | 'Health' | 'Math' | 'Converters' | 'Developer' | 'Business' | 'Real Estate' | 'Marketing' | 'Daily';

export interface Tool {
  id: string;
  name: string;
  category: Category;
  description: string;
  slug: string;
  keywords: string[];
  icon: string;
}

export interface CalculationResult {
  value: number | string;
  label: string;
  unit?: string;
  status?: 'success' | 'warning' | 'danger' | 'info';
  message?: string;
}
