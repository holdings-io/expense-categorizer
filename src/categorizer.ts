import { Transaction, CategorizeResult, Category, Rule } from './types';
import { CATEGORIES } from './categories';
import { MCC_CODES } from './rules/mcc-codes';
import { MERCHANT_PATTERNS } from './rules/merchants';
import { KEYWORD_RULES } from './rules/keywords';

const UNCATEGORIZED: Category = { id: 'uncategorized', name: 'Uncategorized', accountCode: '6999' };

export class ExpenseCategorizer {
  private customRules: Rule[] = [];

  addRule(pattern: string | RegExp, category: Category, field: 'merchantName' | 'description' | 'mccCode' = 'description', confidence = 0.9): void {
    this.customRules.push({ pattern, category, field, confidence });
  }

  categorize(transaction: Transaction): CategorizeResult {
    for (const rule of this.customRules) {
      const value = transaction[rule.field];
      if (!value) continue;
      const regex = typeof rule.pattern === 'string' ? new RegExp(rule.pattern, 'i') : rule.pattern;
      if (regex.test(value)) {
        return { category: rule.category, confidence: rule.confidence, matchedRule: `custom:${regex.source}` };
      }
    }

    if (transaction.mccCode) {
      const mcc = MCC_CODES.find((m) => m.code === transaction.mccCode);
      if (mcc) {
        return { category: mcc.category, confidence: 0.95, matchedRule: `mcc:${mcc.code}` };
      }
    }

    const merchantField = transaction.merchantName || transaction.description || '';
    for (const mp of MERCHANT_PATTERNS) {
      if (mp.pattern.test(merchantField)) {
        return { category: mp.category, confidence: 0.85, matchedRule: `merchant:${mp.merchant}` };
      }
    }

    if (transaction.merchantName && transaction.description) {
      for (const mp of MERCHANT_PATTERNS) {
        if (mp.pattern.test(transaction.description)) {
          return { category: mp.category, confidence: 0.80, matchedRule: `merchant:${mp.merchant}:description` };
        }
      }
    }

    const text = `${transaction.merchantName || ''} ${transaction.description || ''}`.toLowerCase();
    for (const kr of KEYWORD_RULES) {
      if (text.includes(kr.keyword.toLowerCase())) {
        return { category: kr.category, confidence: 0.6, matchedRule: `keyword:${kr.keyword}` };
      }
    }

    return { category: UNCATEGORIZED, confidence: 0, matchedRule: 'none' };
  }

  categorizeBatch(transactions: Transaction[]): CategorizeResult[] {
    return transactions.map((t) => this.categorize(t));
  }
}
