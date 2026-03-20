import { ExpenseCategorizer } from '../src';

const categorizer = new ExpenseCategorizer();

// Example: Plaid transaction data
interface PlaidTransaction {
  name: string;
  merchant_name: string | null;
  amount: number;
  payment_meta: { reference_number: string | null };
  date: string;
}

function categorizePlaidTransactions(transactions: PlaidTransaction[]) {
  return transactions.map((t) => {
    const result = categorizer.categorize({
      description: t.name,
      merchantName: t.merchant_name || undefined,
      amount: t.amount,
      date: t.date,
    });
    return { ...t, category: result.category.name, confidence: result.confidence };
  });
}

// Sample Plaid transactions
const plaidTransactions: PlaidTransaction[] = [
  { name: 'UBER *TRIP', merchant_name: 'Uber', amount: 18.50, payment_meta: { reference_number: null }, date: '2026-03-15' },
  { name: 'AMZN Mktp US*AB1CD2EF3', merchant_name: 'Amazon', amount: 49.99, payment_meta: { reference_number: null }, date: '2026-03-14' },
  { name: 'Comcast Cable', merchant_name: 'Comcast', amount: 89.99, payment_meta: { reference_number: null }, date: '2026-03-13' },
];

const categorized = categorizePlaidTransactions(plaidTransactions);
categorized.forEach((t) => console.log(`${t.name} → ${t.category} (${(t.confidence * 100).toFixed(0)}%)`));
