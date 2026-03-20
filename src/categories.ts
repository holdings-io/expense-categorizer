import { Category } from './types';

export const CATEGORIES: Record<string, Category> = {
  payroll: { id: 'payroll', name: 'Payroll', accountCode: '6000' },
  rent: { id: 'rent', name: 'Rent', accountCode: '6100' },
  utilities: { id: 'utilities', name: 'Utilities', accountCode: '6200' },
  office_supplies: { id: 'office-supplies', name: 'Office Supplies', accountCode: '6300' },
  software: { id: 'software-saas', name: 'Software & SaaS', accountCode: '6310' },
  travel: { id: 'travel', name: 'Travel', accountCode: '6400' },
  meals: { id: 'meals-entertainment', name: 'Meals & Entertainment', accountCode: '6410' },
  insurance: { id: 'insurance', name: 'Insurance', accountCode: '6500' },
  professional_services: { id: 'professional-services', name: 'Professional Services', accountCode: '6600' },
  advertising: { id: 'advertising', name: 'Advertising', accountCode: '6700' },
  bank_fees: { id: 'bank-fees', name: 'Bank Fees', accountCode: '6800' },
  taxes: { id: 'taxes', name: 'Taxes', accountCode: '6900' },
  inventory: { id: 'inventory-cogs', name: 'Inventory / COGS', accountCode: '5000' },
  equipment: { id: 'equipment', name: 'Equipment', accountCode: '6350' },
  subscriptions: { id: 'subscriptions', name: 'Subscriptions', accountCode: '6320' },
  shipping: { id: 'shipping', name: 'Shipping', accountCode: '6330' },
  charitable: { id: 'charitable-giving', name: 'Charitable Giving', accountCode: '6950' },
  miscellaneous: { id: 'miscellaneous', name: 'Miscellaneous', accountCode: '6990' },
  groceries: { id: 'groceries', name: 'Groceries', parentCategory: 'meals-entertainment', accountCode: '6411' },
  transportation: { id: 'transportation', name: 'Transportation', parentCategory: 'travel', accountCode: '6401' },
};

export function getAllCategories(): Category[] {
  return Object.values(CATEGORIES);
}

export function getCategoryById(id: string): Category | undefined {
  return Object.values(CATEGORIES).find((c) => c.id === id);
}
