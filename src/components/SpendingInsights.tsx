"use client";

import { useEffect, useState } from "react";

type Props = {
  refresh: boolean;
};

export default function SpendingInsights({ refresh }: Props) {
  const [insights, setInsights] = useState<string[]>([]);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    async function fetchInsights() {
      const [budgetRes, txnRes] = await Promise.all([
        fetch(`/api/budgets?month=${month}`),
        fetch("/api/transactions"),
      ]);

      const budgets = await budgetRes.json();
      const transactions = await txnRes.json();

      const categorySpend: Record<string, number> = {};

      for (const txn of transactions) {
        const txnMonth = txn.date.slice(0, 7);
        if (txnMonth === month) {
          categorySpend[txn.category] = (categorySpend[txn.category] || 0) + txn.amount;
        }
      }

      const overBudget: string[] = [];

      for (const b of budgets.budgets) {
        const spent = categorySpend[b.category] || 0;
        if (spent > b.amount) {
          overBudget.push(
            `⚠️ You overspent in "${b.category}" by ₹${spent - b.amount}`
          );
        }
      }

      if (overBudget.length === 0) {
        overBudget.push("You are within your budget for all categories!");
      }

      setInsights(overBudget);
    }

    fetchInsights();
  }, [month, refresh]); 

  return (
    <div className="w-full max-w-2xl mt-6 mx-auto">
      <h2 className="text-lg font-semibold mb-2">Spending Insights</h2>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <ul className="list-disc ml-5 space-y-1">
        {insights.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
