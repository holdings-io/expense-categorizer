import { ExpenseCategorizer } from '../src';

const categorizer = new ExpenseCategorizer();

// Categorize by merchant name
const result1 = categorizer.categorize({
  description: 'UBER TRIP 03/15',
  amount: 24.50,
  merchantName: 'Uber',
});
console.log(result1);
// { category: { id: 'transportation', name: 'Transportation', ... }, confidence: 0.85, matchedRule: 'merchant:Uber' }

// Categorize by MCC code
const result2 = categorizer.categorize({
  description: 'LOCAL RESTAURANT',
  amount: 45.00,
  mccCode: '5812',
});
console.log(result2);
// { category: { id: 'meals-entertainment', name: 'Meals & Entertainment', ... }, confidence: 0.95, matchedRule: 'mcc:5812' }

// Batch categorize
const results = categorizer.categorizeBatch([
  { description: 'STARBUCKS #1234', amount: 5.75 },
  { description: 'GITHUB INC', amount: 4.00 },
  { description: 'DELTA AIR LINES', amount: 350.00 },
  { description: 'Monthly rent payment', amount: 2500.00 },
]);
results.forEach((r, i) => console.log(`${i}: ${r.category.name} (${r.confidence})`));
