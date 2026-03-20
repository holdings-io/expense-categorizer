export interface Transaction {
  description: string;
  amount: number;
  merchantName?: string;
  mccCode?: string;
  date?: string;
}

export interface Category {
  id: string;
  name: string;
  parentCategory?: string;
  accountCode?: string;
}

export interface CategorizeResult {
  category: Category;
  confidence: number;
  matchedRule: string;
}

export interface Rule {
  pattern: string | RegExp;
  category: Category;
  field: 'merchantName' | 'description' | 'mccCode';
  confidence: number;
}

export interface MccMapping {
  code: string;
  description: string;
  category: Category;
}

export interface MerchantPattern {
  pattern: RegExp;
  merchant: string;
  category: Category;
}

export interface KeywordRule {
  keyword: string;
  category: Category;
}
