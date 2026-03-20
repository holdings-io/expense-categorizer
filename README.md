# Expense Categorizer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

Automatically categorize business expenses using merchant names, MCC codes, and keyword rules. Zero dependencies. Works with Plaid, Unit, Stripe, and any transaction data.

## Features

- **MCC Code Matching** — 100+ Merchant Category Codes mapped to accounting categories (0.95 confidence)
- **Merchant Recognition** — 50+ common merchant patterns: Amazon, Uber, Starbucks, Google, and more (0.85 confidence)
- **Keyword Fallback** — Catches transactions by description keywords like "rent", "payroll", "insurance" (0.60 confidence)
- **Custom Rules** — Add your own merchant patterns and categories
- **Confidence Scoring** — Every result includes a confidence score (0–1) and which rule matched
- **Batch Processing** — Categorize arrays of transactions in one call
- **Zero Dependencies** — Pure TypeScript, no external packages
- **Plaid Compatible** — Works with Plaid transaction data out of the box

## Installation

```bash
npm install @holdings-io/expense-categorizer
```

## Quick Start

```typescript
import { ExpenseCategorizer } from '@holdings-io/expense-categorizer';

const categorizer = new ExpenseCategorizer();

const result = categorizer.categorize({
  description: 'UBER *TRIP 03/15',
  amount: 24.50,
  merchantName: 'Uber',
});

console.log(result.category.name);  // "Transportation"
console.log(result.confidence);      // 0.85
console.log(result.matchedRule);     // "merchant:Uber"
```

## API Reference

### `new ExpenseCategorizer()`

Creates a new categorizer instance with built-in rules.

### `categorize(transaction: Transaction): CategorizeResult`

Categorize a single transaction.

```typescript
interface Transaction {
  description: string;     // Transaction description / memo
  amount: number;          // Transaction amount
  merchantName?: string;   // Merchant name (if available)
  mccCode?: string;        // MCC code (if available)
  date?: string;           // Transaction date
}

interface CategorizeResult {
  category: Category;      // Matched category
  confidence: number;      // 0-1 confidence score
  matchedRule: string;     // Which rule matched (e.g. "mcc:5812", "merchant:Uber")
}
```

### `categorizeBatch(transactions: Transaction[]): CategorizeResult[]`

Categorize an array of transactions.

```typescript
const results = categorizer.categorizeBatch([
  { description: 'STARBUCKS #1234', amount: 5.75 },
  { description: 'GITHUB INC', amount: 4.00 },
  { description: 'Monthly rent payment', amount: 2500.00 },
]);
```

### `addRule(pattern, category, field?, confidence?)`

Add a custom categorization rule. Custom rules are checked first (highest priority).

```typescript
categorizer.addRule(/ACME\s*CORP/i, {
  id: 'raw-materials',
  name: 'Raw Materials',
  accountCode: '5100',
});
```

## Rule Priority

Rules are evaluated in this order:

| Priority | Rule Type | Confidence | Example |
|----------|-----------|------------|---------|
| 1 | Custom rules | 0.90 | Your own patterns |
| 2 | MCC codes | 0.95 | `5812` → Meals |
| 3 | Merchant patterns | 0.85 | `UBER` → Transportation |
| 4 | Keywords | 0.60 | `"rent"` → Rent |

## Built-in Categories

| Category | Account Code | Examples |
|----------|-------------|----------|
| Payroll | 6000 | Salary, wages |
| Rent | 6100 | Office lease |
| Utilities | 6200 | Phone, internet, electric |
| Office Supplies | 6300 | Amazon, Staples, Walmart |
| Software & SaaS | 6310 | GitHub, Slack, Zoom, Adobe |
| Subscriptions | 6320 | Recurring services |
| Shipping | 6330 | FedEx, UPS, USPS |
| Equipment | 6350 | Hardware, machinery |
| Travel | 6400 | Airlines, hotels, Airbnb |
| Meals & Entertainment | 6410 | Restaurants, Starbucks |
| Insurance | 6500 | Premiums, State Farm |
| Professional Services | 6600 | Legal, accounting, consulting |
| Advertising | 6700 | Google Ads, Meta Ads |
| Bank Fees | 6800 | Stripe, wire fees |
| Taxes | 6900 | IRS, state tax |
| Charitable Giving | 6950 | Donations |
| Inventory / COGS | 5000 | Raw materials, goods |

## Plaid Integration

```typescript
import { ExpenseCategorizer } from '@holdings-io/expense-categorizer';

const categorizer = new ExpenseCategorizer();

// Plaid transaction → categorize
function categorizePlaidTransaction(plaidTxn: any) {
  return categorizer.categorize({
    description: plaidTxn.name,
    merchantName: plaidTxn.merchant_name || undefined,
    amount: plaidTxn.amount,
    date: plaidTxn.date,
  });
}
```

## Contributing

Contributions are welcome! Some ideas:

- Add more MCC code mappings
- Add merchant patterns for your region
- Improve keyword rules
- Add new standard categories

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/new-merchants`)
3. Commit your changes
4. Open a Pull Request

## About

Built by [Holdings](https://getholdings.com) — Banking with built-in accounting for nonprofits and small businesses.

Holdings uses this engine to power [AI-driven bookkeeping](https://getholdings.com) for thousands of organizations.

## License

MIT — see [LICENSE](LICENSE) for details.
