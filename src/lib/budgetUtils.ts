export type Transaction = {
  amount: number;
  category: string;
  date: string;
};

export type Budget = {
  category: string;
  amount: number;
};

export function calculateTotalPerCategory(transactions: Transaction[]) {
  const totals: Record<string, number> = {};

  for (const tx of transactions) {
    if (!totals[tx.category]) {
      totals[tx.category] = 0;
    }
    totals[tx.category] += tx.amount;
  }

  return totals;
}

export function compareBudgetToSpending(
  budgets: Budget[],
  transactions: Transaction[]
) {
  const actuals = calculateTotalPerCategory(transactions);

  return budgets.map((budget) => {
    const spent = actuals[budget.category] || 0;
    const remaining = budget.amount - spent;
    return {
      category: budget.category,
      budgeted: budget.amount,
      spent,
      remaining,
      status:
        remaining > 0
          ? "under"
          : remaining === 0
          ? "met"
          : "over",
    };
  });
}

export function getOverspendingCategories(
  budgets: Budget[],
  transactions: Transaction[]
) {
  const comparisons = compareBudgetToSpending(budgets, transactions);
  return comparisons.filter((c) => c.remaining < 0);
}
