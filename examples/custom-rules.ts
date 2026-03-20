import { ExpenseCategorizer } from '../src';

const categorizer = new ExpenseCategorizer();

// Add custom rules for your specific vendors
categorizer.addRule(/ACME\s*CORP/i, {
  id: 'raw-materials',
  name: 'Raw Materials',
  parentCategory: 'inventory-cogs',
  accountCode: '5100',
});

categorizer.addRule(/COWORK\s*SPACE|WEWORK/i, {
  id: 'coworking',
  name: 'Coworking Space',
  parentCategory: 'rent',
  accountCode: '6110',
});

const result = categorizer.categorize({
  description: 'ACME CORP SUPPLIES ORDER #4521',
  amount: 1250.00,
});
console.log(result);
// { category: { id: 'raw-materials', name: 'Raw Materials', ... }, confidence: 0.9, matchedRule: 'custom:ACME\\s*CORP' }
